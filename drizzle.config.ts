import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  driver: 'aws-data-api',
  dialect: 'postgresql',
} satisfies Config;
