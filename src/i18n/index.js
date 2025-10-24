import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar";
import en from "./locales/en";

// Get initial language from localStorage or default to 'ar'
const savedLanguage = localStorage.getItem("language") || "ar";

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      ar: {
        translation: ar,
      },
      en: {
        translation: en,
      },
    },
    lng: savedLanguage, // Default language
    fallbackLng: "ar", // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense for now
    },
  });

export default i18n;
