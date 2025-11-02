// external imports
import PropTypes from 'prop-types';
import { Drawer } from '@mui/material';

// internal imports
import { useSidebar } from '@hooks';

// Drawer display breakpoints - only show on mobile and tablet
const DRAWER_DISPLAY_BREAKPOINTS = {
  mobile: 'block',
  tablet: 'block',
  desktop: 'none',
};

const getDrawerStyles = (sidebarWidth) => ({
  display: DRAWER_DISPLAY_BREAKPOINTS,
  '& .MuiDrawer-paper': {
    width: sidebarWidth,
    boxSizing: 'border-box',
    backgroundImage: 'none',
    border: 'none',
    scrollbarGutter: 'stable', // Reserve space for scrollbar to prevent layout shift
  },
});

function MobileDrawer({ children }) {
  const { isOpen, closeSidebar, sidebarWidth } = useSidebar();

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={closeSidebar}
      elevation={0}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={getDrawerStyles(sidebarWidth)}
    >
      {children}
    </Drawer>
  );
}

MobileDrawer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MobileDrawer;
