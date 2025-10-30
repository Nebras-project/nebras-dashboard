import PropTypes from "prop-types";
import { Drawer } from "@mui/material";
import {useSidebar} from '@hooks';

// Mobile: Render as Drawer
const MobileDrawer = ({children}) => {

    const {isOpen, closeSidebar, sidebarWidth} = useSidebar();
    
    return  (
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
            width: sidebarWidth,
            boxSizing: 'border-box',
            backgroundImage: 'none',
            border: 'none',
            scrollbarGutter: 'stable', // Reserve space for scrollbar to prevent layout shift

          },
        }}
      >
        {children}
      </Drawer>
)};

MobileDrawer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MobileDrawer;