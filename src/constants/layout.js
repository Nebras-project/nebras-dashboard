/**
 * Layout Constants
 * Shared constants for layout components
 */

// Header constants
export const AVATAR_SIZE = 35;

// Sidebar constants
export const SIDEBAR_WIDTH = 280;
export const SIDEBAR_COLLAPSED_WIDTH = 80;

// Logo Header constants
export const LOGO_HEIGHT = 40;
export const LOGO_LETTER_SPACING = "0.1rem";
export const COLLAPSE_ICON_SIZE = 24;
export const CLOSE_ICON_SIZE = 20;
export const CLOSE_BUTTON_SIZE = 32;

// Navigation Menu constants
export const NAV_ITEM_HEIGHT = 48;
export const NAV_ICON_MIN_WIDTH = 40;
export const NAV_ICON_SIZE = "1.375rem";
export const NAV_TEXT_SIZE = "0.875rem";
export const NAV_TRANSITION = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
export const NAV_ITEM_MARGIN_BOTTOM = 0.75; // units (6px)
export const LIST_ITEM_MB_OFFSET = 0.25;

// Color picker constants
export const COLOR_INDICATOR_SIZE = 22;

// Sidebar Controls shared styles (not memoized - extracted as constants)
const SIDEBAR_CONTROL_BUTTON_STYLES = {
  borderRadius: 2,
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: NAV_ITEM_HEIGHT,
  minHeight: NAV_ITEM_HEIGHT,
  px: 2,
  py: 0,
  transition: NAV_TRANSITION,
  "&:hover": {
    bgcolor: "action.hover",
  },
};

const SIDEBAR_CONTROL_ICON_STYLES = {
  minWidth: NAV_ICON_MIN_WIDTH,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: NAV_TRANSITION,
  fontSize: NAV_ICON_SIZE,
  "& svg": {
    fontSize: NAV_ICON_SIZE,
    display: "block",
  },
};

const SIDEBAR_CONTROL_TEXT_PROPS = {
  fontSize: NAV_TEXT_SIZE,
  fontWeight: 600,
};

// Getter functions for backward compatibility (return the same object reference)
export const getSidebarControlButtonStyles = () =>
  SIDEBAR_CONTROL_BUTTON_STYLES;
export const getSidebarControlIconStyles = () => SIDEBAR_CONTROL_ICON_STYLES;
export const getSidebarControlTextProps = () => SIDEBAR_CONTROL_TEXT_PROPS;

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
