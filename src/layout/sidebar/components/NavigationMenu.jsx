import { List, ListItem } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { spacing } from '../../../theme';
import { fontWeights } from '../../../theme/typography';
import {
  SELECTED_NAV_ITEM_STYLES,
  NAV_ITEM_MARGIN_BOTTOM,
  LIST_ITEM_MB_OFFSET,
} from '../../constants';
import { useTranslation, useUser, useSidebar, useSidebarNavigation } from '../../../hooks';
import { getNavigationItems } from '../sidebarConfig';
import SidebarButton from './SidebarButton';
import NavigationDropdown from './NavigationDropdown';

/**
 * NavigationMenu Component
 * Renders the navigation menu items with active state highlighting
 * Self-contained component that manages its own navigation and state
 */
function NavigationMenu() {
  const { t } = useTranslation();
  const location = useLocation();
  const { role } = useUser();
  const { collapsed } = useSidebar();
  const { handleNavigation } = useSidebarNavigation();

  // Memoize menu items for current role
  const menuItems = useMemo(() => getNavigationItems(role), [role]);

  return (
    <List
      sx={{
        flexGrow: 1,
        px: spacing.md / 8, // 2 units (16px)
        pb: spacing.none,
      }}
    >
      {menuItems.map((item, index) => {
        // Check if item has children (dropdown navigation)
        if (item.children && item.children.length > 0) {
          return (
            <ListItem
              key={`dropdown-${index}`}
              disablePadding
              sx={{
                width: '100%',
                mb: NAV_ITEM_MARGIN_BOTTOM - LIST_ITEM_MB_OFFSET, // 0.5 units
              }}
            >
              <NavigationDropdown
                icon={item.icon}
                label={t(item.text)}
                items={item.children}
                collapsed={collapsed}
              />
            </ListItem>
          );
        }

        // Regular navigation item
        const isActive = location.pathname === item.path;

        return (
          <ListItem
            key={item.path}
            disablePadding
            sx={{
              width: '100%',
              mb: NAV_ITEM_MARGIN_BOTTOM - LIST_ITEM_MB_OFFSET, // 0.5 units
            }}
          >
            <SidebarButton
              onClick={() => handleNavigation(item.path)}
              icon={item.icon}
              text={t(item.text)}
              collapsed={collapsed}
              selected={isActive}
              sx={SELECTED_NAV_ITEM_STYLES}
              iconSx={{
                color: isActive ? 'inherit' : 'text.secondary',
              }}
              textProps={{
                fontWeight: isActive ? fontWeights.semiBold : fontWeights.regular,
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default NavigationMenu;