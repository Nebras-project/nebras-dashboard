# Theme System

This directory contains the complete theming system for the Nebras Dashboard, built on Material-UI with full support for light/dark modes, RTL/LTR directions, and custom color schemes.

## Files Overview

```text
src/theme/
├── index.js           # Main theme factory function
├── colors.js          # Complete color palette
├── typography.js      # Typography system with Cairo font
├── components.js      # MUI component overrides
└── README.md         # This file

Related Files:
src/providers/
└── ThemeProvider.jsx  # Theme provider with RTL support

src/utils/
└── colorHelpers.js    # Color manipulation utilities
```

---

## Theme System Architecture

### **index.js** - Theme Factory Function

The main theme creation function that generates a complete Material-UI theme based on user preferences.

```javascript
import { createTheme } from "@mui/material/styles";

export const createAppTheme = (
  mode = "light",           // 'light' | 'dark'
  direction = "ltr",        // 'ltr' | 'rtl'
  colorScheme = "blue",     // 'blue' | 'custom'
  customColor = null        // hex color for custom scheme
) => {
  return createTheme({
    palette: { mode, primary, background, text, divider },
    typography,
    direction,
    spacing: 8,               // 8px base unit
    breakpoints,
    components,
    transitions,
    zIndex,
  });
};
```

### Theme Features

- **Dynamic Theme Creation**: Generated based on user preferences
- **Multiple Color Schemes**: Blue (default), Custom
- **Light/Dark Modes**: Full support with optimized colors
- **RTL Support**: Automatic direction switching for Arabic
- **Custom Color Generation**: Creates full palette from single color
- **Responsive Breakpoints**: Mobile, Tablet, Desktop, Widescreen

---

## Color System

### **colors.js** - Comprehensive Color Palette

#### Base Colors

```javascript
export const baseColors = {
  // Primary - Blue
  blue50: "#e6f3ff",
  blue400: "#4da3ff",
  blue500: "#0075ff",        // Default primary
  blue700: "#005acc",
  blue900: "#003d99",

  // Success
  green50: "#e8f5e9",
  green500: "#2e7d32",
  green700: "#1b5e20",

  // Error
  red50: "#ffebee",
  red500: "#d32f2f",
  red700: "#c62828",

  // Warning
  orange50: "#fff3e0",
  orange500: "#ed6c02",
  orange700: "#e65100",

  // Info
  cyan50: "#e0f7fa",
  cyan500: "#0288d1",
  cyan700: "#01579b",

  // Gray scales for light mode
  gray50: "#fafafa",
  gray100: "#f5f5f5",
  gray200: "#eeeeee",
  gray300: "#e0e0e0",
  gray400: "#bdbdbd",
  gray500: "#9e9e9e",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",

  // Dark mode backgrounds
  dark500: "#1e1e1e",
  dark600: "#252525",
  dark700: "#2c2c2c",
  dark800: "#171717",
  dark900: "#121212",

  // White & Black
  white: "#ffffff",
  black: "#000000",
};
```

### Color Schemes

#### 1. **Blue Scheme** (Default)
- Primary: `#0075ff`
- Light: `#4da3ff`
- Dark: `#005acc`
- Background: `#e6f3ff` (light) / `#003d99` (dark)

#### 2. **Custom Scheme**
- User-selected color
- Auto-generated palette (light, main, dark variants)
- Calculated background colors

### Semantic Colors

```javascript
export const colors = {
  primary: { main, light, dark, contrastText },
  secondary: { main, light, dark, contrastText },
  success: { main: '#2e7d32', light: '#4caf50', dark: '#1b5e20' },
  error: { main: '#d32f2f', light: '#e57373', dark: '#c62828' },
  warning: { main: '#ed6c02', light: '#ff9800', dark: '#e65100' },
  info: { main: '#0288d1', light: '#03a9f4', dark: '#01579b' },
};
```

### Background Colors

**Light Mode:**
- Default: `#ffffff`
- Paper: `#f5f5f5`
- Surface levels: white, gray50, gray100

**Dark Mode:**
- Default: `#121212`
- Paper: `#171717`
- Surface levels: dark800, dark600, dark500

### Text Colors

**Light Mode:**
- Primary: `#212121` (gray900)
- Secondary: `#757575` (gray700)
- Disabled: `#bdbdbd` (gray800)

**Dark Mode:**
- Primary: `#ffffff`
- Secondary: `#b0b0b0`
- Disabled: `#666666`

---

## Typography System

### **typography.js** - Cairo Font & Type Scale

#### Font Stack

```javascript
fontFamily: "Cairo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
```

#### Font Weights

- Regular: 400
- Medium: 500
- Semi-Bold: 600
- Bold: 700

#### Type Scale

| Variant | Size | Weight | Line Height |
|---------|------|--------|-------------|
| h1 | 40px | 700 | 1.2 |
| h2 | 32px | 700 | 1.3 |
| h3 | 28px | 600 | 1.4 |
| h4 | 24px | 600 | 1.4 |
| h5 | 20px | 600 | 1.5 |
| h6 | 16px | 600 | 1.5 |
| subtitle1 | 16px | 500 | 1.75 |
| subtitle2 | 14px | 500 | 1.57 |
| body1 | 16px | 400 | 1.5 |
| body2 | 14px | 400 | 1.4 |
| button | 14px | 600 | 1.75 |
| caption | 12px | 400 | 1.66 |
| overline | 12px | 600 | 2.66 |

#### Typography Features

- ✅ **Cairo Font**: Installed via `@fontsource/cairo`
- ✅ **Arabic Support**: Excellent Arabic rendering
- ✅ **Consistent Scale**: Harmonious type hierarchy
- ✅ **No Text Transform**: Buttons use natural casing
- ✅ **Readable Line Heights**: Optimized for readability

