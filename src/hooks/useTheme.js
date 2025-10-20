import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createAppTheme } from "../theme";

/**
 * Custom hook to create and manage the MUI theme
 * @returns {Object} MUI theme object
 */
const useTheme = () => {
  // Get theme mode from Redux
  const { mode } = useSelector((state) => state.theme);

  // Get language/direction from Redux
  const { isRTL } = useSelector((state) => state.language);

  // Create theme based on mode and direction
  const theme = useMemo(
    () => createAppTheme(mode, isRTL ? "rtl" : "ltr"),
    [mode, isRTL]
  );

  return theme;
};

export default useTheme;
