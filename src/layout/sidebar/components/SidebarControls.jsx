import { 
  Box,
  Stack,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { 
  MdLogout,
  MdDarkMode,
  MdLightMode,
  MdLanguage,
} from 'react-icons/md';
import PropTypes from 'prop-types';
import ColorPicker from '../../../components/ColorPicker';
import { 
  getSidebarControlButtonStyles, 
  getSidebarControlIconStyles,
  getSidebarControlTextProps,
} from '../../constants';

/**
 * SidebarControls Component
 * Bottom controls section with color picker, language toggle, theme toggle, and logout
 */
function SidebarControls({
  mode,
  currentLanguage,
  scheme,
  customColor,
  onColorChange,
  onSchemeChange,
  onLanguageToggle,
  onThemeToggle,
  onLogout,
  collapsed,
}) {
  const buttonStyles = getSidebarControlButtonStyles();
  const iconStyles = getSidebarControlIconStyles();
  const textProps = getSidebarControlTextProps();

  const renderButton = (onClick, icon, text, sx = {}, iconSx = {}) => {
    const button = (
      <ListItemButton
        onClick={onClick}
        sx={{
          ...buttonStyles,
          justifyContent: collapsed ? 'center' : 'flex-start',
          px: collapsed ? 0 : 2,
          ...sx,
        }}
      >
        <ListItemIcon sx={{ 
          ...iconStyles,
          minWidth: collapsed ? 'auto' : iconStyles.minWidth,
          ...iconSx,
        }}>
          {icon}
        </ListItemIcon>
        {!collapsed && (
          <ListItemText 
            primary={text}
            primaryTypographyProps={textProps}
          />
        )}
      </ListItemButton>
    );
    
    return collapsed ? (
      <Tooltip title={` ${text}`} placement="right" arrow>
        {button}
      </Tooltip>
    ) : (
      button
    );
  };

  return (
    <Box sx={{ mt: 'auto' }}>
      <Divider sx={{ mb: 1 }} />
      
      <Stack 
        spacing={0.75} 
        sx={{ 
          px: collapsed ? 1 : 2, 
          py: 1,
        }}
      >
        {/* Color Picker */}
        {!collapsed && (
          <ColorPicker
            currentColor={customColor}
            onColorChange={onColorChange}
            scheme={scheme}
          />
        )}

        {/* Color Indicator - Show current color when collapsed */}
        {collapsed && renderButton(
          () => onSchemeChange(scheme === 'blue' ? 'green' : scheme === 'green' ? 'blue' : 'blue'),
          <Box 
            sx={{ 
              width: 22, 
              height: 22, 
              borderRadius: '50%', 
              bgcolor: scheme === 'blue' ? '#0075ff' : scheme === 'green' ? '#006239' : customColor,
              border: 2,
              borderColor: 'divider',
            }}
          />,
          'Pick a Color'
        )}

        {/* Color Preset Toggle - Only show when not collapsed to avoid duplication */}
        {!collapsed && renderButton(
          () => onSchemeChange(scheme === 'blue' ? 'green' : 'blue'),
          <Box 
            sx={{ 
              width: 22, 
              height: 22, 
              borderRadius: '50%', 
              bgcolor: scheme === 'blue' ? '#0075ff' : scheme === 'green' ? '#006239' : customColor,
              border: 2,
              borderColor: 'divider',
            }}
          />,
          scheme === 'custom' ? 'Switch to Preset' : `Preset: ${scheme === 'blue' ? 'Blue' : 'Green'}`
        )}

        {/* Language Toggle */}
        {renderButton(
          onLanguageToggle,
          <MdLanguage />,
          `Language: ${currentLanguage.toUpperCase()}`,
          {},
          { color: 'text.secondary' }
        )}

        {/* Theme Toggle */}
        {renderButton(
          onThemeToggle,
          mode === 'dark' ? <MdLightMode /> : <MdDarkMode />,
          `${mode === 'dark' ? 'Dark' : 'Light'} Mode`,
          {},
          { color: 'text.secondary' }
        )}

        {/* Logout Button */}
        {renderButton(
          onLogout,
          <MdLogout />,
          'Logout',
          {
            color: 'error.main',
            '&:hover': {
              bgcolor: 'error.main',
              color: 'error.contrastText',
              '& .MuiListItemIcon-root': {
                color: 'error.contrastText',
              },
            },
          },
          { color: 'error.main' }
        )}
      </Stack>
    </Box>
  );
}

SidebarControls.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
  currentLanguage: PropTypes.string.isRequired,
  scheme: PropTypes.oneOf(['blue', 'green', 'custom']).isRequired,
  customColor: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onSchemeChange: PropTypes.func.isRequired,
  onLanguageToggle: PropTypes.func.isRequired,
  onThemeToggle: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default SidebarControls;

