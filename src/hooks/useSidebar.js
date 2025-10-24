import { useSelector, useDispatch } from "react-redux";
import {
  toggleSidebar,
  setSidebarOpen,
  setMobileMode,
  setSidebarWidth,
  toggleCollapsed,
  setCollapsed,
} from "../store/slices/sidebarSlice";

/**
 * Custom hook to access and manage sidebar state from Redux
 * @returns {Object} Sidebar state and action creators
 */
export const useSidebar = () => {
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  return {
    ...sidebar,
    toggleSidebar: () => dispatch(toggleSidebar()),
    setSidebarOpen: (isOpen) => dispatch(setSidebarOpen(isOpen)),
    setMobileMode: (isMobile) => dispatch(setMobileMode(isMobile)),
    setSidebarWidth: (width) => dispatch(setSidebarWidth(width)),
    toggleCollapsed: () => dispatch(toggleCollapsed()),
    setCollapsed: (collapsed) => dispatch(setCollapsed(collapsed)),
  };
};
