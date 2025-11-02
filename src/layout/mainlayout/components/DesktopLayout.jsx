// external imports
import { memo, useMemo } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Header, Sidebar } from '@layout';
import { CONTAINER_BASE_STYLES, MAIN_CONTENT_BASE_STYLES } from '@constants';

// Extract static grid area styles
const SIDEBAR_AREA_STYLES = { gridArea: 'sidebar' };
const HEADER_AREA_STYLES = { gridArea: 'header' };
const MAIN_CONTENT_AREA_STYLES = {
  gridArea: 'content',
  ...MAIN_CONTENT_BASE_STYLES,
};

// Static grid template areas (doesn't change)
const GRID_TEMPLATE_AREAS = `
  "sidebar header"
  "sidebar content"
`;

function DesktopLayout({ children, sidebarWidth }) {
  // Memoize grid container styles - only recalculate when sidebarWidth changes
  const gridContainerStyles = useMemo(
    () => ({
      ...CONTAINER_BASE_STYLES,
      display: 'grid',
      gridTemplateColumns: `${sidebarWidth}px calc(100vw - ${sidebarWidth}px)`,
      gridTemplateRows: 'auto 1fr',
      gridTemplateAreas: GRID_TEMPLATE_AREAS,
      transition: (theme) =>
        `grid-template-columns ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
    }),
    [sidebarWidth]
  );

  return (
    <Box sx={gridContainerStyles}>
      {/* Sidebar - Persistent left panel, spans both rows */}
      <Box sx={SIDEBAR_AREA_STYLES}>
        <Sidebar />
      </Box>

      {/* Header - Top bar spanning content area */}
      <Box sx={HEADER_AREA_STYLES}>
        <Header />
      </Box>

      {/* Main Content - Scrollable content area below header */}
      <Box component="main" sx={MAIN_CONTENT_AREA_STYLES}>
        {children}
      </Box>
    </Box>
  );
}

DesktopLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebarWidth: PropTypes.number.isRequired,
};

// Memoize component - only re-render when children or sidebarWidth changes
export default memo(DesktopLayout);
