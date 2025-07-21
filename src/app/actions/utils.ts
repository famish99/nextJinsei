'use server'

import { getData, saveData } from '@/app/resumeData'
import { ResumeData } from '@/types/resume'

type UpdateFunction<T> = (data: ResumeData, payload: T) => void

export async function handleResumeAction<T>(
  updateFn: UpdateFunction<T>,
  payload: T,
) {
  try {
    const data = await getData()
    updateFn(data, payload)
    await saveData(data)
    return { success: true }
  } catch (error) {
    console.error('Error updating resume:', error)
    return { error: 'Failed to update resume' }
  }
}
