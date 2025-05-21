import { ResumeData } from '@/types/resume'

import { handleResumeUpdate } from '../utils'

export async function POST(request: Request) {
  const { experiences } = await request.json()
  return handleResumeUpdate(
    (data: ResumeData, { experiences }) => {
      data.experience = experiences
    },
    { experiences },
  )
}
