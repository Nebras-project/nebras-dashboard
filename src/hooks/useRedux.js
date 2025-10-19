import { useSelector, useDispatch } from "react-redux";
import {
  toggleTheme,
  setTheme,
  setPrimaryColor,
  setSecondaryColor,
} from "../store/slices/themeSlice";
import { setLanguage, toggleLanguage } from "../store/slices/languageSlice";
import {
  toggleSidebar,
  setSidebarOpen,
  setMobileMode,
  setSidebarWidth,
} from "../store/slices/sidebarSlice";
import {
  setUser,
  clearUser,
  updateUserProfile,
} from "../store/slices/userSlice";

// Theme hooks
export const useTheme = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return {
    ...theme,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (mode) => dispatch(setTheme(mode)),
    setPrimaryColor: (color) => dispatch(setPrimaryColor(color)),
    setSecondaryColor: (color) => dispatch(setSecondaryColor(color)),
  };
};

// Language hooks
export const useLanguage = () => {
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();

  return {
    ...language,
    setLanguage: (lang) => dispatch(setLanguage(lang)),
    toggleLanguage: () => dispatch(toggleLanguage()),
  };
};

// Sidebar hooks
export const useSidebar = () => {
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  return {
    ...sidebar,
    toggleSidebar: () => dispatch(toggleSidebar()),
    setSidebarOpen: (isOpen) => dispatch(setSidebarOpen(isOpen)),
    setMobileMode: (isMobile) => dispatch(setMobileMode(isMobile)),
    setSidebarWidth: (width) => dispatch(setSidebarWidth(width)),
  };
};

// User hooks
export const useUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return {
    ...user,
    setUser: (userData) => dispatch(setUser(userData)),
    clearUser: () => dispatch(clearUser()),
    updateUserProfile: (updates) => dispatch(updateUserProfile(updates)),
  };
};
