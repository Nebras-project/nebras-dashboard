// external imports
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// internal imports
import { MobileLayout, DesktopLayout } from './components';
import { useSidebar, useResponsiveSidebar, useResponsive } from '@hooks';
import { isPublicPage } from '@utils';

function MainLayout({ children }) {
  const location = useLocation();
  const { sidebarWidth } = useSidebar();
  const { isSmallScreen } = useResponsive();

  // Handle responsive sidebar behavior
  useResponsiveSidebar();

  // Don't show layout on public pages (login, 404, etc.)
  if (isPublicPage(location.pathname)) {
    return <>{children}</>;
  }

  // Render appropriate layout based on screen size
  return isSmallScreen ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout sidebarWidth={sidebarWidth}>{children}</DesktopLayout>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
// external imports
