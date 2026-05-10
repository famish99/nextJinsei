import { defineFunction } from '@aws-amplify/backend'

export const emailForwarder = defineFunction({
  name: 'email-forwarder',
  environment: {
    FORWARD_TO_EMAIL: 'famish99@gmail.com',
    FROM_EMAIL: 'mail@huannguyen.info'
  }
})