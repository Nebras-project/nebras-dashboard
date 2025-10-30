import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ar, en } from "./locales";
import { getInitialLanguage, resolveLanguage } from "@utils";

// Get initial language from persisted state and resolve it
const savedLanguage = resolveLanguage(getInitialLanguage());

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
