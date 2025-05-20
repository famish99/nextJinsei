import { ResumeData } from '@/app/resumeData'

import { handleResumeUpdate } from '../utils'

export async function POST(request: Request) {
  const { contacts } = await request.json()
  return handleResumeUpdate(
    (data: ResumeData, { contacts }) => {
      data.contacts = contacts
    },
    { contacts },
  )
}
