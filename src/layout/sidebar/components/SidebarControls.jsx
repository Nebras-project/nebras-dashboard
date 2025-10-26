import { Box, Stack, Divider } from '@mui/material';
import {
  MdLogout,
  MdDarkMode,
  MdLightMode,
  MdLanguage,
} from 'react-icons/md';
import { CiLogout } from "react-icons/ci";
import ColorPicker from '../../../components/ColorPicker';
import {
  COLOR_INDICATOR_SIZE,
  LOGOUT_BUTTON_STYLES,
  LOGOUT_ICON_STYLES,
} from '../../constants';
import { useTranslation, useLanguage, useReduxTheme, useColorScheme, useUser, useSidebar } from '../../../hooks';
import SidebarButton from './SidebarButton';
import DropdownControl from './DropdownControl';

/**
 * SidebarControls Component
 * Bottom controls section with color picker, language toggle, theme toggle, and logout
 * Self-contained component that manages its own state and actions via hooks
 */
function SidebarControls() {
  const { t } = useTranslation();
  const { mode, setThemeMode } = useReduxTheme();
  const { currentLanguage, isRTL, setLanguage } = useLanguage();
  const { scheme, customColor, setCustomColor, setColorScheme } = useColorScheme();
  const { logout } = useUser();
  const { collapsed } = useSidebar();

  // Language options for dropdown
  const languageOptions = [
    { value: 'ar', label: t('common.arabic'), icon: <MdLanguage /> },
    { value: 'en', label: t('common.english'), icon: <MdLanguage /> },
  ];

  // Theme options for dropdown
  const themeOptions = [
    { value: 'light', label: t('common.lightMode'), icon: <MdLightMode /> },
    { value: 'dark', label: t('common.darkMode'), icon: <MdDarkMode /> },
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
        {/* Color Picker - Show only when expanded */}
        {!collapsed && (
          <ColorPicker
            currentColor={customColor}
            onColorChange={setCustomColor}
            scheme={scheme}
          />
        )}

        {/* Color Reset Button - Works for both collapsed and expanded */}
        <SidebarButton
          onClick={() => setColorScheme('blue')}
          icon={
            <Box 
              sx={{ 
                width: COLOR_INDICATOR_SIZE, 
                height: COLOR_INDICATOR_SIZE, 
                borderRadius: '50%', 
                bgcolor: '#0075ff',
                border: 2,
                borderColor: 'divider',
              }}
            />
          }
          text={t('common.defaultColor')}
          collapsed={collapsed}
        />

        {/* Language Selection Dropdown */}
        <DropdownControl
          icon={<MdLanguage />}
          label={t('common.language')}
          options={languageOptions}
          currentValue={currentLanguage}
          onChange={setLanguage}
          collapsed={collapsed}
        />

        {/* Theme Selection Dropdown */}
        <DropdownControl
          icon={mode === 'dark' ? <MdDarkMode /> : <MdLightMode />}
          label={t('common.theme')}
          options={themeOptions}
          currentValue={mode}
          onChange={setThemeMode}
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

export default SidebarControls;

