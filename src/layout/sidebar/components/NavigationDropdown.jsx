// external imports
import { useMemo, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useTranslation, useSidebarNavigation } from '@hooks';
import { ListButton, Dropdown } from '@components';
import { getNavigationHoverStyles, padding } from '@constants';

const getDropdownStyles = () => ({
  width: '100%',
});

const getButtonStyles = () => ({
  justifyContent: 'flex-start',
  ...padding.x.md,
});

const getIconStyles = (isActive) => ({
  color: isActive ? 'inherit' : 'text.secondary',
});

const checkIfAnyChildActive = (items, pathname) => {
  return items.some((child) => pathname === child.path);
};

const getCurrentActiveValue = (items, pathname) => {
  return items.find((child) => pathname === child.path)?.path || '';
};

const convertItemsToOptions = (items, t, handleNavigation) => {
  return items.map((child) => ({
    value: child.path,
    label: t(child.text),
    icon: child.icon,
    onClick: () => handleNavigation(child.path),
  }));
};

const NavigationDropdown = memo(function NavigationDropdown({ icon, label, items, collapsed }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const { handleNavigation } = useSidebarNavigation();

  const isAnyChildActive = useMemo(
    () => checkIfAnyChildActive(items, location.pathname),
    [items, location.pathname]
  );

  const options = useMemo(
    () => convertItemsToOptions(items, t, handleNavigation),
    [items, t, handleNavigation]
  );

  const currentValue = useMemo(
    () => getCurrentActiveValue(items, location.pathname),
    [items, location.pathname]
  );

  const hoverStyles = getNavigationHoverStyles(theme, isAnyChildActive, collapsed);

  if (collapsed) {
    const handleClick = () => {
      if (!isAnyChildActive && items[0]?.path) {
        handleNavigation(items[0].path);
      }
    };

    return (
      <ListButton
        onClick={handleClick}
        icon={icon}
        text={label}
        collapsed={collapsed}
        selected={isAnyChildActive}
        iconSx={getIconStyles(isAnyChildActive)}
        sx={hoverStyles}
      />
    );
  }

  return (
    <Dropdown
      icon={icon}
      label={label}
      options={options}
      currentValue={currentValue}
      showCheckmark={true}
      sx={getDropdownStyles()}
      indentLevel={6}
      buttonSx={{
        ...getButtonStyles(),
        ...hoverStyles,
      }}
    />
  );
});

NavigationDropdown.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.node,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default NavigationDropdown;
