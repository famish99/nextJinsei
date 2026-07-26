import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import type { SESEvent } from 'aws-lambda';
import { simpleParser } from 'mailparser';
import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { eq } from 'drizzle-orm';
import { emails, users } from '../../../db/schema';

const s3 = new S3Client({ region: process.env.AWS_REGION });
const rdsClient = new RDSDataClient({ region: process.env.AWS_REGION });

const db = drizzle(rdsClient, {
  database: process.env.RDS_DATABASE!,
  secretArn: process.env.RDS_SECRET_ARN!,
  resourceArn: process.env.RDS_CLUSTER_ARN!,
});

export const handler = async (event: SESEvent) => {
  console.log('Email received:', JSON.stringify(event, null, 2));
  
  for (const record of event.Records) {
    const mail = record.ses.mail;
    const receipt = record.ses.receipt;
    
    // Skip spam/virus emails based on SES verdicts
    const isSpamVerdict = receipt.spamVerdict.status === 'FAIL';
    const isVirusVerdict = receipt.virusVerdict.status === 'FAIL';
    
    if (isVirusVerdict) {
      console.log('Skipping virus email');
      continue;
    }
    
    try {
      // Get the raw email from S3
      const s3Object = await s3.send(new GetObjectCommand({
        Bucket: process.env.EMAIL_BUCKET!,
        Key: `emails/${mail.messageId}`
      }));
      
      const rawEmail = await s3Object.Body?.transformToString();
      if (!rawEmail) throw new Error('Could not retrieve email content');
      
      // Parse the email using mailparser
      const parsed = await simpleParser(rawEmail);
      
      const recipientEmail = parsed.to && Array.isArray(parsed.to) ? parsed.to[0]?.value[0]?.address || '' : (!Array.isArray(parsed.to) ? parsed.to?.value[0]?.address || '' : '');
      
      if (!recipientEmail) {
        console.log('No recipient found, skipping');
        continue;
      }
      
      // Look up or create user based on recipient
      let [user] = await db.select().from(users).where(eq(users.email, recipientEmail)).limit(1);
      
      if (!user) {
        const [newUser] = await db.insert(users).values({
          email: recipientEmail,
        }).returning();
        user = newUser;
      }

      // Insert into database
      await db.insert(emails).values({
        userId: user.id,
        messageId: mail.messageId,
        sender: parsed.from?.value[0]?.address || mail.source,
        recipient: recipientEmail,
        subject: parsed.subject || '',
        bodyHtml: parsed.html || '',
        bodyText: parsed.text || '',
        spamScore: isSpamVerdict ? 1.0 : 0.0,
      });
      
      console.log(`Email ${mail.messageId} successfully indexed into database.`);
      
    } catch (error) {
      console.error('Error processing email:', error);
      throw error;
    }
  }
  
  return { status: 'success' };
};