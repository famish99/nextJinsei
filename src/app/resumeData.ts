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

export async function saveData(data: ResumeData) {
  const cookieBasedClient = generateServerClientUsingCookies<Schema>({
    config: outputs,
    cookies,
  })
  const userProfileId = process.env.USER_PROFILE_ID

  if (!userProfileId) {
    throw new Error('USER_PROFILE_ID environment variable is required')
  }

  // Get user profile by ID
  const userProfileResult = await cookieBasedClient.models.UserProfile.get({
    id: userProfileId,
  })

  if (!userProfileResult.data) {
    throw new Error(`User profile not found: ${userProfileId}`)
  }

  const userProfile = userProfileResult.data

  if (userProfile.resumeId) {
    // Update existing resume
    const updateResult = await cookieBasedClient.models.Resume.update({
      id: userProfile.resumeId,
      header: data.header,
      contacts: data.contacts,
      profile: data.profile,
      skills: data.skills,
      experience: data.experience,
      education: data.education,
      projects: data.projects,
    })
    
    if (updateResult.errors && updateResult.errors.length > 0) {
      throw new Error('Failed to update resume: ' + JSON.stringify(updateResult.errors))
    }
  } else {
    // Create new resume
    const createResult = await cookieBasedClient.models.Resume.create({
      userId: userProfile.userId,
      header: data.header,
      contacts: data.contacts,
      profile: data.profile,
      skills: data.skills,
      experience: data.experience,
      education: data.education,
      projects: data.projects,
    })
    
    if (createResult.errors && createResult.errors.length > 0) {
      throw new Error('Failed to create resume: ' + JSON.stringify(createResult.errors))
    }

    if (createResult.data) {
      // Update user profile with new resume ID
      const profileUpdateResult = await cookieBasedClient.models.UserProfile.update({
        id: userProfile.id,
        resumeId: createResult.data.id,
      })
      
      if (profileUpdateResult.errors && profileUpdateResult.errors.length > 0) {
        throw new Error('Failed to update user profile: ' + JSON.stringify(profileUpdateResult.errors))
      }
    }
  }
}
