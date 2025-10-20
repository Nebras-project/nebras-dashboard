// Nebras Dashboard Typography Configuration

// Font families
const fontFamilies = {
  system: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ],
  emoji: ['"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'],
  arabic: ['"Cairo"', '"Tajawal"', '"Almarai"'],
};

// Font weights
export const fontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

// Font sizes
export const fontSizes = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  md: "1rem", // 16px
  lg: "1.25rem", // 20px
  xl: "1.5rem", // 24px
  "2xl": "1.75rem", // 28px
  "3xl": "2rem", // 32px
  "4xl": "2.5rem", // 40px
};

// Line heights
export const lineHeights = {
  tight: 1.2,
  snug: 1.3,
  normal: 1.4,
  relaxed: 1.5,
  loose: 1.57,
  extraLoose: 1.66,
  veryLoose: 1.75,
  superLoose: 2.66,
};

export const typography = {
  fontFamily: [
    ...fontFamilies.system,
    ...fontFamilies.emoji,
    ...fontFamilies.arabic,
  ].join(","),

  h1: {
    fontSize: fontSizes["4xl"],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
  },
  h2: {
    fontSize: fontSizes["3xl"],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.snug,
  },
  h3: {
    fontSize: fontSizes["2xl"],
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.normal,
  },
  h4: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.normal,
  },
  h5: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.relaxed,
  },
  h6: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.relaxed,
  },
  subtitle1: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.veryLoose,
  },
  subtitle2: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.loose,
  },
  body1: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.relaxed,
  },
  body2: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  },
  button: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.veryLoose,
    textTransform: "none",
  },
  caption: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.extraLoose,
  },
  overline: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.superLoose,
    textTransform: "uppercase",
  },
};
