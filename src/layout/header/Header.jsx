// external imports
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';
import { useMemo } from 'react';

// internal imports
import { useUser, useSidebar, useLanguage } from '@hooks';
import { spacing } from '@theme';
import UserInfo from './components/UserInfo';
import { HEADER_HEIGHT } from '../../constants/layout';

function Header() {
  const { user } = useUser();
  const { openSidebar, isMobile } = useSidebar();
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
        height: HEADER_HEIGHT,
        bgcolor: 'background.default',
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.appBar,
        transition: (theme) =>
          `left ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}, width ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
      }}
    >
      <Toolbar sx={{ gap: spacing.md / 8 }}>
        {/* Hamburger Menu Button - Mobile Only */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={openSidebar}
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

