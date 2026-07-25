import { Backend } from '@aws-amplify/backend'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { ReceiptRuleSet, ReceiptRule } from 'aws-cdk-lib/aws-ses'
import { S3, Lambda, LambdaInvocationType } from 'aws-cdk-lib/aws-ses-actions'

export function addEmailForwarding(backend: Backend<any>) {
  // Create S3 bucket for storing emails
  const emailBucket = new Bucket(backend.stack, 'EmailBucket', {
    bucketName: `${backend.stack.stackName}-email-storage`,
  })

  // Get the Lambda function reference
  const emailProcessor = (backend.emailProcessor.resources as any).lambda

  // Add S3 permissions to Lambda
  emailProcessor.addToRolePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['s3:GetObject'],
      resources: [`${emailBucket.bucketArn}/*`]
    })
  )

  // Add environment variable for bucket name
  emailProcessor.addEnvironment('EMAIL_BUCKET', emailBucket.bucketName)

  // Create SES receipt rule set
  const ruleSet = new ReceiptRuleSet(backend.stack, 'EmailRuleSet', {
    receiptRuleSetName: `${backend.stack.stackName}-rules`
  })

  // Create receipt rule for mail@huannguyen.info
  new ReceiptRule(backend.stack, 'ForwardEmailRule', {
    ruleSet,
    recipients: ['mail@huannguyen.info'],
    actions: [
      new S3({
        bucket: emailBucket,
        objectKeyPrefix: 'emails/'
      }),
      new Lambda({
        function: emailProcessor,
        invocationType: LambdaInvocationType.EVENT
      })
    ]
  })

  return {
    emailBucket,
    ruleSet
  }
}