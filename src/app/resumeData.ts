import { ResumeData } from '@/types/resume'
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data'
import { cookies } from 'next/headers'
import { cache } from 'react'

import type { Schema } from '../../amplify/data/resource'
import outputs from '../../amplify_outputs.json'

async function fetchData(): Promise<ResumeData> {
  const cookieBasedClient = generateServerClientUsingCookies<Schema>({
    config: outputs,
    cookies,
  })

  const userProfileId = process.env.USER_PROFILE_ID

  if (!userProfileId) {
    throw new Error(
      'USER_PROFILE_ID environment variable is required. Please set it in your .env.local file.',
    )
  }

  // Get specific user profile by ID
  const { data: userProfile } = await cookieBasedClient.models.UserProfile.get({
    id: userProfileId,
  })

  if (!userProfile) {
    throw new Error(`User profile not found: ${userProfileId}`)
  }

  const { data: resume } = await userProfile.resume()

  if (!resume) {
    throw new Error(`Resume not found with ID: ${userProfile.resumeId}`)
  }

  return resume
}

export const getData = cache(fetchData)

// Server-side saveData removed - moved to client-side
