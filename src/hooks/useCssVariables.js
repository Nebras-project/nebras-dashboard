import { useEffect } from "react";

/**
 * Custom hook to set CSS variables for text selection highlighting
 * Only sets the variables that are actually used in the CSS
 */
export const useCssVariables = (theme) => {
  useEffect(() => {
    if (!theme?.palette) return;

    const root = document.documentElement;

    // Only set the variables we actually use for text selection
    root.style.setProperty("--primary-color", theme.palette.primary.main);
    root.style.setProperty(
      "--primary-contrast-text",
      theme.palette.primary.contrastText
    );
  }, [theme]);
};
