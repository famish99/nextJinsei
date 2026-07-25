'use server'

import { loadStyles } from '@/app/config/styles'
import { StyleConfig } from '@/app/styleConfig'

export async function loadStylesAction(): Promise<{
  success: boolean
  data?: StyleConfig
  error?: string
}> {
  try {
    const styles = await loadStyles()
    return { success: true, data: styles }
  } catch (error) {
    console.error('Error loading styles:', error)
    return {
      success: false,
      error: 'Failed to load styles',
    }
  }
}
