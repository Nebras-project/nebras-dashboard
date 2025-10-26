import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "./useSidebar";

/**
 * useSidebarNavigation Hook
 * Provides a consistent navigation handler that's sidebar-aware
 * - Checks current path to avoid unnecessary navigation
 * - Navigates to the specified path only if different
 * - Automatically closes sidebar on mobile devices
 * - Prevents duplicate navigation logic across components
 */
export function useSidebarNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, closeSidebar } = useSidebar();

  // Handle navigation - checks current path and closes drawer on mobile
  const handleNavigation = useCallback(
    (path) => {
      // Only navigate if the path is different from current location
      if (location.pathname !== path) {
        navigate(path);
      }

      // Always close sidebar on mobile, even if already on the page
      if (isMobile) {
        closeSidebar();
      }
    },
    [navigate, location.pathname, isMobile, closeSidebar]
  );

  return { handleNavigation };
}
