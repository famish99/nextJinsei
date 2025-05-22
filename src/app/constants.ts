import {
  ARROW_STYLE,
  BULLET_STYLE,
  getBaseTextStyle,
  getSectionHeaderStyle,
  getTitleTextStyle,
  loadStyles,
} from '@/app/config/styles'
import { classStr } from '@/app/utils'

const styles = loadStyles()
const BASE_TEXT_STYLE = getBaseTextStyle()
const SECTION_HEADER_STYLE = getSectionHeaderStyle()
const TITLE_TEXT_STYLE = getTitleTextStyle()

export const HEADER_SECTION_STYLE = {
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

export const CONTACTS_SECTION_STYLE = {
  arrow: ARROW_STYLE,
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

export const PROFILE_SECTION_STYLE = {
  bullet: BULLET_STYLE,
  header: classStr(...SECTION_HEADER_STYLE),
  itemSpacing: styles.spacing.list.item,
  sectionSpacing: styles.spacing.section.base,
  sideMargin: styles.spacing.list.horizontal,
  text: BASE_TEXT_STYLE,
}

export const EXPERIENCE_SECTION_STYLE = {
  bullet: BULLET_STYLE,
  header: classStr(...SECTION_HEADER_STYLE),
  itemSpacing: styles.spacing.items.compact,
  lowlightTextColor: `text-${styles.colors.text.lowlight}`,
  listMargin: 'mt-2',
  sectionSpacing: styles.spacing.section.base,
  sideMargin: styles.spacing.list.horizontal,
  subsectionSpacing: styles.spacing.subsection,
  subtitleSpacing: styles.spacing.subtitle,
  title: classStr(...TITLE_TEXT_STYLE),
  text: BASE_TEXT_STYLE,
}

export const SKILL_SECTION_STYLE = {
  header: classStr(...SECTION_HEADER_STYLE),
  itemSpacing: styles.spacing.items.base,
  sectionSpacing: styles.spacing.section.base,
  subsectionSpacing: styles.spacing.subsection,
  skillBoxStyle: `px-2.5 mr-1.6 mb-1.6 text-xs leading-relaxed text-${styles.colors.text.base} bg-${styles.colors.background.skill}`,
  skillContainerStyle: 'flex flex-wrap -mr-1.6 -mb-1.6',
  title: classStr(...TITLE_TEXT_STYLE),
}

export const PROJECT_SECTION_STYLE = {
  arrow: ARROW_STYLE,
  header: classStr(...SECTION_HEADER_STYLE),
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
  text: BASE_TEXT_STYLE,
}

export const EDUCATION_SECTION_STYLE = {
  dateText: classStr(
    styles.typography.leading.base,
    styles.typography.size.base,
    `text-${styles.colors.text.lowlight}`,
  ),
  degreeText: classStr('mt-1.5', ...BASE_TEXT_STYLE),
  header: classStr(...SECTION_HEADER_STYLE),
  sectionSpacing: styles.spacing.section.base,
  subsectionSpacing: styles.spacing.subsection,
  title: classStr(
    `text-${styles.colors.text.base}`,
    styles.typography.weight.title,
    styles.typography.leading.title,
    'text-md',
  ),
}
