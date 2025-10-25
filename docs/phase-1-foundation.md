# Phase 1: Foundation

## Overview
Setup core infrastructure and base configuration for the Nebras Dashboard.

## Status: ✅ 100% Complete - Phase 1 Finished!

---

## Tasks

### ✅ Completed

- [x] Project setup with Vite
- [x] Install all dependencies
- [x] Create folder structure
- [x] Create project plan documentation
- [x] Setup Redux store for UI state
- [x] Create theme configuration (light/dark, RTL, custom colors) -> stop here
- [x] Add Cairo font for Arabic support
- [x] Setup React Query provider
- [x] Setup React Router with protected routes
- [x] Create layout components (Sidebar, Header, Main Layout)
- [x] Setup i18n for Arabic/English


---

## Detailed Tasks

### 1. Redux Store Setup
**Location:** `src/store/`

**Files Created:** ✅

```text
src/store/
├── index.js                       # Store configuration with middleware
├── middleware/
│   ├── localStorageMiddleware.js  # Persists state to localStorage
│   └── STORAGE_SECURITY.md        # Security documentation
└── slices/
    ├── themeSlice.js              # Theme mode (light/dark)
    ├── colorSchemeSlice.js        # Color scheme (blue/green/custom)
    ├── languageSlice.js           # Language (ar/en)
    ├── sidebarSlice.js            # Sidebar state (open/collapsed/mobile)
    └── userSlice.js               # User authentication & role
```

**Redux Slices Implemented:**

#### 1. **themeSlice.js** - Theme Mode Management
- **State**: `mode` ('light' | 'dark')
- **Actions**: 
  - `toggleTheme()` - Toggles between light/dark
  - `setTheme(mode)` - Sets specific theme mode
- **Persistence**: Saved to localStorage
- **Initial State**: Reads from localStorage or defaults to 'light'

#### 2. **colorSchemeSlice.js** - Color Scheme Management
- **State**: 
  - `scheme` ('blue' | 'green' | 'custom')
  - `customColor` (hex color string)
- **Actions**:
  - `setColorScheme(scheme)` - Sets color scheme
  - `setCustomColor(color)` - Sets custom color
- **Features**: Supports predefined schemes and custom colors
- **Persistence**: Both scheme and custom color saved to localStorage

#### 3. **languageSlice.js** - Language Management
- **State**: `currentLanguage` ('ar' | 'en')
- **Actions**:
  - `toggleLanguage()` - Switches between Arabic/English
  - `setLanguage(language)` - Sets specific language
- **Integration**: Synced with i18next via LanguageSync component
- **Persistence**: Saved to localStorage
- **RTL Support**: Triggers direction change in UI

#### 4. **sidebarSlice.js** - Sidebar State Management
- **State**:
  - `isOpen` (boolean) - Sidebar visibility
  - `collapsed` (boolean) - Collapsed mode (desktop only)
  - `isMobile` (boolean) - Mobile detection
- **Actions**:
  - `openSidebar()` - Opens sidebar
  - `closeSidebar()` - Closes sidebar
  - `toggleSidebar()` - Toggles sidebar open/close
  - `expandSidebar()` - Expands sidebar (full width)
  - `collapseSidebar()` - Collapses sidebar (icon only)
  - `toggleCollapsed()` - Toggles collapsed mode
  - `setMobileMode(isMobile)` - Sets mobile mode
- **Features**: 
  - Desktop: Persistent sidebar with collapse
  - Mobile: Drawer overlay
  - Automatic mobile detection

#### 5. **userSlice.js** - User State Management
- **State**:
  - `isAuthenticated` (boolean)
  - `user` (object | null) - User information
  - `role` (string) - User role
- **Actions**:
  - `login(userData)` - Authenticates user
  - `logout()` - Logs out user
  - `setUser(user)` - Updates user data
- **Roles Supported**:
  - `owner` - Full system access
  - `general_admin` - Administrative access
  - `curriculum_manager` - Curriculum management
  - `competition_manager` - Competition management
  - `content_manager` - Content management
- **Integration**: Works with ProtectedRoute component

**Middleware Implemented:**

#### **localStorageMiddleware.js**
- **Purpose**: Automatically persists Redux state to localStorage
- **Persisted Slices**:
  - Theme mode
  - Color scheme & custom color
  - Language preference
  - Sidebar collapsed state
  - User authentication (with security considerations)
- **Features**:
  - Selective persistence (only specific state slices)
  - Error handling for localStorage failures
  - Automatic state hydration on app load
- **Security**: See STORAGE_SECURITY.md for best practices

**Store Configuration:**

```javascript
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import colorSchemeReducer from './slices/colorSchemeSlice';
import languageReducer from './slices/languageSlice';
import sidebarReducer from './slices/sidebarSlice';
import userReducer from './slices/userSlice';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    colorScheme: colorSchemeReducer,
    language: languageReducer,
    sidebar: sidebarReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
```

**Custom Hooks Created:**

- `useReduxTheme()` - Access theme state
- `useColorScheme()` - Access color scheme state
- `useLanguage()` - Access language state
- `useSidebar()` - Access sidebar state
- `useUser()` - Access user state

**State Management Strategy:**

- ✅ **UI State in Redux**: Theme, language, sidebar, user
- ✅ **Server State in React Query**: API data, caching
- ✅ **Local State**: Component-specific state
- ✅ **Persistence**: Automatic localStorage sync
- ✅ **Type Safety**: PropTypes validation throughout

---

