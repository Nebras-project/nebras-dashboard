import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import {
  colors,
  customBackgrounds,
  textColors,
  dividerColors,
  backgroundDefaults,
  baseColors,
} from './colors';
import { typography } from './typography';
import { getComponentOverrides } from './components';
import { generateColorPalette, generateBackgroundColor } from '@utils';

// Spacing system (based on 8px grid)
const spacing = {
  none: 0,
  xxs: 2, // 2px
  xs: 4, // 4px
  sm: 8, // 8px
  md: 16, // 16px
  lg: 24, // 24px
  xl: 32, // 32px
  xxl: 48, // 48px
  xxxl: 64, // 64px
};

// Base spacing unit
const baseSpacingUnit = 8;

// Breakpoint values
const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  widescreen: 1440,
};

// Shape configuration
const shape = {
  borderRadius: 8,
};

// Transition durations
const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
};

// Z-index values
const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

// Create theme based on mode, direction, and color scheme
export const createAppTheme = (
  mode = 'light',
  direction = 'ltr',
  colorScheme = 'default',
  customColor = null
) => {
  // Ensure mode is valid ('light' or 'dark'), default to 'light' if invalid
  const validMode = mode === 'light' || mode === 'dark' ? mode : 'light';

  // Determine primary colors based on color scheme
  let primaryColors;
  let primaryBackground;

  if (colorScheme === 'custom' && customColor) {
    // Generate palette from custom color
    primaryColors = generateColorPalette(customColor);
    primaryBackground = generateBackgroundColor(customColor, validMode);
  } else if (colorScheme === 'default') {
    primaryColors = {
      main: baseColors.teal500,
      light: baseColors.teal400,
      dark: baseColors.teal700,
      contrastText: baseColors.white,
    };
    primaryBackground = validMode === 'light' ? baseColors.teal50 : baseColors.teal400;
  }

  // Get background values with fallbacks
  const backgrounds = customBackgrounds[validMode] || customBackgrounds.light;
  const defaults = backgroundDefaults[validMode] || backgroundDefaults.light;
  const text = textColors[validMode] || textColors.light;
  const divider =
    dividerColors[validMode] !== undefined ? dividerColors[validMode] : dividerColors.light;

  const baseTheme = createTheme({
    palette: {
      mode: validMode,
      ...colors,
      primary: primaryColors,
      background: {
        default: defaults.default,
        paper: defaults.paper,
        primary: primaryBackground,
        secondary: backgrounds.secondary,
        surface: backgrounds.surface,
      },
      text: text,
      divider: divider,
    },
    typography,
    direction,
    shape,
    spacing: baseSpacingUnit,
    customSpacing: spacing,
    breakpoints: {
      values: breakpoints,
    },
    components: getComponentOverrides(validMode),
    transitions,
    zIndex,
  });

  return responsiveFontSizes(baseTheme, {
    breakpoints: ['tablet', 'desktop', 'widescreen'],
  });
};

// Export theme creator as default
export default createAppTheme;

// Re-export commonly used theme utilities
export { spacing, breakpoints, shape, transitions, zIndex };

// Re-export from colors
export {
  baseColors,
  colors,
  customBackgrounds,
  textColors,
  dividerColors,
  backgroundDefaults,
} from './colors';

// Re-export from typography
export { fontWeights, fontSizes, lineHeights } from './typography';

// Re-export from components
export { borderRadius, borderWidth, shadows } from './components';
