// external imports
import {
  NAV_HOVER_BORDER_INDICATOR,
  NAV_HOVER_ICON_COLOR,
  NAV_HOVER_SHIMMER_LIGHT,
  NAV_HOVER_SHIMMER_DARK,
} from '@theme/colors';
import { baseColors, borderColors } from '../theme/colors';
import { borderRadius, shadows } from '../theme/components';
import { padding } from './spacing';

// =============================================================================
// LAYOUT DIMENSIONS
// =============================================================================

export const HEADER_HEIGHT = 80;
export const SIDEBAR_WIDTH = 290;
export const SIDEBAR_COLLAPSED_WIDTH = 80;

// =============================================================================
// SHARED COMPONENT CONSTANTS
// =============================================================================

// Color picker (used in ColorPicker.jsx + ColorSettingsCard.jsx)
export const COLOR_INDICATOR_SIZE = 23;

// =============================================================================
// ANIMATIONS & TRANSITIONS
// =============================================================================

// Transition configurations
export const TRANSITIONS = {
  nav: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  shimmer: 'left 0.5s ease',
};

// Navigation hover dimensions
const NAV_HOVER_CONFIG = {
  borderWidth: '3px',
  borderHeight: '100%',
  hoverTranslateX: '4px',
  iconScale: 'scale(1.1) rotate(-5deg)',
};

// Navigation item shared dimensions
export const NAV_ITEM_DIMENSIONS = {
  transition: 'all 0.2s ease-in-out',
  loaderSize: 20,
  icon: {
    minWidth: 40,
    collapsedSize: 48,
    fontSize: '1.25rem',
  },
  variants: {
    default: {
      height: 48,
      paddingX: 16,
    },
    dense: {
      height: 40,
      paddingX: 12,
    },
    comfortable: {
      height: 56,
      paddingX: 20,
    },
  },
};

// =============================================================================
// STYLE FUNCTIONS
// =============================================================================

/**
 * Navigation icon styles for collapsed sidebar
 * @param {Object} theme - MUI theme object
 * @param {boolean} isActive - Whether item is active
 * @param {boolean} collapsed - Whether sidebar is collapsed
 * @returns {Object} Style object
 */
export const getNavigationIconStyles = (theme, isActive, collapsed) => {
  if (!collapsed) {
    return {};
  }

  return {
    backgroundColor: isActive
      ? theme.palette.background.default
      : theme.palette.mode === 'dark'
      ? baseColors.dark700
      : baseColors.gray150,

    ...padding.all.sm,
    // borderRadius: borderRadius.xxs,
    width: `${NAV_ITEM_DIMENSIONS.icon.collapsedSize}px`,
    height: `${NAV_ITEM_DIMENSIONS.icon.collapsedSize}px`,
    aspectRatio: '1 / 1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

export const getActionsButtonStyles = (isLight) => ({
  bgcolor: isLight ? baseColors.gray200 : baseColors.dark900,
  color: isLight ? 'primary.main' : 'primary.contrastText',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: isLight ? baseColors.gray300 : baseColors.dark800,
    transform: 'scale(1.05)',
  },
});

/**
 * Get common Paper styles for sections
 * @param {string} mode - Theme mode ('light' or 'dark')
 * @param {Object} overrides - Additional styles to override defaults
 * @returns {Object} Style object for Paper component
 */
export const getSectionPaperStyles = (mode, overrides = {}) => ({
  ...padding.all.md,
  borderRadius: borderRadius.xxs,
  border: `1px solid ${borderColors[mode]}`,
  bgcolor: 'background.default',
  ...overrides,
});

/**
 * Get common Card styles
 * @param {string} mode - Theme mode ('light' or 'dark')
 * @param {Object} options - Options object
 * @param {Object} options.overrides - Additional styles to override defaults
 * @param {Object} options.padding - Padding styles (defaults to lg)
 * @returns {Object} Style object for Card component
 */
export const getCardStyles = (mode, additionalSx = {}) => ({
  bgcolor: 'background.default',
  border: `1px solid ${borderColors[mode]}`,
  borderRadius: borderRadius.xxs,
  boxShadow: shadows[mode].sm,
  ...padding.all.lg,
  ...additionalSx,
});

export const getNavigationHoverStyles = (theme, isActive, collapsed) => ({
  position: 'relative',
  overflow: 'hidden',
  transition: TRANSITIONS.nav,

  // Active state border indicator
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%) scaleY(0)',
    width: collapsed ? 0 : NAV_HOVER_CONFIG.borderWidth,
    height: collapsed ? 0 : NAV_HOVER_CONFIG.borderHeight,
    backgroundColor: NAV_HOVER_BORDER_INDICATOR,
    borderRadius: '0 4px 4px 0',
    transition: TRANSITIONS.nav,
    opacity: isActive ? 1 : 0,
    ...(isActive && {
      transform: 'translateY(-50%) scaleY(1)',
    }),
  },

  // Shimmer effect
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
    transition: TRANSITIONS.shimmer,
    zIndex: 0,
  },

  // Hover effects
  '&:hover': {
    transform: `translateX(${NAV_HOVER_CONFIG.hoverTranslateX})`,
    boxShadow: theme.shadows[2],
    '&::before': {
      opacity: 1,
      transform: 'translateY(-50%) scaleY(1)',
    },
    '&::after': {
      left: '100%',
    },
    '& .MuiListItemIcon-root': {
      transform: NAV_HOVER_CONFIG.iconScale,
      color: NAV_HOVER_ICON_COLOR,
    },
    '& .MuiListItemText-root': {
      color: NAV_HOVER_ICON_COLOR,
    },
  },

  // Icon styles
  '& .MuiListItemIcon-root': {
    transition: TRANSITIONS.nav,
    position: 'relative',
    zIndex: 1,

    ...(isActive && {
      color: NAV_HOVER_ICON_COLOR,
    }),
  },

  // Text styles
  '& .MuiListItemText-root': {
    position: 'relative',
    zIndex: 1,
    ...(isActive && {
      color: NAV_HOVER_ICON_COLOR,
    }),
  },
});

// =============================================================================
// COMPONENT STYLES
// =============================================================================

/**
 * Main layout container styles
 */
export const LAYOUT_STYLES = {
  container: {
    minHeight: '100vh',
    bgcolor: 'background.paper',
    overflowX: 'hidden',
  },
  mainContent: {
    bgcolor: 'background.paper',
    flex: 1,
    pt: `${HEADER_HEIGHT}px`,
    overflowX: 'hidden',
  },
};

// =============================================================================
// LEGACY EXPORTS (for backward compatibility)
// =============================================================================

export const CONTAINER_BASE_STYLES = LAYOUT_STYLES.container;
export const MAIN_CONTENT_BASE_STYLES = LAYOUT_STYLES.mainContent;
