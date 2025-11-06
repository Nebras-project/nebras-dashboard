// Nebras Dashboard Component Style Overrides

import { baseColors, borderColors } from './colors';
import { fontWeights } from './typography';

// Border radius values
export const borderRadius = {
  none: 0,
  xxs: 1,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Border width values
export const borderWidth = {
  none: 0,
  xxs: 1,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
};

// Shadow values
export const shadows = {
  light: {
    sm: '0 2px 4px rgba(0,0,0,0.1)',
    md: '0 2px 8px rgba(0,0,0,0.1)',
    lg: '0 4px 16px rgba(0,0,0,0.15)',
  },
  dark: {
    sm: '0 2px 4px rgba(0,0,0,0.3)',
    md: '0 2px 8px rgba(0,0,0,0.3)',
    lg: '0 4px 16px rgba(0,0,0,0.4)',
  },
};

// Spacing values
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
};

// Background colors for table heads
const tableHeadBg = {
  light: baseColors.gray200,
  dark: baseColors.dark700,
};

export const getComponentOverrides = (mode) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
        textTransform: 'none',
        fontWeight: fontWeights.semiBold,
        padding: `${spacing.sm} ${spacing.md}`,
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: shadows[mode].lg,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        boxShadow: shadows[mode].md,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
      },
      elevation1: {
        boxShadow: shadows[mode].sm,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: borderRadius.md
        },
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: borderRadius.none,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        backgroundImage: 'none',
        // borderBottom: `1px solid ${borderColors[mode]}`,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${borderColors[mode]}`,
      },
      head: {
        fontWeight: fontWeights.semiBold,
        backgroundColor: tableHeadBg[mode],
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: borderRadius.lg,
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          cursor: 'not-allowed',
        },
      },
    },
  },
});
