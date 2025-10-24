# Layout Components

This folder contains the main layout components for the Nebras Dashboard application, organized into modular folders.

## Folder Structure

```
layout/
├── header/                      # Header module
│   ├── components/              # Header sub-components
│   │   └── UserInfo.jsx        # User avatar, name, and role display
│   ├── Header.jsx              # Main header component
│   ├── headerConfig.js         # Role display names configuration
│   └── index.js                # Header module exports
├── sidebar/                     # Sidebar module
│   ├── components/              # Sidebar sub-components
│   │   ├── LogoHeader.jsx      # Logo and brand name
│   │   ├── NavigationMenu.jsx  # Navigation menu items
│   │   └── SidebarControls.jsx # Bottom controls panel
│   ├── Sidebar.jsx             # Main sidebar component
│   ├── sidebarConfig.jsx       # Navigation items configuration
│   └── index.js                # Sidebar module exports
├── MainLayout.jsx              # Main layout wrapper (Grid-based)
├── constants.js                # Shared layout constants
├── index.js                    # Centralized exports
└── README.md                   # This file
```

---

## Components

### 1. MainLayout.jsx
The main layout wrapper using CSS Grid with fixed columns.

**Features:**
- Grid-based layout with two columns
- Header: Positioned in the first row, second column
- Sidebar: Fixed width (280px), spans all rows
- Main content: Second row, second column
- Conditionally renders layout (hides on login page)
- Smooth transitions and consistent spacing

**Usage:**
```jsx
import { MainLayout } from './layout';

<MainLayout>
  <YourPageContent />
</MainLayout>
```

**Grid Structure:**
```
┌─────────────┬───────────────────────┐
│             │   Header              │
│   Sidebar   ├───────────────────────┤
│   (280px)   │   Main Content        │
│             │   Your pages here     │
└─────────────┴───────────────────────┘
```

---

## Header Module

### Header.jsx
Unified header component displaying user information.

**Features:**
- User information (avatar, name, role)
- Fixed positioning at the top
- Clean, minimal design
- Full theme support

**Component Structure:**
- Uses `UserInfo` for user display

**Configuration:**
Role display names are defined in `headerConfig.js`.

---

### Header Sub-Components

#### UserInfo
Displays user avatar, name, and role in the header.

**Props:**
- `user` - User object containing name and role

**Features:**
- Circular avatar with user's initial
- User's full name
- Role display with proper formatting
- Null-safe rendering
- Theme-consistent styling

---

### headerConfig.js
Configuration file containing role translation keys.

**Exports:**
- `roleTranslationKeys` - Object mapping role keys to i18n translation keys
- `getRoleTranslationKey(role)` - Helper function to get translation key for role display name

**Benefits:**
- Centralized role name configuration with i18n support
- Easy to update translations
- Better maintainability and internationalization
- Reusable across components

---

## Sidebar Module

### Sidebar.jsx
Role-based navigation sidebar with theme controls.

**Features:**
- Fixed width (280px)
- Role-based navigation menus
- Active route highlighting
- Theme and color customization controls
- Language toggle
- Logout button at bottom
- Smooth transitions
- Modular component architecture

**Component Structure:**
- `LogoHeader` - Nebras logo and title
- `NavigationMenu` - Dynamic menu items based on role
- `SidebarControls` - Bottom controls (color picker, theme, language, logout)

**Configuration:**
Navigation items are defined in `sidebarConfig.jsx`.

**Role-Based Menu Items:**

#### Owner / General Admin
- Dashboard
- Students
- Competitions
- Curriculums
- Subjects
- Units
- Questions
- Ministerial Questions
- Enrichment Questions
- Admins

#### Curriculum Manager
- Dashboard
- Curriculums
- Subjects
- Units
- Questions

#### Competition Manager
- Dashboard
- Competitions
- Students

#### Content Manager
- Dashboard
- Questions
- Ministerial Questions
- Enrichment Questions

