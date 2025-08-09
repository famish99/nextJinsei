import {
  getStyles,

} from '@/app/config/styles'
import { classStr } from '@/app/utils'
import { cache } from 'react'
import {
  getArrowStyle,
  getBaseTextStyle,
  getBulletStyle,
  getSectionHeaderStyle,
  getTitleTextStyle,
} from '@/app/config/getSectionHeaderStyle'

export async function getHeaderSectionStyle() {
  const styles = await getStyles()
  return {
    highlightTextColor: `text-${styles.colors.text.highlight}`,
    initials: classStr(
      'initials-container',
      'mr-5',
      'text-base',
      'leading-none',
      'pb-3',
      'pt-3',
      'text-white',
      `bg-${styles.colors.primary}`,
      'font-medium',
      'px-3',
    ),
    baseTextColor: `text-${styles.colors.text.base}`,
    name: classStr(
      'print:text-6xl',
      'lg:text-6xl',
      'md:text-5xl',
      'mr-auto',
      'text-3xl',
      'font-semibold',
      `text-${styles.colors.text.base}`,
      'pb-px',
    ),
    title: classStr(
      'print:text-3xl',
      `text-${styles.colors.text.highlight}`,
      'font-sans',
      'self-center',
      'md:text-3xl',
      'text-2xl',
      'font-hairline',
      'pb-p',
    ),
  }
}

export async function getContactsSectionStyle() {
  const styles = await getStyles()
  return {
    arrow: await getArrowStyle(styles),
    header: classStr(
      'mb-1.5',
      styles.typography.weight.section,
      styles.typography.tracking.section,
      styles.typography.size.section,
      `text-${styles.colors.text.lowlight}`,
    ),
    highlightTextColor: `text-${styles.colors.text.highlight}`,
    lowlightTextColor: `text-${styles.colors.text.lowlight}`,
    sectionMargin: styles.spacing.section.margin,
    text: classStr(
      `text-${styles.colors.text.base}`,
      styles.typography.leading.base,
      'text-sm3',
    ),
  }
}

export async function getProfileSectionStyle() {
  const styles = await getStyles()
  const sectionHeaderStyle = await getSectionHeaderStyle(styles)
  const baseTextStyle = await getBaseTextStyle(styles)
  return {
    bullet: await getBulletStyle(styles),
    header: classStr(...sectionHeaderStyle),
    itemSpacing: styles.spacing.list.item,
    sectionSpacing: styles.spacing.section.base,
    sideMargin: styles.spacing.list.horizontal,
    text: baseTextStyle,
  }
}

export async function getExperienceSectionStyle() {
  const styles = await getStyles()
  const sectionHeaderStyle = await getSectionHeaderStyle(styles)
  const titleTextStyle = await getTitleTextStyle(styles)
  const baseTextStyle = await getBaseTextStyle(styles)
  return {
    bullet: await getBulletStyle(styles),
    header: classStr(...sectionHeaderStyle),
    itemSpacing: styles.spacing.items.compact,
    lowlightTextColor: `text-${styles.colors.text.lowlight}`,
    listMargin: 'mt-2',
    sectionSpacing: styles.spacing.section.base,
    sideMargin: styles.spacing.list.horizontal,
    subsectionSpacing: styles.spacing.subsection,
    subtitleSpacing: styles.spacing.subtitle,
    title: classStr(...titleTextStyle),
    text: baseTextStyle,
  }
}

export async function getSkillSectionStyle() {
  const styles = await getStyles()
  const sectionHeaderStyle = await getSectionHeaderStyle(styles)
  const titleTextStyle = await getTitleTextStyle(styles)
  return {
    header: classStr(...sectionHeaderStyle),
    itemSpacing: styles.spacing.items.base,
    sectionSpacing: styles.spacing.section.base,
    subsectionSpacing: styles.spacing.subsection,
    skillBoxStyle: `px-2.5 mr-1.6 mb-1.6 text-xs leading-relaxed text-${styles.colors.text.base} bg-${styles.colors.background.skill}`,
    skillContainerStyle: 'flex flex-wrap -mr-1.6 -mb-1.6',
    title: classStr(...titleTextStyle),
  }
}

export async function getProjectSectionStyle() {
  const styles = await getStyles()
  const sectionHeaderStyle = await getSectionHeaderStyle(styles)
  const baseTextStyle = await getBaseTextStyle(styles)
  return {
    arrow: await getArrowStyle(styles),
    header: classStr(...sectionHeaderStyle),
    descriptionSpacing: styles.spacing.description,
    sectionSpacing: styles.spacing.section.base,
    subsectionSpacing: styles.spacing.subsection,
    subtitleStyle: `leading-normal ${styles.typography.size.base}`,
    stackText: `${styles.typography.leading.base} ${styles.typography.size.small} text-${styles.colors.text.lowlight}`,
    title: classStr(
      `text-${styles.colors.text.base}`,
      styles.typography.weight.title,
      styles.typography.leading.title,
      'text-md',
    ),
    text: baseTextStyle,
  }
}

export async function getEducationSectionStyle() {
  const styles = await getStyles()
  const sectionHeaderStyle = await getSectionHeaderStyle(styles)
  const baseTextStyle = await getBaseTextStyle(styles)
  return {
    dateText: classStr(
      styles.typography.leading.base,
      styles.typography.size.base,
      `text-${styles.colors.text.lowlight}`,
    ),
    degreeText: classStr('mt-1.5', ...baseTextStyle),
    header: classStr(...sectionHeaderStyle),
    sectionSpacing: styles.spacing.section.base,
    subsectionSpacing: styles.spacing.subsection,
    title: classStr(
      `text-${styles.colors.text.base}`,
      styles.typography.weight.title,
      styles.typography.leading.title,
      'text-md',
    ),
  }
}

// Cache all style functions to avoid repeated computations
export const getCachedHeaderSectionStyle = cache(getHeaderSectionStyle)
export const getCachedContactsSectionStyle = cache(getContactsSectionStyle)
export const getCachedProfileSectionStyle = cache(getProfileSectionStyle)
export const getCachedExperienceSectionStyle = cache(getExperienceSectionStyle)
export const getCachedSkillSectionStyle = cache(getSkillSectionStyle)
export const getCachedProjectSectionStyle = cache(getProjectSectionStyle)
export const getCachedEducationSectionStyle = cache(getEducationSectionStyle)
