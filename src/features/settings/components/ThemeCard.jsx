import { Box, Paper, Typography } from '@mui/material';
import { MdContrast, MdLightMode, MdDarkMode, MdArrowForward, MdArrowBack } from 'react-icons/md';
import { Dropdown } from '@components';
import { useTranslation, useReduxTheme, useLanguage } from '@hooks';

function ThemeCard() {
  const { t } = useTranslation();
  const { mode, setThemeMode } = useReduxTheme();
  const { isRTL } = useLanguage();

  const themeOptions = [
    { value: 'system', label: t('common.systemMode'), icon: <MdContrast />, onClick: () => setThemeMode('system') },
    { value: 'light', label: t('common.lightMode'), icon: <MdLightMode />, onClick: () => setThemeMode('light') },
    { value: 'dark', label: t('common.darkMode'), icon: <MdDarkMode />, onClick: () => setThemeMode('dark') },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 3, border: 1, borderColor: 'divider', borderRadius: 2, transition: 'all 0.2s ease', position: 'relative', '&:hover': { '& .hover-arrow': { opacity: 1, transform: 'translateX(0)' } } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box sx={{ mb: 2, flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="medium">{t('common.theme')}</Typography>
          <Typography variant="caption" color="text.secondary">{t('settings.themeDescription')}</Typography>
        </Box>
        <Box className="hover-arrow" sx={{ opacity: 0, transform: isRTL ? 'translateX(-10px)' : 'translateX(10px)', transition: 'all 0.2s ease', color: 'primary.main', display: 'flex', alignItems: 'center', pt: 0.5 }}>
          {isRTL ? <MdArrowForward size={24} /> : <MdArrowBack size={24} />}
        </Box>
      </Box>
      <Box sx={{ maxWidth: 300 }}>
        <Dropdown 
          label={t('common.theme')} 
          options={themeOptions} 
          currentValue={mode}
          buttonSx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}
          listContainerSx={{ mt: 1, border: 1, borderColor: 'divider', borderRadius: 1, py: 0.5 }}
        />
      </Box>
    </Paper>
  );
}

export default ThemeCard;


