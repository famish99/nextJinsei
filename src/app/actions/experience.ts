'use server'

import { ExperienceItem } from '@/types/resume'

import { handleResumeAction } from './utils'

export async function saveExperience(experiences: ExperienceItem[]) {
  return handleResumeAction((data, experiences: ExperienceItem[]) => {
    data.experience = experiences
  }, experiences)
}
