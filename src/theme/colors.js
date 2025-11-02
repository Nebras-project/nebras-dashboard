// Nebras Dashboard Color Palette

// Base color values
export const baseColors = {
  // Primary - Blue
  blue50: '#e6f3ff',
  blue400: '#4da3ff',
  blue500: '#0075ff', // Blue brand color
  blue700: '#005acc',
  blue900: '#003d99',

  // Primary - Teal
  teal50: '#e6f9f3',
  teal400: '#4dddb0',
  teal500: '#17cd96', // Teal brand color
  teal700: '#12a376',
  teal900: '#0d7a58',

  // Nebras Green (kept for reference)
  green50: '#e6f2ed',
  green400: '#33a872',
  green500: '#006239',
  green700: '#004d2d',
  green900: '#003320',

  // Pinks/Reds (Secondary)
  pink50: '#fce4ec',
  pink200: '#ff5983',
  pink700: '#dc004e',
  pink900: '#9a0036',
  pink950: '#880e4f',

  // Greens (Success)
  successGreen400: '#4caf50',
  successGreen600: '#2e7d32',
  successGreen900: '#1b5e20',

  // Reds (Error)
  red300: '#ef5350',
  red500: '#d32f2f',
  red600: '#c62828',
  red700: '#f44336',

  // Oranges (Warning)
  orange400: '#ff9800',
  orange600: '#ed6c02',
  orange800: '#e65100',
  orange900: '#f57c00',

  // Light Blues (Info)
  lightBlue300: '#03a9f4',
  lightBlue500: '#0288d1',
  lightBlue900: '#01579b',

  // Grays (Light mode)
  gray50: '#fafafa',
  gray100: '#f5f5f5',
  gray200: '#e0e0e0',
  gray700: '#757575',
  gray800: '#bdbdbd',
  gray900: '#212121',

  // Dark mode backgrounds
  dark900: '#121212', // Main dark background
  dark800: '#171717', // Dark surface
  dark700: '#1e1e1e', // Elevated surface
  dark600: '#2c2c2c', // More elevated
  dark500: '#383838', // Most elevated

  // White & Black
  white: '#ffffff',
  black: '#000000',

  // Dark mode text
  darkText100: '#b0b0b0',
  darkText200: '#666666',
};

export const colors = {
  primary: {
    main: baseColors.blue500,
    light: baseColors.blue400,
    dark: baseColors.blue700,
    contrastText: baseColors.white,
  },
  secondary: {
    main: baseColors.green500,
    light: baseColors.green400,
    dark: baseColors.green700,
    contrastText: baseColors.white,
  },
  success: {
    main: baseColors.successGreen600,
    light: baseColors.successGreen400,
    dark: baseColors.successGreen900,
    contrastText: baseColors.white,
  },
  error: {
    main: baseColors.red500,
    light: baseColors.red300,
    dark: baseColors.red600,
    contrastText: baseColors.white,
  },
  warning: {
    main: baseColors.orange600,
    light: baseColors.orange400,
    dark: baseColors.orange800,
    contrastText: baseColors.white,
  },
  info: {
    main: baseColors.lightBlue500,
    light: baseColors.lightBlue300,
    dark: baseColors.lightBlue900,
    contrastText: baseColors.white,
  },
};

// Custom backgrounds for light and dark modes
export const customBackgrounds = {
  light: {
    primary: baseColors.blue50,
    secondary: baseColors.green50,
    surface: {
      level1: baseColors.white,
      level2: baseColors.gray50,
      level3: baseColors.gray100,
    },
  },
  dark: {
    primary: baseColors.blue900,
    secondary: baseColors.green900,
    surface: {
      level1: baseColors.dark800, // #171717
      level2: baseColors.dark600, // #2c2c2c
      level3: baseColors.dark500, // #383838
    },
  },
};

// Text colors for light and dark modes
export const textColors = {
  light: {
    primary: baseColors.gray900,
    secondary: baseColors.gray700,
    disabled: baseColors.gray800,
  },
  dark: {
    primary: baseColors.white,
    secondary: baseColors.darkText100,
    disabled: baseColors.darkText200,
  },
};

// Divider colors
export const dividerColors = {
  light: baseColors.gray200,
  dark: baseColors.dark600,
};
// Border colors
export const borderColors = {
  light: baseColors.gray200,
  dark: baseColors.dark600,
};

// Background defaults
export const backgroundDefaults = {
  light: {
    default: baseColors.white,
    paper: baseColors.gray100,
  },
  dark: {
    default: baseColors.dark900, // #121212
    paper: baseColors.dark800, // #171717
  },
};

// Navigation Hover Effect Colors
export const NAV_HOVER_BORDER_INDICATOR = 'primary.main';
export const NAV_HOVER_ICON_COLOR = 'primary.main';
export const NAV_HOVER_SHIMMER_LIGHT = 'rgba(255, 255, 255, 0.3)';
export const NAV_HOVER_SHIMMER_DARK = 'rgba(255, 255, 255, 0.1)';
