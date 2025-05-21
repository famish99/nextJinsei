import { ResumeData } from '@/types/resume'

import { handleResumeUpdate } from '../utils'

export async function POST(request: Request) {
  const { header } = await request.json()
  return handleResumeUpdate(
    (data: ResumeData, { header }) => {
      data.header = header
    },
    { header },
  )
}
