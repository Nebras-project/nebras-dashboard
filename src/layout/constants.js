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
export const BRAND_NAME = "NEBRAS";

// Navigation Menu constants
export const NAV_ITEM_HEIGHT = 48;
export const NAV_ICON_MIN_WIDTH = 40;
export const NAV_ICON_SIZE = "1.375rem";
export const NAV_TEXT_SIZE = "0.875rem";
export const NAV_TRANSITION = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

// Sidebar Controls shared styles
export const getSidebarControlButtonStyles = () => ({
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
});

export const getSidebarControlIconStyles = () => ({
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
});

export const getSidebarControlTextProps = () => ({
  fontSize: NAV_TEXT_SIZE,
  fontWeight: 600,
});
