import { ResumeData } from '@/types/resume'

import { handleResumeUpdate } from '../utils'

export async function POST(request: Request) {
  const { projects } = await request.json()
  return handleResumeUpdate(
    (data: ResumeData, { projects }) => {
      data.projects = projects
    },
    { projects },
  )
}
