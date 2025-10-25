# Configuration Files

This directory contains global configuration files for the application.

## Files Overview

```text
src/config/
├── queryClient.js          # React Query client configuration
├── routes.jsx              # React Router route definitions
└── README.md              # This file
```

---

## 1. React Query Configuration

**Location:** `src/config/queryClient.js` & `src/providers/QueryProvider.jsx`

### Query Client Configuration

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

### Configuration Details

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

### Query Provider Implementation

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

### Provider Features

- **QueryClientProvider**: Provides React Query context to app
- **React Query Devtools**: 
  - Built-in development tools
  - Query inspection and debugging
  - Cache visualization
  - Network activity monitoring
  - Only loaded in development mode
  - Starts minimized (`initialIsOpen={false}`)

### Benefits

- ✅ **Automatic Caching**: Data cached intelligently
- ✅ **Background Refetching**: Keeps data fresh
- ✅ **Optimistic Updates**: Instant UI feedback
- ✅ **Query Invalidation**: Smart cache management
- ✅ **Loading States**: Built-in loading indicators
- ✅ **Error Handling**: Comprehensive error management
- ✅ **DevTools**: Powerful debugging capabilities
- ✅ **Network Efficiency**: Reduces redundant requests
- ✅ **Memory Management**: Automatic garbage collection

### Future API Integration

All features will use React Query for:
- Subjects, Units, Lessons CRUD
- Question management
- Competition management
- Student management
- Admin management
- Dashboard analytics
- File uploads

---

## 2. React Router Configuration

**Location:** `src/config/routes.jsx` & `src/components/ProtectedRoute.jsx`

### Route Configuration

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

### All Routes Configured (16 routes)

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

### Dynamic Routes

Routes with URL parameters:
- `/competitions/:id` - Competition details (id parameter)
- `/competitions/:id/members` - Competition members (id parameter)
- `/competitions/:id/exam` - Competition exam (id parameter)
- `/competitions/:id/result` - Competition results (id parameter)

### Protected Route Component

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

### ProtectedRoute Features

- ✅ **Authentication Check**: Verifies user is logged in
- ✅ **Automatic Redirect**: Sends unauthenticated users to login
- ✅ **Redux Integration**: Uses `useUser()` hook for auth state
- ✅ **Replace History**: Uses `replace` to prevent back-button issues
- ✅ **Clean Syntax**: Simple wrapper component
- ✅ **Reusable**: Applied to all protected routes

### Router Integration

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

### App Component Features

- **BrowserRouter**: HTML5 history API routing
- **LanguageSync**: Redux-i18n synchronization
- **MainLayout**: Wraps all routes with sidebar/header
- **Dynamic Routes**: Maps route config to Route components
- **Clean Structure**: Centralized route definitions

### Route Organization

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

### Navigation Flow

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

### Route Features

- ✅ **Centralized Configuration**: All routes in one file
- ✅ **Protected Routes**: Authentication guard on sensitive pages
- ✅ **Dynamic Parameters**: Support for URL parameters (`:id`)
- ✅ **Nested Routes**: Competition sub-routes
- ✅ **Redirect Logic**: Root redirects to dashboard
- ✅ **404 Handling**: Catch-all route for unknown paths
- ✅ **Clean URLs**: No hash routing, uses HTML5 history
- ✅ **Type Safety**: PropTypes validation on components
- ✅ **Lazy Loading Ready**: Structure supports code splitting

### React Router Benefits

- ✅ **Declarative Routing**: Easy to understand route structure
- ✅ **Programmatic Navigation**: `useNavigate()` hook available
- ✅ **URL Parameters**: Easy access via `useParams()`
- ✅ **Location State**: Pass data between routes
- ✅ **Nested Routing**: Support for complex route hierarchies
- ✅ **Route Guards**: ProtectedRoute pattern
- ✅ **Browser History**: Back/forward button support

### Future Enhancements

- [ ] Role-based route access (currently auth-only)
- [ ] Route-level code splitting (lazy loading)
- [ ] Route transition animations
- [ ] Breadcrumb navigation
- [ ] Route metadata (titles, descriptions)

---

## Future Configuration Files

- `axios.js` - Axios configuration with interceptors (Phase 2)
- `constants.js` - Application-wide constants (Phase 2+)
- `api.js` - API endpoint definitions (Phase 2+)

---

**Last Updated:** 2025-10-25

