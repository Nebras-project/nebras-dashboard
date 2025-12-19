// Theme slice
export { default as themeReducer, toggleTheme, setThemeMode } from './themeSlice';

// Language slice
export { default as languageReducer, setLanguage, toggleLanguage } from './languageSlice';

// Sidebar slice
export {
  default as sidebarReducer,
  openSidebar,
  closeSidebar,
  toggleSidebar,
  collapseSidebar,
  expandSidebar,
  toggleCollapsed,
} from './sidebarSlice';

// Auth slice
export { default as authReducer, setUserData, clearUserData, setAccessToken } from './authSlice';

// Color scheme slice
export {
  default as colorSchemeReducer,
  setDefaultColor,
  setColorScheme,
  setCustomColor,
} from './colorSchemeSlice';

// Toast slice
export {
  default as toastReducer,
  showToast,
  closeToast,
  success,
  warning,
  error,
  info,
} from './toastSlice';
