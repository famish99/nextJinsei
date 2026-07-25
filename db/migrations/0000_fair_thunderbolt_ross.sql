CREATE TABLE "emails" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"message_id" text NOT NULL,
	"sender" text NOT NULL,
	"recipient" text NOT NULL,
	"subject" text NOT NULL,
	"body_html" text,
	"body_text" text,
	"spam_score" real,
	"received_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "emails_message_id_unique" UNIQUE("message_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "emails" ADD CONSTRAINT "emails_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;