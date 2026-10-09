/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        fadeToRight: {
          '0%': { opacity: 1, transform: 'translateX(0)' },
          '100%': { opacity: 0, transform: 'translateX(100%)' },
        },
        growProgress: {
          'from': { transform: 'scaleX(0)' },
          'to': { transform: 'scaleX(1)' }
        },
        skewScroll: {
          '0%': {
            transform: 'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(0)',
          },
          '100%': {
            transform:
              'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-68.6%)',
          },
        },
      },
      animation: {
        fadeToRight: 'fadeToRight .5s linear infinite',
        growProgress: 'growProgress auto linear',
        skewScroll: 'skewScroll 5s linear infinite',
        'spin-slow': 'spin 10s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        paper: "rgb(var(--m-paper) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--m-ink) / <alpha-value>)",
          2: "rgb(var(--m-ink-2) / <alpha-value>)",
          3: "rgb(var(--m-ink-3) / <alpha-value>)",
          4: "rgb(var(--m-ink-4) / <alpha-value>)",
        },
        line: "rgb(var(--m-line) / <alpha-value>)",
        frame: {
          DEFAULT: "rgb(var(--m-frame) / <alpha-value>)",
          fill: "var(--m-frame-fill)",
        },
        card: {
          DEFAULT: "var(--m-card)",
          strong: "var(--m-card-strong)",
        },
        accent: {
          DEFAULT: "rgb(var(--m-accent) / <alpha-value>)",
          ink: "rgb(var(--m-accent-ink) / <alpha-value>)",
        },
        warm: "rgb(var(--m-warm) / <alpha-value>)",
        panel: {
          DEFAULT: "rgb(var(--m-panel) / <alpha-value>)",
          ink: "rgb(var(--m-panel-ink) / <alpha-value>)",
          "ink-2": "rgb(var(--m-panel-ink-2) / <alpha-value>)",
          "ink-3": "rgb(var(--m-panel-ink-3) / <alpha-value>)",
          accent: "rgb(var(--m-panel-accent) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--m-surface) / <alpha-value>)",
          2: "rgb(var(--m-surface-2) / <alpha-value>)",
        },
        grid: "rgb(var(--m-grid) / <alpha-value>)",
        ruler: "rgb(var(--m-ruler) / <alpha-value>)",
        lav: "rgb(var(--m-lav) / <alpha-value>)",
      },
      typography: {
        DEFAULT: {
          css: {
            fontFeatureSettings: '"salt","ss01","cv11"',
          }
        }
      }
    },
    fontFamily: {
      sans: [
        'var(--font-inter)', { fontFeatureSettings: '"salt","ss01","cv11"' }
      ],
      mono: ['var(--font-jetbrains_mono)']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    // can-hover: only on devices with a real hovering pointer. Used for the
    // side-project demos' hover cues so a tap on a phone doesn't leave them
    // stuck "on". Not global: other hover reveals (e.g. PhotoCredit) still
    // rely on the sticky tap-hover as their touch fallback.
    function ({ addVariant }) {
      addVariant('can-hover', '@media (hover: hover) and (pointer: fine)')
    },
  ],
}
