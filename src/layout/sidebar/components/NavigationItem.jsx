// external imports
import { ListItem, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// internal imports
import { fontWeights } from '@theme';
import {
  SELECTED_NAV_ITEM_STYLES,
  NAV_ITEM_MARGIN_BOTTOM,
  LIST_ITEM_MB_OFFSET,
} from '@constants';
import { ListButton } from '@components';
import { useSidebar, useSidebarNavigation } from '@hooks';

/**
 * NavigationItem Component
 * Renders a single navigation item with active state highlighting
 * 
 * @param {Object} props
 * @param {string} props.path - The navigation path
 * @param {React.ReactNode} props.icon - The icon to display
 * @param {string} props.text - The translated text to display
 * @param {boolean} props.isSettings - Whether this is the settings item
 */
function NavigationItem({ path, icon, text, isSettings = false }) {
  const location = useLocation();
  const theme = useTheme();
  const { collapsed } = useSidebar();
  const { handleNavigation } = useSidebarNavigation();

  const isActive = location.pathname === path;

  return (
    <ListItem
      disablePadding
      sx={{
        width: '100%',
        mb: NAV_ITEM_MARGIN_BOTTOM - LIST_ITEM_MB_OFFSET, // 0.5 units
        ...(isSettings && { mt: 'auto', mb: 2, pt: 1 }), // Push settings to bottom
      }}
    >
      <ListButton
        onClick={() => handleNavigation(path)}
        icon={icon}
        text={text}
        collapsed={collapsed}
        selected={isActive}
        sx={SELECTED_NAV_ITEM_STYLES(theme)}
        iconSx={{
          color: isActive ? 'inherit' : 'text.secondary',
        }}
        textProps={{
          fontWeight: isActive ? fontWeights.semiBold : fontWeights.regular,
        }}
      />
    </ListItem>
  );
}

NavigationItem.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  isSettings: PropTypes.bool,
};

export default NavigationItem;

