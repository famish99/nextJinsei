'use server'

import { SkillSection } from '@/types/resume'

import { handleResumeAction } from './utils'

export async function saveSkills(skills: SkillSection[]) {
  return handleResumeAction((data, skills: SkillSection[]) => {
    data.skills = skills
  }, skills)
}
