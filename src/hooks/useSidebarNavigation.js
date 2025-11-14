// external imports
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// internal imports
import { useSidebar } from './useSidebar';
import useResponsive from './useResponsive';

export function useSidebarNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { closeSidebar } = useSidebar();
  const { isSmallScreen } = useResponsive();

  // Handle navigation - checks current path and closes drawer on mobile
  const handleNavigation = useCallback(
    (path) => {
      // Only navigate if the path is different from current location
      const isDifferentPath = path !== location.pathname;
      if (isDifferentPath) {
        navigate(path);
      }

      // Close sidebar on mobile once navigation happens
      if (isSmallScreen && isDifferentPath) {
        closeSidebar();
      }
    },
    [navigate, location.pathname, isSmallScreen, closeSidebar]
  );

  return { handleNavigation };
}
