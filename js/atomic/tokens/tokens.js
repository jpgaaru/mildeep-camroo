// Design Tokens — Devi Fisheries Seafood ERP
// Core atomic visual attributes: Colors, Typography, Spacing, Radii, Shadows, Transitions

export const DesignTokens = {
  colors: {
    brand: {
      primary: '#0284C7',     // Sky Blue 600
      primaryDark: '#0369A1', // Sky Blue 700
      primaryDeep: '#0C4A6E', // Sky Blue 900
      primaryLight: '#E0F2FE',// Sky Blue 100
      primaryBg: '#F0F9FF'    // Sky Blue 50
    },
    neutral: {
      surface: '#FFFFFF',
      background: '#F2F5F9',
      border: '#E2E8F0',
      borderSubtle: '#CBD5E1',
      textPrimary: '#0F172A',
      textSecondary: '#64748B',
      textTertiary: '#94A3B8'
    },
    semantic: {
      success: '#10B981',
      successBg: '#ECFDF5',
      warning: '#F59E0B',
      warningBg: '#FFFBEB',
      danger: '#EF4444',
      dangerBg: '#FEF2F2',
      info: '#3B82F6',
      infoBg: '#EFF6FF'
    },
    darkNav: {
      background: '#0F172A',
      headerBg: '#0B0F19',
      border: '#1E293B',
      text: '#94A3B8',
      textHover: '#FFFFFF',
      itemHoverBg: 'rgba(255, 255, 255, 0.05)'
    }
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    sizes: {
      xs: '11px',
      sm: '12px',
      base: '13px',
      md: '14px',
      lg: '16px',
      xl: '18px',
      heading: '20px'
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  radius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px'
  }
};
