/**
 * RTL utilities for Material-UI
 * Helper functions to ensure proper RTL support
 */

/**
 * Check if a language is RTL
 * @param {string} language - Language code
 * @returns {boolean} - True if RTL language
 */
export const isRTL = (language) => {
  const rtlLanguages = ["ar", "he", "fa", "ur"];
  return rtlLanguages.includes(language);
};

/**
 * Get text direction for a language
 * @param {string} language - Language code
 * @returns {string} - 'rtl' or 'ltr'
 */
export const getDirection = (language) => {
  return isRTL(language) ? "rtl" : "ltr";
};

/**
 * Get text alignment based on direction
 * @param {string} direction - 'rtl' or 'ltr'
 * @returns {string} - 'right' or 'left'
 */
export const getTextAlign = (direction) => {
  return direction === "rtl" ? "right" : "left";
};

/**
 * Get flex direction for RTL/LTR
 * @param {string} direction - 'rtl' or 'ltr'
 * @param {string} baseDirection - Base flex direction ('row' or 'row-reverse')
 * @returns {string} - Adjusted flex direction
 */
export const getFlexDirection = (direction, baseDirection = "row") => {
  if (direction === "rtl" && baseDirection === "row") {
    return "row-reverse";
  }
  if (direction === "ltr" && baseDirection === "row-reverse") {
    return "row";
  }
  return baseDirection;
};
