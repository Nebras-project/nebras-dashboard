# Nebras Dashboard - Project Plan

## 📋 Project Overview

**Nebras Dashboard** is an educational management system for managing curriculum, questions (ministerial & enrichment), competitions, and students. The dashboard is built for administrators and managers, while students access a separate Flutter mobile app for quizzes and competitions.

---

## 🎯 Tech Stack

### Core Technologies

- **Framework:** React 18.3.1
- **Build Tool:** Vite 6.0.5
- **Language:** JavaScript (JSX)

### Libraries & Tools

#### Routing & Navigation
- **React Router DOM** 7.9.4 - Client-side routing

#### UI Framework & Components
- **Material UI** (@mui/material) 7.3.4 - Component library
- **MUI Data Grid** (@mui/x-data-grid) 8.14.1 - Advanced data tables
- **React Icons** 5.5.0 - Icon library

#### Forms & Validation
- **React Hook Form** 7.65.0 - Form state management

#### State Management
- **React Query** (@tanstack/react-query) 5.90.5 - Server state management
- **React Query Devtools** 5.90.2 - Development tools
- **Redux Toolkit** 2.9.1 - UI state management
- **React Redux** 9.2.0 - React bindings for Redux

#### Styling & Theming
- **Emotion** (@emotion/react) 11.14.0 - CSS-in-JS
- **Emotion Styled** (@emotion/styled) 11.14.1 - Styled components
- **React Colorful** 5.6.1 - Color picker component
- **Stylis Plugin RTL** 2.1.1 - RTL support for Emotion

#### Internationalization (i18n)
- **i18next** 25.6.0 - Internationalization framework
- **React i18next** 16.2.0 - React bindings for i18next
- **RTL Detect** 1.1.2 - RTL language detection

#### Fonts
- **Cairo Font** (@fontsource/cairo) 5.2.7 - Arabic font support

#### Development Tools
- **ESLint** 9.17.0 - JavaScript linter
- **Vite Plugin React** 4.3.4 - Fast refresh and JSX support

---

## 👥 User Roles & Hierarchy

```text
Owner (Top Level)
  ↓
General Admin
  ↓
Curriculum Manager
  ↓
Competition Manager
  ↓
Content Manager (Bottom Level)
```

### Role Responsibilities

| Role | Responsibilities | Multiple Roles |
|------|-----------------|----------------|
| **Owner** | • Manage General Admins  <br>• Everything General Admin can do | ✅ Yes |
| **General Admin** | • Manage all managers  <br>• Manage students  <br>• Full system access | ✅ Yes |
| **Curriculum Manager** | • Create and manage structure:  <br>  - Levels  <br>  - Subjects  <br>  - Units  <br>  - Lessons | ❌ No |
| **Competition Manager** | • Create and manage competitions | ❌ No |
| **Content Manager** | • Create and manage questions:  <br>  - Ministerial questions  <br>  - Enrichment questions | ❌ No |

### Important Notes

- **Students do NOT access this dashboard** - they use a separate Flutter mobile app
- Students can self-register OR be created by Owner/General Admin
- Each manager can only see and manage their own work
- Owner and General Admin can do anything, but Owner can also manage General Admins

---

## 📁 Project Architecture

### Folder Structure

