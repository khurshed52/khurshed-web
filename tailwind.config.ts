import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        editor: 'rgb(var(--editor) / <alpha-value>)',
        sidebar: 'rgb(var(--sidebar) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        'panel-strong': 'rgb(var(--panel-strong) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        zinc: {
          100: 'rgb(var(--text-primary) / <alpha-value>)',
          200: 'rgb(var(--text-primary) / <alpha-value>)',
          300: 'rgb(var(--text-secondary) / <alpha-value>)',
          400: 'rgb(var(--text-secondary) / <alpha-value>)',
          500: 'rgb(var(--text-muted) / <alpha-value>)',
          700: 'rgb(var(--border) / <alpha-value>)',
          800: 'rgb(var(--panel) / <alpha-value>)',
          900: 'rgb(var(--panel-strong) / <alpha-value>)',
          950: 'rgb(var(--background) / <alpha-value>)',
        },
        accent: '#007acc',
        mint: '#4ec9b0',
        purple: {
          ...colors.purple,
          DEFAULT: '#c586c0',
        },
        blue: {
          ...colors.blue,
          DEFAULT: '#9cdcfe',
        },
        yellow: {
          ...colors.yellow,
          DEFAULT: '#dcdcaa',
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(0,122,204,.15)',
      },
    },
  },
  plugins: [],
}
export default config
