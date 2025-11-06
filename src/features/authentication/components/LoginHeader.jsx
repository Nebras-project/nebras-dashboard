// external imports
import { Box, useTheme, useMediaQuery, Typography } from '@mui/material';
import { useMemo } from 'react';

// internal imports
import { LogoWithFireLoader } from '@components';
import { useTranslation } from '@hooks';
import { margin } from '@constants';

// Style getters
/**
 * LoginHeader Component
 * Single Responsibility: Display login page header with logo and branding
 */
function LoginHeader() {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const logoHeight = useMemo(() => (isMobile ? 50 : 60), [isMobile]);
  const fireLoaderSize = useMemo(() => (isMobile ? 70 : 85), [isMobile]);

  return (
    <Box sx={{ ...margin.bottom.xl, textAlign: 'center' }}>
      <LogoWithFireLoader
        logoHeight={logoHeight}
        fireLoaderSize={fireLoaderSize}
        alt="Nebras Logo"
      />
      <Typography variant="body1" color="text.secondary" sx={{ ...margin.top.sm }}>
        {t('auth.loginSubtitle')}
      </Typography>
    </Box>
  );
}

export default LoginHeader;
