'use server'

import { ProjectItem } from '@/types/resume'

import { handleResumeAction } from './utils'

export async function saveProjects(projects: ProjectItem[]) {
  return handleResumeAction((data, projects: ProjectItem[]) => {
    data.projects = projects
  }, projects)
}
