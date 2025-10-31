// external imports
import { AppBar, Toolbar, IconButton, Box, Typography } from '@mui/material';
import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';
import { useMemo } from 'react';

// internal imports
import { useUser, useSidebar, useLanguage } from '@hooks';
import { HEADER_HEIGHT, spacing } from '@constants';
import { DateTime } from '@components';
import UserInfo from './components/UserInfo';

function Header() {
  const { user } = useUser();
  const { openSidebar, isMobile, sidebarWidth } = useSidebar();
  const { isRTL } = useLanguage();

  // Memoize menu icon based on direction
  const MenuIcon = useMemo(() => (isRTL ? HiMenuAlt3 : HiMenuAlt2), [isRTL]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        right: 0,
        left: isMobile ? 0 : `${sidebarWidth}px`,
        width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
        height: HEADER_HEIGHT,
        bgcolor: 'background.default',
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.appBar,
        transition: (theme) =>
          `left ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}, width ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {/* Left Side: Hamburger Menu Button - Mobile Only */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={openSidebar}
              sx={{
                marginInlineEnd: spacing.values.md,
              }}
            >
              <MenuIcon size={24} />
            </IconButton>
          )}

          {/* DateTime - Show on desktop only */}
          {!isMobile && <DateTime align={isRTL ? 'right' : 'left'} />}
        </Box>

        {/* Right Side: User Info */}
        <UserInfo user={user} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
