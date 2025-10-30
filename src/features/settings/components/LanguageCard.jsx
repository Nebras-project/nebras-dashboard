import { Box, Paper, Typography } from '@mui/material';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import { RiEnglishInput } from 'react-icons/ri';
import { FaEarthAmericas } from 'react-icons/fa6';
import { IoLanguage } from 'react-icons/io5';
import { Dropdown } from '@components';
import { useTranslation, useLanguage } from '@hooks';

function LanguageCard() {
  const { t } = useTranslation();
  const { currentLanguage, setLanguage, isRTL } = useLanguage();

  const languageOptions = [
    { value: 'default', label: t('common.systemMode'), icon: <FaEarthAmericas />, onClick: () => setLanguage('default') },
    { value: 'ar', label: t('common.arabic'), icon: <IoLanguage />, onClick: () => setLanguage('ar') },
    { value: 'en', label: t('common.english'), icon: <RiEnglishInput />, onClick: () => setLanguage('en') },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 3, border: 1, borderColor: 'divider', borderRadius: 2, transition: 'all 0.2s ease', position: 'relative', '&:hover': { '& .hover-arrow': { opacity: 1, transform: 'translateX(0)' } } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box sx={{ mb: 2, flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="medium">{t('common.language')}</Typography>
          <Typography variant="caption" color="text.secondary">{t('settings.languageDescription')}</Typography>
        </Box>
        <Box className="hover-arrow" sx={{ opacity: 0, transform: isRTL ? 'translateX(-10px)' : 'translateX(10px)', transition: 'all 0.2s ease', color: 'primary.main', display: 'flex', alignItems: 'center', pt: 0.5 }}>
          {isRTL ? <MdArrowForward size={24} /> : <MdArrowBack size={24} />}
        </Box>
      </Box>
      <Box sx={{ maxWidth: 300 }}>
        <Dropdown 
          label={t('common.language')} 
          options={languageOptions} 
          currentValue={currentLanguage}
          buttonSx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}
          listContainerSx={{ mt: 1, border: 1, borderColor: 'divider', borderRadius: 1, py: 0.5 }}
        />
      </Box>
    </Paper>
  );
}

export default LanguageCard;


