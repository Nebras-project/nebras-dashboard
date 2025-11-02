// external imports
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { useSidebar } from '@hooks';

const getDesktopSidebarStyles = (sidebarWidth) => ({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.default',
  height: '100%',
  width: `${sidebarWidth}px`,
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: (theme) => theme.zIndex.drawer,
  overflow: 'auto',
  scrollbarGutter: 'stable', // Reserve space for scrollbar to prevent layout shift
  transition: (theme) =>
    `width ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
});

function DesktopSidebar({ children }) {
  const { sidebarWidth } = useSidebar();

  return <Box sx={getDesktopSidebarStyles(sidebarWidth)}>{children}</Box>;
}

DesktopSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DesktopSidebar;
