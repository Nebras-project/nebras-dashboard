import { useTranslation as useI18nextTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLanguage } from "@store/slices/languageSlice";

/**
 * Custom hook for translations with Redux integration
 * @returns {Object} Translation functions and language state
 */
export const useTranslation = () => {
  const { t, i18n } = useI18nextTranslation();
  const dispatch = useDispatch();

  /**
   * Change language and sync with Redux
   * @param {string} lng - Language code ('ar' or 'en')
   */
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
    // localStorage is handled automatically by localStorageMiddleware
  };

  /**
   * Toggle between Arabic and English
   */
  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    changeLanguage(newLang);
  };

  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    isArabic: i18n.language === "ar",
    isEnglish: i18n.language === "en",
    changeLanguage,
    toggleLanguage,
  };
};

export default useTranslation;
