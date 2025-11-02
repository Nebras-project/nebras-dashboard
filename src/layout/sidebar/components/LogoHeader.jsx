// external imports
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { useMemo, memo } from 'react';

// internal imports
import { useTranslation, useLanguage, useSidebar } from '@hooks';
import { Logo, Icon } from '@components';
import { fontWeights } from '@theme';
import {
  LOGO_LETTER_SPACING,
  COLLAPSE_ICON_SIZE,
  CLOSE_ICON_SIZE,
  CLOSE_BUTTON_SIZE,
  padding,
  gap,
} from '@constants';

const getContainerStyles = (collapsed) => ({
  ...padding.x.md,
  ...padding.y.md,
  display: 'flex',
  flexDirection: collapsed ? 'column' : 'row',
  alignItems: 'center',
  ...(collapsed ? gap.md : gap.sm),
});

const getTypographyStyles = () => ({
  fontWeight: fontWeights.bold,
  whiteSpace: 'nowrap',
  letterSpacing: LOGO_LETTER_SPACING,
});

const getCloseButtonStyles = (collapsed) => ({
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
});

const getCollapseButtonStyles = (collapsed) => ({
  ml: collapsed ? 0 : 'auto',
});

const getCollapseIcon = (isRTL, collapsed) => {
  if (isRTL) {
    return collapsed ? (
      <Icon name="panelLeft" size={COLLAPSE_ICON_SIZE} />
    ) : (
      <Icon name="panelRight" size={COLLAPSE_ICON_SIZE} />
    );
  }
  return collapsed ? (
    <Icon name="panelRight" size={COLLAPSE_ICON_SIZE} />
  ) : (
    <Icon name="panelLeft" size={COLLAPSE_ICON_SIZE} />
  );
};

const LogoHeader = memo(function LogoHeader() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { collapsed, toggleCollapsed, isMobile, closeSidebar } = useSidebar();

  const collapseIcon = useMemo(() => getCollapseIcon(isRTL, collapsed), [isRTL, collapsed]);

  return (
    <Box sx={getContainerStyles(collapsed)}>
      <Logo />
      {!collapsed && (
        <Typography variant="h6" sx={getTypographyStyles()}>
          {t('common.brandName')}
        </Typography>
      )}

      {isMobile ? (
        <IconButton size="small" onClick={closeSidebar} sx={getCloseButtonStyles(collapsed)}>
          <Icon name="closeAlt" size={CLOSE_ICON_SIZE} />
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
            sx={getCollapseButtonStyles(collapsed)}
          >
            {collapseIcon}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
});

export default LogoHeader;
