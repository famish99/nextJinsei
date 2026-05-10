import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import type { SESEvent } from 'aws-lambda'

const ses = new SESClient({ region: process.env.AWS_REGION })
const s3 = new S3Client({ region: process.env.AWS_REGION })

export const handler = async (event: SESEvent) => {
  console.log('Email received:', JSON.stringify(event, null, 2))
  
  for (const record of event.Records) {
    const mail = record.ses.mail
    const receipt = record.ses.receipt
    
    // Skip spam/virus emails
    if (receipt.spamVerdict.status === 'FAIL' || receipt.virusVerdict.status === 'FAIL') {
      console.log('Skipping spam/virus email')
      continue
    }
    
    try {
      // Get the raw email from S3
      const s3Object = await s3.send(new GetObjectCommand({
        Bucket: process.env.EMAIL_BUCKET!,
        Key: `emails/${mail.messageId}`
      }))
      
      const rawEmail = await s3Object.Body?.transformToString()
      if (!rawEmail) throw new Error('Could not retrieve email content')
      
      // Modify headers for forwarding
      const emailLines = rawEmail.split('\n')
      const modifiedEmail = emailLines.map(line => {
        // Replace To header with forward destination
        if (line.toLowerCase().startsWith('to:')) {
          return `To: ${process.env.FORWARD_TO_EMAIL}`
        }
        // Add forwarding headers for transparency
        if (line.toLowerCase().startsWith('subject:')) {
          return line + `\nX-Forwarded-For: ${mail.commonHeaders.to?.join(', ')}\nX-Original-To: ${mail.commonHeaders.to?.join(', ')}`
        }
        return line
      }).join('\n')
      
      const command = new SendRawEmailCommand({
        Source: process.env.FROM_EMAIL,
        Destinations: [process.env.FORWARD_TO_EMAIL!],
        RawMessage: {
          Data: Buffer.from(modifiedEmail)
        }
      })
      
      await ses.send(command)
      console.log(`Raw email forwarded to ${process.env.FORWARD_TO_EMAIL}`)
      
    } catch (error) {
      console.error('Error forwarding email:', error)
      throw error
    }
  }
  
  return { status: 'success' }
}