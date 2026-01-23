// external imports
import { memo, useMemo } from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';

// internal imports
import { useAuth, useSidebar, useLanguage, useResponsive } from '@hooks';
import { HEADER_HEIGHT, spacing } from '@constants';
import { DateTime, Icon } from '@components';
import UserInfo from './components/UserInfo';
import { borderRadius } from '../../theme/components';

// Static toolbar styles
const TOOLBAR_STYLES = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
};

// Static left content container styles
const LEFT_CONTENT_STYLES = {
  display: 'flex',
  alignItems: 'center',
};

// Menu button styles
const MENU_BUTTON_STYLES = {
  marginInlineEnd: spacing.values.md,
};

// Menu icon size
const MENU_ICON_SIZE = 24;

function Header() {
  const { userId, email, userName, profileImage, role } = useAuth();
  const { openSidebar, sidebarWidth } = useSidebar();
  const { isRTL } = useLanguage();
  const { isSmallScreen } = useResponsive();

  // Create user object for components that expect it
  const user = useMemo(
    () =>
      userId
        ? {
            id: userId,
            userName: userName,
            email: email,
            role: role,
            profileImage: profileImage,
            avatar: profileImage,
            userProfile: profileImage,
          }
        : null,
    [userId, userName, email, role, profileImage]
  );

  // Memoize AppBar styles - recalculates when viewport or sidebar width changes
  const appBarStyles = useMemo(
    () => ({
      top: 0,
      right: 0,
      left: isSmallScreen ? 0 : `${sidebarWidth}px`,
      width: isSmallScreen ? '100%' : `calc(100% - ${sidebarWidth}px)`,
      height: HEADER_HEIGHT,
      borderRadius: borderRadius.none,
      bgcolor: 'background.paper',
      color: 'text.primary',
      zIndex: (theme) => theme.zIndex.appBar,
      transition: (theme) =>
        `left ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}, width ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
    }),
    [isSmallScreen, sidebarWidth]
  );

  // Memoize DateTime alignment
  const dateTimeAlign = useMemo(() => (isRTL ? 'right' : 'left'), [isRTL]);

  return (
    <AppBar position="fixed" elevation={0} sx={appBarStyles}>
      <Toolbar sx={TOOLBAR_STYLES}>
        {/* Left Section: Menu Button (mobile/tablet) or DateTime (desktop) */}
        <Box sx={LEFT_CONTENT_STYLES}>
          {isSmallScreen ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={openSidebar}
              sx={MENU_BUTTON_STYLES}
            >
              <Icon name={isRTL ? 'menuRight' : 'menuLeft'} size={MENU_ICON_SIZE} />
            </IconButton>
          ) : (
            <DateTime align={dateTimeAlign} />
          )}
        </Box>

        {/* Right Section: User Info & Menu */}
        <UserInfo user={user} />
      </Toolbar>
    </AppBar>
  );
}

// Memoize component - only re-renders when dependencies change
export default memo(Header);
