# Layout Components

This directory contains the main layout components for the Nebras Dashboard application.

## Files Overview

```text
src/layout/
├── MainLayout.jsx                 # Main layout wrapper
├── index.js                       # Layout exports
├── README.md                      # This file
│
├── header/                        # Header components
│   ├── Header.jsx                 # Main header component
│   ├── headerConfig.js            # Header configuration
│   ├── index.js
│   └── components/
│       └── UserInfo.jsx           # User profile display
│
└── sidebar/                       # Sidebar components
    ├── Sidebar.jsx                # Main sidebar component
    ├── sidebarConfig.jsx          # Role-based menu configuration
    ├── index.js
    └── components/
        ├── LogoHeader.jsx         # Logo & brand section
        ├── NavigationMenu.jsx     # Navigation menu items
        └── SidebarControls.jsx    # Bottom controls panel

Note: Layout constants have been moved to src/constants/layout.js
Import using: import { SIDEBAR_WIDTH } from '@constants';
```

---

## Layout Architecture

### **MainLayout.jsx** - Responsive Layout Wrapper

**Purpose**: Main layout container that adapts between mobile and desktop views

**Features:**
- ✅ **Responsive Design**: Different layouts for mobile/desktop
- ✅ **CSS Grid** (Desktop): Persistent sidebar with dynamic width
- ✅ **Flexbox** (Mobile): Stacked layout with drawer sidebar
- ✅ **Login Exclusion**: No layout on login page
- ✅ **Smooth Transitions**: Animated sidebar collapse
- ✅ **Rounded Content**: Modern card-style main content

**Layout Structure:**

```
Desktop (≥1024px):
┌─────────────────────────────────────┐
│ Sidebar │ Header                    │
│ (280px) ├───────────────────────────┤
│         │ Main Content              │
│         │ (Remaining space)         │
└─────────────────────────────────────┘

Mobile (<1024px):
┌─────────────────────────────────────┐
│ Header (with hamburger)             │
├─────────────────────────────────────┤
│ Main Content (full width)           │
│                                     │
└─────────────────────────────────────┘
[Drawer Sidebar] (overlay when open)
```

**Breakpoint Detection:**
```javascript
const isMobile = useMediaQuery(theme.breakpoints.down('desktop')); // < 1024px
```

**Grid Layout (Desktop):**
```javascript
gridTemplateColumns: `${sidebarWidth}px calc(100vw - ${sidebarWidth}px)`
gridTemplateRows: 'auto 1fr'
```

**Sidebar Width Calculation:**
- Expanded: `280px`
- Collapsed: `80px`
- Dynamic transition on collapse toggle

---

## Header Component

**Location:** `src/layout/header/Header.jsx`

**Purpose**: Top navigation bar with user info and mobile menu

**Features:**
- ✅ **Fixed Position**: Stays at top when scrolling
- ✅ **Mobile Menu**: Hamburger icon for drawer toggle
- ✅ **User Info**: Avatar, name, role display
- ✅ **RTL Support**: Menu icon changes for Arabic
- ✅ **Elevation**: Subtle shadow for depth
- ✅ **Theme-Aware**: Adapts to light/dark mode

**Components:**

1. **Header.jsx** - Main header container
   - Hamburger menu (mobile only)
   - User info display
   - AppBar with Toolbar

2. **UserInfo.jsx** - User profile component
   - User avatar
   - User name
   - User role (translated)
   - Profile menu (future)

**Mobile Menu Icon:**
- LTR: `HiMenuAlt2` (opens left)
- RTL: `HiMenuAlt3` (opens right)

**Styling:**
```javascript
position: "fixed"
top: 0
bgcolor: 'background.default'
color: 'text.primary'
elevation: 0
```

---

## Sidebar Component

**Location:** `src/layout/sidebar/Sidebar.jsx`

**Purpose**: Main navigation panel with role-based menu and controls

**Features:**
- ✅ **Role-Based Navigation**: Different menus per user role
- ✅ **Collapsible** (Desktop): Toggle between 280px ↔ 80px
- ✅ **Drawer** (Mobile): Overlay sidebar
- ✅ **Active Highlighting**: Current route indicated
- ✅ **Smooth Animations**: Transition effects
- ✅ **Bottom Controls**: Theme, language, color, logout
- ✅ **Auto-Close** (Mobile): Closes after navigation

