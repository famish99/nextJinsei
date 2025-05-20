'use server'

import { getData, saveData } from '@/app/resumeData'

export async function saveContact(formData: FormData) {
  try {
    const data = getData()
    
    data.contacts = {
      email: formData.get('email')?.toString() || '',
      phone: {
        countryCode: formData.get('phone.countryCode')?.toString() || '',
        raw: formData.get('phone.raw')?.toString() || '',
        formatted: formData.get('phone.formatted')?.toString() || ''
      },
      linkedin: formData.get('linkedin')?.toString() || '',
      github: formData.get('github')?.toString() || undefined
    }

    await saveData(data)
    return { success: true }
  } catch (error) {
    return { error: 'Failed to save contact information' }
  }
} 