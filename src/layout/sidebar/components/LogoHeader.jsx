// external imports
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { LuPanelRightClose, LuPanelLeftClose } from 'react-icons/lu';
import { IoClose } from "react-icons/io5";
import { useMemo } from 'react';

// internal imports
import NebrasLogoLight from '@data/images/Nebras Logo Light.svg';
import NebrasLogoDark from '@data/images/Nebras Logo Dark.svg';
import { LOGO_HEIGHT, LOGO_LETTER_SPACING } from '@constants';
import { fontWeights, spacing } from '@theme';
import { useTranslation, useLanguage, useSidebar, useReduxTheme } from '@hooks';

// Icon sizes
const COLLAPSE_ICON_SIZE = 24;
const CLOSE_ICON_SIZE = 20;
const CLOSE_BUTTON_SIZE = 32;

/**
 * LogoHeader Component
 * Displays the Nebras logo and title in the sidebar with collapse toggle
 * Self-contained component that manages its own state via hooks
 */
function LogoHeader() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { mode } = useReduxTheme();
  const { collapsed, toggleCollapsed, isMobile, closeSidebar } = useSidebar();

  // Memoize logo source based on theme mode
  const logoSrc = useMemo(
    () => (mode === 'light' ? NebrasLogoDark : NebrasLogoLight),
    [mode]
  );

  // Memoize collapse icon based on collapsed state and direction
  const collapseIcon = useMemo(() => {
    if (isRTL) {
      // RTL mode (Arabic): icons are reversed
      return collapsed ? (
        <LuPanelLeftClose size={COLLAPSE_ICON_SIZE} />
      ) : (
        <LuPanelRightClose size={COLLAPSE_ICON_SIZE} />
      );
    }
    // LTR mode (English): normal icons
    return collapsed ? (
      <LuPanelRightClose size={COLLAPSE_ICON_SIZE} />
    ) : (
      <LuPanelLeftClose size={COLLAPSE_ICON_SIZE} />
    );
  }, [isRTL, collapsed]);

  return (
    <Box
      sx={{
        px: spacing.md / 8, // 2 units (16px)
        py: spacing.md / 8, // 2 units (16px)
        display: 'flex',
        flexDirection: collapsed ? 'column' : 'row',
        alignItems: 'center',
        gap: collapsed ? 2 : (spacing.xs + spacing.sm) / 8, // 1.5 units (12px)
      }}
    >
      <Box
        component="img"
        src={logoSrc}
        alt="Nebras Logo"
        sx={{
          height: LOGO_HEIGHT,
          flexShrink: 0,
        }}
      />
      {!collapsed && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: fontWeights.bold,
            whiteSpace: 'nowrap',
            letterSpacing: LOGO_LETTER_SPACING,
          }}
        >
          {t('common.brandName')}
        </Typography>
      )}

      {/* Toggle Button - Close on mobile, Collapse on desktop */}
      {isMobile ? (
        <IconButton
          size="small"
          onClick={closeSidebar}
          sx={{
            ml: collapsed ? 0 : 'auto',
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            width: CLOSE_BUTTON_SIZE,
            height: CLOSE_BUTTON_SIZE,
            '&:hover': {
              bgcolor: 'action.hover',
            },
            transition: (theme) =>
              `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
          }}
        >
          <IoClose size={CLOSE_ICON_SIZE} />
        </IconButton>
      ) : (
        <Tooltip
          title={collapsed ? t('common.expand') : t('common.collapse')}
          placement="right"
          arrow
        >
          <IconButton
            onClick={toggleCollapsed}
            size="small"
            sx={{
              ml: collapsed ? 0 : 'auto',
            }}
          >
            {collapseIcon}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default LogoHeader;