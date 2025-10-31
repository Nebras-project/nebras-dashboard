// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Header, Sidebar } from '@layout';
import { borderRadius } from '@theme';
import { CONTAINER_BASE_STYLES, MAIN_CONTENT_BASE_STYLES } from '@constants';

/**
 * Desktop Layout Component
 * Uses CSS Grid layout with persistent sidebar
 * Optimized for screens >= 1024px (desktop)
 */
function DesktopLayout({ children, sidebarWidth }) {
  const contentWidth = `calc(100vw - ${sidebarWidth}px)`;

  return (
    <Box
      sx={{
        ...CONTAINER_BASE_STYLES,
        display: 'grid',
        gridTemplateColumns: `${sidebarWidth}px ${contentWidth}`,
        gridTemplateRows: 'auto 1fr',
        gridTemplateAreas: `
          "sidebar header"
          "sidebar content"
        `,
        transition: (theme) =>
          `grid-template-columns ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
      }}
    >
      {/* Sidebar - spans both rows */}
      <Box sx={{ gridArea: 'sidebar' }}>
        <Sidebar />
      </Box>

      {/* Header - Fixed position */}
      <Box sx={{ gridArea: 'header' }}>
        <Header />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          gridArea: 'content',
          ...MAIN_CONTENT_BASE_STYLES,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

DesktopLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebarWidth: PropTypes.number.isRequired,
};

export default DesktopLayout;
