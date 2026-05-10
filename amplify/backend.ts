import { defineBackend } from '@aws-amplify/backend'

import { auth } from './auth/resource'
import { data } from './data/resource'
import { emailForwarder } from './functions/email-forwarder/resource'
import { addEmailForwarding } from './email/resource'

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  emailForwarder,
})

// Add email forwarding infrastructure
addEmailForwarding(backend)
