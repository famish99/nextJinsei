'use client'

import { StyleConfig, UpdateStylesMutation } from '@/app/styleConfig'
import {
  ContactData,
  EducationData,
  ExperienceItem,
  HeaderData,
  ProfileItem,
  ProjectItem,
  ResumeData,
  SkillSection,
} from '@/types/resume'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { getCurrentUser } from 'aws-amplify/auth'
import { generateClient } from 'aws-amplify/data'

import type { Schema } from '../../../amplify/data/resource'

const client = generateClient<Schema>({
  authMode: 'userPool',
})

export async function saveResumeData(
  fieldsToUpdate: Partial<ResumeData>,
  resumeId: string,
) {
  const updatePayload = {
    id: resumeId,
    ...fieldsToUpdate,
  }

  const updateResult = await client.models.Resume.update(updatePayload)

  if (updateResult.errors && updateResult.errors.length > 0) {
    throw new Error(
      'Failed to update resume: ' +
        JSON.stringify(updateResult.errors) +
        JSON.stringify(fieldsToUpdate),
    )
  }

  return updateResult.data
}

export async function getUserProfile() {
  const user = await getCurrentUser()

  const { data: userProfiles } =
    await client.models.UserProfile.listUserProfileByUserId({
      userId: user.userId,
    })

  if (!userProfiles || userProfiles.length === 0) {
    throw new Error(`No UserProfile found for user: ${user.userId}`)
  }

  return userProfiles[0]
}

// Generic handler function for resume updates
async function handleResumeAction<T>(
  updateFn: (payload: T) => Partial<ResumeData>,
  payload: T,
  resumeId: string,
) {
  try {
    const fieldsToUpdate = updateFn(payload)
    await saveResumeData(fieldsToUpdate, resumeId)
    return { success: true }
  } catch (error) {
    console.error('Error updating resume:', error)
    return { error: 'Failed to update resume' }
  }
}

// Client-side action functions
export async function saveContact(contacts: ContactData, resumeId: string) {
  return handleResumeAction(
    (contacts: ContactData) => {
      return { contacts }
    },
    contacts,
    resumeId,
  )
}

export async function saveEducation(
  education: EducationData[],
  resumeId: string,
) {
  return handleResumeAction(
    (education: EducationData[]) => {
      return { education }
    },
    education,
    resumeId,
  )
}

export async function saveExperience(
  experience: ExperienceItem[],
  resumeId: string,
) {
  return handleResumeAction(
    (experience: ExperienceItem[]) => {
      return { experience }
    },
    experience,
    resumeId,
  )
}

export async function saveHeader(header: HeaderData, resumeId: string) {
  return handleResumeAction(
    (header: HeaderData) => {
      return { header }
    },
    header,
    resumeId,
  )
}

export async function saveProfile(profile: ProfileItem[], resumeId: string) {
  return handleResumeAction(
    (profile: ProfileItem[]) => {
      return { profile }
    },
    profile,
    resumeId,
  )
}

export async function saveProjects(projects: ProjectItem[], resumeId: string) {
  return handleResumeAction(
    (projects: ProjectItem[]) => {
      return { projects }
    },
    projects,
    resumeId,
  )
}

export async function saveSkills(skills: SkillSection[], resumeId: string) {
  return handleResumeAction(
    (skills: SkillSection[]) => {
      return { skills }
    },
    skills,
    resumeId,
  )
}

// Client-side styles save function
export async function saveStyles(
  config: StyleConfig,
): Promise<{ success: boolean; error?: string }> {
  try {
    const userProfile = await getUserProfile()

    if (userProfile.stylesId) {
      // Update existing styles using GraphQL mutation directly
      const updateResult = (await client.graphql({
        query: UpdateStylesMutation,
        variables: {
          input: {
            id: userProfile.stylesId,
            colors: config.colors,
            spacing: config.spacing,
            typography: config.typography,
          },
        },
      })) as GraphQLResult<{ updateStyles: StyleConfig }>

      if (updateResult.errors && updateResult.errors.length > 0) {
        return {
          success: false,
          error:
            'Failed to update styles: ' + JSON.stringify(updateResult.errors),
        }
      }
    } else {
      // Create new styles
      const { data: newStyles } = await client.models.Styles.create({
        userId: userProfile.userId,
        colors: config.colors,
        spacing: config.spacing,
        typography: config.typography,
      })

      if (newStyles) {
        // Update user profile with new styles ID
        await client.models.UserProfile.update({
          id: userProfile.id,
          stylesId: newStyles.id,
        })
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error saving styles:', error)
    return { success: false, error: 'Failed to save styles' }
  }
}
