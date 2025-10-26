import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { spacing } from '../theme';
import { borderRadius } from '../theme/components';
import { useSidebar, useResponsiveSidebar } from '../hooks';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './constants';
import { isPublicPage } from '../utils/layoutHelpers';

// Common container styles
const containerBaseStyles = {
  minHeight: '100vh',
  bgcolor: 'background.default',
};

function MainLayout({ children }) {

  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop')); // < 1024px = mobile/tablet
  const { collapsed } = useSidebar();

  // Handle responsive sidebar behavior
  useResponsiveSidebar(isMobile);

  // Memoize layout calculations
  const sidebarWidth = useMemo(
    () => (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH),
    [collapsed]
  );

  // Don't show layout on public pages (login, 404, etc.)
  if (isPublicPage(location.pathname)) {
    return <>{children}</>;
  }

  // Mobile layout - no persistent sidebar
  if (isMobile) {
    return (
      <Box sx={{ ...containerBaseStyles, display: 'flex', flexDirection: 'column' }}>

      {/* // sidebar as drawer overlay */}
        <Sidebar />
        
        <Box sx={{ pb: theme => theme.spacing(spacing.sm) }}>
          <Header />
        </Box>

        <Box
          component="main"
          sx={{
            bgcolor: 'background.paper',
            flex: 1,
          }}
        >
          {children}
        </Box>
        
      </Box>
    );
  }

  // Desktop layout - persistent sidebar with grid
  const contentWidth = `calc(100vw - ${sidebarWidth}px)`;

  return (
    <Box
      sx={{
        ...containerBaseStyles,
        display: 'grid',
        gridTemplateColumns: `${sidebarWidth}px ${contentWidth}`,
        gridTemplateRows: 'auto 1fr',
        transition: theme => 
          `grid-template-columns ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
      }}
    >
      <Box sx={{ gridRow: '1 / 3', gridColumn: '1' }}>
        <Sidebar />
      </Box>

      <Box sx={{ gridRow: '1', gridColumn: '2', pb: theme => theme.spacing(spacing.sm) }}>
        <Header />
      </Box>

      <Box
        component="main"
        sx={{
          bgcolor: 'background.paper',
          borderTopLeftRadius: `${borderRadius.sm}px`,
          gridRow: '2',
          gridColumn: '2',
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