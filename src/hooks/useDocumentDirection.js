// external imports
import { useEffect } from "react";

// internal imports
import { useLanguage } from "./useLanguage";

export const useDocumentDirection = () => {
  // Get language/direction from Redux
  const { currentLanguage, isRTL } = useLanguage();

  // Update HTML dir and lang attributes when language changes
  useEffect(() => {
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", currentLanguage);
  }, [isRTL, currentLanguage]);
};
