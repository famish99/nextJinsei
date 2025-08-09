'use server'

import { writeFile } from 'fs/promises'
import path from 'path'
import { StyleConfig } from '@/app/styleConfig'
import { loadStyles } from '@/app/config/styles'

export async function saveStylesAction(
  styles: StyleConfig,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate that the incoming data matches our StyleConfig type structure
    if (!styles?.colors || !styles?.spacing || !styles?.typography) {
      return {
        success: false,
        error: 'Invalid style configuration format',
      }
    }

    const filePath = path.join(
      process.cwd(),
      'src',
      'app',
      'config',
      'styles.json',
    )

    // Pretty print the JSON with 2 spaces indentation
    const fileContent = JSON.stringify(styles, null, 2)

    await writeFile(filePath, fileContent)

    return { success: true }
  } catch (error) {
    console.error('Error saving styles:', error)
    return {
      success: false,
      error: 'Failed to save styles',
    }
  }
}

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
