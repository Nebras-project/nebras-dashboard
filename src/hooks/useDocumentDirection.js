import { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Custom hook to manage document direction and language attributes
 * Updates HTML dir and lang attributes based on Redux language state
 */
const useDocumentDirection = () => {
  // Get language/direction from Redux
  const { isRTL, currentLanguage } = useSelector((state) => state.language);

  // Update HTML dir and lang attributes when language changes
  useEffect(() => {
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", currentLanguage);
  }, [isRTL, currentLanguage]);
};

export default useDocumentDirection;
