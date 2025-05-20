'use server'

import { getData, saveData } from '@/app/resumeData'

export async function saveHeader(formData: FormData) {
  try {
    const data = getData()
    
    data.header = {
      firstName: formData.get('firstName')?.toString() || '',
      lastName: formData.get('lastName')?.toString() || '',
      title: formData.get('title')?.toString() || ''
    }

    await saveData(data)
    return { success: true }
  } catch (error) {
    return { error: 'Failed to save header information' }
  }
} 