**Sidebar Structure:**

```
┌─────────────────────────────┐
│ LogoHeader                  │ ← Logo, brand name, collapse button
├─────────────────────────────┤
│ NavigationMenu              │ ← Role-based menu items
│  • Dashboard                │
│  • Students                 │
│  • Competitions             │
│  • ...                      │
│                             │
│ (scrollable)                │
│                             │
├─────────────────────────────┤
│ SidebarControls             │ ← Bottom panel
│  • Color picker             │
│  • Language toggle          │
│  • Theme toggle             │
│  • Logout                   │
└─────────────────────────────┘
```

**Sidebar Components:**

1. **LogoHeader.jsx** - Brand Identity
   - Nebras logo (theme-aware)
   - Brand name (hidden when collapsed)
   - Collapse toggle button (desktop)
   - Close button (mobile)
   - RTL icon support

2. **NavigationMenu.jsx** - Navigation Items
   - Role-based menu items
   - Active route highlighting
   - Icons + text labels
   - Tooltips in collapsed mode
   - Smooth hover effects

3. **SidebarControls.jsx** - Control Panel
   - Color picker (custom theme)
   - Default color reset
   - Language toggle (AR/EN)
   - Theme toggle (light/dark)
   - Logout button

**Role-Based Menus:**

| Role | Menu Items |
|------|------------|
| **Owner** | All 10 items (full access) |
| **General Admin** | All 10 items (full access) |
| **Curriculum Manager** | 5 items (curriculum focus) |
| **Competition Manager** | 3 items (competitions focus) |
| **Content Manager** | 4 items (questions focus) |

**Navigation Configuration:**

```javascript
// src/layout/sidebar/sidebarConfig.jsx
export const navigationItems = {
  owner: [
    { text: "navigation.dashboard", icon: <TbLayoutDashboardFilled />, path: "/dashboard" },
    { text: "navigation.students", icon: <MdGroups />, path: "/students" },
    // ... 8 more items
  ],
  // ... other roles
};
```

**Desktop vs Mobile Behavior:**

| Feature | Desktop | Mobile |
|---------|---------|--------|
| **Type** | Persistent | Drawer (overlay) |
| **Width** | 280px / 80px | 280px |
| **Collapse** | ✅ Yes | ❌ No |
| **Close** | N/A | ✅ After navigation |
| **Toggle** | Collapse button | Hamburger menu |
| **Position** | Fixed left | Overlay |

**Collapsed Mode (Desktop):**
- Width: `80px`
- Icons only
- Tooltips on hover
- Brand name hidden
- Control labels hidden

**Expanded Mode (Desktop):**
- Width: `280px`
- Icons + text labels
- Full controls visible
- Brand name shown

---

## Layout Constants

Layout constants have been moved to `src/constants/layout.js` for better organization.

**Import constants using:**

```javascript
import { SIDEBAR_WIDTH, NAV_ITEM_HEIGHT, AVATAR_SIZE } from '@constants';
```

**Available constants:**

```javascript
// Sidebar dimensions
SIDEBAR_WIDTH = 280;
SIDEBAR_COLLAPSED_WIDTH = 80;

// Logo & branding
LOGO_HEIGHT = 40;
LOGO_LETTER_SPACING = "0.1rem";

// Navigation items
NAV_ITEM_HEIGHT = 48;
NAV_ICON_MIN_WIDTH = 40;
NAV_ICON_SIZE = "1.375rem";
NAV_TEXT_SIZE = "0.875rem";

// Avatar
AVATAR_SIZE = 35;
```

See `src/constants/README.md` for full documentation.

---

## Layout Benefits

