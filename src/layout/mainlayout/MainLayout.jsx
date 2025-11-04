// external imports
import { useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// internal imports
import { MobileLayout, DesktopLayout } from './components';
import { useSidebar, useResponsiveSidebar } from '@hooks';
import { isPublicPage } from '@utils';

function MainLayout({ children }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const { sidebarWidth } = useSidebar();

  // Handle responsive sidebar behavior
  useResponsiveSidebar(isMobile);

  // Don't show layout on public pages (login, 404, etc.)
  if (isPublicPage(location.pathname)) {
    return <>{children}</>;
  }

  // Render appropriate layout based on screen size
  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout sidebarWidth={sidebarWidth}>{children}</DesktopLayout>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;


