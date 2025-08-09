// Utility functions to generate common style combinations
import { getStyles } from '@/app/config/styles'
import { StyleConfig } from '@/app/styleConfig'
import { classStr } from '@/app/utils'


export async function getSectionHeaderStyle(config?: StyleConfig) {
  const styles = config || (await getStyles())
  return [
    styles.spacing.section.text,
    styles.typography.weight.section,
    styles.typography.tracking.section,
    styles.typography.size.section,
    `text-${styles.colors.text.highlight}`,
  ]
}

export async function getBaseTextStyle(config?: StyleConfig) {
  const styles = config || (await getStyles())
  return [
    `text-${styles.colors.text.base}`,
    styles.typography.leading.base,
    styles.typography.size.base,
  ]
}

export async function getTitleTextStyle(config?: StyleConfig) {
  const styles = config || (await getStyles())
  return [
    `text-${styles.colors.text.base}`,
    styles.typography.weight.title,
    styles.typography.leading.title,
    styles.typography.size.title,
  ]
}

// Async utility functions for commonly used styles
export async function getArrowStyle(config?: StyleConfig) {
  const styles = config || (await getStyles())
  return classStr(
    'inline-block',
    `text-${styles.colors.text.arrow}`,
    'print:text-black',
    'font-normal',
    'group-hover:text-gray-700',
    'transition',
    'duration-100',
    'ease-in',
  )
}

export async function getBulletStyle(config?: StyleConfig) {
  const styles = config || (await getStyles())
  return classStr('-ml-2', 'select-none', `text-${styles.colors.text.lowlight}`)
}