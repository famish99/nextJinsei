import { AppSyncResolverEvent, AppSyncIdentityCognito } from 'aws-lambda';
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { eq, desc } from 'drizzle-orm';
import { emails, users } from '../../../db/schema';

const rdsClient = new RDSDataClient({ region: process.env.AWS_REGION });
const db = drizzle(rdsClient, {
  database: process.env.RDS_DATABASE!,
  secretArn: process.env.RDS_SECRET_ARN!,
  resourceArn: process.env.RDS_CLUSTER_ARN!,
});

export const handler = async (event: AppSyncResolverEvent<any>) => {
  console.log('GraphQL Event:', JSON.stringify(event, null, 2));

  // Extract the user's email from the Cognito Identity
  const identity = event.identity as AppSyncIdentityCognito;
  const userEmail = identity?.claims?.email as string;
  if (!userEmail) {
    throw new Error('Unauthorized: No email claim found in token.');
  }

  // Map Cognito Identity to our PostgreSQL userId
  const [user] = await db.select().from(users).where(eq(users.email, userEmail)).limit(1);
  if (!user) {
    // If the user doesn't exist in our DB yet, they have no emails
    return [];
  }

  // Route based on the GraphQL field name
  switch (event.info.fieldName) {
    case 'listEmails':
      const userEmails = await db.select()
        .from(emails)
        .where(eq(emails.userId, user.id))
        .orderBy(desc(emails.receivedAt));
      
      // Transform output to match AppSync 'Email' type exactly
      return userEmails.map((e) => ({
        id: e.id.toString(),
        messageId: e.messageId,
        sender: e.sender,
        recipient: e.recipient,
        subject: e.subject,
        bodyHtml: e.bodyHtml,
        bodyText: e.bodyText,
        spamScore: e.spamScore,
        isSpam: e.spamScore ? e.spamScore > 0 : false,
        receivedAt: e.receivedAt ? e.receivedAt.toISOString() : null,
      }));

    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
};
