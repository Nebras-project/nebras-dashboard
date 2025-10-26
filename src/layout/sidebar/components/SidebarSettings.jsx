// external imports
import { Box, Stack, Divider } from '@mui/material';
import { MdDarkMode, MdLanguage, MdLightMode, MdLogout, MdContrast } from 'react-icons/md';
import { CgColorBucket } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";

// internal imports
import { ColorSwatch, ColorPicker } from '@components';
import {
  COLOR_INDICATOR_SIZE,
  LOGOUT_BUTTON_STYLES,
  LOGOUT_ICON_STYLES,
} from '@constants';
import { useTranslation, useLanguage, useReduxTheme, useColorScheme, useUser, useSidebar } from '@hooks';
import SidebarButton from './SidebarButton';
import SettingsDropdown from './SettingsDropdown';

/**
 * SidebarSettings Component
 * Bottom settings section with color picker, language selector, theme selector, and logout
 * Self-contained component that manages its own state and actions via hooks
 */
function SidebarSettings() {
  const { t } = useTranslation();
  const { mode, setThemeMode } = useReduxTheme();
  const { currentLanguage, isRTL, setLanguage } = useLanguage();
  const { scheme, customColor, setCustomColor, setColorScheme } = useColorScheme();
  const { logout } = useUser();
  const { collapsed } = useSidebar();

  // Language options for dropdown
  const languageOptions = [
    { 
      value: 'ar', 
      label: t('common.arabic'), 
      icon: <MdLanguage />,
      onClick: () => setLanguage('ar')
    },
    { 
      value: 'en', 
      label: t('common.english'), 
      icon: <MdLanguage />,
      onClick: () => setLanguage('en')
    },
  ];

  // Theme options for dropdown
  const themeOptions = [
    { 
      value: 'system', 
      label: t('common.systemMode'), 
      icon: <MdContrast />,
      onClick: () => setThemeMode('system')
    },
    { 
      value: 'light', 
      label: t('common.lightMode'), 
      icon: <MdLightMode />,
      onClick: () => setThemeMode('light')
    },
    { 
      value: 'dark', 
      label: t('common.darkMode'), 
      icon: <MdDarkMode />,
      onClick: () => setThemeMode('dark')
    },
  ];

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

                {/* Color Reset Button - Works for both collapsed and expanded */}
        <SidebarButton
          onClick={() => setColorScheme('blue')}
          icon={<CgColorBucket />}
          text={t('common.defaultColor')}
          endContent={
            <ColorSwatch 
              color="#0075ff"
              size={COLOR_INDICATOR_SIZE}
              sx={{ ml: 'auto' }}
            />
          }
          collapsed={collapsed}
        />
        
        {/* Color Picker - Show only when expanded */}
        {!collapsed && (
          <ColorPicker
            currentColor={customColor}
            onColorChange={setCustomColor}
            scheme={scheme}
          />
        )}



        {/* Language Selection Dropdown */}
        <SettingsDropdown
          icon={<MdLanguage />}
          label={t('common.language')}
          options={languageOptions}
          currentValue={currentLanguage}
          collapsed={collapsed}
        />

        {/* Theme Selection Dropdown */}
        <SettingsDropdown
          icon={
            mode === 'system' ? <MdContrast /> :
            mode === 'dark' ? <MdDarkMode /> : 
            <MdLightMode />
          }
          label={t('common.theme')}
          options={themeOptions}
          currentValue={mode}
          collapsed={collapsed}
        />

        {/* Logout Button */}
        <SidebarButton
          onClick={logout}
          icon={isRTL ? <MdLogout /> : <CiLogout />}
          text={t('common.logout')}
          collapsed={collapsed}
          sx={LOGOUT_BUTTON_STYLES}
          iconSx={LOGOUT_ICON_STYLES}
        />
      </Stack>
    </Box>
  );
}

export default SidebarSettings;