### 2. React Query Setup
**Location:** `src/config/` & `src/providers/`

**Files Created:** ✅

```text
src/
├── config/
│   └── queryClient.js          # Query client configuration
└── providers/
    └── QueryProvider.jsx       # Query provider wrapper with devtools
```

**Query Client Configuration:**

#### **queryClient.js** - Centralized Configuration

```javascript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,  // Don't refetch on window focus
      refetchOnReconnect: true,     // Refetch when network reconnects
      retry: 1,                     // Retry failed queries once
      staleTime: 5 * 60 * 1000,    // 5 minutes (data freshness)
      gcTime: 10 * 60 * 1000,      // 10 minutes (garbage collection)
      refetchInterval: false,       // No automatic polling
      suspense: false,              // Suspense mode disabled
      onError: (error) => {
        console.error("Query Error:", error);
      },
    },
    mutations: {
      retry: 0,                     // Don't retry mutations
      onError: (error) => {
        console.error("Mutation Error:", error);
      },
    },
  },
});
```

**Configuration Details:**

#### **Query Options**
- **refetchOnWindowFocus**: `false`
  - Prevents unnecessary refetches when user switches tabs
  - Improves performance and reduces API calls
  
- **refetchOnReconnect**: `true`
  - Automatically refetches data when internet reconnects
  - Ensures data is fresh after connection loss
  
- **retry**: `1`
  - Retries failed queries once before showing error
  - Balances reliability with performance
  
- **staleTime**: `5 minutes`
  - Data considered fresh for 5 minutes
  - Reduces redundant API calls
  - Improves app responsiveness
  
- **gcTime**: `10 minutes`
  - Cached data removed after 10 minutes of inactivity
  - Optimizes memory usage
  - Formerly called `cacheTime` in React Query v4
  
- **refetchInterval**: `false`
  - No automatic polling/refetching
  - Manual refetch required
  - Can be overridden per-query if needed
  
- **suspense**: `false`
  - Standard loading states instead of React Suspense
  - More predictable behavior
  
- **onError**: Global error handler
  - Logs all query errors to console
  - Can be extended with toast notifications

#### **Mutation Options**
- **retry**: `0`
  - Mutations never retry automatically
  - User must manually retry failed actions
  - Prevents duplicate submissions
  
- **onError**: Global mutation error handler
  - Logs mutation errors
  - Can be extended with user feedback

**Query Provider Implementation:**

#### **QueryProvider.jsx** - Provider Wrapper

```javascript
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../config/queryClient';

const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools - Only in development */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};
```

**Provider Features:**

- **QueryClientProvider**: Provides React Query context to app
- **React Query Devtools**: 
  - Built-in development tools
  - Query inspection and debugging
  - Cache visualization
  - Network activity monitoring
  - Only loaded in development mode
  - Starts minimized (`initialIsOpen={false}`)

- ✅ **Automatic Caching**: Data cached intelligently
- ✅ **Background Refetching**: Keeps data fresh
- ✅ **Optimistic Updates**: Instant UI feedback
- ✅ **Query Invalidation**: Smart cache management
- ✅ **Loading States**: Built-in loading indicators
- ✅ **Error Handling**: Comprehensive error management
- ✅ **DevTools**: Powerful debugging capabilities
- ✅ **Network Efficiency**: Reduces redundant requests
- ✅ **Memory Management**: Automatic garbage collection

**Future API Integration:**

All features will use React Query for:
- Subjects, Units, Lessons CRUD
- Question management
- Competition management
- Student management
- Admin management
- Dashboard analytics
- File uploads

---

### 3. React Router Setup
**Location:** `src/config/` & `src/components/`

**Files Created:** ✅

```text
src/
├── config/
│   └── routes.jsx              # Centralized route definitions
├── components/
│   └── ProtectedRoute.jsx      # Authentication guard component
└── App.jsx                     # Router configuration
```

**Route Configuration:**

#### **routes.jsx** - Centralized Route Definitions

```javascript
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Import all page components...

const routes = [
  // Root redirect
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  
  // Public route
  { path: '/login', element: <LoginPage /> },
  
  // Protected routes
  { path: '/dashboard', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
  { path: '/students', element: <ProtectedRoute><StudentsPage /></ProtectedRoute> },
  // ... more routes
  
  // 404 fallback
  { path: '*', element: <NotFoundPage /> },
];
```

**All Routes Configured:** (16 routes)

#### **Public Routes** (2 routes)
| Path | Component | Description |
|------|-----------|-------------|
| `/` | Redirect to `/dashboard` | Root redirect |
| `/login` | LoginPage | User authentication |

#### **Protected Routes** (13 routes)
| Path | Component | Description |
|------|-----------|-------------|
| `/dashboard` | DashboardPage | Role-based dashboard |
| `/students` | StudentsPage | Student management |
| `/admins` | AdminsPage | Admin management |
| `/curriculums` | CurriculumsPage | Curriculum management |
| `/subjects` | SubjectsPage | Subject management |
| `/units` | UnitsPage | Unit management |
| `/questions` | QuestionsPage | General question bank |
| `/ministerial-questions` | MinisterialQuestionsPage | Ministerial questions |
| `/enrichment-questions` | EnrichmentQuestionsPage | Enrichment questions |
| `/competitions` | CompetitionsPage | Competition list |
| `/competitions/:id` | CompetitionPage | Competition details |
| `/competitions/:id/members` | CompetitionMembersPage | Competition participants |
| `/competitions/:id/exam` | CompetitionExamPage | Competition exam |
| `/competitions/:id/result` | CompetitionResultPage | Competition results |

