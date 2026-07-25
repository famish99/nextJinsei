const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/**
 * Style values live in DynamoDB and are applied at runtime — either verbatim
 * (`spacing.section.text` -> "mb-2.1") or composed (`text-${colors.text.base}`).
 * The content scanner can't see any of them, and they change without a rebuild.
 *
 * Tailwind v1 shipped every utility via `purge: false`, which is why this used to
 * work; v3 always purges, so the utilities those fields can produce are safelisted
 * here instead. Only the families the StyleConfig fields feed into are listed, so
 * the stylesheet stays ~300 KB raw / ~35 KB gzip rather than several MB.
 */
/**
 * Tailwind v1 defaults, inlined.
 *
 * The resume was designed against these, and v3 changed all three: the gray and
 * blue palettes were replaced wholesale (v1 gray-700 #4a5568 is blue-tinted, v3's
 * #374151 is neutral), every fontSize gained a bundled line-height, and the sans
 * fallback stack was trimmed. Restoring them keeps the rendered output identical
 * to before the version bump.
 *
 * The custom gray shades below (150/250/550/650/750) interpolate the *v1* scale —
 * against v3's gray they'd sit out of order — which is why these can't be dropped.
 */
const V1_GRAY = {
  100: '#f7fafc',
  200: '#edf2f7',
  300: '#e2e8f0',
  400: '#cbd5e0',
  500: '#a0aec0',
  600: '#718096',
  700: '#4a5568',
  800: '#2d3748',
  900: '#1a202c',
}

const V1_BLUE = {
  100: '#ebf8ff',
  200: '#bee3f8',
  300: '#90cdf4',
  400: '#63b3ed',
  500: '#4299e1',
  600: '#3182ce',
  700: '#2b6cb0',
  800: '#2c5282',
  900: '#2a4365',
}

const V1_SANS = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  '"Noto Sans"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
]

// Plain strings on purpose: v3 ships each size as [size, { lineHeight }], which
// would override the `leading-*` classes the style config sets.
const V1_FONT_SIZE = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '4rem',
}

const customSpacing = {
  0.5: '2px', // 2px
  1.5: '0.375rem', // 6px
  1.6: '0.4375rem', // 7px
  2.1: '0.5625rem', // 9px
  2.5: '10px', // 10px
  3.2: '0.8125rem', // 16px
  4.5: '1.125rem', // 8px
  11: '2.75rem', // 44px (once)
}

const SPACING_VARIANTS = ['first', 'last', 'print']
const MARGIN = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my']
const PADDING = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py']

// Spacing has to be enumerated by name: safelist *patterns* skip decimal scale
// values (mt-1.5, mb-2.1) and don't expand variants, both of which the data uses.
const spacingSafelist = () => {
  const scale = Object.keys({ ...defaultTheme.spacing, ...customSpacing })
  const out = []
  for (const prefix of ['', ...SPACING_VARIANTS.map((v) => `${v}:`)]) {
    for (const value of scale) {
      for (const util of MARGIN) {
        out.push(`${prefix}${util}-${value}`)
        if (value !== '0' && value !== 'auto') out.push(`${prefix}-${util}-${value}`)
      }
      for (const util of PADDING) out.push(`${prefix}${util}-${value}`)
    }
  }
  return out
}

