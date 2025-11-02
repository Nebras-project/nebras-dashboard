// Base spacing values (multipliers for 8px grid)
export const SPACING_VALUES = {
  none: 0, // 0px
  xxs: 0.25, // 2px
  xs: 0.5, // 4px
  sm: 1, // 8px
  md: 2, // 16px
  lg: 3, // 24px
  xl: 4, // 32px
  xxl: 6, // 48px
  xxxl: 8, // 64px
};

// Padding utilities
export const padding = {
  // All sides
  all: {
    none: { p: SPACING_VALUES.none },
    xxs: { p: SPACING_VALUES.xxs },
    xs: { p: SPACING_VALUES.xs },
    sm: { p: SPACING_VALUES.sm },
    md: { p: SPACING_VALUES.md },
    lg: { p: SPACING_VALUES.lg },
    xl: { p: SPACING_VALUES.xl },
    xxl: { p: SPACING_VALUES.xxl },
    xxxl: { p: SPACING_VALUES.xxxl },
  },
  // Top
  top: {
    none: { pt: SPACING_VALUES.none },
    xxs: { pt: SPACING_VALUES.xxs },
    xs: { pt: SPACING_VALUES.xs },
    sm: { pt: SPACING_VALUES.sm },
    md: { pt: SPACING_VALUES.md },
    lg: { pt: SPACING_VALUES.lg },
    xl: { pt: SPACING_VALUES.xl },
    xxl: { pt: SPACING_VALUES.xxl },
    xxxl: { pt: SPACING_VALUES.xxxl },
  },
  // Bottom
  bottom: {
    none: { pb: SPACING_VALUES.none },
    xxs: { pb: SPACING_VALUES.xxs },
    xs: { pb: SPACING_VALUES.xs },
    sm: { pb: SPACING_VALUES.sm },
    md: { pb: SPACING_VALUES.md },
    lg: { pb: SPACING_VALUES.lg },
    xl: { pb: SPACING_VALUES.xl },
    xxl: { pb: SPACING_VALUES.xxl },
    xxxl: { pb: SPACING_VALUES.xxxl },
  },
  // Left
  left: {
    none: { pl: SPACING_VALUES.none },
    xxs: { pl: SPACING_VALUES.xxs },
    xs: { pl: SPACING_VALUES.xs },
    sm: { pl: SPACING_VALUES.sm },
    md: { pl: SPACING_VALUES.md },
    lg: { pl: SPACING_VALUES.lg },
    xl: { pl: SPACING_VALUES.xl },
    xxl: { pl: SPACING_VALUES.xxl },
    xxxl: { pl: SPACING_VALUES.xxxl },
  },
  // Right
  right: {
    none: { pr: SPACING_VALUES.none },
    xxs: { pr: SPACING_VALUES.xxs },
    xs: { pr: SPACING_VALUES.xs },
    sm: { pr: SPACING_VALUES.sm },
    md: { pr: SPACING_VALUES.md },
    lg: { pr: SPACING_VALUES.lg },
    xl: { pr: SPACING_VALUES.xl },
    xxl: { pr: SPACING_VALUES.xxl },
    xxxl: { pr: SPACING_VALUES.xxxl },
  },
  // Horizontal (left + right)
  x: {
    none: { px: SPACING_VALUES.none },
    xxs: { px: SPACING_VALUES.xxs },
    xs: { px: SPACING_VALUES.xs },
    sm: { px: SPACING_VALUES.sm },
    md: { px: SPACING_VALUES.md },
    lg: { px: SPACING_VALUES.lg },
    xl: { px: SPACING_VALUES.xl },
    xxl: { px: SPACING_VALUES.xxl },
    xxxl: { px: SPACING_VALUES.xxxl },
  },
  // Vertical (top + bottom)
  y: {
    none: { py: SPACING_VALUES.none },
    xxs: { py: SPACING_VALUES.xxs },
    xs: { py: SPACING_VALUES.xs },
    sm: { py: SPACING_VALUES.sm },
    md: { py: SPACING_VALUES.md },
    lg: { py: SPACING_VALUES.lg },
    xl: { py: SPACING_VALUES.xl },
    xxl: { py: SPACING_VALUES.xxl },
    xxxl: { py: SPACING_VALUES.xxxl },
  },
};

