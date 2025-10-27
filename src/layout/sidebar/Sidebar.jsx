// external imports
import { Box, Drawer } from '@mui/material';
import { useEffect, useMemo } from 'react';

// internal imports
import { useSidebar } from '@hooks';
import LogoHeader from './components/LogoHeader';
import NavigationMenu from './components/NavigationMenu';
import SidebarSettings from './components/SidebarSettings';
import { SIDEBAR_WIDTH } from '@constants';

// Common container styles
const containerBaseStyles = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.default',
};

/**
 * Sidebar Component
 *
 * Responsive navigation sidebar with role-based menu items and theme controls.
 * Container component that coordinates child components - all data is managed by child components via hooks.
 *
 * Features:
 * - Role-based navigation (different menus for different user roles)
 * - Collapsible mode (desktop only - shows icons only)
 * - Mobile: Drawer (hamburger menu)
 * - Desktop: Persistent sidebar
 * - Theme controls (color scheme, language, dark/light mode)
 *
 * @returns {JSX.Element} Sidebar component (Drawer on mobile, Box on desktop)
 */
function Sidebar() {
  const { collapsed, isMobile, isOpen, closeSidebar, expandSidebar, sidebarWidth } = useSidebar();

  // Disable collapsed mode on mobile
  useEffect(() => {
    if (isMobile && collapsed) {
      expandSidebar();
    }
  }, [isMobile, collapsed, expandSidebar]);

  // Memoize sidebar content to avoid re-creating JSX on every render
  const sidebarContent = useMemo(
    () => (
      <>
        <LogoHeader />
        <NavigationMenu />
        <SidebarSettings />
      </>
    ),
    [] // Components manage their own state, so no dependencies needed
  );

  // Mobile: Render as Drawer
  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={closeSidebar}
        elevation={0}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { mobile: 'block', tablet: 'block', desktop: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            backgroundImage: 'none',
            border: 'none',
            scrollbarGutter: 'stable', // Reserve space for scrollbar to prevent layout shift
            ...containerBaseStyles,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  // Desktop: Render as persistent sidebar
  return (
    <Box
      position="fixed"
      sx={{
        ...containerBaseStyles,
        height: '100vh',
        width: `${sidebarWidth}px`,
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: (theme) => theme.zIndex.drawer,
        overflow: 'auto',
        scrollbarGutter: 'stable', // Reserve space for scrollbar to prevent layout shift
        transition: (theme) =>
          `width ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
      }}
    >
      {sidebarContent}
    </Box>
  );
}

export default Sidebar;