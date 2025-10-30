// external imports
import { List, ListItem } from '@mui/material';
import { useMemo } from 'react';

// internal imports
import { spacing } from '@theme';
import { NAV_ITEM_MARGIN_BOTTOM, LIST_ITEM_MB_OFFSET } from '@constants';
import { useTranslation, useUser, useSidebar } from '@hooks';
import { getNavigationItems } from '../sidebarConfig';
import NavigationDropdown from './NavigationDropdown';
import NavigationItem from './NavigationItem';

/**
 * NavigationMenu Component
 * Renders the navigation menu items with active state highlighting
 * Self-contained component that manages its own navigation and state
 */
function NavigationMenu() {
  const { t } = useTranslation();
  const { role } = useUser();
  const { collapsed } = useSidebar();

  // Memoize menu items for current role
  const menuItems = useMemo(() => getNavigationItems(role), [role]);

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        px: spacing.md / 8, // 2 units (16px)
        pb: spacing.none,
      }}
    >
      {menuItems.map((item, index) => {
        // Check if item has children (dropdown navigation)
        const hasNestedItems = item.children && item.children.length > 0;
        if (hasNestedItems) {
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
        return (
          <NavigationItem
            key={item.path}
            path={item.path}
            icon={item.icon}
            text={t(item.text)}
            isSettings={item.path === '/settings'}
          />
        );
      })}
    </List>
  );
}

export default NavigationMenu;