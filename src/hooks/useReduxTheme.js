// external imports
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';

// internal imports
import { toggleTheme, setThemeMode } from '@store/slices';

export const useReduxTheme = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  // Memoize action creators to prevent unnecessary re-renders
  const toggleThemeAction = useCallback(() => dispatch(toggleTheme()), [dispatch]);
  const setThemeModeAction = useCallback((mode) => dispatch(setThemeMode(mode)), [dispatch]);

  // Normalize mode to ensure it's always 'light' or 'dark'
  const normalizedMode = theme.mode === 'light' || theme.mode === 'dark' ? theme.mode : 'dark';

  // Calculate dark mode state
  const isDark = normalizedMode === 'dark';
  const isLight = normalizedMode === 'light';

  return useMemo(
    () => ({
      ...theme,
      mode: normalizedMode,
      isDark,
      isLight,
      toggleTheme: toggleThemeAction,
      setThemeMode: setThemeModeAction,
    }),
    [theme, normalizedMode, isDark, isLight, toggleThemeAction, setThemeModeAction]
  );
};
