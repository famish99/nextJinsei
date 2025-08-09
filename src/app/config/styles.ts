'use server'

import {
  GetStylesQuery,
  StyleConfig,
  StyleQueryResult,
  UpdateStylesMutation,
} from '@/app/styleConfig'
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { cookies } from 'next/headers'
import { cache } from 'react'

import type { Schema } from '../../../amplify/data/resource'
import outputs from '../../../amplify_outputs.json'

export async function loadStyles(): Promise<StyleConfig> {
  const cookieBasedClient = generateServerClientUsingCookies<Schema>({
    config: outputs,
    cookies,
  })
  const userProfileId = process.env.USER_PROFILE_ID

  if (!userProfileId) {
    throw new Error(`User profile not found: ${userProfileId}`)
  }

  // Get specific user profile by ID
  const { data: userProfile } = await cookieBasedClient.models.UserProfile.get({
    id: userProfileId,
  })

  if (!userProfile) {
    throw new Error(`User profile not found: ${userProfileId}`)
  }

  const result = await cookieBasedClient.graphql({
    query: GetStylesQuery,
    variables: { id: userProfile.stylesId },
  })

  const { data } = result as GraphQLResult<StyleQueryResult>

  if (!data?.getStyles) {
    throw new Error(`Resume not found with ID: ${userProfile.stylesId}`)
  }

  return data.getStyles
}

export async function saveStyles(config: StyleConfig): Promise<void> {
  const cookieBasedClient = generateServerClientUsingCookies<Schema>({
    config: outputs,
    cookies,
  })
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

  if (userProfile.stylesId) {
    // Update existing styles using GraphQL mutation directly
    const updateResult = await cookieBasedClient.graphql({
      query: UpdateStylesMutation,
      variables: {
        input: {
          id: userProfile.stylesId,
          colors: config.colors,
          spacing: config.spacing,
          typography: config.typography,
        }
      }
    }) as GraphQLResult<{ updateStyles: StyleConfig }>
    
    if (updateResult.errors && updateResult.errors.length > 0) {
      throw new Error('Failed to update styles: ' + JSON.stringify(updateResult.errors))
    }
  } else {
    // Create new styles
    const { data: newStyles } = await cookieBasedClient.models.Styles.create({
      userId: userProfile.userId,
      colors: config.colors,
      spacing: config.spacing,
      typography: config.typography,
    })

    if (newStyles) {
      // Update user profile with new styles ID
      await cookieBasedClient.models.UserProfile.update({
        id: userProfile.id,
        stylesId: newStyles.id,
      })
    }
  }
}

// Cache the loadStyles function to avoid repeated database calls
export const getStyles = cache(loadStyles)