const PALETTE =
  '(inherit|current|transparent|black|white|link|slate|gray|zinc|neutral|stone|' +
  'red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|' +
  'purple|fuchsia|pink|rose)'

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Resume classes also live outside the route group — these files build the
    // class strings the components consume (print:/md:/lg: title sizes, etc.).
    './src/app/styleData.ts',
    './src/app/config/**/*.{js,jsx,ts,tsx}',
    './styles.json',
  ],
  safelist: [
    // colors.* — consumed as `text-${token}` / `bg-${token}`
    { pattern: new RegExp(`^(text|bg)-${PALETTE}(-\\d{2,3})?$`), variants: ['print', 'hover'] },
    // typography.leading.* / typography.tracking.*
    { pattern: /^(leading|tracking)-/, variants: ['print'] },
    // typography.weight.*
    {
      pattern:
        /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
      variants: ['print']
    },
    // typography.size.*
    { pattern: /^text-(xs|sm|sm2|base|md|lg|xl|\d?xl)$/, variants: ['print'] },
    // spacing.* — see spacingSafelist() above
    ...spacingSafelist(),
  ],
  theme: {
    /* For Letter size */
    screens: {
      print: { raw: 'print' },
      xsm: '500px',
      sm: '640px',
      md: '833px',
      lg: '1079.5px',
      xl: '1280px',
    },
    /* For A4 size */
    // screens: {
    //   screen: {"raw": "screen"},
    //   print: {"raw": "print"},
    //   xsm: "500px",
    //   sm: "640px",
    //   md: "811px",
    //   lg: "1051px",
    //   xl: "1280px",
    // },
    /* Not under `extend`: these have to replace the v3 defaults, not merge with
       them, so the bundled line-heights and the new sans stack don't come back. */
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: V1_SANS,
      firago: ['FiraGO', ...V1_SANS],
    },
    fontSize: {
      ...V1_FONT_SIZE, // base 1rem (16px), lg 1.125rem (18px)
      sm2: '0.9375rem', // 15px label
      md: '1.0625rem', // 17px body
    },
    extend: {
      lineHeight: {
        snugish: '1.32',
        normal: '1.34',
      },
      maxWidth: {
        letter: '66.40625rem',
        a4: '64.609375rem',
      },
      height: {
        letter: '85.9375rem',
        'letter-col': '71.625rem',
        'letter-col-full': '77.9375rem',
        a4: '91.350883rem',
        'a4-col': '77.038383rem',
        'a4-col-full': '83.350883rem',
      },
      spacing: customSpacing,
      /* Merges over the v3 palette, so v3-only shades (gray-50, red-50, gray-950)
         stay available while the shades in use keep their v1 values. The previous
         `...defaultTheme.colors.gray` spread here was a no-op under v3, where
         `defaultTheme.colors` is a function rather than an object. */
      colors: {
        gray: {
          ...V1_GRAY,
          150: 'hsl(210, 44%, 97%)',
          250: 'hsl(210, 40%, 93.5%)',
          550: 'hsl(218, 20%, 63%)',
          650: 'hsl(216, 15%, 48%)',
          750: 'hsl(214, 17%, 32%)',
        },
        blue: V1_BLUE,
        link: '#fbf3f3',
      },
    },
  },

  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    margin: ['responsive', 'last', 'first'],
    padding: ['responsive', 'last'],
  },

  plugins: [
    plugin(function ({ addBase, addUtilities, theme }) {
      addBase({
        body: {
          '-webkit-font-smoothing': 'subpixel-antialiased',
        },
      })

      /**
       * Typography Utilities
       */
      const typographyUtils = {
        '.optimize-legibility': {
          'text-rendering': 'optimizeLegibility',
        },
        '.ligatures': {
          'font-variant-ligatures': 'common-ligatures',
          'font-feature-settings': "'liga' on, 'clig' on",
        },
        '.kerning': {
          'font-kerning': 'normal',
          'font-feature-settings': "'kern' on",
        },
        '.small-caps': {
          'font-variant-caps': 'small-caps',
          'font-feature-settings': "'smcp' on",
        },
        '.all-small-caps': {
          'font-variant-caps': 'all-small-caps',
          'font-feature-settings': "'c2sc' on, 'smcp' on",
        },
        '.lining-nums': {
          'font-variant-numeric': 'lining-nums',
          'font-feature-settings': "'lnum' on",
        },
        '.oldstyle-nums': {
          'font-variant-numeric': 'oldstyle-nums',
          'font-feature-settings': "'onum' on",
        },
        '.proportional-nums': {
          'font-variant-numeric': 'proportional-nums',
          'font-feature-settings': "'pnum' on",
        },
        '.tabular-nums': {
          'font-variant-numeric': 'tabular-nums',
          'font-feature-settings': "'tnum' on",
        },
        '.slashed-zero': {
          'font-variant-numeric': 'slashed-zero',
          'font-feature-settings': "'zero' on",
        },
        '.super': {
          'font-variant-position': 'super',
          'font-feature-settings': "'sups' on",
        },
        '.sub': {
          'font-variant-position': 'sub',
          'font-feature-settings': "'sub' on",
        },
        '.ordinal': {
          'font-variant-position': 'ordinal',
          'font-feature-settings': "'ordn' on",
        },
        '.fractions': {
          'font-variant-numeric': 'diagonal-fractions',
          'font-feature-settings': "'frac' on",
        },
        '.case-sensitive': {
          'text-transform': 'uppercase',
          'font-feature-settings': "'case' on",
        },
        '.hyphens-manual': {
          hyphens: 'manual',
        },
      }

      addUtilities(typographyUtils, {
        variants: ['responsive'],
      })

      /**
       * Project Specific Utilities
       */
      const projectSpecificUtils = {
        '.border-inset': {
          'box-shadow': `inset 0 0 0 1px ${theme('colors.gray.400')}`,
        },
      }

      addUtilities(projectSpecificUtils, {
        variants: ['responsive'],
      })

      /**
       * CSS Multi-Column Layout Utilities
       */
      const columnUtils = {
        '.col-count-1': {
          'column-count': '1',
        },
        '.col-count-2': {
          'column-count': '2',
        },
        '.col-count-3': {
          'column-count': '3',
        },
        '.col-width-1': {
          'column-width': '65%',
        },
        '.col-gap-md': {
          'column-gap': '2.1875rem',
        },
        '.break-after-col': {
          'break-after': 'column',
        },
        '.break-inside-avoid': {
          'break-inside': 'avoid',
        },
        '.break-after-avoid': {
          'break-after': 'avoid',
        },
        '.break-before-avoid': {
          'break-after': 'avoid',
        },
        '.col-fill-auto': {
          'column-fill': 'auto',
        },
        '.col-fill-balance': {
          'column-fill': 'balance',
        },
      }

      addUtilities(columnUtils, {
        variants: ['responsive'],
      })
    }),
  ],
}