```text
src/
├── App.jsx                        # Main App component with routing
├── main.jsx                       # Application entry point
├── index.css                      # Global styles (RTL support, scrollbar, etc.)
│
├── components/                    # Shared reusable components
│   ├── ColorPicker.jsx            # Theme color picker component
│   ├── LanguageSync.jsx           # Redux-i18n language synchronization
│   ├── ProtectedRoute.jsx         # Route authentication guard              # RTL testing component
│   └── README.md                  # Component documentation
│
├── config/                        # Configuration files
│   ├── queryClient.js             # React Query client configuration
│   ├── routes.jsx                 # React Router route definitions
│   └── README.md                  # Configuration documentation
│
├── contexts/                      # React Context providers (currently empty)
│
├── data/                          # Static data, assets, and images
│   └── images/
│       ├── Nebras Logo Dark.svg   # Dark mode logo
│       └── Nebras Logo Light.svg  # Light mode logo
│
├── features/                      # Feature-based modules (by domain)
│   ├── admins/                    # Admin management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── AdminsPage.jsx
│   │   └── service/
│   │
│   ├── authentication/            # Login & authentication
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── LoginPage.jsx
│   │   └── service/
│   │
│   ├── competitions/              # Competition management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── CompetitionsPage.jsx      # List all competitions
│   │   │   ├── CompetitionPage.jsx       # Competition details
│   │   │   ├── CompetitionMembersPage.jsx # Participants
│   │   │   ├── CompetitionExamPage.jsx   # Exam management
│   │   │   └── CompetitionResultPage.jsx # Results & rankings
│   │   └── services/
│   │
│   ├── curriculums/               # Curriculum management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── CurriculumsPage.jsx
│   │   └── services/
│   │
│   ├── dashboard/                 # Dashboard & analytics
│   │   ├── components/
│   │   │   ├── CompetitionDashboard.jsx  # Competition manager view
│   │   │   ├── ContentDashboard.jsx      # Content manager view
│   │   │   ├── CurriculumDashboard.jsx   # Curriculum manager view
│   │   │   ├── OwnerDashboard.jsx        # Owner/admin view
│   │   │   └── StatCard.jsx              # Reusable stat card
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── DashboardPage.jsx         # Role-based dashboard
│   │   └── service/
│   │
│   ├── enrichment-questions/      # Enrichment question bank
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── EnrichmentQuestionsPage.jsx
│   │   └── service/
│   │
│   ├── lessons/                   # Lesson management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── service/
│   │
│   ├── ministerial-questions/     # Ministerial question bank
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── MinisterialQuestionsPage.jsx
│   │   └── service/
│   │
│   ├── questions/                 # General question bank
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── QuestionsPage.jsx
│   │   └── service/
│   │
│   ├── students/                  # Student management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── StudentsPage.jsx
│   │   └── service/
│   │
│   ├── subjects/                  # Subject management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── SubjectsPage.jsx
│   │   └── service/
│   │
│   └── units/                     # Unit management
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       │   └── UnitsPage.jsx
│       └── service/
│
├── hooks/                         # Custom React hooks
│   ├── index.js                   # Hook exports
│   ├── useColorScheme.js          # Color scheme management
│   ├── useCssVariables.js         # CSS variables hook
│   ├── useDocumentDirection.js    # RTL/LTR direction hook
│   ├── useLanguage.js             # Language state hook
│   ├── useMuiTheme.js             # MUI theme hook
│   ├── useReduxTheme.js           # Theme state hook
│   ├── useSidebar.js              # Sidebar state hook
│   └── useUser.js                 # User state hook
│
├── i18n/                          # Internationalization (i18n)
│   ├── index.js                   # i18n initialization
│   ├── hooks/
│   │   └── useTranslation.js      # Custom translation hook
│   ├── locales/
│   │   ├── index.js               # Locale exports
│   │   ├── ar.js                  # Arabic translations
│   │   └── en.js                  # English translations
│   └── README.md                  # i18n documentation
│
├── layout/                        # Layout components
│   ├── constants.js               # Layout constants & styles
│   ├── index.js                   # Layout exports
│   ├── MainLayout.jsx             # Main layout wrapper
│   ├── README.md                  # Layout documentation
│   │
│   ├── header/                    # Header components
│   │   ├── index.js
│   │   ├── Header.jsx             # Main header component
│   │   ├── headerConfig.js        # Header configuration
│   │   └── components/
│   │       └── UserInfo.jsx       # User profile dropdown
│   │
│   └── sidebar/                   # Sidebar components
│       ├── index.js
│       ├── Sidebar.jsx            # Main sidebar component
│       ├── sidebarConfig.jsx      # Role-based navigation config
│       └── components/
│           ├── LogoHeader.jsx     # Logo & brand section
│           ├── NavigationMenu.jsx # Navigation menu items
│           └── SidebarControls.jsx # Bottom controls (theme, lang, etc.)
│
├── pages/                         # Standalone pages
│   └── NotFoundPage.jsx           # 404 error page
│
├── providers/                     # Provider components
│   ├── QueryProvider.jsx          # React Query provider
│   ├── ReduxProvider.jsx          # Redux provider
│   └── ThemeProvider.jsx          # MUI Theme provider with RTL support
│
├── services/                      # API services (for future API integration)
│
├── store/                         # Redux store configuration
│   ├── index.js                   # Store setup & configuration
│   ├── middleware/                # Custom Redux middleware
│   │   ├── localStorageMiddleware.js # Persist state to localStorage
│   │   └── STORAGE_SECURITY.md    # Security documentation
│   └── slices/                    # Redux Toolkit slices
│       ├── colorSchemeSlice.js    # Color scheme state
│       ├── languageSlice.js       # Language state (ar/en)
│       ├── sidebarSlice.js        # Sidebar state (open/collapsed)
│       ├── themeSlice.js          # Theme mode state (light/dark)
│       └── userSlice.js           # User authentication state
│
├── theme/                         # Theme configuration
│   ├── index.js                   # Main theme creation
│   ├── colors.js                  # Color palette & schemes
│   ├── typography.js              # Typography settings (Cairo font)
│   └── components.js              # MUI component overrides
│
└── utils/                         # Utility functions
    ├── colorHelpers.js            # Color manipulation utilities
    ├── migrateLocalStorage.js     # Storage migration utility
    ├── rtl.js                     # RTL helper functions
    └── secureStorage.js           # Secure localStorage wrapper
```

