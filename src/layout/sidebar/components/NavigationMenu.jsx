import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Tooltip,
  } from '@mui/material';
import PropTypes from 'prop-types';
import { spacing } from '../../../theme';
import { fontWeights } from '../../../theme/typography';
import { 
  getSidebarControlButtonStyles, 
  getSidebarControlIconStyles,
  getSidebarControlTextProps,
} from '../../constants';

/**
 * NavigationMenu Component
 * Renders the navigation menu items with active state highlighting
 */
function NavigationMenu({ menuItems, currentPath, onNavigate, collapsed }) {
  const buttonStyles = getSidebarControlButtonStyles();
  const iconStyles = getSidebarControlIconStyles();
  const textProps = getSidebarControlTextProps();
  return (
    <List sx={{ 
      flexGrow: 1, 
      px: spacing.md / 8, // 16px / 8 = 2 units// 16px / 8 = 2 units
      pb: spacing.none,
    }}>
      {menuItems.map((item) => {
        const isActive = currentPath === item.path;
        
        const button = (
          <ListItemButton
            onClick={() => onNavigate(item.path)}
            selected={isActive}
            sx={{
              ...buttonStyles,
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 0 : 2,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <ListItemIcon 
              sx={{ 
                ...iconStyles,
                minWidth: collapsed ? 'auto' : iconStyles.minWidth,
                color: isActive ? 'inherit' : 'text.secondary',
              }}
            >
              {item.icon}
            </ListItemIcon>
            {!collapsed && (
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  ...textProps,
                  fontWeight: isActive ? fontWeights.semiBold : fontWeights.regular,
                }}
              />
            )}
          </ListItemButton>
        );
        
        return (
          <ListItem 
            key={item.path} 
            disablePadding 
            sx={{ 
              width: '100%', 
              mb: spacing.sm / 8 - 0.25, // (8 / 8 - 0.25) = 0.75 units = 6px
            }}
          >
            {collapsed ? (
              <Tooltip title={` ${item.text}`} placement="right" arrow>
                {button}
              </Tooltip>
            ) : (
              button
            )}
          </ListItem>
        );
      })}
    </List>
  );
}

NavigationMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentPath: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default NavigationMenu;

