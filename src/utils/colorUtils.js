export const adjustColor = (hex, percent) => {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse hex to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Adjust brightness
  r = Math.min(255, Math.max(0, r + (r * percent) / 100));
  g = Math.min(255, Math.max(0, g + (g * percent) / 100));
  b = Math.min(255, Math.max(0, b + (b * percent) / 100));

  // Convert back to hex
  const toHex = (n) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const generateColorPalette = (baseColor) => {
  return {
    main: baseColor,
    light: adjustColor(baseColor, 40),
    dark: adjustColor(baseColor, -30),
    contrastText: '#ffffff',
  };
};

export const generateBackgroundColor = (baseColor, mode) => {
  if (mode === 'light') {
    return adjustColor(baseColor, 85); // Very light version
  } else {
    return adjustColor(baseColor, -60); // Very dark version
  }
};
