# Phase 1: Foundation

## Overview
Setup core infrastructure and base configuration for the Nebras Dashboard.

## Status: ✅ 85% Complete - Router Setup Done!

---

## Tasks

### ✅ Completed

- [x] Project setup with Vite
- [x] Install all dependencies
- [x] Create folder structure
- [x] Create project plan documentation
- [x] Setup Redux store for UI state
- [x] Create theme configuration (light/dark, RTL, custom colors)
- [x] Add Cairo font for Arabic support
- [x] Setup React Query provider
- [x] Setup React Router with protected routes


### 🔄 In Progress
- [ ] Create layout components (Sidebar, Header, Main Layout)

### 📋 Pending
- [ ] Setup i18n for Arabic/English

---

## Detailed Tasks

### 1. Redux Store Setup
**Location:** `src/store/`

**Files to create:**

- `src/store/index.js` - Store configuration
- `src/store/slices/` - Redux Toolkit slices
  - `themeSlice.js` - Light/dark mode
  - `languageSlice.js` - Arabic/English
  - `sidebarSlice.js` - Sidebar open/close state
  - `userSlice.js` - Current user info

**State to manage:**

- Theme mode (light/dark)
- Language (ar/en)
- Sidebar state (open/closed)
- Current user information
- UI preferences

---

### 2. React Query Setup
**Location:** `src/`

**Files to create:**

- `src/config/queryClient.js` - Query client configuration
- `src/providers/QueryProvider.jsx` - Query provider wrapper

**Configuration:**

- Default query options
- Error handling
- Retry logic
- Cache time settings

---

### 3. React Router Setup
**Location:** `src/`

**Files to create:**

- `src/config/routes.js` - Route definitions
- `src/components/ProtectedRoute.jsx` - Protected route wrapper

**Routes to create:**

- `/login` - Login page
- `/dashboard` - Main dashboard
- `/subjects` - Subjects management
- `/units` - Units management
- `/lessons` - Lessons management
- `/questions` - Questions management
- `/ministerial-questions` - Ministerial questions
- `/enrichment-questions` - Enrichment questions
- `/competitions` - Competitions management
- `/students` - Students management
- `/admins` - Admins management
- `*` - 404 page

**Features:**

- Protected routes based on roles
- Redirect logic
- Route guards

---

### 4. Theme Configuration
**Location:** `src/theme/`

**Files to create:**

- `src/theme/index.js` - Theme configuration
- `src/theme/colors.js` - Color palette
- `src/theme/typography.js` - Typography settings
- `src/theme/components.js` - Component overrides
- `src/providers/ThemProvider.jsx` - Theme Provider

**Features:**

- Light theme
- Dark theme
- Custom color scheme
- RTL support for Arabic
- Responsive breakpoints

**Custom Colors:**

- Primary color
- Secondary color
- Success color
- Error color
- Warning color
- Info color

---

### 5. Layout Components
**Location:** `src/layout/`

**Files to create:**

- `src/layout/MainLayout.jsx` - Main layout wrapper
- `src/layout/Sidebar.jsx` - Sidebar navigation
- `src/layout/Header.jsx` - Top header
- `src/layout/Footer.jsx` - Footer (optional)

**Sidebar Features:**

- Navigation menu items
- Role-based menu visibility
- Collapsible on mobile
- Active route highlighting
- Icon support

**Header Features:**

- User profile dropdown
- Language switcher
- Theme toggle (light/dark)
- Notifications (future)
- Search bar (future)

---

### 6. i18n Setup
**Location:** `src/i18n/`

**Files to create:**

- `src/i18n/index.js` - i18n configuration
- `src/i18n/locales/ar.js` - Arabic translations
- `src/i18n/locales/en.js` - English translations
- `src/i18n/hooks/useTranslation.js` - Translation hook

**Translation Keys:**

- Common UI text
- Navigation items
- Error messages
- Success messages
- Form labels
- Placeholders

**Features:**

- Language detection
- Language persistence
- RTL/LTR switching
- Pluralization support

---

## Dependencies to Install

```bash
# Already installed ✅
npm install @reduxjs/toolkit react-redux
npm install @tanstack/react-query
npm install react-router-dom
npm install @mui/material @emotion/react @emotion/styled
npm install react-icons

# May need to install for i18n
npm install i18next react-i18next
```

---

## Current File Structure

