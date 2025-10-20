import { useMemo } from "react";
import { createAppTheme } from "../theme";
import { useReduxTheme } from "./useReduxTheme";
import { useLanguage } from "./useLanguage";

/**
 * Custom hook to create and manage the MUI theme
 * @returns {Object} MUI theme object
 */
export const useMuiTheme = () => {
  // Get theme mode from Redux
  const { mode } = useReduxTheme();

  // Get language/direction from Redux
  const { isRTL } = useLanguage();

  // Create theme based on mode and direction
  const theme = useMemo(
    () => createAppTheme(mode, isRTL ? "rtl" : "ltr"),
    [mode, isRTL]
  );

  return theme;
};
