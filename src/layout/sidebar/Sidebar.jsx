import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser, useReduxTheme, useLanguage, useColorScheme, useSidebar } from '../../hooks';
import { getNavigationItems } from './sidebarConfig';
import LogoHeader from './components/LogoHeader';
import NavigationMenu from './components/NavigationMenu';
import SidebarControls from './components/SidebarControls';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '../constants';

/**
 * Sidebar Component
 * Role-based navigation sidebar with theme controls
 * Different menu items based on user role
 * Supports collapsed mode to show only icons
 */
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, logout } = useUser();
  const { mode, toggleTheme } = useReduxTheme();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const { scheme, customColor, setCustomColor, setColorScheme } = useColorScheme();
  const { collapsed, toggleCollapsed } = useSidebar();

  // Get menu items for current role
  const menuItems = getNavigationItems(role);

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <Box 
      position="sticky"
      sx={{ 
        height: '100vh',
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'background.default',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: (theme) => theme.zIndex.drawer,
        width: `${sidebarWidth}px`,
        overflow: 'hidden',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Logo & Title */}
      <LogoHeader 
        mode={mode} 
        collapsed={collapsed}
        onToggleCollapse={toggleCollapsed}
      />

      {/* Navigation Menu */}
      <NavigationMenu 
        menuItems={menuItems}
        currentPath={location.pathname}
        onNavigate={handleNavigation}
        collapsed={collapsed}
      />

      {/* Bottom Controls */}
      <SidebarControls
        mode={mode}
        currentLanguage={currentLanguage}
        scheme={scheme}
        customColor={customColor}
        onColorChange={setCustomColor}
        onSchemeChange={setColorScheme}
        onLanguageToggle={toggleLanguage}
        onThemeToggle={toggleTheme}
        onLogout={logout}
        collapsed={collapsed}
      />
    </Box>
  );
}

export default Sidebar;

