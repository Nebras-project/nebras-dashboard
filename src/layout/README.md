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
│       └── UserInfo.jsx           # User profile display with menu
│
├── mainlayout/                    # MainLayout components
│   ├── index.js                   # MainLayout exports
│   └── components/
│       ├── DesktopLayout.jsx      # Desktop layout grid
│       ├── MobileLayout.jsx       # Mobile layout flexbox
│       └── index.js               # Component exports
│
└── sidebar/                       # Sidebar components
    ├── Sidebar.jsx                # Main sidebar component (orchestrator)
    ├── sidebarConfig.jsx          # Role-based menu configuration
    ├── index.js
    └── components/
        ├── DesktopSidebar.jsx     # Desktop sidebar implementation
        ├── LogoHeader.jsx         # Logo & brand section
        ├── MobileDrawer.jsx       # Mobile drawer overlay
        ├── NavigationDropdown.jsx # Navigation dropdown item
        ├── NavigationItem.jsx     # Navigation item component
        └── NavigationMenu.jsx     # Navigation menu container

Note: Layout constants are in src/constants/layout.js
Import using: import { SIDEBAR_WIDTH, HEADER_HEIGHT } from '@constants';
```

---

## Layout Architecture

### **MainLayout.jsx** - Responsive Layout Wrapper

**Purpose**: Main layout container that adapts between mobile and desktop views

**Features:**

- ✅ **Responsive Design**: Different layouts for mobile/desktop
- ✅ **CSS Grid** (Desktop): Persistent sidebar with dynamic width
- ✅ **Flexbox** (Mobile): Stacked layout with drawer sidebar
- ✅ **Login Exclusion**: No layout on public pages (login, 404)
- ✅ **Smooth Transitions**: Animated sidebar collapse
- ✅ **Performance Optimized**: Memoized layout components

**Layout Structure:**

```text
Desktop (≥1024px):
┌─────────────────────────────────────┐
│ Sidebar │ Header                    │
│ (290px  |                           |
|  /80px) ├___________________________|
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

**Implementation:**

MainLayout uses two separate layout components:

- **DesktopLayout.jsx** - CSS Grid implementation for desktop
- **MobileLayout.jsx** - Flexbox implementation for mobile

**Breakpoint Detection:**

```javascript
const isMobile = useMediaQuery(theme.breakpoints.down('desktop')); // < 1024px
useResponsiveSidebar(isMobile); // Handles sidebar state updates
```

**Grid Layout (Desktop):**

```javascript
gridTemplateColumns: `${sidebarWidth}px calc(100vw - ${sidebarWidth}px)`;
gridTemplateRows: 'auto 1fr';
gridTemplateAreas: `
  "sidebar header"
  "sidebar content"
`;
```

**Sidebar Width Calculation:**

- Expanded: `290px` (SIDEBAR_WIDTH)
- Collapsed: `80px` (SIDEBAR_COLLAPSED_WIDTH)
- Dynamic transition on collapse toggle

**Public Pages:**
Uses `isPublicPage()` utility to detect login/404 pages and skips layout rendering.

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

   - Responsive positioning (adjusts based on sidebar width)
   - Hamburger menu (mobile only)
   - DateTime display (desktop only, left-aligned)
   - User info display (right-aligned)
   - AppBar with Toolbar
   - Memoized for performance

2. **UserInfo.jsx** - User profile component
   - User avatar trigger button
   - Context menu with user information
   - User name (links to settings page)
   - User email
   - Role badge
   - Logout button
   - Menu positioning optimized for RTL/LTR

**Features:**

- ✅ **Mobile Menu Icon**: Changes based on RTL/LTR direction
  - LTR: `HiMenuAlt2` (opens left)
  - RTL: `HiMenuAlt3` (opens right)
- ✅ **Dynamic Width**: Adjusts based on sidebar collapsed state
- ✅ **DateTime Integration**: Shows date/time on desktop (left side)
- ✅ **Menu Integration**: UserInfo uses Menu component for dropdown

**Styling:**

