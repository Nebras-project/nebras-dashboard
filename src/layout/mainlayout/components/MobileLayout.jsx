// external imports
import { Box } from "@mui/material";
import PropTypes from "prop-types";

// internal imports
import { Header, Sidebar } from "@layout";
import {
  CONTAINER_BASE_STYLES,
  MAIN_CONTENT_BASE_STYLES,
} from "@constants";

/**
 * Mobile Layout Component
 * Uses flexbox layout with drawer overlay sidebar
 * Optimized for screens < 1024px (mobile/tablet)
 */

function MobileLayout({ children }) {
  return (
    <>
      {/* Fixed Header - Outside main layout */}
      <Header />
      
      <Box
        sx={{
          ...CONTAINER_BASE_STYLES,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Sidebar as drawer overlay */}
        <Sidebar />

        {/* Main Content */}
        <Box 
          component="main" 
          sx={{
            ...MAIN_CONTENT_BASE_STYLES,
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

MobileLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MobileLayout;