#### **Error Routes** (1 route)
| Path | Component | Description |
|------|-----------|-------------|
| `*` | NotFoundPage | 404 error page |

**Dynamic Routes:**

Routes with URL parameters:
- `/competitions/:id` - Competition details (id parameter)
- `/competitions/:id/members` - Competition members (id parameter)
- `/competitions/:id/exam` - Competition exam (id parameter)
- `/competitions/:id/result` - Competition results (id parameter)

**Protected Route Component:**

#### **ProtectedRoute.jsx** - Authentication Guard

```javascript
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render protected content
  return children;
}
```

**ProtectedRoute Features:**

- ✅ **Authentication Check**: Verifies user is logged in
- ✅ **Automatic Redirect**: Sends unauthenticated users to login
- ✅ **Redux Integration**: Uses `useUser()` hook for auth state
- ✅ **Replace History**: Uses `replace` to prevent back-button issues
- ✅ **Clean Syntax**: Simple wrapper component
- ✅ **Reusable**: Applied to all protected routes

**Router Integration:**

#### **App.jsx** - Router Setup

```javascript
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

**App Component Features:**

- **BrowserRouter**: HTML5 history API routing
- **LanguageSync**: Redux-i18n synchronization
- **MainLayout**: Wraps all routes with sidebar/header
- **Dynamic Routes**: Maps route config to Route components
- **Clean Structure**: Centralized route definitions

**Route Organization:**

```text
Route Structure:
├── / (redirect to dashboard)
├── /login (public)
└── Protected Routes
    ├── /dashboard (all roles)
    ├── /students (owner, general_admin, competition_manager)
    ├── /admins (owner, general_admin)
    ├── /curriculums (owner, general_admin, curriculum_manager)
    ├── /subjects (owner, general_admin, curriculum_manager)
    ├── /units (owner, general_admin, curriculum_manager)
    ├── /questions (owner, general_admin, curriculum_manager, content_manager)
    ├── /ministerial-questions (owner, general_admin, content_manager)
    ├── /enrichment-questions (owner, general_admin, content_manager)
    └── /competitions
        ├── /competitions (list)
        ├── /competitions/:id (details)
        ├── /competitions/:id/members
        ├── /competitions/:id/exam
        └── /competitions/:id/result
```

**Navigation Flow:**

```text
User Journey:
1. User visits any protected route
   ↓
2. ProtectedRoute checks authentication
   ↓
3a. If authenticated → Render page
3b. If not authenticated → Redirect to /login
   ↓
4. After login → Redirect to /dashboard
   ↓
5. User navigates via sidebar menu
```

**Route Features:**

- ✅ **Centralized Configuration**: All routes in one file
- ✅ **Protected Routes**: Authentication guard on sensitive pages
- ✅ **Dynamic Parameters**: Support for URL parameters (`:id`)
- ✅ **Nested Routes**: Competition sub-routes
- ✅ **Redirect Logic**: Root redirects to dashboard
- ✅ **404 Handling**: Catch-all route for unknown paths
- ✅ **Clean URLs**: No hash routing, uses HTML5 history
- ✅ **Type Safety**: PropTypes validation on components
- ✅ **Lazy Loading Ready**: Structure supports code splitting

**React Router Benefits:**

- ✅ **Declarative Routing**: Easy to understand route structure
- ✅ **Programmatic Navigation**: `useNavigate()` hook available
- ✅ **URL Parameters**: Easy access via `useParams()`
- ✅ **Location State**: Pass data between routes
- ✅ **Nested Routing**: Support for complex route hierarchies
- ✅ **Route Guards**: ProtectedRoute pattern
- ✅ **Browser History**: Back/forward button support

**Future Enhancements:**

- [ ] Role-based route access (currently auth-only)
- [ ] Route-level code splitting (lazy loading)
- [ ] Route transition animations
- [ ] Breadcrumb navigation
- [ ] Route metadata (titles, descriptions)

---

### 4. Theme Configuration
**Location:** `src/theme/` & `src/providers/`

**Files Created:** ✅

```text
src/
├── theme/
│   ├── index.js           # Main theme factory function
│   ├── colors.js          # Complete color palette
│   ├── typography.js      # Typography system with Cairo font
│   └── components.js      # MUI component overrides
├── providers/
│   └── ThemeProvider.jsx  # Theme provider with RTL support
└── utils/
    └── colorHelpers.js    # Color manipulation utilities
```

**Theme System Architecture:**

#### **index.js** - Theme Factory Function

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

**Theme Features:**

- **Dynamic Theme Creation**: Generated based on user preferences
- **Multiple Color Schemes**: Blue (default), Custom
- **Light/Dark Modes**: Full support with optimized colors
- **RTL Support**: Automatic direction switching for Arabic
- **Custom Color Generation**: Creates full palette from single color
- **Responsive Breakpoints**: Mobile, Tablet, Desktop, Widescreen

---

**Color System:**

#### **colors.js** - Comprehensive Color Palette

**Base Colors:**
```javascript
export const baseColors = {
  // Primary - Blue
  blue50: "#e6f3ff",
  blue400: "#4da3ff",
  blue500: "#0075ff",        // Default primary
  blue700: "#005acc",
  blue900: "#003d99",

  // Success, Error, Warning, Info
  // Gray scales for light mode
  // Dark mode backgrounds
  // White & Black
};
```

**Color Schemes:**

1. **Blue Scheme** (Default)
   - Primary: `#0075ff`
   - Light: `#4da3ff`
   - Dark: `#005acc`
   - Background: `#e6f3ff` (light) / `#003d99` (dark)
   
