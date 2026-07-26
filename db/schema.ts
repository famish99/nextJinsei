import { pgTable, serial, text, timestamp, real, integer, jsonb, primaryKey } from 'drizzle-orm/pg-core';

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

export const labels = pgTable('labels', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  color: text('color'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const emailLabels = pgTable('email_labels', {
  emailId: integer('email_id').references(() => emails.id).notNull(),
  labelId: integer('label_id').references(() => labels.id).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.emailId, t.labelId] }),
}));

export const filters = pgTable('filters', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  conditions: jsonb('conditions').notNull(),
  action: jsonb('action').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