### Architecture Principles

#### Feature-Based Organization
- Each feature has its own folder with components, hooks, pages, and services
- Promotes modularity and maintainability
- Easy to locate feature-specific code

#### Separation of Concerns
- **Layout**: Application structure (header, sidebar, main content)
- **Features**: Domain-specific functionality
- **Components**: Reusable UI components
- **Hooks**: Reusable React logic
- **Store**: Global UI state management
- **Theme**: Visual appearance & styling
- **i18n**: Internationalization & translations

#### State Management Strategy
- **Redux**: UI state (theme, language, sidebar, user)
- **React Query**: Server state (API data, caching)
- **Local State**: Component-specific state
- **Context**: Cross-cutting concerns (when needed)

#### Code Organization
- Clear folder hierarchy
- Consistent naming conventions
- Logical grouping of related files
- README files for documentation

---

## 📚 Content Hierarchy

```text
Level
  ↓
Subject
  ↓
Unit
  ↓
Lesson
  ↓
Questions (Ministerial & Enrichment)
```

### Content Rules

- ✅ Subject has multiple units
- ✅ Unit has multiple lessons
- ✅ Lesson has multiple questions
- ❌ No sub-lessons (flat structure)
- ❌ No reordering (sequential order)

---

## ❓ Question System

### Question Types

- ✅ Multiple Choice
- ✅ True/False
- ✅ Can have images

### Question Categories

1. **Ministerial Questions** - Official exam questions
2. **Enrichment Questions** - Practice/enrichment questions
3. **General Questions** - Combined view of all questions

### Important Notes

- Ministerial and Enrichment questions are **completely separate**
- Maybe the same question can be both (to be decided)
- Maybe different difficulty levels (to be decided)
- Maybe import/export functionality (to be decided)
- Questions are displayed to students in the Flutter app
- Dashboard only manages questions (no quiz taking)

---

## 🎨 UI/UX Requirements

### Design System

- ✅ **Light/Dark Mode Toggle** (stored in Redux/Context)
- ✅ **RTL Support** (Arabic + English)
- ✅ **Custom Color Scheme**
- ✅ **Responsive Design** (Mobile, Tablet, Desktop)

### Navigation

- ✅ **Sidebar Navigation**

### Internationalization

- ✅ **Bilingual Support**: Arabic & English
- Error messages in both languages
- Form validation in both languages

---

## 🔄 State Management Strategy

### Redux/Context API (UI State)

- Theme (light/dark mode)
- Language (Arabic/English)
- Sidebar open/close state
- Current user information
- UI preferences

### React Query (Server State)

- All API data:
  - Users
  - Subjects
  - Units
  - Lessons
  - Questions (Ministerial & Enrichment)
  - Competitions
  - Student data
- Caching & auto-refetch
- Optimistic updates

---

## 📊 Features & Functionality

### Phase 1: Foundation ✅
**Status:** ✅ Complete  
**Documentation:** [phase-1-foundation.md](./phase-1-foundation.md)

**Completed:**
- [x] Project setup with Vite
- [x] Install all dependencies
- [x] Create folder structure
- [x] Create project plan documentation
- [x] Setup Redux store for UI state
- [x] Create theme configuration (light/dark, RTL, custom colors)
- [x] Setup React Query provider
- [x] Setup React Router with protected routes
- [x] Create layout components (Sidebar, Header, Main Layout)
- [x] Setup i18n for Arabic/English (200+ translation keys)