3. **Custom Scheme**
   - User-selected color
   - Auto-generated palette (light, main, dark variants)
   - Calculated background colors

**Semantic Colors:**

```javascript
export const colors = {
  primary: { main, light, dark, contrastText },
  secondary: { main, light, dark, contrastText },
  success: { main: '#2e7d32', light, dark },
  error: { main: '#d32f2f', light, dark },
  warning: { main: '#ed6c02', light, dark },
  info: { main: '#0288d1', light, dark },
};
```

**Background Colors:**

- **Light Mode**: 
  - Default: `#ffffff`
  - Paper: `#f5f5f5`
  - Surface levels: white, gray50, gray100

- **Dark Mode**:
  - Default: `#121212`
  - Paper: `#171717`
  - Surface levels: dark800, dark600, dark500

**Text Colors:**

- **Light Mode**: 
  - Primary: `#212121` (gray900)
  - Secondary: `#757575` (gray700)
  - Disabled: `#bdbdbd` (gray800)

- **Dark Mode**:
  - Primary: `#ffffff`
  - Secondary: `#b0b0b0`
  - Disabled: `#666666`

---

**Typography System:**

#### **typography.js** - Cairo Font & Type Scale

**Font Stack:**
```javascript
fontFamily: "Cairo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
```

**Font Weights:**
- Regular: 400
- Medium: 500
- Semi-Bold: 600
- Bold: 700

**Type Scale:**

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

**Typography Features:**

- ✅ **Cairo Font**: Installed via `@fontsource/cairo`
- ✅ **Arabic Support**: Excellent Arabic rendering
- ✅ **Consistent Scale**: Harmonious type hierarchy
- ✅ **No Text Transform**: Buttons use natural casing
- ✅ **Readable Line Heights**: Optimized for readability

---

**Spacing System:**

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

**Breakpoint System:**

```javascript
const breakpoints = {
  mobile: 0,         // 0px - 767px
  tablet: 768,       // 768px - 1023px
  desktop: 1024,     // 1024px - 1439px
  widescreen: 1440,  // 1440px+
};
```

**Responsive Usage:**
```javascript
sx={{
  width: { mobile: '100%', tablet: '50%', desktop: '33%' }
}}
```

---

**Component Overrides:**

#### **components.js** - MUI Component Customization

**Border Radius:**
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

**Custom Shadows:**
- Light mode: Subtle shadows
- Dark mode: Elevated shadows

**Component Style Overrides:**

- **MuiButton**: Custom border radius, padding, font weight
- **MuiCard**: Elevated surface, border radius
- **MuiTextField**: Outlined style customization
- **MuiDrawer**: Smooth transitions
- **MuiAppBar**: Elevation and colors
- **MuiDataGrid**: Table styling
- And more...

---

**Theme Provider Implementation:**

#### **ThemeProvider.jsx** - Provider with RTL Support

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

**ThemeProvider Features:**

- ✅ **Dynamic Theme**: Reacts to mode, language, and color changes
- ✅ **RTL Support**: Separate Emotion caches for LTR/RTL
- ✅ **CssBaseline**: Material UI baseline styles
- ✅ **Document Direction**: Auto-updates HTML `dir` attribute
- ✅ **CSS Variables**: Sets custom properties for scrollbar, selection
- ✅ **Performance**: Memoized cache selection

---

**Color Helpers:**

#### **colorHelpers.js** - Custom Color Generation

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

**Usage Example:**
```javascript
// User picks #ff5983
// Generates: 
// - light: #ff8ba8
// - main: #ff5983
// - dark: #b33e5c
// - background: #ffeef3 (light) / #660024 (dark)
```

---

**Theme Transitions:**

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

**Z-Index Layers:**

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

**Theme Benefits:**

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

### 5. Layout Components
**Location:** `src/layout/`

**Files Created:** ✅

```text
src/layout/
├── MainLayout.jsx                 # Main layout wrapper
├── constants.js                   # Layout constants (widths, sizes)
├── index.js                       # Layout exports
├── README.md                      # Layout documentation
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
```

---

**Layout Architecture:**

#### **MainLayout.jsx** - Responsive Layout Wrapper

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

#### **Header Component**

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

#### **Sidebar Component**

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
│  • Competitions            │
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

**Layout Constants:**

```javascript
// src/layout/constants.js

// Sidebar dimensions
export const SIDEBAR_WIDTH = 280;
export const SIDEBAR_COLLAPSED_WIDTH = 80;

// Logo & branding
export const LOGO_HEIGHT = 40;
export const LOGO_LETTER_SPACING = "0.1rem";

// Navigation items
export const NAV_ITEM_HEIGHT = 48;
export const NAV_ICON_MIN_WIDTH = 40;
export const NAV_ICON_SIZE = "1.375rem";
export const NAV_TEXT_SIZE = "0.875rem";

// Avatar
export const AVATAR_SIZE = 35;
```

---

**Layout Benefits:**

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

**Custom Hooks Used:**

- `useSidebar()` - Sidebar state management
- `useUser()` - User authentication & role
- `useReduxTheme()` - Theme mode (light/dark)
- `useLanguage()` - Language & direction
- `useColorScheme()` - Color customization
- `useNavigate()` - Programmatic navigation
- `useLocation()` - Current route detection
- `useMediaQuery()` - Responsive breakpoints