- Position: Fixed at top
- Width: Adjusts dynamically based on sidebar state
- Height: `HEADER_HEIGHT` constant (80px)
- Background: Theme-aware background color
- Z-index: AppBar level

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
│ Settings                    |
└─────────────────────────────┘
```

**Sidebar Components:**

1. **Sidebar.jsx** - Main Sidebar Orchestrator

   - Detects mobile/desktop mode
   - Renders appropriate sidebar wrapper
   - Shares content between mobile and desktop
   - Coordinates LogoHeader and NavigationMenu

2. **DesktopSidebar.jsx** - Desktop Sidebar Wrapper

   - Fixed position sidebar
   - Dynamic width (expanded/collapsed)
   - Smooth width transitions
   - Scrollable content with stable scrollbar gutter
   - Z-index management

3. **MobileDrawer.jsx** - Mobile Drawer Wrapper

   - Material-UI Drawer component
   - Overlay sidebar for mobile/tablet
   - Custom breakpoint display (mobile/tablet only)
   - Keep mounted for better performance
   - Auto-close on navigation

4. **LogoHeader.jsx** - Brand Identity Section

   - Logo component (theme-aware)
   - Brand name (hidden when collapsed)
   - Collapse toggle button (desktop only)
   - Close button (mobile only)
   - RTL-aware icon support
   - Responsive layout (row/column)

5. **NavigationMenu.jsx** - Navigation Container

   - Role-based menu items from config
   - Renders NavigationItem or NavigationDropdown
   - Handles nested navigation items
   - Settings item special handling (bottom positioning)

6. **NavigationItem.jsx** - Individual Navigation Item

   - Single-level navigation item
   - Active route highlighting
   - Icon + text label
   - Settings page special styling
   - Uses ListButton component
   - Navigation handling via useSidebarNavigation hook

7. **NavigationDropdown.jsx** - Nested Navigation Dropdown
   - Multi-level navigation items
   - Uses Dropdown component when expanded
   - Collapsed mode: single ListButton (navigates to first child)
   - Active child detection
   - Checkmark indicator for selected items

**Role-Based Menus:**

| Role                    | Menu Items                   |
| ----------------------- | ---------------------------- |
| **Owner**               | All 10 items (full access)   |
| **General Admin**       | All 10 items (full access)   |
| **Curriculum Manager**  | 5 items (curriculum focus)   |
| **Competition Manager** | 3 items (competitions focus) |
| **Content Manager**     | 4 items (questions focus)    |

**Navigation Configuration:**

```javascript
// src/layout/sidebar/sidebarConfig.jsx
export const navigationItems = {
  owner: [
    { text: 'navigation.dashboard', icon: <TbLayoutDashboardFilled />, path: '/dashboard' },
    { text: 'navigation.students', icon: <MdGroups />, path: '/students' },
    // ... 8 more items
  ],
  // ... other roles
};
```

**Desktop vs Mobile Behavior:**

| Feature      | Desktop         | Mobile              |
| ------------ | --------------- | ------------------- |
| **Type**     | Persistent      | Drawer (overlay)    |
| **Width**    | 280px / 80px    | 280px               |
| **Collapse** | ✅ Yes          | ❌ No               |
| **Close**    | N/A             | ✅ After navigation |
| **Toggle**   | Collapse button | Hamburger menu      |
| **Position** | Fixed left      | Overlay             |

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
SIDEBAR_WIDTH = 290;
SIDEBAR_COLLAPSED_WIDTH = 80;

// Header
HEADER_HEIGHT = 80;
AVATAR_SIZE = 35;

// Logo & branding
LOGO_HEIGHT = 35;
LOGO_LETTER_SPACING = '0.1rem';
COLLAPSE_ICON_SIZE = 24;
CLOSE_ICON_SIZE = 20;
CLOSE_BUTTON_SIZE = 32;

// Navigation items
NAV_ITEM_HEIGHT = 48;
NAV_ICON_MIN_WIDTH = 40;
NAV_ICON_SIZE = '1.3rem';
NAV_TRANSITION = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

// User menu
USER_MENU_MIN_WIDTH = 250;
USER_MENU_BORDER_RADIUS = 2;
USER_MENU_MARGIN_TOP = 1.5;

// Color picker
COLOR_INDICATOR_SIZE = 23;
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

**Layout Hooks:**

- `useSidebar()` - Sidebar state management (open/collapsed/mobile/width)
- `useResponsiveSidebar()` - Handles responsive sidebar behavior and state updates
- `useSidebarNavigation()` - Navigation logic with mobile auto-close

**State Hooks:**

- `useAuth()` - User authentication, role, and logout function
- `useReduxTheme()` - Theme mode (light/dark)
- `useLanguage()` - Language & direction (ar/en, RTL/LTR)
- `useColorScheme()` - Color customization (scheme and custom color)

**Routing Hooks:**

- `useLocation()` - Current route detection for active highlighting
- `useNavigate()` - Programmatic navigation (used in navigation hooks)

**UI Hooks:**

- `useTranslation()` - Translation function for all text content
- `useMediaQuery()` - Responsive breakpoint detection
- `useTheme()` - Material-UI theme access

---

## Layout Flow

```text
App Initialization
    ↓
