// external imports
import { memo, useMemo } from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';

// internal imports
import { useUser, useSidebar, useLanguage } from '@hooks';
import { HEADER_HEIGHT, spacing } from '@constants';
import { DateTime, Icon } from '@components';
import UserInfo from './components/UserInfo';

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
  const { user } = useUser();
  const { openSidebar, isMobile, sidebarWidth } = useSidebar();
  const { isRTL } = useLanguage();

  // Memoize AppBar styles - recalculates when mobile state or sidebar width changes
  const appBarStyles = useMemo(
    () => ({
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
    }),
    [isMobile, sidebarWidth]
  );

  // Memoize DateTime alignment
  const dateTimeAlign = useMemo(() => (isRTL ? 'right' : 'left'), [isRTL]);

  return (
    <AppBar position="fixed" elevation={0} sx={appBarStyles}>
      <Toolbar sx={TOOLBAR_STYLES}>
        {/* Left Section: Menu Button (mobile) or DateTime (desktop) */}
        <Box sx={LEFT_CONTENT_STYLES}>
          {isMobile ? (
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