---

### Sidebar Sub-Components

#### LogoHeader
Displays the Nebras logo and brand name at the top of the sidebar.

**Props:**
- `mode` - Current theme mode ('light' or 'dark') to switch logo variant

**Features:**
- Theme-aware logo switching
- Consistent branding
- Fixed height and responsive layout
- Uses theme spacing values

---

#### NavigationMenu
Renders the role-based navigation menu items.

**Props:**
- `menuItems` - Array of navigation items from sidebarConfig
- `currentPath` - Current route path for active highlighting
- `onNavigate` - Navigation handler function

**Features:**
- Active route highlighting with primary color
- Smooth hover effects
- Icon + text layout
- Responsive font sizing
- Uses theme values for consistency

---

#### SidebarControls
Bottom control panel with customization and action buttons.

**Props:**
- `mode` - Current theme mode
- `currentLanguage` - Current language ('ar' or 'en')
- `scheme` - Color scheme ('blue', 'green', or 'custom')
- `customColor` - Custom color value (hex)
- `onColorChange` - Color change handler
- `onSchemeChange` - Scheme change handler
- `onLanguageToggle` - Language toggle handler
- `onThemeToggle` - Theme toggle handler
- `onLogout` - Logout handler

**Features:**
- Color picker for custom themes
- Preset color scheme toggle (Blue/Green)
- Language switcher (EN/AR)
- Theme toggle (Light/Dark)
- Logout button with error styling

---

### sidebarConfig.jsx
Configuration file containing all navigation items organized by role.

**Exports:**
- `navigationItems` - Object with navigation arrays for each role
- `getNavigationItems(role)` - Helper function to get items for a specific role

**Benefits:**
- Centralized configuration
- Easy to modify menu items
- Better maintainability
- Separation of concerns

---

## Constants

### constants.js
Shared constants used across layout components.

**Exports:**
- `SIDEBAR_WIDTH` - Fixed sidebar width (280px)
- `AVATAR_SIZE` - User avatar size (40px)
- `LOGO_HEIGHT` - Logo height (40px)
- `LOGO_LETTER_SPACING` - Brand name letter spacing
- `BRAND_NAME` - Application brand name
- `NAV_ITEM_HEIGHT` - Navigation item height (48px)
- `NAV_ICON_MIN_WIDTH` - Navigation icon minimum width (40px)
- `NAV_ICON_SIZE` - Navigation icon size
- `NAV_TEXT_SIZE` - Navigation text size
- `NAV_TRANSITION` - Navigation transition timing

---

## Page Layout Patterns

MainLayout provides the main content area. Pages render inside this space.

### Pattern 1: Full Width (Current Approach)
```jsx
import { Box } from '@mui/material';

function MyPage() {
  return (
    <Box>
      {/* Your content spans the full width */}
    </Box>
  );
}
```

### Pattern 2: Centered Content
```jsx
import { Container } from '@mui/material';

function MyPage() {
  return (
    <Container maxWidth="lg">
      {/* Centered content */}
    </Container>
  );
}
```

### Pattern 3: Grid Layout Inside
```jsx
import { Grid } from '@mui/material';

function MyPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {/* Left section */}
      </Grid>
      <Grid item xs={12} md={6}>
        {/* Right section */}
      </Grid>
    </Grid>
  );
}
```

---

## Theme Integration

All layout components use centralized theme values:

### From `theme/index.js`
- `spacing` - Consistent spacing throughout the layout
- `palette` - Colors for backgrounds, text, primary/secondary

### From `theme/typography.js`
- `fontWeights` - Font weights (regular, semiBold, bold)
- `lineHeights` - Line heights for better readability

### From `theme/components.js`
- `borderRadius` - Consistent border radius values

**Benefits:**
- Consistent spacing and styling
- Easy to maintain and update
- Single source of truth for design tokens
- Better design system adherence

