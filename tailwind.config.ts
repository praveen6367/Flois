import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import { FLOIS_COLORS, FLOIS_RADIUS, FLOIS_SHADOWS } from './lib/design-system/tokens';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        flois: FLOIS_COLORS.olive,
        neutral: FLOIS_COLORS.neutral,
        border: FLOIS_COLORS.border,
        astra: FLOIS_COLORS.astra,
      },
      fontFamily: {
        serif: ['var(--flois-font-serif)', 'Poppins', 'sans-serif'],
        sans: ['var(--flois-font-sans)', 'Poppins', '-apple-system', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      boxShadow: FLOIS_SHADOWS,
      borderRadius: FLOIS_RADIUS,
      maxWidth: {
        'flois-sm': '640px',
        'flois-md': '960px',
        'flois-lg': '1280px',
        'flois-xl': '1440px',
        'flois-max': '1600px',
      },
      transitionTimingFunction: {
        'flois-luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [typography],
};

export default config;