---

## Spacing System

```javascript
export const spacing = {
  none: 0,      // 0px
  xxs: 2,       // 2px
  xs: 4,        // 4px
  sm: 8,        // 8px
  md: 16,       // 16px
  lg: 24,       // 24px
  xl: 32,       // 32px
  xxl: 48,      // 48px
  xxxl: 64,     // 64px
};
```

**Base Unit**: 8px (Material Design standard)

**Usage**: `theme.spacing(2)` = 16px

---

## Breakpoint System

```javascript
const breakpoints = {
  mobile: 0,         // 0px - 767px
  tablet: 768,       // 768px - 1023px
  desktop: 1024,     // 1024px - 1439px
  widescreen: 1440,  // 1440px+
};
```

### Responsive Usage

```javascript
sx={{
  width: { mobile: '100%', tablet: '50%', desktop: '33%' }
}}
```

---

## Component Overrides

### **components.js** - MUI Component Customization

#### Border Radius

```javascript
export const borderRadius = {
  none: 0,
  xxs: 1,
  xs: 2,
  sm: 4,
  md: 8,        // Default for buttons, cards
  lg: 12,
  xl: 16,
  full: 9999,   // Fully rounded
};
```

#### Custom Shadows

- Light mode: Subtle shadows
- Dark mode: Elevated shadows

#### Component Style Overrides

- **MuiButton**: Custom border radius, padding, font weight
- **MuiCard**: Elevated surface, border radius
- **MuiTextField**: Outlined style customization
- **MuiDrawer**: Smooth transitions
- **MuiAppBar**: Elevation and colors
- **MuiDataGrid**: Table styling
- And more...

---

## Theme Provider Implementation

### **ThemeProvider.jsx** - Provider with RTL Support

```javascript
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

// RTL cache for Arabic
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// LTR cache for English
const cacheLtr = createCache({
  key: 'muiltr',
});

const ThemeProvider = ({ children }) => {
  const theme = useMuiTheme();          // Get dynamic theme
  const { isRTL } = useLanguage();      // Check direction
  useDocumentDirection();               // Update HTML dir
  useCssVariables(theme);               // Set CSS variables
  
  const cache = isRTL ? cacheRtl : cacheLtr;
  
  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};
```

### ThemeProvider Features

- ✅ **Dynamic Theme**: Reacts to mode, language, and color changes
- ✅ **RTL Support**: Separate Emotion caches for LTR/RTL
- ✅ **CssBaseline**: Material UI baseline styles
- ✅ **Document Direction**: Auto-updates HTML `dir` attribute
- ✅ **CSS Variables**: Sets custom properties for scrollbar, selection
- ✅ **Performance**: Memoized cache selection

---

## Color Helpers

### **colorHelpers.js** - Custom Color Generation

```javascript
// Adjust brightness
export const adjustColor = (hex, percent) => {
  // Lightens (positive) or darkens (negative) a color
};

// Generate full palette
export const generateColorPalette = (baseColor) => {
  return {
    light: adjustColor(baseColor, 40),   // +40% lighter
    main: baseColor,                     // Original
    dark: adjustColor(baseColor, -30),   // -30% darker
    contrastText: "#ffffff",
  };
};

// Generate background
export const generateBackgroundColor = (baseColor, mode) => {
  return mode === 'light' 
    ? adjustColor(baseColor, 85)   // Very light
    : adjustColor(baseColor, -60); // Very dark
};
```

### Usage Example

```javascript
// User picks #ff5983
// Generates: 
// - light: #ff8ba8
// - main: #ff5983
// - dark: #b33e5c
// - background: #ffeef3 (light) / #660024 (dark)
```

---

## Theme Transitions

```javascript
const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,      // Default
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
};
```

---

## Z-Index Layers

```javascript
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
```

---

## Theme Benefits

- ✅ **Fully Customizable**: Three color schemes + custom
- ✅ **Dark Mode**: Optimized colors for both modes
- ✅ **RTL Ready**: Complete Arabic/RTL support
- ✅ **Consistent**: Unified design system
- ✅ **Accessible**: WCAG compliant color contrasts
- ✅ **Responsive**: Mobile-first breakpoints
- ✅ **Type Safe**: PropTypes validation
- ✅ **Performance**: Memoized theme generation
- ✅ **Cairo Font**: Beautiful Arabic typography
- ✅ **Material Design**: Based on Material Design 3

---

## Usage Examples

### Using Theme in Components

```javascript
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        p: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
      }}
    >
      Content
    </Box>
  );
}
```

### Using Custom Spacing

```javascript
import { spacing } from '../theme';

<Box sx={{ mt: spacing.lg, px: spacing.md }}>
  Content with custom spacing
</Box>
```

### Using Border Radius

```javascript
import { borderRadius } from '../theme/components';

<Card sx={{ borderRadius: `${borderRadius.lg}px` }}>
  Card content
</Card>
```

---

## Related Hooks

- **useMuiTheme()** - Gets the current MUI theme object
- **useReduxTheme()** - Accesses theme mode from Redux (light/dark)
- **useColorScheme()** - Accesses color scheme state (blue/custom)
- **useLanguage()** - Accesses language state (affects RTL/LTR)
- **useCssVariables()** - Sets CSS custom properties from theme
- **useDocumentDirection()** - Updates HTML direction attribute

---

## Theme Update Flow

```text
User Action (toggle theme, change language, pick color)
    ↓
Redux State Updates
    ↓
useMuiTheme() Regenerates Theme
    ↓
ThemeProvider Receives New Theme
    ↓
Cache Switches (RTL/LTR if language changed)
    ↓
All Components Re-render with New Theme
```

---

**Last Updated:** 2025-10-25

