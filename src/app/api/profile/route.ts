import { ResumeData } from '@/types/resume'

import { handleResumeUpdate } from '../utils'

export async function POST(request: Request) {
  const { profile } = await request.json()
  return handleResumeUpdate(
    (data: ResumeData, { profile }) => {
      data.profile = profile
    },
    { profile },
  )
}
