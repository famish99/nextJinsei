import { pgTable, serial, text, timestamp, real, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const emails = pgTable('emails', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  messageId: text('message_id').notNull().unique(),
  sender: text('sender').notNull(),
  recipient: text('recipient').notNull(),
  subject: text('subject').notNull(),
  bodyHtml: text('body_html'),
  bodyText: text('body_text'),
  spamScore: real('spam_score'),
  receivedAt: timestamp('received_at').defaultNow().notNull(),
});
