// external imports
import { Box, Typography, IconButton, Tooltip, Stack } from '@mui/material';
import { useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';

// internal imports
import { useTranslation, useLanguage, useSidebar, useResponsive } from '@hooks';
import { margin } from '@constants';
import { Logo, Icon, CloseButton } from '@components';
import { fontWeights } from '@theme';
import { padding, gap } from '@constants';
import { NAVIGATION_PATHS } from '@constants/navigationPaths';

// Sidebar Header constants (only used in this component)
const LOGO_LETTER_SPACING = '0.1rem';
const COLLAPSE_ICON_SIZE = 24;
const CLOSE_ICON_SIZE = 20;

const getContainerStyles = (collapsed) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: collapsed ? 'column' : 'row',
  position: 'relative',
  ...padding.x.md,
  ...padding.y.md,
  ...(collapsed ? gap.md : gap.sm),
});

const getTypographyStyles = () => ({
  fontWeight: fontWeights.bold,
  whiteSpace: 'nowrap',
  letterSpacing: LOGO_LETTER_SPACING,
});

const getCollapseButtonStyles = (collapsed) => ({
  ml: collapsed ? 0 : 'auto',
  cursor: 'ew-resize',
});

const getLogoStyles = () => ({
  cursor: 'pointer',
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

const SidebarHeader = memo(function SidebarHeader() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { collapsed, toggleCollapsed, closeSidebar } = useSidebar();
  const { isSmallScreen } = useResponsive();
  const navigate = useNavigate();

  const collapseIcon = useMemo(() => getCollapseIcon(isRTL, collapsed), [isRTL, collapsed]);

  const handleLogoClick = () => {
    navigate(NAVIGATION_PATHS.DASHBOARD);
  };

  return (
    <Box sx={getContainerStyles(collapsed)}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        onClick={handleLogoClick}
        sx={getLogoStyles()}
      >
        <Logo />
        {!collapsed && (
          <Typography variant="h6" sx={getTypographyStyles()}>
            {t('common.brandName')}
          </Typography>
        )}
      </Stack>

      {isSmallScreen ? (
        <CloseButton
          onClick={closeSidebar}
          size="small"
          iconName="closeAlt"
          iconSize={CLOSE_ICON_SIZE}
          sx={{ ...margin.left.auto }}
          showTooltip
        />
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

export default SidebarHeader;
