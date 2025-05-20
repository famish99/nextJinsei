'use server'

import { getData, saveData } from '@/app/resumeData'

export async function saveExperience(formData: FormData, itemCount: number) {
  try {
    const data = getData()
    
    data.experience = Array.from({ length: itemCount }, (_, index) => ({
      employer: formData.get(`${index}.employer`)?.toString() || '',
      title: formData.get(`${index}.title`)?.toString() || '',
      location: formData.get(`${index}.location`)?.toString() || '',
      startDate: formData.get(`${index}.startDate`)?.toString() || '',
      endDate: formData.get(`${index}.endDate`)?.toString() || '',
      tasks: Array.from({ length: Number(formData.get(`${index}.taskCount`)) || 0 }, (_, taskIndex) => 
        formData.get(`${index}.tasks.${taskIndex}`)?.toString() || ''
      )
    }))

    await saveData(data)
    return { success: true }
  } catch (error) {
    return { error: 'Failed to save experience information' }
  }
} 