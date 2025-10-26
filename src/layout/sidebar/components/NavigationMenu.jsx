import { List, ListItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { spacing } from '../../../theme';
import { fontWeights } from '../../../theme/typography';
import {
  SELECTED_NAV_ITEM_STYLES,
  NAV_ITEM_MARGIN_BOTTOM,
  LIST_ITEM_MB_OFFSET,
} from '../../constants';
import { useTranslation, useUser, useSidebar } from '../../../hooks';
import { getNavigationItems } from '../sidebarConfig';
import SidebarButton from './SidebarButton';

/**
 * NavigationMenu Component
 * Renders the navigation menu items with active state highlighting
 * Self-contained component that manages its own navigation and state
 */
function NavigationMenu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useUser();
  const { collapsed, isMobile, closeSidebar } = useSidebar();

  // Memoize menu items for current role
  const menuItems = useMemo(() => getNavigationItems(role), [role]);

  // Handle navigation - closes drawer on mobile after navigating
  const handleNavigation = useCallback(
    (path) => {
      navigate(path);
      if (isMobile) {
        closeSidebar();
      }
    },
    [navigate, isMobile, closeSidebar]
  );

  return (
    <List
      sx={{
        flexGrow: 1,
        px: spacing.md / 8, // 2 units (16px)
        pb: spacing.none,
      }}
    >
      {menuItems.map((item) => {
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