'use server'

import {
  GetStylesQuery,
  StyleConfig,
  StyleQueryResult,
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

// Cache the loadStyles function to avoid repeated database calls
export const getStyles = cache(loadStyles)
