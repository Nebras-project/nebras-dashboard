// external imports
import { useMemo } from 'react';
import { useMediaQuery } from '@mui/material';

// internal imports
import { createAppTheme } from '@theme';
import { useReduxTheme, useLanguage, useColorScheme } from '@hooks';

export const useMuiTheme = () => {
  // Get theme mode from Redux
  const { mode } = useReduxTheme();

  // Get language/direction from Redux
  const { isRTL } = useLanguage();

  // Get color scheme from Redux
  const { scheme, customColor } = useColorScheme();

  // Detect system preference for dark mode
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  });

  // Determine the actual mode to use
  const effectiveMode = useMemo(() => {
    if (mode === 'system') {
      // If systemPrefersDark is undefined (during SSR or initial render), default to 'light'
      return systemPrefersDark === true ? 'dark' : 'light';
    }
    // Ensure mode is valid, default to 'light' if invalid
    return mode === 'light' || mode === 'dark' ? mode : 'light';
  }, [mode, systemPrefersDark]);

  // Create theme based on mode, direction, and color scheme
  const theme = useMemo(
    () => createAppTheme(effectiveMode, isRTL ? 'rtl' : 'ltr', scheme, customColor),
    [effectiveMode, isRTL, scheme, customColor]
  );

  return theme;
};
