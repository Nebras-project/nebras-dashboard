import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {useLanguage} from '@hooks'

const LanguageSync = () => {
  const { i18n } = useTranslation();
  const {currentLanguage, setLanguage} = useLanguage();

  useEffect(() => {
      if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }

    const handleLanguageChange = (lng) => {
      if (lng !== currentLanguage) {
        setLanguage(lng);
      }
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [currentLanguage, setLanguage, i18n]);

  return null;
};

export default LanguageSync;


