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

- **Routing:** React Router DOM
- **UI Framework:** Material UI (@mui/material)
- **Data Grid:** @mui/x-data-grid
- **Icons:** react-icons
- **Form Management:** React Hook Form
- **Remote State:** React Query (@tanstack/react-query)
- **UI State:** Redux Toolkit + React Redux
- **Styling:** Emotion (@emotion/react, @emotion/styled)

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
├── App.jsx                    # Main App component
├── main.jsx                   # Application entry point
├── index.css                  # Global styles
├── components/                # Shared reusable components
│   └── ReactQueryDemo.jsx
├── config/                    # Configuration files
│   ├── queryClient.js         # React Query client configuration
│   └── README.md
├── contexts/                  # React Context providers
├── data/                      # Static data, constants, dummy data
│   └── images/
│       ├── Nebras Logo Dark.svg
│       └── Nebras Logo Light.svg
├── features/                  # Feature-based modules
│   ├── admins/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── service/
│   ├── authentication/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── service/
│   ├── competitions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── service/
│   ├── enrichment-questions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
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
│   │   └── service/
│   ├── questions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── service/
│   ├── students/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── service/
│   ├── subjects/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── service/
│   └── units/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── service/
├── hooks/                     # Custom React hooks
│   ├── index.js
│   ├── useCssVariables.js
│   ├── useDocumentDirection.js
│   ├── useLanguage.js
│   ├── useMuiTheme.js
│   ├── useReduxTheme.js
│   ├── useSidebar.js
│   └── useUser.js
├── layout/                    # Layout components (Sidebar, Header, etc.)
├── pages/                     # Main pages
├── providers/                 # Provider components
│   ├── QueryProvider.jsx      # React Query provider
│   ├── ReduxProvider.jsx      # Redux provider
│   └── ThemeProvider.jsx      # MUI Theme provider
├── services/                  # API services
├── store/                     # Redux store configuration
│   ├── index.js               # Store setup
│   └── slices/
│       ├── languageSlice.js   # Language state (ar/en)
│       ├── sidebarSlice.js    # Sidebar state (open/closed)
│       ├── themeSlice.js      # Theme state (light/dark)
│       └── userSlice.js       # User state
├── theme/                     # Theme configuration (light/dark, colors)
│   ├── index.js               # Main theme configuration
│   ├── colors.js              # Color palette
│   ├── typography.js          # Typography settings
│   └── components.js          # MUI component overrides
└── utils/                     # Utility functions
```

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
- Maybe breadcrumbs for deep navigation
- Maybe search functionality

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
**Status:** 🚧 In Progress  
**Documentation:** [phase-1-foundation.md](./phase-1-foundation.md)

**Completed:**
- [x] Project setup with Vite
- [x] Install all dependencies
- [x] Create folder structure
- [x] Create project plan documentation
- [x] Setup Redux store for UI state

**In Progress:**
- [ ] Create theme configuration (light/dark, RTL, custom colors)

**pending:**
- [ ] Setup React Query provider
- [ ] Setup React Router with protected routes
- [ ] Create layout components (Sidebar, Header, Main Layout)
- [ ] Setup i18n for Arabic/English

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
