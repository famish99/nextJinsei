import { classStr } from '@/app/utils'
import stylesConfig from './styles.json'
import { saveStylesAction } from '@/app/actions/styles'

export type StyleConfig = typeof stylesConfig

export function loadStyles(): StyleConfig {
  return stylesConfig
}

export async function saveStyles(config: StyleConfig): Promise<void> {
  const result = await saveStylesAction(config)
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to save styles')
  }

  // Optionally, we could reload the page or update the local config
  console.log('Styles saved successfully')
}

// Utility functions to generate common style combinations
export function getSectionHeaderStyle(config: StyleConfig = stylesConfig) {
  return [
    config.spacing.section.text,
    config.typography.weight.section,
    config.typography.tracking.section,
    config.typography.size.section,
    `text-${config.colors.text.highlight}`,
  ]
}

export function getBaseTextStyle(config: StyleConfig = stylesConfig) {
  return [
    `text-${config.colors.text.base}`,
    config.typography.leading.base,
    config.typography.size.base,
  ]
}

export function getTitleTextStyle(config: StyleConfig = stylesConfig) {
  return [
    `text-${config.colors.text.base}`,
    config.typography.weight.title,
    config.typography.leading.title,
    config.typography.size.title,
  ]
}

// Re-export common constants that use the config
export const ARROW_STYLE = classStr(
  'inline-block',
  `text-${stylesConfig.colors.text.arrow}`,
  'print:text-black',
  'font-normal',
  'group-hover:text-gray-700',
  'transition',
  'duration-100',
  'ease-in',
)

export const BULLET_STYLE = classStr(
  '-ml-2',
  'select-none',
  `text-${stylesConfig.colors.text.lowlight}`,
)
