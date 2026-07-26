import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { migrate } from 'drizzle-orm/aws-data-api/pg/migrator';

// Expected environment variables for script execution
const { AWS_REGION, RDS_CLUSTER_ARN, RDS_SECRET_ARN, RDS_DATABASE } = process.env;

const client = new RDSDataClient({ region: AWS_REGION });
const db = drizzle(client, {
  database: RDS_DATABASE!,
  secretArn: RDS_SECRET_ARN!,
  resourceArn: RDS_CLUSTER_ARN!,
});

async function run() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './db/migrations' });
  console.log('Migrations complete.');
}

run().catch(console.error);
