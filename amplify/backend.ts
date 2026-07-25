import { defineBackend } from '@aws-amplify/backend'

import { auth } from './auth/resource'
import { data } from './data/resource'
import { emailProcessor } from './functions/email-processor/resource'
import { graphqlResolver } from './functions/graphql-resolver/resource'
import { addEmailForwarding } from './email/resource'
import { addDatabaseInfrastructure } from './database/resource'

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  emailProcessor,
  graphqlResolver,
})

// Add email forwarding infrastructure
addEmailForwarding(backend)

// Add secure database infrastructure
addDatabaseInfrastructure(backend)