// Margin utilities
export const margin = {
  // All sides
  all: {
    none: { m: SPACING_VALUES.none },
    xxs: { m: SPACING_VALUES.xxs },
    xs: { m: SPACING_VALUES.xs },
    sm: { m: SPACING_VALUES.sm },
    md: { m: SPACING_VALUES.md },
    lg: { m: SPACING_VALUES.lg },
    xl: { m: SPACING_VALUES.xl },
    xxl: { m: SPACING_VALUES.xxl },
    xxxl: { m: SPACING_VALUES.xxxl },
    auto: { m: 'auto' },
  },
  // Top
  top: {
    none: { mt: SPACING_VALUES.none },
    xxs: { mt: SPACING_VALUES.xxs },
    xs: { mt: SPACING_VALUES.xs },
    sm: { mt: SPACING_VALUES.sm },
    md: { mt: SPACING_VALUES.md },
    lg: { mt: SPACING_VALUES.lg },
    xl: { mt: SPACING_VALUES.xl },
    xxl: { mt: SPACING_VALUES.xxl },
    xxxl: { mt: SPACING_VALUES.xxxl },
    auto: { mt: 'auto' },
  },
  // Bottom
  bottom: {
    none: { mb: SPACING_VALUES.none },
    xxs: { mb: SPACING_VALUES.xxs },
    xs: { mb: SPACING_VALUES.xs },
    sm: { mb: SPACING_VALUES.sm },
    md: { mb: SPACING_VALUES.md },
    lg: { mb: SPACING_VALUES.lg },
    xl: { mb: SPACING_VALUES.xl },
    xxl: { mb: SPACING_VALUES.xxl },
    xxxl: { mb: SPACING_VALUES.xxxl },
    auto: { mb: 'auto' },
  },
  // Left
  left: {
    none: { ml: SPACING_VALUES.none },
    xxs: { ml: SPACING_VALUES.xxs },
    xs: { ml: SPACING_VALUES.xs },
    sm: { ml: SPACING_VALUES.sm },
    md: { ml: SPACING_VALUES.md },
    lg: { ml: SPACING_VALUES.lg },
    xl: { ml: SPACING_VALUES.xl },
    xxl: { ml: SPACING_VALUES.xxl },
    xxxl: { ml: SPACING_VALUES.xxxl },
    auto: { ml: 'auto' },
  },
  // Right
  right: {
    none: { mr: SPACING_VALUES.none },
    xxs: { mr: SPACING_VALUES.xxs },
    xs: { mr: SPACING_VALUES.xs },
    sm: { mr: SPACING_VALUES.sm },
    md: { mr: SPACING_VALUES.md },
    lg: { mr: SPACING_VALUES.lg },
    xl: { mr: SPACING_VALUES.xl },
    xxl: { mr: SPACING_VALUES.xxl },
    xxxl: { mr: SPACING_VALUES.xxxl },
    auto: { mr: 'auto' },
  },
  // Horizontal (left + right)
  x: {
    none: { mx: SPACING_VALUES.none },
    xxs: { mx: SPACING_VALUES.xxs },
    xs: { mx: SPACING_VALUES.xs },
    sm: { mx: SPACING_VALUES.sm },
    md: { mx: SPACING_VALUES.md },
    lg: { mx: SPACING_VALUES.lg },
    xl: { mx: SPACING_VALUES.xl },
    xxl: { mx: SPACING_VALUES.xxl },
    xxxl: { mx: SPACING_VALUES.xxxl },
    auto: { mx: 'auto' },
  },
  // Vertical (top + bottom)
  y: {
    none: { my: SPACING_VALUES.none },
    xxs: { my: SPACING_VALUES.xxs },
    xs: { my: SPACING_VALUES.xs },
    sm: { my: SPACING_VALUES.sm },
    md: { my: SPACING_VALUES.md },
    lg: { my: SPACING_VALUES.lg },
    xl: { my: SPACING_VALUES.xl },
    xxl: { my: SPACING_VALUES.xxl },
    xxxl: { my: SPACING_VALUES.xxxl },
    auto: { my: 'auto' },
  },
};

// Gap utilities (for flexbox/grid)
export const gap = {
  none: { gap: SPACING_VALUES.none },
  xxs: { gap: SPACING_VALUES.xxs },
  xs: { gap: SPACING_VALUES.xs },
  sm: { gap: SPACING_VALUES.sm },
  md: { gap: SPACING_VALUES.md },
  lg: { gap: SPACING_VALUES.lg },
  xl: { gap: SPACING_VALUES.xl },
  xxl: { gap: SPACING_VALUES.xxl },
  xxxl: { gap: SPACING_VALUES.xxxl },
};

// Row gap utilities
export const rowGap = {
  none: { rowGap: SPACING_VALUES.none },
  xxs: { rowGap: SPACING_VALUES.xxs },
  xs: { rowGap: SPACING_VALUES.xs },
  sm: { rowGap: SPACING_VALUES.sm },
  md: { rowGap: SPACING_VALUES.md },
  lg: { rowGap: SPACING_VALUES.lg },
  xl: { rowGap: SPACING_VALUES.xl },
  xxl: { rowGap: SPACING_VALUES.xxl },
  xxxl: { rowGap: SPACING_VALUES.xxxl },
};

// Column gap utilities
export const columnGap = {
  none: { columnGap: SPACING_VALUES.none },
  xxs: { columnGap: SPACING_VALUES.xxs },
  xs: { columnGap: SPACING_VALUES.xs },
  sm: { columnGap: SPACING_VALUES.sm },
  md: { columnGap: SPACING_VALUES.md },
  lg: { columnGap: SPACING_VALUES.lg },
  xl: { columnGap: SPACING_VALUES.xl },
  xxl: { columnGap: SPACING_VALUES.xxl },
  xxxl: { columnGap: SPACING_VALUES.xxxl },
};

// Export all spacing utilities as a single object
export const spacing = {
  padding,
  margin,
  gap,
  rowGap,
  columnGap,
  values: SPACING_VALUES,
};

// Default export
export default spacing;
