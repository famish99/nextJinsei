'use server'

import { StyleConfig } from '@/app/styleConfig'
import { loadStyles } from '@/app/config/styles'

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
