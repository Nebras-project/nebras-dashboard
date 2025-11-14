// external imports
import { useEffect, useRef } from 'react';

// internal imports
import { useSidebar } from './useSidebar';
import useResponsive from './useResponsive';

export function useResponsiveSidebar() {
  const { openSidebar, closeSidebar, collapsed, expandSidebar } = useSidebar();
  const { isSmallScreen } = useResponsive();
  const isFirstRender = useRef(true);
  const prevIsSmallScreen = useRef(isSmallScreen);

  // Update mobile mode and sidebar state ONLY when crossing mobile/desktop breakpoint
  useEffect(() => {
    // Disable collapsed mode on mobile
    if (isSmallScreen && collapsed) {
      expandSidebar();
    }

    // Handle first render - just set mobile mode without changing sidebar state
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevIsSmallScreen.current = isSmallScreen;
      return;
    }

    // Handle subsequent renders - only when actually crossing the breakpoint
    if (prevIsSmallScreen.current !== isSmallScreen) {
      isSmallScreen ? closeSidebar() : openSidebar(); // Open on small screens, close on larger ones
      prevIsSmallScreen.current = isSmallScreen;
    }
  }, [isSmallScreen, openSidebar, closeSidebar, expandSidebar, collapsed]);
}
