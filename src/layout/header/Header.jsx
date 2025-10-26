// external imports
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';
import { useMemo } from 'react';

// internal imports
import { useUser, useSidebar, useLanguage } from '@hooks';
import { spacing } from '@theme';
import UserInfo from './components/UserInfo';

function Header() {
  const { user } = useUser();
  const { toggleSidebar, isMobile } = useSidebar();
  const { isRTL } = useLanguage();

  // Memoize menu icon based on direction
  const MenuIcon = useMemo(
    () => (isRTL ? HiMenuAlt3 : HiMenuAlt2),
    [isRTL]
  );

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
      <Toolbar sx={{ gap: spacing.md / 8 }}>
        {/* Hamburger Menu Button - Mobile Only */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{
              marginInlineEnd: spacing.md / 8,
            }}
          >
            <MenuIcon size={24} />
          </IconButton>
        )}
        
        {/* User Info */}
        <UserInfo user={user} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;