---

**Layout Flow:**

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

**Future Enhancements:**

- [ ] Breadcrumb navigation
- [ ] Notifications center
- [ ] Global search bar
- [ ] Quick actions menu
- [ ] Keyboard shortcuts
- [ ] Layout presets
- [ ] Customizable sidebar width

---

### 6. i18n Setup
**Location:** `src/i18n/`

**Files Created:** ✅

```text
src/i18n/
├── index.js                   # i18n initialization & configuration
├── README.md                  # i18n documentation
├── hooks/
│   └── useTranslation.js      # Custom translation hook with Redux
└── locales/
    ├── index.js               # Locale exports
    ├── ar.js                  # Arabic translations (200+ keys)
    └── en.js                  # English translations (200+ keys)

src/components/
└── LanguageSync.jsx           # Redux-i18n synchronization component
```

---

**i18n Configuration:**

#### **index.js** - i18next Initialization

```javascript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar";
import en from "./locales/en";

// Get initial language from localStorage or default to 'ar'
const savedLanguage = localStorage.getItem("language") || "ar";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    lng: savedLanguage,           // Default language
    fallbackLng: "ar",            // Fallback if translation missing
    interpolation: {
      escapeValue: false,         // React already escapes
    },
    react: {
      useSuspense: false,         // Disable suspense mode
    },
  });
```

**Configuration Features:**

- ✅ **Two Languages**: Arabic (default) and English
- ✅ **LocalStorage Persistence**: Saves user preference
- ✅ **Fallback Language**: Arabic as fallback
- ✅ **React Integration**: react-i18next bindings
- ✅ **No Suspense**: Standard loading approach
- ✅ **Safe Escaping**: Disabled (React handles it)

---

**Custom Translation Hook:**

#### **useTranslation.js** - Redux-Integrated Hook

```javascript
import { useTranslation as useI18nextTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../store/slices/languageSlice";

export const useTranslation = () => {
  const { t, i18n } = useI18nextTranslation();
  const dispatch = useDispatch();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
    localStorage.setItem("language", lng);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    changeLanguage(newLang);
  };

  return {
    t,                              // Translation function
    i18n,                           // i18n instance
    currentLanguage: i18n.language, // Current language code
    isArabic: i18n.language === "ar",
    isEnglish: i18n.language === "en",
    changeLanguage,                 // Change language
    toggleLanguage,                 // Toggle AR/EN
  };
};
```

**Hook Features:**

- ✅ **Translation Function**: `t('key')` for translations
- ✅ **Redux Sync**: Updates Redux state on language change
- ✅ **LocalStorage**: Persists language preference
- ✅ **Language Info**: Current language and boolean checks
- ✅ **Easy Toggle**: One function to switch languages
- ✅ **Type-Safe**: PropTypes validation in components

**Usage Example:**
```javascript
import { useTranslation } from '../i18n/hooks/useTranslation';

function MyComponent() {
  const { t, currentLanguage, toggleLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('navigation.dashboard')}</p>
      <button onClick={toggleLanguage}>
        {currentLanguage === 'ar' ? 'English' : 'العربية'}
      </button>
    </div>
  );
}
```

---

**Language Synchronization:**

#### **LanguageSync.jsx** - Redux-i18n Sync

```javascript
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/slices/languageSlice';

const LanguageSync = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.currentLanguage);

  // Sync on mount
  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, []);

  // Redux → i18n
  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  // i18n → Redux
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      if (lng !== currentLanguage) {
        dispatch(setLanguage(lng));
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [currentLanguage, dispatch, i18n]);

  return null; // No UI
};
```

**Synchronization Flow:**

```text
Language Change Event
    ↓
LanguageSync Component
    ↓
├─ Redux state changes
│  └─ Triggers i18n.changeLanguage()
│
└─ i18n changes
   └─ Triggers Redux dispatch
    ↓
Document direction updates (useDocumentDirection)
    ↓
Theme regenerates with new direction (useMuiTheme)
    ↓
All components re-render with translations
```

---

**Translation Structure:**

#### **Translation Categories** (200+ keys)

**1. Common** (~69 keys)
```javascript
common: {
  brandName: "نبراس" / "NEBRAS",
  welcome: "مرحباً" / "Welcome",
  save: "حفظ" / "Save",
  cancel: "إلغاء" / "Cancel",
  // ... CRUD actions, status labels, UI elements
}
```

**2. Navigation** (~13 keys)
```javascript
navigation: {
  dashboard: "لوحة التحكم" / "Dashboard",
  subjects: "المواد" / "Subjects",
  competitions: "المسابقات" / "Competitions",
  // ... all menu items
}
```

**3. Authentication** (~11 keys)
```javascript
auth: {
  loginTitle: "تسجيل الدخول" / "Login",
  username: "اسم المستخدم" / "Username",
  password: "كلمة المرور" / "Password",
  // ... login/logout labels
}
```

**4. User Roles** (~6 keys)
```javascript
roles: {
  owner: "المالك" / "Owner",
  general_admin: "مدير عام" / "General Admin",
  curriculum_manager: "مدير المناهج" / "Curriculum Manager",
  // ... all role translations
}
```

**5. Dashboard** (~18 keys)
```javascript
dashboard: {
  title: "لوحة التحكم" / "Dashboard",
  totalStudents: "إجمالي الطلاب" / "Total Students",
  activeCompetitions: "المسابقات النشطة" / "Active Competitions",
  // ... dashboard statistics
}
```

