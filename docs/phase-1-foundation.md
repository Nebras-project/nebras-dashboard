# Phase 1: Foundation

## Overview
Setup core infrastructure and base configuration for the Nebras Dashboard.

## Status: ✅ Complete

---

## Tasks

### ✅ Completed

- [x] Project setup with Vite
- [x] Install all dependencies
- [x] Create folder structure
- [x] Create project plan documentation
- [x] Setup Redux store for UI state
- [x] Create theme configuration (light/dark, RTL, custom colors)
- [x] Split Redux hooks into separate files
- [x] Add Cairo font for Arabic support

### 📋 Pending

- [ ] Setup React Query provider
- [ ] Setup React Router with protected routes
- [ ] Create layout components (Sidebar, Header, Main Layout)
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

## File Structure After Phase 1

```text
src/
├── config/
│   ├── queryClient.js
│   └── routes.js
├── i18n/
│   ├── index.js
│   ├── locales/
│   │   ├── ar.js
│   │   └── en.js
│   └── hooks/
│       └── useTranslation.js
├── layout/
│   ├── MainLayout.jsx
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   └── Footer.jsx
├── providers/
│   └── QueryProvider.jsx
├── store/
│   ├── index.js
│   └── slices/
│       ├── themeSlice.js
│       ├── languageSlice.js
│       ├── sidebarSlice.js
│       └── userSlice.js
├── theme/
│   ├── index.js
│   ├── colors.js
│   ├── typography.js
│   └── components.js
└── components/
    └── ProtectedRoute.jsx
```

---

## Testing Checklist

- [x] Redux store updates correctly
- [ ] Theme toggle works (light/dark)
- [ ] Language switcher works (AR/EN)
- [ ] Sidebar toggles correctly
- [ ] RTL layout displays properly in Arabic
- [ ] All routes are accessible
- [ ] Protected routes redirect to login
- [ ] React Query fetches data correctly
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
- [ ] React Query provider is set up
- [ ] React Router is configured with protected routes
- [ ] Layout components are responsive
- [ ] i18n is configured for Arabic and English
- [ ] All base infrastructure is ready for Phase 2

---

## Next Phase

After completing Phase 1, proceed to **[Phase 2: Authentication](phase-2-authentication.md)**

---

**Last Updated:** 2025-01-18
