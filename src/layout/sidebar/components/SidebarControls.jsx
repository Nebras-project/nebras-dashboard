import { 
  Box,
  Stack,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  List,
  Collapse,
} from '@mui/material';
import { 
  MdLogout,
  MdDarkMode,
  MdLightMode,
  MdLanguage,
  MdExpandMore,
  MdExpandLess,
  MdCheck,
} from 'react-icons/md';
import { CiLogout } from "react-icons/ci";
import PropTypes from 'prop-types';
import { useState } from 'react';
import ColorPicker from '../../../components/ColorPicker';
import { 
  getSidebarControlButtonStyles, 
  getSidebarControlIconStyles,
  getSidebarControlTextProps,
} from '../../constants';
import { useTranslation } from '../../../i18n/hooks/useTranslation';
import { useLanguage, useReduxTheme } from '../../../hooks';


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
  const { t } = useTranslation();
  const {setThemeMode} = useReduxTheme();
  const { isRTL, setLanguage } = useLanguage();
  const buttonStyles = getSidebarControlButtonStyles();
  const iconStyles = getSidebarControlIconStyles();
  const textProps = getSidebarControlTextProps();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

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
          () => onSchemeChange('blue'),
          <Box 
            sx={{ 
              width: 22, 
              height: 22, 
              borderRadius: '50%', 
              bgcolor: '#0075ff',
              border: 2,
              borderColor: 'divider',
            }}
          />,
          t('common.defaultColor')
        )}

        {/* Color Preset Reset - Only show when not collapsed to avoid duplication */}
        {!collapsed && renderButton(
          () => onSchemeChange('blue'),
          <Box 
            sx={{ 
              width: 22, 
              height: 22, 
              borderRadius: '50%', 
              bgcolor: '#0075ff',
              border: 2,
              borderColor: 'divider',
            }}
          />,
          t('common.defaultColor')
        )}

        {/* Language Selection */}
        {collapsed ? (
          // When collapsed, show simple toggle
          renderButton(
            onLanguageToggle,
            <MdLanguage />,
            `${t('common.language')}: ${currentLanguage === 'ar' ? t('common.arabic') : t('common.english')}`,
            {},
            { color: 'text.secondary' }
          )
        ) : (
          // When expanded, show list with options
          <Box>
            <ListItemButton
              onClick={() => setLanguageOpen(!languageOpen)}
              sx={{
                ...buttonStyles,
                justifyContent: 'flex-start',
                px: 2,
              }}
            >
              <ListItemIcon sx={{ 
                ...iconStyles,
                minWidth: iconStyles.minWidth,
                color: 'text.secondary',
              }}>
                <MdLanguage />
              </ListItemIcon>
              <ListItemText 
                primary={t('common.language')}
                primaryTypographyProps={textProps}
              />
              {languageOpen ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            
            <Collapse in={languageOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* Arabic Option */}
                <ListItemButton
                  onClick={() => currentLanguage === 'en' && setLanguage('ar')}
                  sx={{
                    ...buttonStyles,
                    pl: 4,
                    '&:hover': {
                      bgcolor: currentLanguage === 'ar' ? 'action.selected' : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    ...iconStyles,
                    minWidth: 40,
                    color: currentLanguage === 'ar' ? 'primary.main' : 'text.secondary',
                  }}>
                    {currentLanguage === 'ar' && <MdCheck />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('common.arabic')}
                    primaryTypographyProps={{
                      ...textProps,
                      fontWeight: currentLanguage === 'ar' ? 600 : 400,
                    }}
                  />
                </ListItemButton>

                {/* English Option */}
                <ListItemButton
                  onClick={() => currentLanguage === 'ar' && setLanguage('en')}
                  sx={{
                    ...buttonStyles,
                    pl: 4,
                    '&:hover': {
                      bgcolor: currentLanguage === 'en' ? 'action.selected' : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    ...iconStyles,
                    minWidth: 40,
                    color: currentLanguage === 'en' ? 'primary.main' : 'text.secondary',
                  }}>
                    {currentLanguage === 'en' && <MdCheck />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('common.english')}
                    primaryTypographyProps={{
                      ...textProps,
                      fontWeight: currentLanguage === 'en' ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </Box>
        )}

        {/* Theme Selection */}
        {collapsed ? (
          // When collapsed, show simple toggle
          renderButton(
            onThemeToggle,
            mode === 'dark' ? <MdLightMode /> : <MdDarkMode />,
            mode === 'dark' ? t('common.darkMode') : t('common.lightMode'),
            {},
            { color: 'text.secondary' }
          )
        ) : (
          // When expanded, show list with options
          <Box>
            <ListItemButton
              onClick={() => setThemeOpen(!themeOpen)}
              sx={{
                ...buttonStyles,
                justifyContent: 'flex-start',
                px: 2,
              }}
            >
              <ListItemIcon sx={{ 
                ...iconStyles,
                minWidth: iconStyles.minWidth,
                color: 'text.secondary',
              }}>
                {mode === 'dark' ? <MdDarkMode /> : <MdLightMode />}
              </ListItemIcon>
              <ListItemText 
                primary={t('common.theme')}
                primaryTypographyProps={textProps}
              />
              {themeOpen ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            
            <Collapse in={themeOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* Light Mode Option */}
                <ListItemButton
                  onClick={() => mode === 'dark' && setThemeMode('light')}
                  sx={{
                    ...buttonStyles,
                    pl: 4,
                    '&:hover': {
                      bgcolor: mode === 'light' ? 'action.selected' : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    ...iconStyles,
                    minWidth: 40,
                    color: mode === 'light' ? 'primary.main' : 'text.secondary',
                  }}>
                    {mode === 'light' ? <MdCheck /> : <MdLightMode />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('common.lightMode')}
                    primaryTypographyProps={{
                      ...textProps,
                      fontWeight: mode === 'light' ? 600 : 400,
                    }}
                  />
                </ListItemButton>

                {/* Dark Mode Option */}
                <ListItemButton
                  onClick={() => mode === 'light' && setThemeMode('dark')}
                  sx={{
                    ...buttonStyles,
                    pl: 4,
                    '&:hover': {
                      bgcolor: mode === 'dark' ? 'action.selected' : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    ...iconStyles,
                    minWidth: 40,
                    color: mode === 'dark' ? 'primary.main' : 'text.secondary',
                  }}>
                    {mode === 'dark' ? <MdCheck /> : <MdDarkMode />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('common.darkMode')}
                    primaryTypographyProps={{
                      ...textProps,
                      fontWeight: mode === 'dark' ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </Box>
        )}

        {/* Logout Button */}
        {renderButton(
          onLogout,
          isRTL ? <MdLogout /> : <CiLogout />,
          t('common.logout'),
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

