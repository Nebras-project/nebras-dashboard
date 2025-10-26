# Phase 1: Foundation

## Overview
Setup core infrastructure and base configuration for the Nebras Dashboard.

## Status: ✅ 100% Complete - Phase 1 Finished!

---

## Tasks

### ✅ Completed

- ✅ Project setup with Vite
- ✅ Install all dependencies
- ✅ Create folder structure
- ✅ Create project plan documentation
- ✅ Setup Redux store for UI state
- ✅ Create theme configuration (light/dark, RTL, custom colors)
- ✅ Add Cairo font for Arabic support
- ✅ Setup React Query provider 
- ✅ Setup React Router with protected routes
- ✅ Create layout components (Sidebar, Header, Main Layout) 
- ✅ Setup i18n for Arabic/English -> stop here


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

**Status:** ✅ Complete

React Query is configured for server state management with optimized defaults:
- Stale time: 5 minutes
- Cache time: 10 minutes
- Retry: 1 for queries, 0 for mutations
- DevTools enabled in development

**Key Features:**
- ✅ Automatic caching and background refetching
- ✅ Query invalidation and optimistic updates
- ✅ Built-in loading and error states
- ✅ React Query DevTools for debugging
- ✅ Network efficiency and memory management

**📖 Full Documentation:** See [src/config/README.md](../src/config/README.md) for complete configuration details and implementation guide.

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

**Status:** ✅ Complete

React Router v6 is configured with 16 routes:
- 2 public routes (root redirect, login)
- 13 protected routes (dashboard, management pages, competitions)
- 1 error route (404 Not Found)

**Key Features:**
- ✅ Centralized route configuration
- ✅ Protected routes with authentication guard
- ✅ Dynamic parameters (`:id` for competitions)
- ✅ Nested routes for competition sub-pages
- ✅ Clean URL structure with HTML5 history

**Route Organization:**
```text
/ → Redirect to /dashboard
/login → Public (LoginPage)
/dashboard → Protected (role-based dashboard)
/students, /admins, /curriculums, /subjects, /units → Protected
/questions, /ministerial-questions, /enrichment-questions → Protected
/competitions → Protected (list + 4 nested detail routes)
* → 404 (NotFoundPage)
```

**📖 Full Documentation:** See [src/config/README.md](../src/config/README.md) for complete route configuration, ProtectedRoute implementation, and navigation flow details.

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
│   ├── components.js      # MUI component overrides
│   └── README.md          # Theme system documentation
├── providers/
│   └── ThemeProvider.jsx  # Theme provider with RTL support
└── utils/
    └── colorHelpers.js    # Color manipulation utilities
```

**Status:** ✅ Complete

Material-UI theme system with comprehensive customization:

**Color System:**
- Blue default color scheme
- Custom color scheme with automatic palette generation
- Full light/dark mode support
- WCAG compliant color contrasts

**Typography:**
- Cairo font for excellent Arabic support
- Complete type scale (h1-h6, body, button, caption, etc.)
- Font weights: 400, 500, 600, 700

**Layout & Design:**
- Responsive breakpoints: mobile (0px), tablet (768px), desktop (1024px), widescreen (1440px)
- 8px base spacing unit with custom spacing scale
- Border radius system (none to full rounded)
- Z-index layers for proper stacking

**RTL Support:**
- Separate Emotion caches for LTR/RTL
- Automatic direction switching based on language
- RTL plugin for CSS transformation

**Component Overrides:**
- Custom MUI component styling
- Button, Card, TextField, Drawer, AppBar, DataGrid, and more
- Consistent design system across all components

**Benefits:**
- ✅ Fully customizable with multiple color schemes
- ✅ Complete RTL/LTR support for Arabic/English
- ✅ Cairo font for beautiful Arabic typography
- ✅ Responsive and mobile-first
- ✅ Accessible with proper color contrasts
- ✅ Performance optimized with memoization

**📖 Full Documentation:** See [src/theme/README.md](../src/theme/README.md) for complete theme system details, color palettes, typography scales, component overrides, and usage examples.

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

**Status:** ✅ Complete

The layout system provides a fully responsive, role-based navigation structure with:

**Key Features:**
- ✅ **Responsive Design**: CSS Grid (desktop) + Flexbox (mobile)
- ✅ **Role-Based Menus**: Different navigation items per user role
- ✅ **Collapsible Sidebar**: 280px ↔ 80px (desktop only)
- ✅ **Mobile Drawer**: Overlay sidebar for mobile devices
- ✅ **Theme Controls**: Built-in color, theme, and language switchers
- ✅ **RTL Support**: Complete Arabic layout support
- ✅ **Smooth Animations**: Professional transitions and effects
- ✅ **Active Route Highlighting**: Visual feedback for current page
- ✅ **Modern Design**: Clean, card-style layout

**Layout Architecture:**
- **MainLayout**: Responsive wrapper with grid/flexbox layouts
- **Header**: Top bar with user info and mobile menu toggle
- **Sidebar**: Navigation panel with logo, menu, and controls

**📖 Full Documentation:** See [src/layout/README.md](../src/layout/README.md) for complete layout system details, component architecture, responsive behavior, role-based menus, and integration guide.

---

### 6. i18n Setup
**Location:** `src/i18n/`

**Files Created:** ✅

```text
src/i18n/
├── index.js                   # i18n initialization & configuration
├── README.md                  # Comprehensive i18n documentation
├── hooks/
│   └── useTranslation.js      # Custom translation hook with Redux
└── locales/
    ├── index.js               # Locale exports
    ├── ar.js                  # Arabic translations (254+ keys)
    └── en.js                  # English translations (254+ keys)

src/components/
└── LanguageSync.jsx           # Redux-i18n synchronization component
```

**Status:** ✅ Complete

A comprehensive internationalization system supporting Arabic (RTL) and English (LTR) with seamless language switching, Redux integration, and persistent state management.

**Key Features:**

- ✅ **Dual Language Support**: Arabic (RTL) and English (LTR)
- ✅ **254+ Translation Keys**: Organized into 17 namespaces
- ✅ **Redux Integration**: Centralized state management
- ✅ **Automatic RTL/LTR Switching**: Based on language selection
- ✅ **Persistent State**: Language preference saved to localStorage
- ✅ **Custom Hook**: Enhanced `useTranslation()` with Redux sync
- ✅ **Interpolation Support**: Dynamic content in translations
- ✅ **Comprehensive Coverage**: All UI elements, navigation, forms, messages

**Translation Namespaces:**
- `common` (67 keys) - UI elements, buttons, labels
- `navigation` (11 keys) - Menu items
- `auth` (8 keys) - Authentication
- `dashboard` (8 keys) - Dashboard content
- `curriculum`, `questions`, `competitions`, `students`, `admins`
- And 8 more specialized namespaces

**Quick Usage:**
```javascript
import { useTranslation } from '@/hooks';

function MyComponent() {
  const { t, currentLanguage, toggleLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button onClick={toggleLanguage}>
        {currentLanguage === 'ar' ? 'English' : 'العربية'}
      </button>
    </div>
  );
}
```

**📖 Full Documentation:** See **[src/i18n/README.md](../src/i18n/README.md)** for:
- Complete API reference
- Translation structure and organization
- Best practices and conventions
- Adding new translations guide
- Troubleshooting and advanced topics
- Interpolation and pluralization examples
- RTL/LTR implementation details

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
