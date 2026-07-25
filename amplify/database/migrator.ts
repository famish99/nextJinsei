import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { migrate } from 'drizzle-orm/aws-data-api/pg/migrator';
import * as path from 'path';

// Expected environment variables for script execution
const { AWS_REGION, RDS_CLUSTER_ARN, RDS_SECRET_ARN, RDS_DATABASE } = process.env;

const client = new RDSDataClient({ region: AWS_REGION });
const db = drizzle(client, {
  database: RDS_DATABASE!,
  secretArn: RDS_SECRET_ARN!,
  resourceArn: RDS_CLUSTER_ARN!,
});

export const handler = async (event: any) => {
  console.log('Running migrations from TriggerFunction...', event);
  
  // The migrations folder is copied into the lambda root during bundling
  const migrationsFolder = path.join(__dirname, 'migrations');
  console.log('Migrations folder path:', migrationsFolder);
  
  try {
    await migrate(db, { migrationsFolder });
    console.log('Migrations complete.');
    return { status: 'success' };
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};