**6. Students** (~12 keys)
```javascript
students: {
  title: "إدارة الطلاب" / "Student Management",
  studentName: "اسم الطالب" / "Student Name",
  grade: "الصف" / "Grade",
  // ... student-related labels
}
```

**7. Competitions** (~17 keys)
```javascript
competitions: {
  title: "المسابقات" / "Competitions",
  createCompetition: "إنشاء مسابقة" / "Create Competition",
  startDate: "تاريخ البدء" / "Start Date",
  // ... competition labels
}
```

**8. Curriculums** (~10 keys)
```javascript
curriculums: {
  title: "المناهج" / "Curriculums",
  curriculumName: "اسم المنهج" / "Curriculum Name",
  // ... curriculum labels
}
```

**9. Subjects** (~9 keys)
**10. Units** (~8 keys)
**11. Questions** (~15 keys)
**12. Ministerial Questions** (~8 keys)
**13. Enrichment Questions** (~8 keys)
**14. Admins** (~10 keys)
**15. Forms** (~7 keys)

---

**Translation Keys Organization:**

```javascript
// ar.js & en.js structure
const translations = {
  common: { ... },           // 69 keys - Universal UI elements
  navigation: { ... },       // 13 keys - Menu items
  auth: { ... },            // 11 keys - Authentication
  roles: { ... },           // 6 keys - User roles
  dashboard: { ... },       // 18 keys - Dashboard
  students: { ... },        // 12 keys - Student management
  competitions: { ... },    // 17 keys - Competitions
  curriculums: { ... },     // 10 keys - Curriculums
  subjects: { ... },        // 9 keys - Subjects
  units: { ... },           // 8 keys - Units
  questions: { ... },       // 15 keys - Questions
  ministerialQuestions: { ... }, // 8 keys
  enrichmentQuestions: { ... },  // 8 keys
  admins: { ... },          // 10 keys - Admin management
  forms: { ... },           // 7 keys - Form validation
};
```

**Total Translation Keys:** 200+ covering entire application

---

**RTL Support Integration:**

**i18n triggers:**
1. Language changes to Arabic
2. `useDocumentDirection()` detects change
3. Updates HTML `dir="rtl"`
4. Updates HTML `lang="ar"`
5. `useMuiTheme()` regenerates theme with `direction: 'rtl'`
6. Emotion cache switches to RTL
7. All CSS transforms applied (padding, margin, positioning)

**Related Hooks:**
- `useLanguage()` - Language state from Redux
- `useDocumentDirection()` - Updates HTML attributes
- `useMuiTheme()` - Regenerates theme with direction
- `useCssVariables()` - Sets CSS custom properties

**Related Components:**
- `LanguageSync` - Synchronizes Redux ↔ i18next
- `ThemeProvider` - Switches Emotion cache (RTL/LTR)

---

**i18n Features:**

- ✅ **Bilingual Support**: Arabic (RTL) and English (LTR)
- ✅ **200+ Translation Keys**: Complete app coverage
- ✅ **Redux Integration**: Synced with global state
- ✅ **LocalStorage Persistence**: Remembers user preference
- ✅ **Automatic RTL**: Direction switches automatically
- ✅ **Fallback Language**: Arabic as default
- ✅ **Custom Hook**: Enhanced useTranslation
- ✅ **Easy Toggle**: One-click language switch
- ✅ **Type-Safe**: PropTypes validation
- ✅ **Organized Structure**: Categorized translations
- ✅ **No Suspense**: Standard loading approach
- ✅ **React Escaping**: Safe HTML rendering

---

**Translation Best Practices:**

**1. Key Naming Convention:**
```javascript
// Good: category.specificKey
t('common.save')
t('navigation.dashboard')
t('auth.loginTitle')

// Bad: flat structure
t('save')
t('dashboard')
```

**2. Interpolation:**
```javascript
// Translation with variables
t('dashboard.welcomeUser', { name: 'Ahmed' })
// Arabic: "مرحباً {{name}}"
// English: "Welcome {{name}}"
```

**3. Pluralization:**
```javascript
// Plural forms
t('students.count', { count: 5 })
// Uses: count_zero, count_one, count_two, count_other
```

**4. Context-Aware:**
```javascript
// Different contexts
t('common.save')           // Button text
t('forms.saveSuccess')     // Success message
t('validation.required')   // Error message
```

---

**i18n Benefits:**

- ✅ **User Experience**: Native language support
- ✅ **Accessibility**: Better comprehension
- ✅ **Market Reach**: Serves Arabic and English users
- ✅ **Professional**: Proper RTL implementation
- ✅ **Maintainable**: Centralized translations
- ✅ **Scalable**: Easy to add more languages
- ✅ **Consistent**: Same key structure across languages
- ✅ **Performance**: No runtime translation overhead
- ✅ **SEO Ready**: Language attribute support
- ✅ **Cultural**: Respects language-specific formatting

---

**Future Enhancements:**

- [ ] Add more languages (French, Spanish, etc.)
- [ ] Implement plural forms
- [ ] Add date/time formatting per locale
- [ ] Number formatting (Arabic/English numerals)
- [ ] Currency formatting
- [ ] Translation management UI
- [ ] Export/import translations
- [ ] Translation validation tool

---


## Current File Structure

