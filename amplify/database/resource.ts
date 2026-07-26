import { Backend } from '@aws-amplify/backend';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Trigger } from 'aws-cdk-lib/triggers';
import * as path from 'path';
import * as url from 'url';

import { Duration } from 'aws-cdk-lib';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export function addDatabaseInfrastructure(backend: Backend<any>) {
  const vpc = new ec2.Vpc(backend.stack, 'MailVpc', {
    maxAzs: 2,
    natGateways: 0,
    subnetConfiguration: [
      {
        cidrMask: 24,
        name: 'Isolated',
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      }
    ]
  });

  const pgEngine = rds.DatabaseClusterEngine.auroraPostgres({ version: rds.AuroraPostgresEngineVersion.VER_17_1 });
  const parameterGroup = new rds.ParameterGroup(backend.stack, 'MailDbParamGroup', { engine: pgEngine });

  const cluster = new rds.DatabaseCluster(backend.stack, 'MailDatabase', {
    engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
    parameterGroup,
    writer: rds.ClusterInstance.serverlessV2('writer'),
    serverlessV2MinCapacity: 0,
    serverlessV2MaxCapacity: 1.0,
    vpc,
    vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
    defaultDatabaseName: 'mail_indexer',
    enableDataApi: true,
  });

  // Database Migration Trigger Lambda
  const migrator = new NodejsFunction(backend.stack, 'MigratorLambda', {
    runtime: Runtime.NODEJS_20_X,
    entry: path.join(__dirname, 'migrator.ts'),
    timeout: Duration.minutes(5),
    bundling: {
      externalModules: ['pg-native'],
      commandHooks: {
        beforeInstall() { return []; },
        beforeBundling() { return []; },
        afterBundling(inputDir, outputDir) {
          // Copy the drizzle migrations folder into the Lambda build folder
          return [`cp -r ${inputDir}/db/migrations ${outputDir}/migrations`];
        }
      }
    },
    environment: {
      RDS_CLUSTER_ARN: cluster.clusterArn,
      RDS_SECRET_ARN: cluster.secret!.secretArn,
      RDS_DATABASE: 'mail_indexer',
    }
  });

  // Grant the Migrator Lambda Data API access and Secret read access
  cluster.grantDataApiAccess(migrator);
  cluster.secret!.grantRead(migrator);

  // Trigger the migrator automatically upon stack deployment
  new Trigger(backend.stack, 'MigrationTrigger', {
    handler: migrator,
    executeOnHandlerChange: true,
    executeAfter: [cluster],
  });

  // Grant Data API access to the Email Processor Lambda
  if (backend.emailProcessor && backend.emailProcessor.resources) {
    const lambda = backend.emailProcessor.resources.lambda;
    cluster.grantDataApiAccess(lambda);
    cluster.secret!.grantRead(lambda);
    lambda.addEnvironment('RDS_CLUSTER_ARN', cluster.clusterArn);
    lambda.addEnvironment('RDS_SECRET_ARN', cluster.secret!.secretArn);
    lambda.addEnvironment('RDS_DATABASE', 'mail_indexer');
  }

  // Grant Data API access to the GraphQL Resolver Lambda
  if (backend.graphqlResolver && backend.graphqlResolver.resources) {
    const lambda = backend.graphqlResolver.resources.lambda;
    cluster.grantDataApiAccess(lambda);
    cluster.secret!.grantRead(lambda);
    lambda.addEnvironment('RDS_CLUSTER_ARN', cluster.clusterArn);
    lambda.addEnvironment('RDS_SECRET_ARN', cluster.secret!.secretArn);
    lambda.addEnvironment('RDS_DATABASE', 'mail_indexer');
  }

  return { cluster, vpc };
}
