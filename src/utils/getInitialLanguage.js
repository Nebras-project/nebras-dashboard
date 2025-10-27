/**
 * Get initial language from persisted state
 *
 * This utility reads from the unified localStorage key used by the Redux middleware.
 * It's needed for i18n initialization which happens before Redux is available.
 *
 * @returns {string} Language code ('ar' or 'en')
 */
export const getInitialLanguage = () => {
  try {
    const state = localStorage.getItem("nebras_dashboard_state");
    if (state) {
      const parsed = JSON.parse(state);
      return parsed?.language?.currentLanguage || "ar";
    }
    return "ar";
  } catch (error) {
    console.error("Error loading initial language:", error);
    return "ar";
  }
};

/**
 * Get browser language preference
 * @returns {string} Language code ('ar' or 'en')
 */
export const getBrowserLanguage = () => {
  const browserLang = (
    navigator.language ||
    navigator.userLanguage ||
    ""
  ).toLowerCase();
  return browserLang.startsWith("ar") ? "ar" : "en";
};

/**
 * Resolve language from stored value
 * If stored value is 'default', returns browser language
 * @param {string} storedLanguage - Language stored in state
 * @returns {string} Resolved language code ('ar' or 'en')
 */
export const resolveLanguage = (storedLanguage) => {
  return storedLanguage === "default" ? getBrowserLanguage() : storedLanguage;
};
