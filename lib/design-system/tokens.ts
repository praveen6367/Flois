/**
 * FLOIS LUXURY DESIGN SYSTEM - TYPESCRIPT TOKENS DICTIONARY
 * Brand Vision: High-End Botanical Clinical Luxury (Aesop + Typology + Augustinus Bader + Apple)
 */

export const FLOIS_COLORS = {
  // Core Brand Olive Scale (Base: #4B644C)
  olive: {
    50:  '#F4F6F4',
    100: '#E3E8E3',
    200: '#C5D1C5',
    300: '#9DAF9E',
    400: '#748B76',
    500: '#4B644C', // Primary FLOIS Olive
    600: '#3D523E',
    700: '#304031',
    800: '#222E23',
    900: '#141C15', // Deep Forest Black
  },
  // Warm Luxury Neutrals
  neutral: {
    white: '#FFFFFF',
    alabaster: '#FAF9F5',
    linen: '#F3F1EA',
    sand: '#EAE3D2',
    stone: '#D8D3C5',
    slate: '#4A4E4A',
    charcoal: '#121412',
  },
  // Semantic Feedback Colors
  semantic: {
    success: { bg: '#F0F7F0', text: '#2D5A2E', border: '#C5D1C5' },
    warning: { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' },
    danger:  { bg: '#FEF2F2', text: '#991B1B', border: '#FCA5A5' },
    info:    { bg: '#F0F6FF', text: '#1E40AF', border: '#BFDBFE' },
  },
  // Borders
  border: {
    subtle: '#E8E6DF',
    medium: '#D4D0C5',
    strong: '#121412',
    focus:  '#4B644C',
  }
} as const;

export const FLOIS_TYPOGRAPHY = {
  families: {
    serif: 'var(--flois-font-serif)',
    sans: 'var(--flois-font-sans)',
  },
  scale: {
    heroDisplay: { size: '4.5rem', leading: '1.05', weight: 400, tracking: '-0.03em', family: 'serif' },
    h1:          { size: '3.25rem', leading: '1.1',  weight: 400, tracking: '-0.02em', family: 'serif' },
    h2:          { size: '2.5rem',  leading: '1.15', weight: 400, tracking: '-0.02em', family: 'serif' },
    h3:          { size: '1.875rem', leading: '1.2',  weight: 400, tracking: '-0.01em', family: 'serif' },
    h4:          { size: '1.375rem', leading: '1.3',  weight: 500, tracking: '0em',      family: 'sans' },
    bodyLarge:   { size: '1.125rem', leading: '1.6',  weight: 400, tracking: '-0.01em', family: 'sans' },
    body:        { size: '0.938rem', leading: '1.6',  weight: 400, tracking: '0em',      family: 'sans' },
    caption:     { size: '0.813rem', leading: '1.5',  weight: 400, tracking: '0em',      family: 'sans' },
    button:      { size: '0.813rem', leading: '1.0',  weight: 600, tracking: '0.08em',  family: 'sans', transform: 'uppercase' },
    label:       { size: '0.75rem',  leading: '1.4',  weight: 500, tracking: '0.05em',  family: 'sans' },
    badge:       { size: '0.688rem', leading: '1.0',  weight: 600, tracking: '0.1em',   family: 'sans', transform: 'uppercase' },
    overline:    { size: '0.625rem', leading: '1.0',  weight: 600, tracking: '0.2em',   family: 'sans', transform: 'uppercase' },
  }
} as const;

export const FLOIS_SPACING = {
  grid: 8, // 8px spatial grid
  scale: {
    '0.5': '4px',
    '1':   '8px',
    '2':   '16px',
    '3':   '24px',
    '4':   '32px',
    '5':   '40px',
    '6':   '48px',
    '8':   '64px',
    '10':  '80px',
    '12':  '96px',
    '16':  '128px',
    '20':  '160px',
  },
  containers: {
    sm: '640px',
    md: '960px',
    lg: '1280px',
    xl: '1440px',
    max: '1600px',
  }
} as const;

export const FLOIS_SHADOWS = {
  subtle: '0 2px 10px rgba(18, 20, 18, 0.03)',
  card:   '0 8px 30px rgba(18, 20, 18, 0.04)',
  hover:  '0 16px 40px rgba(18, 20, 18, 0.08)',
  drawer: '-10px 0 50px rgba(18, 20, 18, 0.12)',
  modal:  '0 25px 60px rgba(18, 20, 18, 0.18)',
} as const;

export const FLOIS_RADIUS = {
  xs:   '2px',
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  full: '9999px',
} as const;

export const FLOIS_MOTION = {
  easing: {
    luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
    standard: 'cubic-bezier(0.65, 0, 0.35, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '600ms',
    page: '900ms',
  }
} as const;
