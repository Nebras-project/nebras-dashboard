import { createTheme } from "@mui/material/styles";
import {
  colors,
  customBackgrounds,
  textColors,
  dividerColors,
  backgroundDefaults,
} from "./colors";
import { typography } from "./typography";
import { getComponentOverrides } from "./components";

// Spacing system (based on 8px grid)
export const spacing = {
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

// Create theme based on mode and direction
export const createAppTheme = (mode = "light", direction = "ltr") => {
  return createTheme({
    palette: {
      mode,
      ...colors,
      background: {
        default: backgroundDefaults[mode].default,
        paper: backgroundDefaults[mode].paper,
        primary: customBackgrounds[mode].primary,
        secondary: customBackgrounds[mode].secondary,
        surface: customBackgrounds[mode].surface,
      },
      text: textColors[mode],
      divider: dividerColors[mode],
    },
    typography,
    direction,
    shape,
    spacing: baseSpacingUnit,
    customSpacing: spacing,
    breakpoints: {
      values: breakpoints,
    },
    components: getComponentOverrides(mode),
    transitions,
    zIndex,
  });
};

export default createAppTheme;
