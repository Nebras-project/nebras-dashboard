/**
 * Store Slices Barrel Export
 * Central export point for all Redux slices
 *
 * Usage:
 * import { setLanguage, toggleTheme, toggleSidebar } from '@store/slices';
 */

// Theme slice
export {
  default as themeReducer,
  toggleTheme,
  setThemeMode,
} from "./themeSlice";

// Language slice
export {
  default as languageReducer,
  setLanguage,
  toggleLanguage,
} from "./languageSlice";

// Sidebar slice
export {
  default as sidebarReducer,
  openSidebar,
  closeSidebar,
  toggleSidebar,
  collapseSidebar,
  expandSidebar,
  toggleCollapsed,
  setMobileMode,
} from "./sidebarSlice";

// User slice
export {
  default as userReducer,
  login,
  logout,
  updateUserProfile,
} from "./userSlice";

// Color scheme slice
export {
  default as colorSchemeReducer,
  setDefaultColor,
  setColorScheme,
  setCustomColor,
} from "./colorSchemeSlice";