```text
src/
├── App.jsx                    # ✅ Main App component with React Router
├── main.jsx                   # Application entry point
├── index.css                  # Global styles
├── components/                # Shared reusable components
│   ├── ProtectedRoute.jsx     # ✅ Protected route authentication guard
│   └── ReactQueryDemo.jsx     # React Query demo/test component
├── config/                    # Configuration files
│   ├── queryClient.js         # ✅ React Query client configuration
│   ├── routes.jsx             # ✅ React Router route definitions
│   └── README.md              # ✅ Config documentation
├── contexts/                  # React Context providers (empty for now)
├── data/                      # Static data, constants
│   └── images/
│       ├── Nebras Logo Dark.svg
│       └── Nebras Logo Light.svg
├── features/                  # Feature-based modules
│   ├── admins/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── AdminsPage.jsx           # ✅ Admin management
│   │   └── service/
│   ├── authentication/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── LoginPage.jsx            # ✅ Login page
│   │   └── service/
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
│   ├── curriculums/           # ✅ NEW FEATURE
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── CurriculumsPage.jsx      # ✅ Curriculum management
│   │   └── services/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── DashboardPage.jsx        # ✅ Main dashboard
│   │   └── service/
│   ├── enrichment-questions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── EnrichmentQuestionsPage.jsx # ✅ Enrichment questions
│   │   └── service/
│   ├── lessons/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── service/
│   ├── ministerial-questions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── MinisterialQuestionsPage.jsx # ✅ Ministerial questions
│   │   └── service/
│   ├── questions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── QuestionsPage.jsx        # ✅ Question bank
│   │   └── service/
│   ├── students/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── StudentsPage.jsx         # ✅ Student management
│   │   └── service/
│   ├── subjects/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── SubjectsPage.jsx         # ✅ Subject management
│   │   └── service/
│   └── units/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       │   └── UnitsPage.jsx            # ✅ Unit management
│       └── service/
├── hooks/                     # ✅ Custom React hooks
│   ├── index.js
│   ├── useCssVariables.js     # CSS variables hook
│   ├── useDocumentDirection.js # RTL/LTR direction hook
│   ├── useLanguage.js         # Language state hook
│   ├── useMuiTheme.js         # MUI theme hook
│   ├── useReduxTheme.js       # Theme state hook
│   ├── useSidebar.js          # Sidebar state hook
│   └── useUser.js             # ✅ User state hook (with login/logout)
├── i18n/                      # 🔄 To be created
│   ├── index.js
│   ├── locales/
│   │   ├── ar.js
│   │   └── en.js
│   └── hooks/
│       └── useTranslation.js
├── layout/                    # 🔄 To be created - Layout components
│   ├── MainLayout.jsx
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/                     # Main pages
│   └── NotFoundPage.jsx       # ✅ 404 error page
├── providers/                 # ✅ Provider components
│   ├── QueryProvider.jsx      # ✅ React Query provider
│   ├── ReduxProvider.jsx      # ✅ Redux provider
│   └── ThemeProvider.jsx      # ✅ MUI Theme provider
├── services/                  # API services (empty for now)
├── store/                     # ✅ Redux store configuration
│   ├── index.js               # ✅ Store setup
│   └── slices/
│       ├── languageSlice.js   # ✅ Language state (ar/en)
│       ├── sidebarSlice.js    # ✅ Sidebar state (open/closed)
│       ├── themeSlice.js      # ✅ Theme state (light/dark)
│       └── userSlice.js       # ✅ User state (with login/logout)
├── theme/                     # ✅ Theme configuration
│   ├── index.js               # ✅ Main theme configuration
│   ├── colors.js              # ✅ Color palette
│   ├── typography.js          # ✅ Typography settings
│   └── components.js          # ✅ MUI component overrides
└── utils/                     # Utility functions (empty for now)

Legend:
✅ Completed and working
🔄 To be created

Total Pages Created: 16
- LoginPage
- DashboardPage
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
- [ ] Sidebar toggles correctly
- [x] RTL layout displays properly in Arabic
- [x] All routes are accessible (16 routes configured)
- [x] Protected routes redirect to login
- [x] React Query fetches data correctly
- [x] Login/logout functionality works
- [x] Navigation between pages works
- [ ] Layout is responsive on all devices

---

## Success Criteria

✅ Redux store is configured and working
✅ Theme system supports light/dark mode
✅ RTL support works for Arabic
✅ Nebras brand colors (#006239) integrated
✅ Cairo font installed for Arabic
✅ Custom hooks created and organized
✅ No hardcoded values in theme
✅ React Query provider is set up
  ✅ Query client configured with optimal defaults
  ✅ QueryProvider component created with devtools
  ✅ Demo component showing queries and mutations
  ✅ Caching and refetching working properly
✅ React Router is configured with protected routes
  ✅ 16 routes configured and working
  ✅ ProtectedRoute component created
  ✅ Dynamic routes with parameters (/competitions/:id)
  ✅ Login/logout functionality in userSlice
  ✅ All page components created
  ✅ 404 Not Found page
  ✅ Temporary header with theme/language controls
- [ ] Layout components are responsive
- [ ] i18n is configured for Arabic and English
- [ ] All base infrastructure is ready for Phase 2

---

## Next Phase

After completing Phase 1, proceed to **[Phase 2: Authentication](phase-2-authentication.md)**

---

**Last Updated:** 2025-10-20
