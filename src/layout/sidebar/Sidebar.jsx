// internal imports
import { useSidebar } from '@hooks';
import LogoHeader from './components/LogoHeader';
import NavigationMenu from './components/NavigationMenu';
import DesktopSidebar from './components/DesktopSidebar';
import MobileDrawer from './components/MobileDrawer';

function Sidebar() {
  const { isMobile } = useSidebar();

  // Sidebar content is shared between mobile and desktop views
  const sidebarContent = (
    <>
      <LogoHeader />
      <NavigationMenu />
    </>
  );

  return isMobile ? (
    <MobileDrawer>{sidebarContent}</MobileDrawer>
  ) : (
    <DesktopSidebar>{sidebarContent}</DesktopSidebar>
  );
}

export default Sidebar;
