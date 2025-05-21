'use server'

import { EducationData } from '@/types/resume'

import { handleResumeAction } from './utils'

export async function saveEducation(education: EducationData[]) {
  return handleResumeAction((data, education: EducationData[]) => {
    data.education = education
  }, education)
}
