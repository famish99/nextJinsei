'use server'

import { getData, saveData } from '@/app/resumeData'

export async function saveProfile(formData: FormData, itemCount: number) {
  try {
    const data = getData()
    
    data.profile = Array.from({ length: itemCount }, (_, index) => ({
      text: formData.get(`${index}.text`)?.toString() || '',
      type: formData.get(`${index}.type`)?.toString() as 'bold' | 'italic' | undefined
    }))

    await saveData(data)
    return { success: true }
  } catch (error) {
    return { error: 'Failed to save profile information' }
  }
} 