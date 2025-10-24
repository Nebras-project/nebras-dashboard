import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { spacing } from '../theme';
import { borderRadius } from '../theme/components';
import { useSidebar } from '../hooks';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './constants';

/**
 * Main Layout Component
 * Responsive layout with:
 * - Desktop: CSS Grid with persistent sidebar
 * - Mobile: Sidebar becomes a drawer (hamburger menu)
 * - Header: First row, takes remaining space
 * - Main Content: Second row, takes remaining space
 * Only shows layout for authenticated pages (not login page)
 */
function MainLayout({ children }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop')); // < 1024px = mobile/tablet
  const { collapsed, setMobileMode, setSidebarOpen } = useSidebar();

  // Update mobile mode and handle sidebar state when screen size changes
  useEffect(() => {
    setMobileMode(isMobile);
    setSidebarOpen(!isMobile); // Open on desktop, close on mobile
  }, [isMobile, setMobileMode, setSidebarOpen]);

  // Don't show layout on login page
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;
  const contentWidth = `calc(100vw - ${sidebarWidth}px)`;

  // Mobile layout - no persistent sidebar
  if (isMobile) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Sidebar as Drawer */}
        <Sidebar />

        {/* Header */}
        <Box sx={{ pb: theme => theme.spacing(spacing.sm) }}>
          <Header />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            bgcolor: 'background.paper',
            borderTopLeftRadius: `${borderRadius.sm}px`,
            borderTopRightRadius: `${borderRadius.sm}px`,
            p: theme => theme.spacing(spacing.xs),
            flex: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }

  // Desktop layout - persistent sidebar with grid
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        display: 'grid',
        gridTemplateColumns: `${sidebarWidth}px ${contentWidth}`,
        gridTemplateRows: 'auto 1fr',
        transition: 'grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Sidebar - Spans all rows */}
      <Box sx={{ gridRow: '1 / 3', gridColumn: '1' }}>
        <Sidebar />
      </Box>

      {/* Header - First row, second column */}
      <Box sx={{ gridRow: '1', gridColumn: '2', pb: theme => theme.spacing(spacing.sm)}}>
        <Header />
      </Box>

      {/* Main Content - Second row, second column */}
      <Box
        component="main"
        sx={{
          bgcolor: 'background.paper',
          borderTopLeftRadius: `${borderRadius.sm}px`,
          gridRow: '2',
          gridColumn: '2',
          p: theme => theme.spacing(spacing.xs),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;

