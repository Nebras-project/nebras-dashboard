import { useEffect, useRef } from "react";
import { useSidebar } from "./useSidebar";

/**
 * Custom hook to handle responsive sidebar behavior
 *
 * Manages sidebar state when crossing mobile/desktop breakpoint:
 * - First render: Sets mobile mode without changing sidebar state
 * - Subsequent renders: Opens sidebar on desktop, closes on mobile
 *
 * @param {boolean} isMobile - Whether the current viewport is mobile size
 */
export function useResponsiveSidebar(isMobile) {
  const { setMobileMode, openSidebar, closeSidebar } = useSidebar();
  const isFirstRender = useRef(true);
  const prevIsMobile = useRef(isMobile);

  // Update mobile mode and sidebar state ONLY when crossing mobile/desktop breakpoint
  useEffect(() => {
    // Handle first render - just set mobile mode without changing sidebar state
    if (isFirstRender.current) {
      setMobileMode(isMobile);
      isFirstRender.current = false;
      prevIsMobile.current = isMobile;
      return;
    }

    // Handle subsequent renders - only when actually crossing the breakpoint
    if (prevIsMobile.current !== isMobile) {
      setMobileMode(isMobile);
      isMobile ? closeSidebar() : openSidebar(); // Open on desktop, close on mobile
      prevIsMobile.current = isMobile;
    }
  }, [isMobile, setMobileMode, openSidebar, closeSidebar]);
}
