import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        editor: '#1e1e1e',
        sidebar: '#181818',
        panel: '#202020',
        border: '#343434',
        accent: '#007acc',
        mint: '#4ec9b0',
        purple: '#c586c0',
        blue: '#9cdcfe',
        yellow: '#dcdcaa',
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
