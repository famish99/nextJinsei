'use server'

import { getData, saveData } from '@/app/resumeData'

export async function saveProjects(formData: FormData, itemCount: number) {
  try {
    const data = getData()
    
    data.projects = Array.from({ length: itemCount }, (_, index) => ({
      title: formData.get(`${index}.title`)?.toString() || '',
      stack: formData.get(`${index}.stack`)?.toString() || '',
      description: formData.get(`${index}.description`)?.toString() || '',
      link: formData.get(`${index}.link`)?.toString() || ''
    }))

    await saveData(data)
    return { success: true }
  } catch (error) {
    return { error: 'Failed to save projects information' }
  }
} 