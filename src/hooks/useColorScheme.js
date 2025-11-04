// external imports
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';

// internal imports
import { setDefaultColor, setColorScheme, setCustomColor } from '@store/slices';

export const useColorScheme = () => {
  const dispatch = useDispatch();
  const { scheme, customColor } = useSelector((state) => state.colorScheme);

  // Memoize action creators to prevent unnecessary re-renders
  const resetToDefault = useCallback(() => dispatch(setDefaultColor()), [dispatch]);
  const setScheme = useCallback((newScheme) => dispatch(setColorScheme(newScheme)), [dispatch]);
  const setColor = useCallback((color) => dispatch(setCustomColor(color)), [dispatch]);

  // Memoize computed values
  const isDefault = useMemo(() => scheme === 'default', [scheme]);
  const isCustom = useMemo(() => scheme === 'custom', [scheme]);

  return useMemo(
    () => ({
      scheme,
      customColor,
      setDefaultColor: resetToDefault, // Resets to default blue scheme
      setColorScheme: setScheme,
      setCustomColor: setColor,
      isDefault,
      isCustom,
    }),
    [scheme, customColor, resetToDefault, setScheme, setColor, isDefault, isCustom]
  );
};
