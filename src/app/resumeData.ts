import { ResumeData } from '@/types/resume'
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data'
import { cookies } from 'next/headers'
import { cache } from 'react'

import type { Schema } from '../../amplify/data/resource'
import outputs from '../../amplify_outputs.json'

const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
})

async function fetchData(): Promise<ResumeData> {
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

export async function saveData(data: ResumeData) {
  const userProfileId = process.env.USER_PROFILE_ID

  if (!userProfileId) {
    throw new Error('USER_PROFILE_ID environment variable is required')
  }

  // Get user profile by ID
  const { data: userProfile } = await cookieBasedClient.models.UserProfile.get({
    id: userProfileId,
  })

  if (!userProfile) {
    throw new Error(`User profile not found: ${userProfileId}`)
  }

  if (userProfile.resumeId) {
    // Update existing resume
    await cookieBasedClient.models.Resume.update({
      id: userProfile.resumeId,
      header: data.header,
      contacts: data.contacts,
      profile: data.profile,
      skills: data.skills,
      experience: data.experience,
      education: data.education,
      projects: data.projects,
    })
  } else {
    // Create new resume
    const { data: newResume } = await cookieBasedClient.models.Resume.create({
      userId: userProfile.userId,
      header: data.header,
      contacts: data.contacts,
      profile: data.profile,
      skills: data.skills,
      experience: data.experience,
      education: data.education,
      projects: data.projects,
    })

    if (newResume) {
      // Update user profile with new resume ID
      await cookieBasedClient.models.UserProfile.update({
        id: userProfile.id,
        resumeId: newResume.id,
      })
    }
  }
}
