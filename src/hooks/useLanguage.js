// external imports
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';

// internal imports
import { setLanguage, toggleLanguage } from '@store/slices';
import { resolveLanguage } from '@utils';

export const useLanguage = () => {
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();

  // Memoize resolved language to prevent recalculation
  const resolvedLanguage = useMemo(
    () => resolveLanguage(language.currentLanguage),
    [language.currentLanguage]
  );

  // Memoize action creators to prevent unnecessary re-renders
  const setLanguageAction = useCallback((lang) => dispatch(setLanguage(lang)), [dispatch]);
  const toggleLanguageAction = useCallback(() => dispatch(toggleLanguage()), [dispatch]);

  return useMemo(
    () => ({
      ...language,
      // Return resolved language for components that need the actual language
      resolvedLanguage,
      setLanguage: setLanguageAction,
      toggleLanguage: toggleLanguageAction,
    }),
    [language, resolvedLanguage, setLanguageAction, toggleLanguageAction]
  );
};
