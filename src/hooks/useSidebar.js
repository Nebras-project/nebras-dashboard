// external imports
import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// internal imports
import {
  openSidebar,
  closeSidebar,
  toggleSidebar,
  collapseSidebar,
  expandSidebar,
  toggleCollapsed,
  setMobileMode,
} from '@store/slices';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '@constants';

export const useSidebar = () => {
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  // Calculate sidebar width based on collapsed state
  const sidebarWidth = useMemo(
    () => (sidebar.collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH),
    [sidebar.collapsed]
  );

  // Memoize action creators to prevent unnecessary re-renders
  const openSidebarAction = useCallback(() => dispatch(openSidebar()), [dispatch]);
  const closeSidebarAction = useCallback(() => dispatch(closeSidebar()), [dispatch]);
  const toggleSidebarAction = useCallback(() => dispatch(toggleSidebar()), [dispatch]);
  const collapseSidebarAction = useCallback(() => dispatch(collapseSidebar()), [dispatch]);
  const expandSidebarAction = useCallback(() => dispatch(expandSidebar()), [dispatch]);
  const toggleCollapsedAction = useCallback(() => dispatch(toggleCollapsed()), [dispatch]);
  const setMobileModeAction = useCallback(
    (isMobile) => dispatch(setMobileMode(isMobile)),
    [dispatch]
  );

  return useMemo(
    () => ({
      ...sidebar,
      sidebarWidth,
      openSidebar: openSidebarAction,
      closeSidebar: closeSidebarAction,
      toggleSidebar: toggleSidebarAction,
      collapseSidebar: collapseSidebarAction,
      expandSidebar: expandSidebarAction,
      toggleCollapsed: toggleCollapsedAction,
      setMobileMode: setMobileModeAction,
    }),
    [
      sidebar,
      sidebarWidth,
      openSidebarAction,
      closeSidebarAction,
      toggleSidebarAction,
      collapseSidebarAction,
      expandSidebarAction,
      toggleCollapsedAction,
      setMobileModeAction,
    ]
  );
};
