'use server'

import { ProfileItem } from '@/types/resume'

import { handleResumeAction } from './utils'

export async function saveProfile(profile: ProfileItem[]) {
  return handleResumeAction((data, profile: ProfileItem[]) => {
    data.profile = profile
  }, profile)
}
