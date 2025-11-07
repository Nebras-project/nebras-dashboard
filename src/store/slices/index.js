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
  setMobileMode,
} from './sidebarSlice';

// Auth slice
export {
  default as authReducer,
  login,
  logout,
  setUser,
  setToken,
  clearError,
  checkAuth,
  setLoading,
  setError,
  updateUserProfile,
} from './authSlice';

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
