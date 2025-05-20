'use server'

import { getData, saveData } from '@/app/resumeData'

export async function saveEducation(formData: FormData, itemCount: number) {
  try {
    const data = getData()
    
    data.education = Array.from({ length: itemCount }, (_, index) => ({
      institution: formData.get(`${index}.institution`)?.toString() || '',
      location: formData.get(`${index}.location`)?.toString(),
      startDate: formData.get(`${index}.startDate`)?.toString() || '',
      endDate: formData.get(`${index}.endDate`)?.toString() || '',
      degree: formData.get(`${index}.degree`)?.toString() || ''
    }))

    await saveData(data)
    return { success: true }
  } catch (error) {
    return { error: 'Failed to save education information' }
  }
} 