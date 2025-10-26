import { useMemo } from "react";
import { useMediaQuery } from "@mui/material";
import { createAppTheme } from "@theme";
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

  // Detect system preference for dark mode
  const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });

  // Determine the actual mode to use
  const effectiveMode = useMemo(() => {
    if (mode === "system") {
      return systemPrefersDark ? "dark" : "light";
    }
    return mode;
  }, [mode, systemPrefersDark]);

  // Create theme based on mode, direction, and color scheme
  const theme = useMemo(
    () =>
      createAppTheme(effectiveMode, isRTL ? "rtl" : "ltr", scheme, customColor),
    [effectiveMode, isRTL, scheme, customColor]
  );

  return theme;
};
