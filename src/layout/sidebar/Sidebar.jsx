// internal imports
import { useSidebar } from '@hooks';
import SidebarHeader from './components/SidebarHeader';
import NavigationMenu from './components/NavigationMenu';
import DesktopSidebar from './components/DesktopSidebar';
import MobileDrawer from './components/MobileDrawer';

function Sidebar() {
  const { isMobile } = useSidebar();

  // Sidebar content is shared between mobile and desktop views
  const sidebarContent = (
    <>
      <SidebarHeader />
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
