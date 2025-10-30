// external imports
import { useMemo } from 'react';

// internal imports
import { useSidebar } from '@hooks';
import LogoHeader from './components/LogoHeader';
import NavigationMenu from './components/NavigationMenu';
import DesktopSidebar from './components/DesktopSidebar';
import MobileDrawer from './components/MobileDrawer';


/**
 * Sidebar Component
 *
 * Responsive navigation sidebar with role-based menu items.
 * Container component that coordinates child components - all data is managed by child components via hooks.
 *
 * Features:
 * - Role-based navigation (different menus for different user roles)
 * - Collapsible mode (desktop only - shows icons only)
 * - Mobile: Drawer (hamburger menu)
 * - Desktop: Persistent sidebar
 * - Settings accessible via dedicated settings page
 *
 * @returns {JSX.Element} Sidebar component (Drawer on mobile, Box on desktop)
 */
function Sidebar() {
  const { isMobile } = useSidebar();

  // Memoize sidebar content to avoid re-creating JSX on every render
  const sidebarContent = useMemo(
    () => (
      <>
        <LogoHeader />
        <NavigationMenu />
      </>
    ),
    [] // Components manage their own state, so no dependencies needed
  );


  return  isMobile ? 
        (<MobileDrawer>{sidebarContent}</MobileDrawer>)
           :
        (<DesktopSidebar>{sidebarContent}</DesktopSidebar>)
  
}

export default Sidebar;