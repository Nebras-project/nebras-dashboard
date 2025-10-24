import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { spacing } from '../theme';
import { borderRadius } from '../theme/components';
import { useSidebar } from '../hooks';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './constants';

/**
 * Main Layout Component
 * CSS Grid-based layout with:
 * - Sidebar: Spans all rows, adjusts width based on collapsed state
 * - Header: First row, takes remaining space
 * - Main Content: Second row, takes remaining space
 * Only shows layout for authenticated pages (not login page)
 */
function MainLayout({ children }) {
  const location = useLocation();
  const { collapsed } = useSidebar();

  // Don't show layout on login page
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;
  const contentWidth = `calc(100vw - ${sidebarWidth}px)`;

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

