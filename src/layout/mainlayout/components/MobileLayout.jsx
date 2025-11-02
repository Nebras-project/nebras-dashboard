// external imports
import { memo } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Header, Sidebar } from '@layout';
import { CONTAINER_BASE_STYLES, MAIN_CONTENT_BASE_STYLES } from '@constants';

// Extract mobile container styles to avoid inline object creation
const MOBILE_CONTAINER_STYLES = {
  ...CONTAINER_BASE_STYLES,
  display: 'flex',
  flexDirection: 'column',
};

function MobileLayout({ children }) {
  return (
    <Box sx={MOBILE_CONTAINER_STYLES}>
      {/* Fixed Header - Stays at top on scroll */}
      <Header />

      {/* Sidebar Drawer - Overlays content when open */}
      <Sidebar />

      {/* Main Content Area - Scrollable content below header */}
      <Box component="main" sx={MAIN_CONTENT_BASE_STYLES}>
        {children}
      </Box>
    </Box>
  );
}

MobileLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

// Memoize to prevent unnecessary re-renders when parent re-renders
// Only re-renders if children prop changes
export default memo(MobileLayout);
