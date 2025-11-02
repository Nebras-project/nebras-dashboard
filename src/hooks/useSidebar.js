// external imports
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

// internal imports
import {
  openSidebar,
  closeSidebar,
  toggleSidebar,
  collapseSidebar,
  expandSidebar,
  toggleCollapsed,
  setMobileMode,
} from "@store/slices";
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "@constants";

export const useSidebar = () => {
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  // Calculate sidebar width based on collapsed state
  const sidebarWidth = useMemo(
    () => (sidebar.collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH),
    [sidebar.collapsed]
  );

  return {
    ...sidebar,
    sidebarWidth,
    openSidebar: () => dispatch(openSidebar()),
    closeSidebar: () => dispatch(closeSidebar()),
    toggleSidebar: () => dispatch(toggleSidebar()),
    collapseSidebar: () => dispatch(collapseSidebar()),
    expandSidebar: () => dispatch(expandSidebar()),
    toggleCollapsed: () => dispatch(toggleCollapsed()),
    setMobileMode: (isMobile) => dispatch(setMobileMode(isMobile)),
  };
};
