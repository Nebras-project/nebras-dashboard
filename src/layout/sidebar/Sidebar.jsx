// internal imports
import { useResponsive } from '@hooks';
import SidebarHeader from './components/SidebarHeader';
import NavigationMenu from './components/NavigationMenu';
import DesktopSidebar from './components/DesktopSidebar';
import MobileDrawer from './components/MobileDrawer';

function Sidebar() {
  const { isSmallScreen } = useResponsive();

  // Sidebar content is shared between mobile and desktop views
  const sidebarContent = (
    <>
      <SidebarHeader />
      <NavigationMenu />
    </>
  );

  return isSmallScreen ? (
    <MobileDrawer>{sidebarContent}</MobileDrawer>
  ) : (
    <DesktopSidebar>{sidebarContent}</DesktopSidebar>
  );
}

export default Sidebar;
