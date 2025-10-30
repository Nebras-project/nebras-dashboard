import { Box, Paper, Typography } from '@mui/material';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import { CgColorBucket } from 'react-icons/cg';
import { ListButton, ColorPicker, ColorSwatch } from '@components';
import { useTranslation, useColorScheme, useLanguage } from '@hooks';
import { COLOR_INDICATOR_SIZE } from '@constants';

const DEFAULT_COLOR = '#0075ff';

function ColorSettingsCard() {
  const { t } = useTranslation();
  const { scheme, customColor, setCustomColor, setColorScheme } = useColorScheme();
  const { isRTL } = useLanguage();

  return (
    <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2, transition: 'all 0.2s ease', position: 'relative', '&:hover': { '& .hover-arrow': { opacity: 1, transform: 'translateX(0)' } } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box sx={{ mb: 2, flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="medium">{t('settings.chooseMainColor')}</Typography>
          <Typography variant="caption" color="text.secondary">{t('settings.colorDescription')}</Typography>
        </Box>
        <Box className="hover-arrow" sx={{ opacity: 0, transform: isRTL ? 'translateX(-10px)' : 'translateX(10px)', transition: 'all 0.2s ease', color: 'primary.main', display: 'flex', alignItems: 'center', pt: 0.5 }}>
          {isRTL ? <MdArrowForward size={24} /> : <MdArrowBack size={24} />}
        </Box>
      </Box>
      <Box sx={{ maxWidth: 300 }}>
        <Box sx={{ mb: 2 }}>
          <ListButton
            onClick={() => setColorScheme('default')}
            icon={<CgColorBucket />}
            text={t('common.defaultColor')}
            endContent={<ColorSwatch color={DEFAULT_COLOR} size={COLOR_INDICATOR_SIZE} sx={{ ml: 1 }} />}
            iconSx={{ color: 'text.secondary' }}
          />
        </Box>
        <ColorPicker currentColor={customColor} onColorChange={setCustomColor} scheme={scheme} />
      </Box>
    </Paper>
  );
}

export default ColorSettingsCard;


