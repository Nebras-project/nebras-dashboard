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

  return useMemo(
    () => ({
      ...theme,
      toggleTheme: toggleThemeAction,
      setThemeMode: setThemeModeAction,
    }),
    [theme, toggleThemeAction, setThemeModeAction]
  );
};