### Phase 2: Authentication
**Status:** ⏳ Pending  
**Documentation:** [phase-2-authentication.md](./phase-2-authentication.md)

- [ ] Create login page
- [ ] Role-based route protection
- [ ] Auth context/Redux slice
- [ ] JWT token management
- [ ] Session management

### Phase 3: Core Features
**Status:** ⏳ Pending  
**Documentation:** [phase-3-core-features.md](./phase-3-core-features.md)

**Priority Order:**
1. Curriculum Manager - Structure management
2. Content Manager - Question management
3. Competition Manager - Competition management
4. General Admin - User management
5. Owner - Admin management

### Phase 4: Polish
**Status:** ⏳ Pending  
**Documentation:** [phase-4-polish.md](./phase-4-polish.md)

- [ ] Dashboard/analytics for each role
- [ ] Reports & exports (PDF, Excel)
- [ ] Advanced search & filters
- [ ] Notifications system
- [ ] Activity logs
- [ ] Performance optimization
- [ ] Testing
- [ ] Documentation

---

## 🔒 Security Requirements

- ✅ JWT token authentication
- ✅ Rate limiting
- ✅ XSS/CSRF protection
- ✅ File upload size limits
- ✅ Role-based access control (RBAC)
- Maybe audit logs for sensitive actions
- Maybe data backup strategy

---

## 🧪 Testing Strategy

- ✅ Unit tests for critical functions
- ✅ Integration tests for features
- ✅ E2E tests for user flows
- ✅ Form validation tests
- ✅ API integration tests

---

## 📝 Data Management

### Current Approach

- Using **dummy data** for now
- Will discuss real API integration later

### Future Considerations

- API endpoints structure
- Data models & schemas
- Database design
- Caching strategy
- Offline support (maybe)

---

## 🎯 Edge Cases & Solutions

### Data Integrity

- **Soft Delete**: Use `isActive` or `isDeleted` flags instead of hard delete
- **Cascading**: Prevent deletion of entities with dependencies
- **Orphaned Data**: Handle cases where parent entities are deleted
- **Recovery**: Allow restoring soft-deleted items

### Performance

- **Pagination**: For large data lists
- **Virtual Scrolling**: For very long lists
- **Image Optimization**: Compress and lazy load images
- **Code Splitting**: Lazy load routes and components

### Error Handling

- **Client-side Validation**: Immediate feedback
- **Server-side Validation**: Security & data integrity
- **Error Messages**: In both Arabic and English
- **Fallback UI**: When API fails
- **Retry Logic**: For failed requests

---

## 🌍 Internationalization (i18n)

### Supported Languages

- **Arabic** (RTL)
- **English** (LTR)

### Implementation

- Language switcher in UI
- Store language preference in Redux/Context
- All text content translatable
- Error messages in both languages
- Date/time formatting per locale

---

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Considerations

- Sidebar collapses on mobile
- Tables scroll horizontally on mobile
- Touch-friendly buttons and inputs
- Optimized forms for mobile

---

## 📅 Timeline

*To be determined based on requirements and team capacity*

---

## 🎓 Notes & Decisions

### Key Decisions Made
1. ✅ Using JavaScript instead of TypeScript
2. ✅ Material UI for components
3. ✅ React Query for server state
4. ✅ Redux Toolkit for UI state
5. ✅ Sidebar navigation
6. ✅ RTL support for Arabic
7. ✅ Light/Dark mode toggle
8. ✅ Dummy data for initial development

### Pending Decisions

- [ ] Real API structure
- [ ] Database schema
- [ ] File upload strategy
- [ ] Analytics requirements
- [ ] Reporting needs
- [ ] Notification system
- [ ] Audit logging

---

## 👨‍💻 Team Structure

- **Tech Leader**: Project owner
- **Senior Developer**: Implementation lead

---

## 📞 Support & Communication

*Project documentation and planning file*
*Last Updated: 2025-01-18*

---

## 🎯 Success Criteria

- ✅ All user roles can access their assigned features
- ✅ Bilingual support (Arabic & English)
- ✅ Responsive design across all devices
- ✅ Secure authentication and authorization
- ✅ Fast and performant application
- ✅ Clean and maintainable code
- ✅ Comprehensive testing coverage

---

**End of Plan Document**