MainLayout renders
    ↓
Checks if public page → Skip layout if login/404
    ↓
Detects mobile/desktop (useMediaQuery)
    ↓
useResponsiveSidebar updates sidebar state
    ↓
├─ Mobile (<1024px): MobileLayout
│  ├─ Flexbox container
│  ├─ Header (full width, fixed top)
│  │   ├─ Hamburger menu (opens drawer)
│  │   └─ UserInfo (avatar menu)
│  ├─ MobileDrawer (overlay sidebar)
│  │   ├─ LogoHeader (with close button)
│  │   └─ NavigationMenu
│  └─ Main content (full width, scrollable)
│
└─ Desktop (≥1024px): DesktopLayout
   ├─ CSS Grid container
   ├─ DesktopSidebar (fixed left, 290px/80px)
   │   ├─ LogoHeader (with collapse button)
   │   └─ NavigationMenu
   ├─ Header (dynamic width, fixed top)
   │   ├─ DateTime (left side)
   │   └─ UserInfo (right side)
   └─ Main content (grid area, scrollable)
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

**MainLayout Behavior:**

- Automatically detects public pages and skips layout rendering
- Uses `DesktopLayout` or `MobileLayout` based on screen size
- Both layout components are memoized for performance
- Sidebar state is automatically managed via `useResponsiveSidebar`

---

## Redux State Management

Layout components use Redux hooks for state management:

- `useReduxTheme()` - Theme mode (light/dark)
- `useLanguage()` - Current language (ar/en) and direction (RTL/LTR)
- `useColorScheme()` - Color scheme (default/custom) and custom color
- `useAuth()` - User info, role, authentication state, and logout function
- `useSidebar()` - Sidebar state (open/collapsed/mobile/width)

**State Updates:**

- Sidebar width changes trigger layout recalculations
- Theme/language changes update all layout components
- User authentication state affects navigation visibility

---

## Icons

Icons are from `react-icons` library:

- **Navigation**: `TbLayoutDashboardFilled`, `MdGroups`, `MdSchool`, `MdQuiz`, etc. (Material Design / Tabler Icons)
- **Sidebar Controls**: `LuPanelRightClose`, `LuPanelLeftClose` (Lucide Icons)
- **Actions**: `IoClose` (Ionicons), `MdLogout` (Material Design)
- **Menu**: `HiMenuAlt2`, `HiMenuAlt3` (Heroicons)
- **User Menu**: Various icons for menu items

---

## Component Details

### DesktopLayout.jsx

**Purpose:** CSS Grid layout for desktop screens (≥1024px)

**Features:**

- ✅ CSS Grid with named areas
- ✅ Persistent sidebar (fixed left)
- ✅ Dynamic sidebar width transitions
- ✅ Header spans content area
- ✅ Main content scrollable
- ✅ Memoized for performance

**Grid Areas:**

- `sidebar` - Left column, spans both rows
- `header` - Top row, right column
- `content` - Bottom row, right column

### MobileLayout.jsx

**Purpose:** Flexbox layout for mobile/tablet screens (<1024px)

**Features:**

- ✅ Flexbox column layout
- ✅ Fixed header at top
- ✅ Drawer sidebar overlay
- ✅ Full-width main content
- ✅ Memoized for performance

### NavigationDropdown.jsx

**Purpose:** Handles nested navigation items with dropdown functionality

**Features:**

- ✅ Expands to Dropdown component when sidebar expanded
- ✅ Collapses to ListButton when sidebar collapsed
- ✅ Active child detection
- ✅ Checkmark indicator for selected items
- ✅ Navigates to first child when collapsed and clicked

**Behavior:**

- Expanded mode: Shows dropdown with all children
- Collapsed mode: Shows icon only, navigates to first child on click

### NavigationItem.jsx

**Purpose:** Renders individual navigation items

**Features:**

- ✅ Active route highlighting
- ✅ Icon and text display
- ✅ Settings page special styling (positioned at bottom)
- ✅ Navigation handling
- ✅ Responsive to collapsed state

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

---

**Last Updated:** 2025-11-1
