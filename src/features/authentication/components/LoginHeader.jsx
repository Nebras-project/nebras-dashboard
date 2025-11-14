// external imports
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';

// internal imports
import { LogoWithFireLoader } from '@components';
import { useTranslation, useResponsive } from '@hooks';
import { margin } from '@constants';

// Style getters
/**
 * LoginHeader Component
 * Single Responsibility: Display login page header with logo and branding
 */
function LoginHeader() {
  const { t } = useTranslation();
  const { isSmallScreen } = useResponsive();

  const logoHeight = useMemo(() => (isSmallScreen ? 55 : 60), [isSmallScreen]);
  const fireLoaderSize = useMemo(() => (isSmallScreen ? 75 : 85), [isSmallScreen]);

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
