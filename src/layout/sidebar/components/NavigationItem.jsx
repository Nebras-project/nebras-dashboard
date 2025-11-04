// external imports
import { ListItem, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { memo } from 'react';

// internal imports
import { fontWeights } from '@theme';
import { margin, padding } from '@constants';
import { ListButton } from '@components';
import { useSidebar, useSidebarNavigation } from '@hooks';
import { getNavigationHoverStyles } from '@constants';

const getListItemStyles = (isSettings) => ({
  width: '100%',
  ...margin.bottom.xs,
  ...(isSettings && {
    ...margin.top.auto,
    ...margin.bottom.md,
    ...padding.top.sm,
  }),
});

const getIconStyles = (isActive) => ({
  color: isActive ? 'inherit' : 'text.secondary',
});

const getTextProps = (isActive) => ({
  fontWeight: isActive ? fontWeights.semiBold : fontWeights.regular,
});

const NavigationItem = memo(function NavigationItem({ path, icon, text, isSettings = false }) {
  const location = useLocation();
  const theme = useTheme();
  const { collapsed } = useSidebar();
  const { handleNavigation } = useSidebarNavigation();

  const isActive = location.pathname === path;
  const hoverStyles = getNavigationHoverStyles(theme, isActive, collapsed);

  return (
    <ListItem disablePadding sx={getListItemStyles(isSettings)}>
      <ListButton
        onClick={() => handleNavigation(path)}
        icon={icon}
        text={text}
        collapsed={collapsed}
        selected={isActive}
        sx={{
          ...hoverStyles,
        }}
        iconSx={getIconStyles(isActive)}
        textProps={getTextProps(isActive)}
      />
    </ListItem>
  );
});

NavigationItem.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  isSettings: PropTypes.bool,
};

export default NavigationItem;
