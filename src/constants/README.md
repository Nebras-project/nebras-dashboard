# Constants

This directory contains centralized constants used throughout the Nebras Dashboard application.

## Overview

Constants are organized by domain to maintain clarity and prevent magic numbers scattered throughout the codebase. All constants are exported from `index.js` for easy importing.

## File Structure

```text
src/constants/
├── index.js          # Main export file (exports all constants)
├── layout.js         # Layout-related constants (sizes, widths, heights)
└── spacing.js        # Spacing system constants (padding, margin, gap)
```

## Usage

Import constants using the `@constants` alias:

```javascript
import { SIDEBAR_WIDTH, HEADER_HEIGHT, padding, margin } from '@constants';
```

---

## Layout Constants (`layout.js`)

Layout constants define dimensions, sizes, and styling for layout components.

### Header Constants

- **`AVATAR_SIZE`** (35px) - Size of user avatar in header
- **`HEADER_HEIGHT`** (80px) - Height of the main header component

### User Menu Constants

- **`USER_MENU_MIN_WIDTH`** (250px) - Minimum width of user dropdown menu
- **`USER_MENU_BORDER_RADIUS`** (2px) - Border radius for user menu
- **`USER_MENU_MARGIN_TOP`** (1.5) - Top margin for user menu
- **`USER_MENU_ARROW_SIZE`** (10px) - Size of menu arrow indicator
- **`USER_MENU_ARROW_RIGHT_POSITION`** (14px) - Right position of menu arrow
- **`USER_MENU_PAPER_PROPS`** - MUI Paper props for user menu styling

### Logo Header Constants

- **`LOGO_HEIGHT`** (35px) - Height of the logo
- **`LOGO_LETTER_SPACING`** ('0.1rem') - Letter spacing for logo text
- **`COLLAPSE_ICON_SIZE`** (24px) - Size of sidebar collapse icon
- **`CLOSE_ICON_SIZE`** (20px) - Size of sidebar close icon
- **`CLOSE_BUTTON_SIZE`** (32px) - Size of close button container

### Sidebar Constants

- **`SIDEBAR_WIDTH`** (290px) - Expanded sidebar width
- **`SIDEBAR_COLLAPSED_WIDTH`** (80px) - Collapsed sidebar width (icon-only)

### Navigation Menu Constants

- **`NAV_ITEM_HEIGHT`** (48px) - Height of navigation menu items
- **`NAV_ICON_MIN_WIDTH`** (40px) - Minimum width for navigation icons
- **`NAV_ICON_SIZE`** ('1.3rem') - Size of navigation icons
- **`NAV_TRANSITION`** - CSS transition for navigation items
- **`SELECTED_NAV_ITEM_STYLES`** - MUI styles function for selected nav items
- **`LOGOUT_BUTTON_STYLES`** - Styles for logout button
- **`LOGOUT_ICON_STYLES`** - Styles for logout icon

### Color Picker Constants

- **`COLOR_INDICATOR_SIZE`** (23px) - Size of color indicator swatch

### MainLayout Styles

- **`CONTAINER_BASE_STYLES`** - Base styles for main container
- **`MAIN_CONTENT_BASE_STYLES`** - Base styles for main content area

### Usage Example

```javascript
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH, HEADER_HEIGHT } from '@constants';

const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;
```

---

## Spacing Constants (`spacing.js`)

Spacing constants provide a consistent spacing system based on an 8px grid.

### Base Spacing Values

The spacing system uses an 8px base unit with the following multipliers:

```javascript
SPACING_VALUES = {
  none: 0, // 0px
  xxs: 0.25, // 2px
  xs: 0.5, // 4px
  sm: 1, // 8px (base unit)
  md: 2, // 16px
  lg: 3, // 24px
  xl: 4, // 32px
  xxl: 6, // 48px
  xxxl: 8, // 64px
};
```

### Padding Utilities

Padding utilities are organized by direction and size:

```javascript
import { padding } from '@constants';

// All sides
padding.all.sm; // { p: 1 } = 8px padding
padding.all.xl; // { p: 4 } = 32px padding

// Specific directions
padding.top.md; // { pt: 2 } = 16px top padding
padding.bottom.lg; // { pb: 3 } = 24px bottom padding
padding.left.sm; // { pl: 1 } = 8px left padding
padding.right.xs; // { pr: 0.5 } = 4px right padding

// Axes
padding.x.md; // { px: 2 } = 16px horizontal padding
padding.y.lg; // { py: 3 } = 24px vertical padding
```

### Margin Utilities

Margin utilities follow the same structure as padding:

```javascript
import { margin } from '@constants';

// All sides
margin.all.sm; // { m: 1 } = 8px margin
margin.all.auto; // { m: 'auto' } = auto margin

// Specific directions
margin.top.xl; // { mt: 4 } = 32px top margin
margin.bottom.md; // { mb: 2 } = 16px bottom margin
margin.x.auto; // { mx: 'auto' } = auto horizontal margin
```

### Gap Utilities

Gap utilities for flexbox and grid layouts:

```javascript
import { gap, rowGap, columnGap } from '@constants';

gap.sm; // { gap: 1 } = 8px gap
rowGap.lg; // { rowGap: 3 } = 24px row gap
columnGap.md; // { columnGap: 2 } = 16px column gap
```

### Spacing Object

All spacing utilities are also available as a single object:

```javascript
import { spacing } from '@constants';

spacing.padding.x.sm; // Same as padding.x.sm
spacing.margin.top.lg; // Same as margin.top.lg
spacing.gap.md; // Same as gap.md
spacing.values; // SPACING_VALUES object
```

### Usage Examples

```javascript
import { padding, margin, gap } from '@constants';

// MUI Box component
<Box sx={{ ...padding.x.md, ...margin.bottom.lg }}>
  Content
</Box>

// Grid/Flexbox
<Box sx={{ ...gap.sm, display: 'flex' }}>
  <Item />
  <Item />
</Box>

// Responsive spacing
<Box sx={{
  ...padding.all.sm,
  '@media (min-width: 768px)': {
    ...padding.all.lg,
  },
}}>
  Content
</Box>
```

---

## Best Practices

1. **Always use constants** - Never hardcode sizes, widths, or spacing values
2. **Import from `@constants`** - Use the centralized export for consistency
3. **Use spacing utilities** - Prefer spacing utilities over manual calculations
4. **Follow the 8px grid** - All spacing should align with the base unit system
5. **Document new constants** - Add JSDoc comments for new constants explaining their purpose

---

## Adding New Constants

When adding new constants:

1. **Choose the right file** - Add to `layout.js` or `spacing.js` based on domain
2. **Use descriptive names** - Follow existing naming conventions (UPPER_SNAKE_CASE for values, camelCase for objects)
3. **Export from index.js** - Ensure new constants are exported
4. **Update this README** - Document the new constant and its usage
5. **Consider existing values** - Reuse existing spacing values when possible

---

## Related Documentation

- [Layout Components](../../layout/README.md) - Layout components that use these constants
- [Components](../../components/README.md) - Shared components using constants
- [Theme System](../../theme/README.md) - Theme configuration and colors
