// Nebras Dashboard Component Style Overrides

import { alpha } from '@mui/material/styles';

import { borderColors } from './colors';
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
          borderRadius: borderRadius.md,
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
      },
    },
  },
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }) => {
        const rowBackground = theme.palette.background.default;

        return {
          border: `1px solid ${borderColors[mode]}`,
          borderRadius: borderRadius.md,
          backgroundColor: theme.palette.background.default,

          '--DataGrid-cellHeight': '52px',
          '--DataGrid-columnHeadersBackgroundColor': rowBackground,

          // Hide the scrollbar filler
          '& .MuiDataGrid-scrollbarFiller': {
            display: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: rowBackground,
            borderBottom: `1px solid ${borderColors[mode]}`,
            borderTop: `1px solid ${borderColors[mode]}`,
            backgroundImage: 'none',
            // padding: theme.spacing(0, 1.5),
            borderRadius: 0,
          },
          '& .MuiDataGrid-columnHeadersInner': {
            backgroundColor: rowBackground,
            backgroundImage: 'none',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: rowBackground,
            backgroundImage: 'none',
            borderRadius: 0,
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: fontWeights.semiBold,
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.background.paper,
          },

          '& .MuiDataGrid-row': {
            borderBottom: `1px solid ${borderColors[mode]}`,
            backgroundColor: rowBackground,
            width: '100%',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: rowBackground,
            padding: theme.spacing(1, 2),
          },
          // Style the selected row count message in footer
          '& .MuiDataGrid-selectedRowCount': {
            whiteSpace: 'nowrap',
            fontSize: theme.typography.body2.fontSize,
            fontWeight: fontWeights.regular,
            color: theme.palette.text.secondary,
          },

          // Hide divider between quickFilter and export buttons in toolbar
          // Target all dividers within the DataGrid
          '& .MuiDataGrid-toolbarContainer .MuiDivider-root': {
            display: 'none !important',
          },
          '& .MuiDataGrid-toolbarContainer .MuiDivider-vertical': {
            display: 'none !important',
          },
          // Also target dividers that might be siblings of toolbar container
          '& .MuiDivider-root[class*="MuiDataGrid"]': {
            display: 'none !important',
          },
          // Target any element with divider-like styling in toolbar
          '& .MuiDataGrid-toolbarContainer > *[role="separator"]': {
            display: 'none !important',
          },
        };
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
