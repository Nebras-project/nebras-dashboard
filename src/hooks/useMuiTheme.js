// external imports
import { useMemo } from 'react';

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

  // Create theme based on mode, direction, and color scheme
  const theme = useMemo(
    () => createAppTheme(mode, isRTL ? 'rtl' : 'ltr', scheme, customColor),
    [mode, isRTL, scheme, customColor]
  );

  return theme;
};
