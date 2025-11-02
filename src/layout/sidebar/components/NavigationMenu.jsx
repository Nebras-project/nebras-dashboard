// external imports
import { List, ListItem } from '@mui/material';
import { useMemo, memo } from 'react';

// internal imports
import { margin, padding } from '@constants';
import { useTranslation, useUser, useSidebar } from '@hooks';
import { getNavigationItems } from '../sidebarConfig';
import NavigationDropdown from './NavigationDropdown';
import NavigationItem from './NavigationItem';

const getListStyles = () => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  ...padding.x.md,
  ...padding.bottom.none,
});

const getListItemStyles = () => ({
  width: '100%',
  ...margin.bottom.xs,
});

const hasNestedItems = (item) => {
  return item.children && item.children.length > 0;
};

const NavigationMenu = memo(function NavigationMenu() {
  const { t } = useTranslation();
  const { role } = useUser();
  const { collapsed } = useSidebar();

  const menuItems = useMemo(() => getNavigationItems(role), [role]);

  return (
    <List sx={getListStyles()}>
      {menuItems.map((item, index) => {
        if (hasNestedItems(item)) {
          return (
            <ListItem key={`dropdown-${index}`} disablePadding sx={getListItemStyles()}>
              <NavigationDropdown
                icon={item.icon}
                label={t(item.text)}
                items={item.children}
                collapsed={collapsed}
              />
            </ListItem>
          );
        }

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
});

export default NavigationMenu;
