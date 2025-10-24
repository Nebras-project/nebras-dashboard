import { useMemo } from "react";
import { createAppTheme } from "../theme";
import { useReduxTheme } from "./useReduxTheme";
import { useLanguage } from "./useLanguage";
import { useColorScheme } from "./useColorScheme";

/**
 * Custom hook to create and manage the MUI theme
 * @returns {Object} MUI theme object
 */
export const useMuiTheme = () => {
  // Get theme mode from Redux
  const { mode } = useReduxTheme();

  // Get language/direction from Redux
  const { isRTL } = useLanguage();

  // Get color scheme from Redux
  const { scheme, customColor } = useColorScheme();

  // Create theme based on mode, direction, and color scheme
  const theme = useMemo(
    () => createAppTheme(mode, isRTL ? "rtl" : "ltr", scheme, customColor),
    [mode, isRTL, scheme, customColor]
  );

  return theme;
};
