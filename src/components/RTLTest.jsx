import { Box, Typography, Stack, Paper, Button } from '@mui/material';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import { useTranslation, useLanguage } from '../hooks';

/**
 * RTLTest Component
 * Visual test component to verify RTL/LTR functionality
 * 
 * Usage: Add to any page to test RTL behavior
 * <RTLTest />
 */
function RTLTest() {
  const { t, toggleLanguage, currentLanguage } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        RTL/LTR Test Component
      </Typography>
      
      <Stack spacing={2} sx={{ mt: 2 }}>
        {/* Current State */}
        <Box>
          <Typography variant="body2" color="text.secondary">
            Current Language: <strong>{currentLanguage.toUpperCase()}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Direction: <strong>{isRTL ? 'RTL (Right-to-Left)' : 'LTR (Left-to-Right)'}</strong>
          </Typography>
        </Box>

        {/* Translation Test */}
        <Box>
          <Typography variant="h6">{t('common.welcome')}</Typography>
          <Typography variant="body1">{t('navigation.dashboard')}</Typography>
          <Typography variant="body2">{t('users.owner')}</Typography>
        </Box>

        {/* Direction Test */}
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<MdArrowBack />}>
            {t('common.back')}
          </Button>
          <Button variant="outlined" endIcon={<MdArrowForward />}>
            {t('common.next')}
          </Button>
        </Stack>

        {/* Language Toggle */}
        <Button variant="contained" onClick={toggleLanguage}>
          Switch to {currentLanguage === 'ar' ? 'English' : 'العربية'}
        </Button>

        {/* Spacing Test (should flip in RTL) */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            p: 2,
            bgcolor: 'primary.light',
            borderRadius: 1,
          }}
        >
          <Box sx={{ width: 50, height: 50, bgcolor: 'error.main', borderRadius: 1 }} />
          <Box sx={{ width: 50, height: 50, bgcolor: 'warning.main', borderRadius: 1 }} />
          <Box sx={{ width: 50, height: 50, bgcolor: 'success.main', borderRadius: 1 }} />
        </Box>

        {/* Margin Test */}
        <Box sx={{ ml: 4, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="body2">
            This box has ml: 4 (should be mr in RTL)
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default RTLTest;

