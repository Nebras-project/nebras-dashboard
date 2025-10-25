import { useSelector, useDispatch } from "react-redux";
import {
  openSidebar,
  closeSidebar,
  toggleSidebar,
  collapseSidebar,
  expandSidebar,
  toggleCollapsed,
  setMobileMode,
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
    openSidebar: () => dispatch(openSidebar()),
    closeSidebar: () => dispatch(closeSidebar()),
    toggleSidebar: () => dispatch(toggleSidebar()),
    collapseSidebar: () => dispatch(collapseSidebar()),
    expandSidebar: () => dispatch(expandSidebar()),
    toggleCollapsed: () => dispatch(toggleCollapsed()),
    setMobileMode: (isMobile) => dispatch(setMobileMode(isMobile)),
  };
};
