import { AppSyncResolverEvent, AppSyncIdentityCognito } from 'aws-lambda';
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { eq, desc, inArray } from 'drizzle-orm';
import { emails, users, labels, emailLabels, filters } from '../../../db/schema';

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
      
      // Fetch labels for these emails
      const emailIds = userEmails.map(e => e.id);
      let labelsByEmail: Record<number, any[]> = {};
      
      if (emailIds.length > 0) {
        const joinedLabels = await db.select({
            emailId: emailLabels.emailId,
            id: labels.id,
            name: labels.name,
            color: labels.color,
          })
          .from(emailLabels)
          .innerJoin(labels, eq(emailLabels.labelId, labels.id))
          .where(inArray(emailLabels.emailId, emailIds));
          
        joinedLabels.forEach(row => {
          if (!labelsByEmail[row.emailId]) labelsByEmail[row.emailId] = [];
          labelsByEmail[row.emailId].push({
            id: row.id.toString(),
            name: row.name,
            color: row.color,
          });
        });
      }

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
        labels: labelsByEmail[e.id] || [],
      }));

    case 'listLabels':
      const userLabels = await db.select()
        .from(labels)
        .where(eq(labels.userId, user.id));
      return userLabels.map(l => ({
        id: l.id.toString(),
        name: l.name,
        color: l.color,
      }));

    case 'createLabel':
      const [newLabel] = await db.insert(labels).values({
        userId: user.id,
        name: event.arguments.name,
        color: event.arguments.color || null,
      }).returning();
      return {
        id: newLabel.id.toString(),
        name: newLabel.name,
        color: newLabel.color,
      };

    case 'listFilters':
      const userFilters = await db.select()
        .from(filters)
        .where(eq(filters.userId, user.id));
      return userFilters.map(f => ({
        id: f.id.toString(),
        name: f.name,
        conditions: f.conditions,
        action: f.action,
      }));

    case 'createFilter':
      const [newFilter] = await db.insert(filters).values({
        userId: user.id,
        name: event.arguments.name,
        conditions: event.arguments.conditions,
        action: event.arguments.action,
      }).returning();
      return {
        id: newFilter.id.toString(),
        name: newFilter.name,
        conditions: newFilter.conditions,
        action: newFilter.action,
      };

    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
};
