import { AppBar, Toolbar, IconButton } from '@mui/material';
import { HiMenuAlt2,HiMenuAlt3 } from 'react-icons/hi';
import { useUser, useSidebar, useLanguage } from '../../hooks';
import UserInfo from './components/UserInfo';

/**
 * Header Component
 * Unified header displaying user information
 * Shows hamburger menu button on mobile to toggle drawer
 */
function Header() {
  const { user } = useUser();
  const { toggleSidebar,isMobile } = useSidebar();
  const{isRTL} = useLanguage();
  return (
    <AppBar 
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        {/* Hamburger Menu Button - Mobile Only */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{
              marginInlineEnd: 2,
            }}
          >
            {isRTL ? <HiMenuAlt3 size={24} /> : <HiMenuAlt2 size={24} />}
          </IconButton>
        )}
        
        {/* User Info */}
        <UserInfo user={user} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;

