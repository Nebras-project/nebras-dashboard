// external imports
import { List } from '@mui/material';
import { useMemo, memo } from 'react';

// internal imports
import { padding } from '@constants';
import { useTranslation, useAuth } from '@hooks';
import { getNavigationItems } from '../sidebarConfig';
import NavigationItem from './NavigationItem';

const getListStyles = () => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  ...padding.x.md,
  ...padding.bottom.none,
});

const NavigationMenu = memo(function NavigationMenu() {
  const { t } = useTranslation();
  const { role } = useAuth();
  const menuItems = useMemo(() => getNavigationItems(role), [role]);

  return (
    <List sx={getListStyles()}>
      {menuItems.map((item) => (
        <NavigationItem
          key={item.path}
          path={item.path}
          icon={item.icon}
          text={t(item.text)}
          isSettings={item.path === '/settings'}
        />
      ))}
    </List>
  );
});

export default NavigationMenu;
