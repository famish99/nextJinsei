'use server'

import { getData, saveData } from '@/app/resumeData'

export async function saveSkills(formData: FormData, sectionCount: number) {
  try {
    const data = getData()
    
    data.skills = Array.from({ length: sectionCount }, (_, index) => ({
      title: formData.get(`${index}.title`)?.toString() || '',
      items: Array.from(
        { length: Number(formData.get(`${index}.itemCount`)) || 0 },
        (_, itemIndex) => formData.get(`${index}.items.${itemIndex}`)?.toString() || ''
      )
    }))

    await saveData(data)
    return { success: true }
  } catch (error) {
    return { error: 'Failed to save skills information' }
  }
} 