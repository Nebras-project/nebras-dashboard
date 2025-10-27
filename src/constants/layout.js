/**
 * Layout Constants
 * Shared constants for layout components
 */


// Header constants
export const AVATAR_SIZE = 35;
export const HEADER_HEIGHT = 64;

// Logo Header constants
export const LOGO_HEIGHT = 40;
export const LOGO_LETTER_SPACING = "0.1rem";
export const COLLAPSE_ICON_SIZE = 24;
export const CLOSE_ICON_SIZE = 20;
export const CLOSE_BUTTON_SIZE = 32;

// Sidebar constants
export const SIDEBAR_WIDTH = 280;
export const SIDEBAR_COLLAPSED_WIDTH = 80;

// Navigation Menu constants
export const NAV_ITEM_HEIGHT = 48;
export const NAV_ICON_MIN_WIDTH = 40;
export const NAV_ICON_SIZE = "1.3rem";
export const NAV_TRANSITION = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
export const NAV_ITEM_MARGIN_BOTTOM = 0.75; // units (6px)
export const LIST_ITEM_MB_OFFSET = 0.25;

// Color picker constants
export const COLOR_INDICATOR_SIZE = 22;

// Selected navigation item styles
export const SELECTED_NAV_ITEM_STYLES = {
  "&.Mui-selected": {
    bgcolor: "primary.main",
    color: "primary.contrastText",
    "&:hover": {
      bgcolor: "primary.dark",
    },
    "& .MuiListItemIcon-root": {
      color: "primary.contrastText",
    },
  },
};

// Logout button styles
export const LOGOUT_BUTTON_STYLES = {
  color: "error.main",
  "&:hover": {
    bgcolor: "error.main",
    color: "error.contrastText",
    "& .MuiListItemIcon-root": {
      color: "error.contrastText",
    },
  },
};

export const LOGOUT_ICON_STYLES = {
  color: "error.main",
};

// ============================================================================
// MainLayout Styles
// ============================================================================

/**
 * Base styles for layout containers
 * Applied to both mobile and desktop layouts
 */
export const CONTAINER_BASE_STYLES = {
  minHeight: "100vh",
  bgcolor: "background.default",
};

/**
 * Styles for main content area
 * Includes top padding to account for fixed header
 */
export const MAIN_CONTENT_BASE_STYLES = {
  bgcolor: "background.paper",
  flex: 1,
  pt: `${HEADER_HEIGHT}px`,
};
