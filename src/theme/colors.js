// Nebras Dashboard Color Palette

// Base color values
export const baseColors = {
  // Primary - Blue - Improved gradient
  blue50: '#e6f3ff',
  blue100: '#b3d9ff',
  blue200: '#80bfff',
  blue300: '#4da3ff',
  blue400: '#1a87ff',
  blue500: '#0075ff', // Blue brand color
  blue600: '#0066e6',
  blue700: '#005acc',
  blue800: '#0047b3',
  blue900: '#003d99',

  // Primary - Teal - Improved gradient
  teal50: '#e6f9f3',
  teal100: '#b3f0d9',
  teal200: '#80e7bf',
  teal300: '#4dddb0',
  teal400: '#1ad3a1',
  teal500: '#17cd96', // Teal brand color
  teal600: '#14b885',
  teal700: '#12a376',
  teal800: '#0f8e67',
  teal900: '#0d7a58',

  // Nebras Green (kept for reference) - Improved gradient
  green50: '#e6f2ed',
  green100: '#b3dcc6',
  green200: '#80c69f',
  green300: '#4db078',
  green400: '#33a872',
  green500: '#006239',
  green600: '#005530',
  green700: '#004d2d',
  green800: '#003d24',
  green900: '#003320',

  // Pinks/Reds (Secondary) - Improved gradient
  pink50: '#fce4ec',
  pink100: '#f8bbd0',
  pink200: '#ff5983',
  pink300: '#ff4081',
  pink400: '#f50057',
  pink500: '#e91e63',
  pink600: '#dc004e',
  pink700: '#c2185b',
  pink800: '#ad1457',
  pink900: '#9a0036',

  // Greens (Success)
  successGreen400: '#4caf50',
  successGreen600: '#2e7d32',
  successGreen900: '#1b5e20',

  // Reds (Error) - Improved gradient
  red50: '#ffebee',
  red100: '#ffcdd2',
  red200: '#ef9a9a',
  red300: '#ef5350',
  red400: '#f44336',
  red500: '#d32f2f',
  red600: '#c62828',
  red700: '#b71c1c',
  red800: '#9f1a1a',
  red900: '#7f0000',

  // Oranges (Warning) - Improved gradient
  orange50: '#fff3e0',
  orange100: '#ffe0b2',
  orange200: '#ffcc80',
  orange300: '#ffb74d',
  orange400: '#ff9800',
  orange500: '#fb8c00',
  orange600: '#ed6c02',
  orange700: '#e65100',
  orange800: '#d84315',
  orange900: '#bf360c',

  // Light Blues (Info) - Improved gradient
  lightBlue50: '#e1f5fe',
  lightBlue100: '#b3e5fc',
  lightBlue200: '#81d4fa',
  lightBlue300: '#03a9f4',
  lightBlue400: '#039be5',
  lightBlue500: '#0288d1',
  lightBlue600: '#0277bd',
  lightBlue700: '#01579b',
  lightBlue800: '#014377',
  lightBlue900: '#012f54',

  // Grays (Light mode) - Complete gradient
  gray50: '#fcfcfc',
  gray100: '#f8f8f8',
  gray200: '#e8e8e8',
  gray300: '#d4d4d4',
  gray400: '#b0b0b0',
  gray500: '#8e8e8e',
  gray600: '#6b6b6b',
  gray700: '#4a4a4a',
  gray800: '#2d2d2d',
  gray900: '#1a1a1a',

  // Dark mode backgrounds
  dark900: '#0f0f0f', // Main dark background
  dark800: '#141414', // Dark surface
  dark700: '#1a1a1a', // Elevated surface
  dark600: '#262626', // More elevated
  dark500: '#323232', // Most elevated

  // White & Black
  white: '#ffffff',
  black: '#000000',

  // Dark mode text
  darkText100: '#b0b0b0',
  darkText200: '#666666',

  // colors for color picker
  colorPickerColors: {
    blue: '#3b82f6',
    red: '#ef4444',
    green: '#22c55e',
    pink: '#ec4899',
    orange: '#ff8200',
    purple: '#a855f7',
  },
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
  light: baseColors.gray100,
  dark: baseColors.dark700,
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