- ✅ **Fully Responsive**: Adapts to all screen sizes
- ✅ **Role-Based Access**: Dynamic menu based on user role
- ✅ **Modern Design**: Clean, card-style layout
- ✅ **Smooth Animations**: Professional transitions
- ✅ **RTL Support**: Complete Arabic layout support
- ✅ **Accessible**: Proper ARIA labels
- ✅ **Performance**: Optimized re-renders
- ✅ **Customizable**: Easy to modify and extend
- ✅ **Mobile-First**: Touch-friendly on mobile
- ✅ **Keyboard Navigation**: Full keyboard support

---

## Custom Hooks Used

- `useSidebar()` - Sidebar state management
- `useUser()` - User authentication & role
- `useReduxTheme()` - Theme mode (light/dark)
- `useLanguage()` - Language & direction
- `useColorScheme()` - Color customization
- `useNavigate()` - Programmatic navigation
- `useLocation()` - Current route detection
- `useMediaQuery()` - Responsive breakpoints

---

## Layout Flow

```text
App Initialization
    ↓
MainLayout renders
    ↓
Detects mobile/desktop
    ↓
├─ Mobile: Flexbox layout
│  ├─ Drawer sidebar (overlay)
│  ├─ Header (with hamburger)
│  └─ Main content (full width)
│
└─ Desktop: Grid layout
   ├─ Persistent sidebar (280px/80px)
   ├─ Header (remaining width)
   └─ Main content (remaining space)
```

---

## Page Layout Patterns

MainLayout provides the main content area. Pages render inside this space.

### Pattern 1: Container with Max Width (Recommended for Dashboards)
```jsx
import { Container } from '@mui/material';

function DashboardPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Content is centered with optimal max-width (1536px) */}
      {/* Provides better readability on large screens */}
    </Container>
  );
}
```

**Benefits:**
- ✅ Optimal content width for readability (1280-1536px)
- ✅ Natural margins on ultra-wide screens
- ✅ Professional dashboard appearance
- ✅ Better visual hierarchy and focus

**Container Sizes:**
- `maxWidth="xl"` - 1536px (Best for data-heavy dashboards)
- `maxWidth="lg"` - 1280px (Best for content-focused pages)
- `maxWidth="md"` - 960px (Best for forms and narrow content)

### Pattern 2: Full Width (Use for Data Tables)
```jsx
import { Box } from '@mui/material';

function DataTablePage() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Your content spans the full width */}
      {/* Good for wide tables and data grids */}
    </Box>
  );
}
```

### Pattern 3: Centered with Grid Layout
```jsx
import { Container, Grid } from '@mui/material';

function MyPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* Left section */}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Right section */}
        </Grid>
      </Grid>
    </Container>
  );
}
```

---

## Theme Integration

All layout components use centralized theme values:

### From `theme/index.js`
- `spacing` - Consistent spacing throughout the layout
- `palette` - Colors for backgrounds, text, primary/secondary
- `breakpoints` - Responsive breakpoint values
- `shape` - Border radius values
- `transitions` - Animation durations

### From `theme/typography.js`
- `fontWeights` - Font weights (regular, semiBold, bold)
- `fontSizes` - Font size scale
- `lineHeights` - Line heights for better readability

### From `theme/components.js`
- MUI component overrides for consistent styling

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
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import routes from './config/routes';
import LanguageSync from './components/LanguageSync';

function App() {
  return (
    <BrowserRouter>
      <LanguageSync />
      <MainLayout>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
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
- `useSidebar()` - Sidebar state (open/collapsed/mobile)

---

## Icons

Icons are from `react-icons` library:
- **Navigation**: `TbLayoutDashboardFilled`, `MdGroups`, `MdSchool`, `MdQuiz`, etc. (Material Design)
- **Controls**: `MdDarkMode`, `MdLightMode`, `MdLanguage`
- **Actions**: `MdLogout`
- **Menu**: `HiMenuAlt2`, `HiMenuAlt3` (Heroicons)
- **Arrows**: `MdChevronLeft`, `MdChevronRight`, `MdClose`

---

## Future Enhancements

- [ ] Breadcrumb navigation
- [ ] Notifications center
- [ ] Global search bar
- [ ] Quick actions menu
- [ ] Keyboard shortcuts
- [ ] Layout presets
- [ ] Customizable sidebar width

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

**Last Updated:** 2025-10-25