---

## Theme Support

All layout components fully support:
- ✅ Light/Dark themes
- ✅ RTL/LTR directions (for Arabic/English)
- ✅ MUI theme system
- ✅ Custom Nebras brand colors
- ✅ Custom color picker
- ✅ Preset color schemes (Blue/Green)

---

## Integration

The layout is integrated in `App.jsx`:

```jsx
import { MainLayout } from './layout';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Your routes */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
```

---

## Redux State Management

Layout components use Redux hooks:
- `useReduxTheme()` - Theme mode (light/dark)
- `useLanguage()` - Current language (ar/en)
- `useColorScheme()` - Color scheme and custom color
- `useUser()` - User info, role, and logout function

---

## Icons

Icons are from `react-icons/md` (Material Design):
- Navigation: MdSpaceDashboard, MdGroups, MdSchool, etc.
- Controls: MdDarkMode, MdLightMode, MdLanguage
- Actions: MdLogout

---

## Refactoring History

### October 22, 2025 - Layout Folder Structure Refactoring

The layout folder was reorganized into a more modular structure:

**Changes:**
1. Created `header/` module with its own components and configuration
2. Created `sidebar/` module with its own components and configuration
3. Moved Header components to `header/components/`
4. Moved Sidebar components to `sidebar/components/`
5. Created index.js exports for each module
6. Updated all import paths
7. Removed old `components/` folder
8. Improved code organization and separation of concerns

**Previous Structure:**
```
layout/
├── components/
│   ├── LogoHeader.jsx
│   ├── NavigationMenu.jsx
│   ├── SidebarControls.jsx
│   ├── UserProfile.jsx
│   └── index.js
├── Header.jsx
├── Sidebar.jsx
├── headerConfig.js
├── sidebarConfig.jsx
└── ...
```

**New Structure:**
```
layout/
├── header/
│   ├── components/
│   │   └── UserInfo.jsx
│   ├── Header.jsx
│   ├── headerConfig.js
│   └── index.js
├── sidebar/
│   ├── components/
│   │   ├── LogoHeader.jsx
│   │   ├── NavigationMenu.jsx
│   │   └── SidebarControls.jsx
│   ├── Sidebar.jsx
│   ├── sidebarConfig.jsx
│   └── index.js
└── ...
```

**Benefits:**
- Better module organization
- Clearer separation between header and sidebar concerns
- Easier to locate and maintain related files
- Scalable architecture for future additions
- Each module is self-contained with its own components and config

**Migration:**
No breaking changes. All exports are still available from `./layout`:
```jsx
// Still works the same way
import { MainLayout, Header, Sidebar } from './layout';
```

---

### October 22, 2025 - Layout Components Modularization

#### Sidebar Refactoring
The Sidebar component was refactored into smaller, more maintainable components.

**Changes:**
1. Extracted navigation configuration to `sidebarConfig.jsx`
2. Created `LogoHeader` component for logo and title section
3. Created `NavigationMenu` component for menu items rendering
4. Created `SidebarControls` component for bottom controls panel
5. Updated main `Sidebar.jsx` to orchestrate sub-components
6. Improved navigation icons for better visual distinction

**Results:**
- Reduced from **314 lines to 72 lines** (77% reduction)

#### Header Refactoring
The Header component was refactored into smaller, more maintainable components.

**Changes:**
1. Extracted role display names to `headerConfig.js`
2. Created `UserInfo` component for user information display
3. Updated main `Header.jsx` to orchestrate sub-components
4. Renamed `UserProfile` to `UserInfo` for better clarity

**Results:**
- Reduced from **75 lines to 32 lines** (57% reduction)

#### Overall Benefits
- Improved code organization and readability
- Better separation of concerns
- Easier to test individual components
- More maintainable and scalable architecture
- Simpler to add new features or modify existing ones
- Centralized configuration management

---

**Last Updated:** 2025-10-22
