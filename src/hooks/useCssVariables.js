import { useEffect } from "react";

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
    root.style.setProperty("--primary-dark", theme.palette.primary.dark);

    // Set grey colors for scrollbar from theme
    if (theme.palette.mode === "light") {
      root.style.setProperty("--scrollbar-thumb", theme.palette.grey[500]);
      root.style.setProperty(
        "--scrollbar-thumb-hover",
        theme.palette.grey[600]
      );
      root.style.setProperty("--scrollbar-track", theme.palette.grey[300]);
    } else {
      root.style.setProperty("--scrollbar-thumb", theme.palette.grey[800]);
      root.style.setProperty(
        "--scrollbar-thumb-hover",
        theme.palette.grey[600]
      );
      root.style.setProperty("--scrollbar-track", theme.palette.grey[900]);
    }
  }, [theme]);
};
