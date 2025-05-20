import { ResumeData } from '@/app/resumeData'

import { handleResumeUpdate } from '../utils'

export async function POST(request: Request) {
  const { skills } = await request.json()
  return handleResumeUpdate(
    (data: ResumeData, { skills }) => {
      data.skills = skills
    },
    { skills },
  )
}
