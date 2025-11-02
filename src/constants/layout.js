import { borderWidth } from '@theme/components';
import { margin, padding } from './spacing';
import { borderRadius } from '@theme';
import {
  NAV_HOVER_BORDER_INDICATOR,
  NAV_HOVER_ICON_COLOR,
  NAV_HOVER_SHIMMER_LIGHT,
  NAV_HOVER_SHIMMER_DARK,
} from '@theme/colors';
// Header constants
export const AVATAR_SIZE = 35;
export const HEADER_HEIGHT = 80;

// User menu constants
export const USER_MENU_MIN_WIDTH = 250;
export const USER_MENU_BORDER_RADIUS = 2;
export const USER_MENU_MARGIN_TOP = 1.5;
export const USER_MENU_ARROW_SIZE = 10;
export const USER_MENU_ARROW_RIGHT_POSITION = 14;

// Logo Header constants
export const LOGO_HEIGHT = 35;
export const LOGO_LETTER_SPACING = '0.1rem';
export const COLLAPSE_ICON_SIZE = 24;
export const CLOSE_ICON_SIZE = 20;
export const CLOSE_BUTTON_SIZE = 32;

// Sidebar constants
export const SIDEBAR_WIDTH = 290;
export const SIDEBAR_COLLAPSED_WIDTH = 80;

// Navigation Menu constants
export const NAV_ITEM_HEIGHT = 48;
export const NAV_ICON_MIN_WIDTH = 40;
export const NAV_ICON_SIZE = '1.3rem';
export const NAV_TRANSITION = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
export const NAV_HOVER_BORDER_WIDTH = '3px';
export const NAV_HOVER_BORDER_HEIGHT = '100%';

// Color picker constants
export const COLOR_INDICATOR_SIZE = 23;

// Navigation Hover Styles
// Centralized hover effects for sidebar navigation items

export const getNavigationHoverStyles = (theme, isActive, collapsed) => {
  return {
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%) scaleY(0)',
      width: collapsed ? 0 : NAV_HOVER_BORDER_WIDTH,
      height: collapsed ? 0 : NAV_HOVER_BORDER_HEIGHT,
      backgroundColor: NAV_HOVER_BORDER_INDICATOR,
      borderRadius: '0 4px 4px 0',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 0,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: `linear-gradient(90deg, transparent, ${
        theme.palette.mode === 'dark' ? NAV_HOVER_SHIMMER_DARK : NAV_HOVER_SHIMMER_LIGHT
      }, transparent)`,
      transition: 'left 0.5s ease',
      zIndex: 0,
    },
    '&:hover': {
      transform: 'translateX(4px)',
      boxShadow: theme.shadows[2],
      '&::before': {
        opacity: 1,
        transform: 'translateY(-50%) scaleY(1)',
      },
      '&::after': {
        left: '100%',
      },
      '& .MuiListItemIcon-root': {
        transform: 'scale(1.1) rotate(-5deg)',
        color: NAV_HOVER_ICON_COLOR,
      },
    },
    '& .MuiListItemIcon-root': {
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      zIndex: 1,
      ...(isActive && {
        color: NAV_HOVER_ICON_COLOR,
      }),
    },
    '& .MuiListItemText-root': {
      position: 'relative',
      zIndex: 1,
    },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...(isActive && {
      '&::before': {
        opacity: 1,
        transform: 'translateY(-50%) scaleY(1)',
      },
    }),
  };
};

// Logout button styles
export const LOGOUT_BUTTON_STYLES = {
  color: 'error.main',
  '&:hover': {
    bgcolor: 'error.main',
    color: 'error.contrastText',
    '& .MuiListItemIcon-root': {
      color: 'error.contrastText',
    },
  },
};

export const LOGOUT_ICON_STYLES = {
  color: 'error.main',
};

// User menu dropdown styles
export const USER_MENU_PAPER_PROPS = {
  elevation: 3,
  sx: {
    ...margin.top.sm,
    minWidth: 250,
    border: borderWidth.xs,
    borderColor: 'divider',
    borderRadius: borderRadius.xxs,
    overflow: 'visible',
  },
};

// MainLayout Styles
export const CONTAINER_BASE_STYLES = {
  minHeight: '100vh',
  bgcolor: 'background.paper',
  overflowX: 'hidden',
};

export const MAIN_CONTENT_BASE_STYLES = {
  bgcolor: 'background.paper',
  flex: 1,
  pt: `${HEADER_HEIGHT}px`,
  overflowX: 'hidden',
};