```text
src/
├── App.jsx                              # ✅ Main App component with React Router
├── main.jsx                             # ✅ Application entry point
├── index.css                            # ✅ Global styles
│
├── components/                          # ✅ Shared reusable components
│   ├── ColorPicker.jsx                  # ✅ Custom color picker with hex input
│   ├── LanguageSync.jsx                 # ✅ Redux-i18n synchronization
│   ├── ProtectedRoute.jsx               # ✅ Route authentication guard
│   └── README.md                        # ✅ Components documentation
│
├── config/                              # ✅ Configuration files
│   ├── queryClient.js                   # ✅ React Query client configuration
│   ├── routes.jsx                       # ✅ React Router route definitions
│   └── README.md                        # ✅ Config documentation
│
├── contexts/                            # React Context providers (reserved)
│
├── data/                                # ✅ Static data, constants
│   └── images/
│       ├── Nebras Logo Dark.svg         # ✅ Dark theme logo
│       └── Nebras Logo Light.svg        # ✅ Light theme logo
│
├── features/                            # ✅ Feature-based modules
│   ├── admins/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── AdminsPage.jsx           # ✅ Admin management
│   │   └── service/
│   │
│   ├── authentication/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── LoginPage.jsx            # ✅ Login page with validation
│   │   └── service/
│   │
│   ├── competitions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── CompetitionsPage.jsx     # ✅ List all competitions
│   │   │   ├── CompetitionPage.jsx      # ✅ Competition details
│   │   │   ├── CompetitionMembersPage.jsx # ✅ Participants list
│   │   │   ├── CompetitionExamPage.jsx  # ✅ Exam management
│   │   │   └── CompetitionResultPage.jsx # ✅ Results & rankings
│   │   └── services/
│   │
│   ├── curriculums/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── CurriculumsPage.jsx      # ✅ Curriculum management
│   │   └── services/
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── CompetitionDashboard.jsx # ✅ Competition stats
│   │   │   ├── ContentDashboard.jsx     # ✅ Content stats
│   │   │   ├── CurriculumDashboard.jsx  # ✅ Curriculum stats
│   │   │   ├── OwnerDashboard.jsx       # ✅ Owner overview
│   │   │   └── StatCard.jsx             # ✅ Reusable stat card
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── DashboardPage.jsx        # ✅ Role-based dashboard
│   │   └── service/
│   │
│   ├── enrichment-questions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── EnrichmentQuestionsPage.jsx # ✅ Enrichment questions
│   │   └── service/
│   │
│   ├── lessons/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── service/
│   │
│   ├── ministerial-questions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── MinisterialQuestionsPage.jsx # ✅ Ministerial questions
│   │   └── service/
│   │
│   ├── questions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── QuestionsPage.jsx        # ✅ Question bank
│   │   └── service/
│   │
│   ├── students/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── StudentsPage.jsx         # ✅ Student management
│   │   └── service/
│   │
│   ├── subjects/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── SubjectsPage.jsx         # ✅ Subject management
│   │   └── service/
│   │
│   └── units/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       │   └── UnitsPage.jsx            # ✅ Unit management
│       └── service/
│
├── hooks/                               # ✅ Custom React hooks
│   ├── index.js                         # ✅ Hook exports
│   ├── useColorScheme.js                # ✅ Color scheme state hook
│   ├── useCssVariables.js               # ✅ CSS custom properties hook
│   ├── useDocumentDirection.js          # ✅ RTL/LTR direction hook
│   ├── useLanguage.js                   # ✅ Language state hook
│   ├── useMuiTheme.js                   # ✅ MUI theme hook
│   ├── useReduxTheme.js                 # ✅ Theme state hook
│   ├── useSidebar.js                    # ✅ Sidebar state hook
│   └── useUser.js                       # ✅ User state hook (auth)
│
├── i18n/                                # ✅ Internationalization
│   ├── index.js                         # ✅ i18n initialization
│   ├── README.md                        # ✅ i18n documentation
│   ├── hooks/
│   │   └── useTranslation.js            # ✅ Custom translation hook
│   └── locales/
│       ├── index.js                     # ✅ Locale exports
│       ├── ar.js                        # ✅ Arabic translations (200+ keys)
│       └── en.js                        # ✅ English translations (200+ keys)
│
├── layout/                              # ✅ Layout components
│   ├── constants.js                     # ✅ Layout constants & style helpers
│   ├── MainLayout.jsx                   # ✅ Main layout wrapper
│   ├── README.md                        # ✅ Layout documentation
│   ├── index.js                         # ✅ Layout exports
│   │
│   ├── header/
│   │   ├── Header.jsx                   # ✅ App header component
│   │   ├── headerConfig.js              # ✅ Header configuration
│   │   ├── index.js                     # ✅ Header exports
│   │   └── components/
│   │       └── UserInfo.jsx             # ✅ User info display
│   │
│   └── sidebar/
│       ├── Sidebar.jsx                  # ✅ Role-based navigation sidebar
│       ├── sidebarConfig.jsx            # ✅ Navigation menu config
│       ├── index.js                     # ✅ Sidebar exports
│       └── components/
│           ├── LogoHeader.jsx           # ✅ Sidebar logo & controls
│           ├── NavigationMenu.jsx       # ✅ Navigation menu items
│           └── SidebarControls.jsx      # ✅ Theme/language/logout controls
│
├── pages/                               # ✅ Main pages
│   └── NotFoundPage.jsx                 # ✅ 404 error page
│
├── providers/                           # ✅ Provider components
│   ├── QueryProvider.jsx                # ✅ React Query provider
│   ├── ReduxProvider.jsx                # ✅ Redux provider
│   └── ThemeProvider.jsx                # ✅ MUI Theme provider with RTL
│
├── services/                            # API services (reserved)
│
├── store/                               # ✅ Redux store configuration
│   ├── index.js                         # ✅ Store setup with middleware
│   ├── middleware/
│   │   ├── localStorageMiddleware.js    # ✅ Auto-persist to localStorage
│   │   └── STORAGE_SECURITY.md          # ✅ Security documentation
│   └── slices/
│       ├── colorSchemeSlice.js          # ✅ Color scheme state
│       ├── languageSlice.js             # ✅ Language state (ar/en)
│       ├── sidebarSlice.js              # ✅ Sidebar state (collapsed/open)
│       ├── themeSlice.js                # ✅ Theme state (light/dark)
│       └── userSlice.js                 # ✅ User state (auth)
│
├── theme/                               # ✅ Theme configuration
│   ├── index.js                         # ✅ Main theme factory
│   ├── colors.js                        # ✅ Color palette & schemes
│   ├── typography.js                    # ✅ Typography settings (Cairo font)
│   └── components.js                    # ✅ MUI component overrides
│
└── utils/                               # ✅ Utility functions
    ├── colorHelpers.js                  # ✅ Color manipulation utilities
    ├── migrateLocalStorage.js           # ✅ Storage migration tool
    ├── rtl.js                           # ✅ RTL/LTR utilities
    └── secureStorage.js                 # ✅ Secure localStorage wrapper

Legend:
✅ Completed and working

Total Pages Created: 16
Total Components: 25+
Total Hooks: 9
Total Redux Slices: 5
Total i18n Keys: 200+

Feature Pages (16):
- LoginPage
- DashboardPage (role-based with 4 dashboard variants)
- StudentsPage
- CompetitionsPage + 4 nested pages (Competition, Members, Exam, Result)
- CurriculumsPage
- SubjectsPage
- UnitsPage
- AdminsPage
- QuestionsPage
- MinisterialQuestionsPage
- EnrichmentQuestionsPage
- NotFoundPage
```

