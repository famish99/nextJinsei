import { classStr } from '@/app/utils'

const ARROW_STYLE = classStr(
  'inline-block',
  'text-gray-550',
  'print:text-black',
  'font-normal',
  'group-hover:text-gray-700',
  'transition',
  'duration-100',
  'ease-in',
)

const BULLET_STYLE = classStr('-ml-2', 'select-none', 'text-gray-600')
const BASE_TEXT_COLOR = 'text-gray-700'
const BASE_TEXT_LEADING = 'leading-normal'
const BASE_TEXT_SIZE = 'text-sm'
const BASE_TEXT_STYLE = [BASE_TEXT_COLOR, BASE_TEXT_LEADING, BASE_TEXT_SIZE]

const HIGHLIGHT_TEXT_COLOR = 'text-blue-700'
const LIST_HORIZONTAL_MARGIN = 'ml-1.5'
const LOWLIGHT_TEXT_COLOR = 'text-gray-550'

const SECTION_SPACING = 'mt-3 first:mt-0'

const SECTION_TEXT_SPACING = 'mb-2.1'
const SECTION_TEXT_FORMAT = 'font-bold'
const SECTION_TEXT_TRACKING = 'tracking-widest'
const SECTION_TEXT_SIZE = 'text-sm2'

const SECTION_HEADER_STYLE = [
  SECTION_TEXT_SPACING,
  SECTION_TEXT_FORMAT,
  SECTION_TEXT_TRACKING,
  SECTION_TEXT_SIZE,
  HIGHLIGHT_TEXT_COLOR,
]

const SUBSECTION_SPACING = 'mb-3 last:md-0 last:pb-2'
const TITLE_TEXT_FORMAT = 'font-semibold'
const TITLE_TEXT_LEADING = 'leading-snugish'
const TITLE_TEXT_SIZE = 'text-lg'
const TITLE_TEXT_STYLE = [
  BASE_TEXT_COLOR,
  TITLE_TEXT_FORMAT,
  TITLE_TEXT_LEADING,
  TITLE_TEXT_SIZE,
]

export const HEADER_SECTION_STYLE = {
  highlightTextColor: HIGHLIGHT_TEXT_COLOR,
  initials: classStr(
    'initials-container',
    'mr-5',
    'text-base',
    'leading-none',
    'pb-3',
    'pt-3',
    'text-white',
    'bg-blue-700',
    'font-medium',
    'px-3 ',
  ),
  baseTextColor: BASE_TEXT_COLOR,
  name: classStr(
    'print:text-6xl',
    'lg:text-6xl',
    'md:text-5xl',
    'mr-auto',
    'text-3xl',
    'font-semibold',
    BASE_TEXT_COLOR,
    'pb-px',
  ),
  title: classStr(
    'print:text-3xl',
    HIGHLIGHT_TEXT_COLOR,
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
    SECTION_TEXT_FORMAT,
    SECTION_TEXT_TRACKING,
    SECTION_TEXT_SIZE,
    LOWLIGHT_TEXT_COLOR,
  ),
  highlightTextColor: HIGHLIGHT_TEXT_COLOR,
  lowlightTextColor: LOWLIGHT_TEXT_COLOR,
  sectionMargin: 'mb-8 first:mt-0',
  text: classStr(BASE_TEXT_COLOR, BASE_TEXT_LEADING, 'text-md'),
}

export const PROFILE_SECTION_STYLE = {
  bullet: BULLET_STYLE,
  header: classStr(...SECTION_HEADER_STYLE),
  itemSpacing: 'mb-2',
  sectionSpacing: SECTION_SPACING,
  sideMargin: LIST_HORIZONTAL_MARGIN,
  text: BASE_TEXT_STYLE,
}

export const EXPERIENCE_SECTION_STYLE = {
  bullet: BULLET_STYLE,
  header: classStr(...SECTION_HEADER_STYLE),
  itemSpacing: 'mt-1',
  lowlightTextColor: LOWLIGHT_TEXT_COLOR,
  listMargin: 'mt-2',
  sectionSpacing: SECTION_SPACING,
  sideMargin: LIST_HORIZONTAL_MARGIN,
  subsectionSpacing: SUBSECTION_SPACING,
  subtitleSpacing: 'mt-0.5',
  title: classStr(...TITLE_TEXT_STYLE),
  text: BASE_TEXT_STYLE,
}

export const SKILL_SECTION_STYLE = {
  header: classStr(...SECTION_HEADER_STYLE),
  itemSpacing: 'mt-2',
  sectionSpacing: SECTION_SPACING,
  subsectionSpacing: SUBSECTION_SPACING,
  skillBoxStyle: `px-2.5 mr-1.6 mb-1.6 text-xs leading-relaxed ${BASE_TEXT_COLOR} bg-gray-200`,
  skillContainerStyle: `flex flex-wrap -mr-1.6 -mb-1.6`,
  title: classStr(...TITLE_TEXT_STYLE),
}

export const PROJECT_SECTION_STYLE = {
  arrow: ARROW_STYLE,
  header: classStr(...SECTION_HEADER_STYLE),
  descriptionSpacing: 'mt-1.5',
  sectionSpacing: SECTION_SPACING,
  subsectionSpacing: SUBSECTION_SPACING,
  subtitleStyle: `leading-normal text-sm`,
  stackText: `${BASE_TEXT_LEADING} text-xs ${LOWLIGHT_TEXT_COLOR}`,
  title: classStr(
    BASE_TEXT_COLOR,
    TITLE_TEXT_FORMAT,
    TITLE_TEXT_LEADING,
    'text-md',
  ),
  text: BASE_TEXT_STYLE,
}

export const EDUCATION_SECTION_STYLE = {
  dateText: classStr(BASE_TEXT_LEADING, BASE_TEXT_SIZE, LOWLIGHT_TEXT_COLOR),
  degreeText: classStr('mt-1.5', ...BASE_TEXT_STYLE),
  header: classStr(...SECTION_HEADER_STYLE),
  sectionSpacing: SECTION_SPACING,
  subsectionSpacing: SUBSECTION_SPACING,
  title: classStr(
    BASE_TEXT_COLOR,
    TITLE_TEXT_FORMAT,
    TITLE_TEXT_LEADING,
    'text-md',
  ),
}
