import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/slices/languageSlice';

/**
 * LanguageSync Component
 * Synchronizes i18n language with Redux state
 * This ensures language changes are reflected across the entire app
 */
const LanguageSync = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.currentLanguage);

  // Sync i18n with Redux on mount
  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, []);

  // Listen to Redux language changes and update i18n
  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  // Listen to i18n language changes and update Redux
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      if (lng !== currentLanguage) {
        dispatch(setLanguage(lng));
      }
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [currentLanguage, dispatch, i18n]);

  return null; // This component doesn't render anything
};

export default LanguageSync;

