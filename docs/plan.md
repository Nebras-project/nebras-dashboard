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

| Role                    | Responsibilities                                                                         | Multiple Roles |
| ----------------------- | ---------------------------------------------------------------------------------------- | -------------- |
| **Owner**               | • Manage General Admins <br>• Everything General Admin can do                            | ✅ Yes         |
| **General Admin**       | • Manage all managers <br>• Manage students <br>• Full system access                     | ✅ Yes         |
| **Curriculum Manager**  | • Create and manage structure: <br> - Levels <br> - Subjects <br> - Units <br> - Lessons | ❌ No          |
| **Competition Manager** | • Create and manage competitions                                                         | ❌ No          |
| **Content Manager**     | • Create and manage questions: <br> - Ministerial questions <br> - Enrichment questions  | ❌ No          |

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
│   ├── dialogs/                   # Dialog components
│   │   └── ConfirmDialog.jsx     # Confirmation dialog
│   ├── display/                   # Display components
│   │   ├── Card.jsx              # Card component
│   │   ├── ColorSwatch.jsx       # Color swatch display
│   │   ├── DateTime.jsx          # Date/time display
│   │   ├── Icon.jsx              # Icon component
│   │   ├── Logo.jsx              # Logo component
│   │   └── UserAvatar.jsx        # User avatar component
│   ├── errors/                    # Error handling components
│   │   ├── ErrorActions.jsx      # Error action buttons
│   │   ├── ErrorBoundary.jsx      # Error boundary wrapper
│   │   ├── ErrorDetails.jsx      # Error details display
│   │   ├── ErrorFallback.jsx     # Error fallback UI
│   │   ├── ErrorIcon.jsx         # Error icon component
│   │   ├── ErrorMessage.jsx       # Error message display
│   │   └── index.js              # Error components exports
│   ├── feedback/                  # Feedback components
│   │   ├── FireLoader.css        # Fire loader styles
│   │   ├── FireLoader.jsx        # Fire animation loader
│   │   ├── Loader.jsx            # Loading spinner
│   │   ├── LoadingLogo.jsx       # Logo with loading state
│   │   ├── LoadingMessage.jsx    # Loading message
│   │   ├── LogoWithFireLoader.jsx # Logo with fire loader
│   │   ├── Message.jsx           # Message component
│   │   ├── Toast.jsx             # Toast notification
│   │   ├── ToastContainer.jsx    # Toast container
│   │   └── index.js              # Feedback components exports
│   ├── forms/                     # Form components & system
│   │   ├── components/           # Form compound components
│   │   │   ├── FormActions.jsx   # Form action buttons
│   │   │   ├── FormContent.jsx   # Form content wrapper
│   │   │   ├── FormProvider.jsx  # Form context provider
│   │   │   ├── FormResetButton.jsx # Reset button
│   │   │   ├── FormSubmitButton.jsx # Submit button
│   │   │   ├── FormTitle.jsx     # Form title
│   │   │   ├── TitleCloseButton.jsx # Title close button
│   │   │   ├── TitleContent.jsx  # Title content wrapper
│   │   │   └── index.js          # Form components exports
│   │   ├── hooks/                # Form hooks
│   │   │   ├── useFormContext.js # Form context hook
│   │   │   ├── useFormFieldError.js # Field error hook
│   │   │   ├── useFormSetup.js   # Form setup hook
│   │   │   └── index.js          # Form hooks exports
│   │   ├── inputs/               # Form input components
│   │   │   ├── CheckboxInput.jsx # Checkbox input
│   │   │   ├── DateInput.jsx     # Date input
│   │   │   ├── EmailInput.jsx    # Email input
│   │   │   ├── FileInput.jsx     # File input
│   │   │   ├── PasswordInput.jsx # Password input
│   │   │   ├── RadioInput.jsx    # Radio input
│   │   │   ├── SelectInput.jsx   # Select dropdown
│   │   │   ├── TextInput.jsx     # Text input
│   │   │   └── index.js          # Input components exports
│   │   ├── utils/                # Form utilities
│   │   │   ├── parseOption.js    # Option parser utility
│   │   │   └── index.js          # Form utils exports
│   │   ├── constants.js           # Form constants
│   │   ├── Form.jsx              # Main form component
│   │   ├── FormContext.js        # Form context definition
│   │   ├── FormDialog.jsx        # Form dialog wrapper
│   │   ├── FormPage.jsx          # Form page wrapper
│   │   ├── index.js              # Form components exports
│   │   └── README.md             # Form system documentation
│   ├── i18n/                     # i18n components
│   │   └── LanguageSync.jsx      # Redux-i18n language synchronization
│   ├── inputs/                   # Input components
│   │   ├── BackButton.jsx        # Back navigation button
│   │   ├── Button.jsx            # Button component
│   │   ├── CloseButton.jsx       # Close button
│   │   ├── ColorPicker.jsx       # Theme color picker
│   │   ├── Dropdown.jsx          # Dropdown menu
│   │   ├── ListButton.jsx        # List view button
│   │   ├── LogoutButton.jsx      # Logout button
│   │   └── Menu.jsx              # Menu component
│   ├── layout/                   # Layout components
│   │   ├── PageHeader.jsx        # Page header component
│   │   └── PageLayout.jsx        # Page layout wrapper
│   ├── routing/                  # Routing components
│   │   └── ProtectedRoute.jsx    # Route authentication guard
│   ├── index.js                  # Components exports
│   └── README.md                 # Component documentation
│
├── config/                       # Configuration files
│   ├── env.js                    # Environment configuration
│   ├── index.js                  # Config exports
│   ├── queryClient.js            # React Query client configuration
│   ├── routes.jsx                # React Router route definitions
│   └── README.md                 # Configuration documentation
│
├── constants/                    # Application constants
│   ├── index.js                  # Constants exports
│   ├── layout.js                 # Layout constants
│   ├── spacing.js                # Spacing constants
│   └── README.md                 # Constants documentation
│
├── data/                         # Static data, assets, and images
│   └── images/
│       ├── Nebras Logo Dark.svg  # Dark mode logo
│       └── Nebras Logo Light.svg # Light mode logo
│
├── features/                     # Feature-based modules (by domain)
│   ├── admins/                   # Admin management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── AdminsPage.jsx
│   │   │   └── index.js
│   │   ├── services/
│   │   └── index.js
│   │
│   ├── authentication/           # Login & authentication
│   │   ├── components/           # Auth components
│   │   ├── hooks/                # Auth hooks
│   │   │   ├── useAuth.js        # Authentication state hook
│   │   │   └── useRole.js        # Role-based helpers
│   │   ├── pages/                # Auth pages
│   │   │   ├── LoginPage.jsx
│   │   │   └── index.js
│   │   ├── services/             # Auth services
│   │   └── index.js
│   │
│   ├── competitions/             # Competition management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── CompetitionsPage.jsx      # List all competitions
│   │   │   ├── CompetitionPage.jsx       # Competition details
│   │   │   ├── CompetitionMembersPage.jsx # Participants
│   │   │   ├── CompetitionExamPage.jsx   # Exam management
│   │   │   ├── CompetitionResultPage.jsx # Results & rankings
│   │   │   └── index.js
│   │   ├── services/
│   │   └── index.js
│   │
│   ├── curriculums/              # Curriculum management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── CurriculumsPage.jsx
│   │   │   └── index.js
│   │   ├── services/
│   │   └── index.js
│   │
│   ├── dashboard/                # Dashboard & analytics
│   │   ├── components/
│   │   │   ├── CompetitionDashboard.jsx  # Competition manager view
│   │   │   ├── ContentDashboard.jsx      # Content manager view
│   │   │   ├── CurriculumDashboard.jsx   # Curriculum manager view
│   │   │   ├── OwnerDashboard.jsx        # Owner/admin view
│   │   │   ├── StatCard.jsx             # Reusable stat card
│   │   │   └── index.js
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx        # Role-based dashboard
│   │   │   └── index.js
│   │   ├── services/
│   │   └── index.js
│   │
│   ├── enrichment-questions/     # Enrichment question bank
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── EnrichmentQuestionsPage.jsx
│   │   │   └── index.js
│   │   ├── services/
│   │   └── index.js
│   │
│   ├── lessons/                  # Lesson management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── ministerial-questions/    # Ministerial question bank
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── MinisterialQuestionsPage.jsx
│   │   │   └── index.js
│   │   ├── services/
│   │   └── index.js
│   │
│   ├── questions/                # General question bank
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── QuestionsPage.jsx
│   │   │   └── index.js
│   │   ├── services/
│   │   └── index.js
│   │
│   ├── settings/                 # Settings & preferences
│   │   ├── components/
│   │   │   ├── AccountActionsCard.jsx
│   │   │   ├── ColorSettingsCard.jsx
│   │   │   ├── LanguageCard.jsx
│   │   │   ├── PersonalInfoCard.jsx
│   │   │   ├── PreferencesTab.jsx
│   │   │   ├── ProfileHero.jsx
│   │   │   ├── ProfileTab.jsx
│   │   │   ├── SecurityCard.jsx
│   │   │   ├── SettingsTabsHeader.jsx
│   │   │   ├── TabPanel.jsx
│   │   │   ├── ThemeCard.jsx
│   │   │   └── index.js
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── SettingsPage.jsx
│   │   │   └── index.js
│   │   ├── services/
│   │   ├── settingsConfig.jsx
│   │   └── index.js
│   │
│   ├── students/                 # Student management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── StudentsPage.jsx
│   │   │   └── index.js
│   │   ├── services/
│   │   └── index.js
│   │
│   ├── subjects/                 # Subject management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── SubjectsPage.jsx
│   │   │   └── index.js
│   │   ├── services/
│   │   └── index.js
│   │
│   └── units/                    # Unit management
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       │   ├── UnitsPage.jsx
│       │   └── index.js
│       ├── services/
│       └── index.js
│
├── hooks/                        # Custom React hooks
│   ├── index.js                 # Hook exports
│   ├── useColorScheme.js        # Color scheme management
│   ├── useConfirmDialog.js      # Confirmation dialog hook
│   ├── useCssVariables.js       # CSS variables hook
│   ├── useDateTime.js           # Date/time utilities hook
│   ├── useDocumentDirection.js  # RTL/LTR direction hook
│   ├── useLanguage.js           # Language state hook
│   ├── useMenu.js               # Menu state hook
│   ├── useMuiTheme.js           # MUI theme hook
│   ├── useReduxTheme.js         # Theme state hook
│   ├── useResponsiveSidebar.js  # Responsive sidebar hook
│   ├── useSidebar.js            # Sidebar state hook
│   ├── useSidebarNavigation.js  # Sidebar navigation hook
│   └── useToast.js              # Toast notification hook
│
├── i18n/                         # Internationalization (i18n)
│   ├── hooks/
│   │   └── useTranslation.js    # Custom translation hook
│   ├── locales/
│   │   ├── index.js             # Locale exports
│   │   ├── ar.js               # Arabic translations
│   │   └── en.js               # English translations
│   ├── index.js                 # i18n initialization
│   └── README.md                # i18n documentation
│
├── layout/                       # Layout components
│   ├── header/                  # Header components
│   │   ├── components/
│   │   │   └── UserInfo.jsx    # User profile dropdown
│   │   ├── Header.jsx           # Main header component
│   │   ├── headerConfig.js     # Header configuration
│   │   └── index.js            # Header exports
│   ├── mainlayout/              # Main layout components
│   │   ├── components/
│   │   │   ├── DesktopLayout.jsx # Desktop layout
│   │   │   ├── MobileLayout.jsx  # Mobile layout
│   │   │   └── index.js
│   │   ├── MainLayout.jsx       # Main layout wrapper
│   │   └── index.js
│   ├── sidebar/                 # Sidebar components
│   │   ├── components/
│   │   │   ├── DesktopSidebar.jsx    # Desktop sidebar
│   │   │   ├── MobileDrawer.jsx      # Mobile drawer
│   │   │   ├── NavigationDropdown.jsx # Navigation dropdown
│   │   │   ├── NavigationItem.jsx    # Navigation item
│   │   │   ├── NavigationMenu.jsx    # Navigation menu
│   │   │   └── SidebarHeader.jsx     # Sidebar header
│   │   ├── Sidebar.jsx          # Main sidebar component
│   │   ├── sidebarConfig.jsx    # Role-based navigation config
│   │   ├── sidebarStyles.js     # Sidebar styles
│   │   └── index.js             # Sidebar exports
│   ├── index.js                 # Layout exports
│   └── README.md                # Layout documentation
│
├── pages/                        # Standalone pages
│   ├── NotFoundPage.jsx         # 404 error page
│   └── index.js                 # Pages exports
│
├── providers/                    # Provider components
│   ├── QueryProvider.jsx        # React Query provider
│   ├── ReduxProvider.jsx        # Redux provider
│   ├── ThemeProvider.jsx        # MUI Theme provider with RTL support
│   └── index.js                 # Provider exports
│
├── services/                     # API services (for future API integration)
│   └── index.js                 # Services exports
│
├── store/                        # Redux store configuration
│   ├── middleware/              # Custom Redux middleware
│   │   ├── localStorageMiddleware.js # Persist state to localStorage
│   │   └── STORAGE_SECURITY.md  # Security documentation
│   ├── slices/                  # Redux Toolkit slices
│   │   ├── colorSchemeSlice.js  # Color scheme state
│   │   ├── index.js            # Slices exports
│   │   ├── languageSlice.js     # Language state (ar/en)
│   │   ├── sidebarSlice.js      # Sidebar state (open/collapsed)
│   │   ├── themeSlice.js        # Theme mode state (light/dark)
│   │   ├── toastSlice.js        # Toast notification state
│   │   └── authSlice.js         # Authentication state (user, token, auth status)
│   └── index.js                 # Store setup & configuration
│
├── theme/                        # Theme configuration
│   ├── colors.js                # Color palette & schemes
│   ├── components.js            # MUI component overrides
│   ├── index.js                 # Main theme creation
│   ├── typography.js            # Typography settings (Cairo font)
│   └── README.md                # Theme documentation
│
└── utils/                        # Utility functions
    ├── colorUtils.js            # Color manipulation utilities
    ├── dateUtils.js             # Date/time utilities
    ├── errorLogger.js           # Error logging utilities
    ├── index.js                 # Utils exports
    ├── languageUtils.js         # Language utilities
    ├── layoutUtils.js           # Layout utilities
    ├── migrateLocalStorage.js   # Storage migration utility
    ├── rtl.js                   # RTL helper functions
    ├── secureStorage.js         # Secure localStorage wrapper
    └── README.md                # Utils documentation
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

- [✅] Project setup with Vite
- [✅] Install all dependencies
- [✅] Create folder structure
- [✅] Create project plan documentation
- [✅] Setup Redux store for UI state
- [✅] Create theme configuration (light/dark, RTL, custom colors)
- [✅] Setup React Query provider
- [✅] Setup React Router with protected routes
- [✅] Create layout components (Sidebar, Header, Main Layout)
- [✅] Setup i18n for Arabic/English (200+ translation keys)

### Phase 2: Authentication

**Status:** ⚒️ in progress

**Documentation:** [phase-2-authentication.md](./phase-2-authentication.md)

- [✅] Create login page
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

_To be determined based on requirements and team capacity_

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

_Project documentation and planning file_
_Last Updated: 2025-01-18_

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
