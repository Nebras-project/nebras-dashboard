import { borderWidth } from '@theme/components';
import { margin, padding } from './spacing';
import { borderRadius } from '@theme';
/**
 * Layout Constants
 * Shared constants for layout components
 */

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
export const NAV_ITEM_MARGIN_BOTTOM = 0.75; // units (6px)
export const LIST_ITEM_MB_OFFSET = 0.25;

// Color picker constants
export const COLOR_INDICATOR_SIZE = 23;

// Selected navigation item styles
export const SELECTED_NAV_ITEM_STYLES = (theme) => ({
  '&.Mui-selected': {
    bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.primary',
    color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main',
    '&:hover': {
      bgcolor: theme.palette.mode === 'dark' ? 'background.surface.level2' : 'primary.light',
      color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.dark',
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main',
    },
  },
});

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
/**
 * Base styles for layout containers
 * Applied to both mobile and desktop layouts
 */
export const CONTAINER_BASE_STYLES = {
  minHeight: '100vh',
  bgcolor: 'background.paper',
  overflowX: 'hidden',
};

/**
 * Styles for main content area
 * Includes top padding to account for fixed header
 */
export const MAIN_CONTENT_BASE_STYLES = {
  bgcolor: 'background.paper',
  flex: 1,
  pt: `${HEADER_HEIGHT}px`,
  overflowX: 'hidden',
};