---

## Testing Checklist

- [x] Redux store updates correctly
- [x] Theme toggle works (light/dark)
- [x] Language switcher works (AR/EN)
- [x] Sidebar toggles correctly (mobile & desktop)
- [x] RTL layout displays properly in Arabic
- [x] All routes are accessible (16 routes configured)
- [x] Protected routes redirect to login
- [x] React Query fetches data correctly
- [x] Login/logout functionality works
- [x] Navigation between pages works
- [x] Layout is responsive on all devices
- [x] Role-based sidebar navigation works
- [x] i18n translations working (Arabic & English)

---

## Success Criteria

- ✅ Redux store is configured and working
- ✅ Theme system supports light/dark mode
- ✅ RTL support works for Arabic
- ✅ Cairo font installed for Arabic
- ✅ Custom hooks created and organized
- ✅ No hardcoded values in theme
- ✅ React Query provider is set up
  - ✅ Query client configured with optimal defaults
  - ✅ QueryProvider component created with devtools
  - ✅ Demo component showing queries and mutations
  - ✅ Caching and refetching working properly
- ✅ React Router is configured with protected routes
  - ✅ 16 routes configured and working
  - ✅ ProtectedRoute component created
  - ✅ Dynamic routes with parameters (/competitions/:id)
  - ✅ Login/logout functionality in userSlice
  - ✅ All page components created
  - ✅ 404 Not Found page
  - ✅ Temporary header with theme/language controls
- ✅ Layout components are responsive
  - ✅ MainLayout component with Header + Sidebar
  - ✅ Role-based sidebar navigation (different for each role)
  - ✅ Unified header (logo, user info, theme, language)
  - ✅ Mobile-responsive drawer
  - ✅ Logout button in sidebar
- ✅ i18n is configured for Arabic and English
  - ✅ 200+ translation keys covering all UI elements
  - ✅ Custom useTranslation hook with Redux integration
  - ✅ Automatic language detection and persistence
  - ✅ All components updated to use translations
  - ✅ Navigation menu translated
  - ✅ Sidebar controls translated
  - ✅ User roles translated
- ✅All base infrastructure is ready for Phase 2

---

## Next Phase

After completing Phase 1, proceed to **[Phase 2: Authentication](phase-2-authentication.md)**

---

## 🌍 RTL/LTR Support Details

### Packages Installed
- `i18next` - Core internationalization framework
- `react-i18next` - React bindings for i18next
- `stylis-plugin-rtl` - RTL support for Emotion/MUI
- `rtl-detect` - RTL language detection utility

### Features Implemented
1. **Automatic Direction Switching**
   - HTML `dir` attribute updates based on language
   - Document `lang` attribute synchronized
   - MUI theme direction changes automatically

2. **Emotion Cache Management**
   - Separate caches for RTL and LTR
   - Automatic cache switching when language changes
   - Proper CSS-in-JS RTL transformation

3. **State Synchronization**
   - Redux stores language state
   - i18n updates when Redux changes
   - Redux updates when i18n changes
   - LanguageSync component ensures consistency

4. **Global CSS Rules**
   - RTL-specific text alignment
   - Direction-aware styling
   - Proper text selection highlighting

### How It Works

```
Language Change
    ↓
LanguageSync detects
    ↓
Updates both Redux & i18n
    ↓
useDocumentDirection updates HTML
    ↓
useMuiTheme regenerates theme with new direction
    ↓
CacheProvider switches RTL/LTR cache
    ↓
All components re-render
```

---

**Last Updated:** 2025-10-24
