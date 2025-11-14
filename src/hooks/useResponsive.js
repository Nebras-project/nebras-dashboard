import { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function useResponsive() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const isTablet = useMediaQuery(theme.breakpoints.between('tablet', 'desktop'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const isSmallScreen = isMobile || isTablet;

  const device = useMemo(() => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  }, [isMobile, isTablet]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    device,
  };
}
