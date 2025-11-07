# Configuration Files

This directory contains global configuration files for the application.

## Files Overview

```text
src/config/
├── queryClient.js          # React Query client configuration
├── routes.jsx              # React Router route definitions
├── env.js                  # Environment variables configuration
├── index.js                # Centralized exports
└── README.md               # This file
```

---

## 1. React Query Configuration

**Location:** `src/config/queryClient.js` & `src/providers/QueryProvider.jsx`

### Query Client Configuration

#### **queryClient.js** - Centralized Configuration

```javascript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnReconnect: true, // Refetch when network reconnects
      retry: 1, // Retry failed queries once
      staleTime: 5 * 60 * 1000, // 5 minutes (data freshness)
      gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection)
      refetchInterval: false, // No automatic polling
      suspense: false, // Suspense mode disabled
      onError: (error) => {
        console.error('Query Error:', error);
      },
    },
    mutations: {
      retry: 0, // Don't retry mutations
      onError: (error) => {
        console.error('Mutation Error:', error);
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
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
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

### React Query Benefits

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

**Location:** `src/config/routes.jsx` & `src/components/routing/ProtectedRoute.jsx`

### Route Configuration

#### **routes.jsx** - Centralized Route Definitions

```javascript
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/routing/ProtectedRoute';
import Loader from '../components/feedback/Loader';

// Lazy load pages for code splitting
const DashboardPage = lazy(() =>
  import('@features/dashboard').then((m) => ({ default: m.DashboardPage }))
);
const StudentsPage = lazy(() =>
  import('@features/students').then((m) => ({ default: m.StudentsPage }))
);
// ... more lazy-loaded imports

// Helper to wrap component with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<Loader variant="page" />}>
    <Component />
  </Suspense>
);

const routes = [
  // Root redirect
  { path: '/', element: <Navigate to="/dashboard" replace /> },

  // Public route with Suspense wrapper
  { path: '/login', element: withSuspense(LoginPage) },

  // Protected routes with Suspense wrapper
  { path: '/dashboard', element: <ProtectedRoute>{withSuspense(DashboardPage)}</ProtectedRoute> },
  { path: '/students', element: <ProtectedRoute>{withSuspense(StudentsPage)}</ProtectedRoute> },
  // ... more routes

  // 404 fallback
  { path: '*', element: withSuspense(NotFoundPage) },
];
```

### All Routes Configured (18 routes)

#### **Public Routes** (2 routes)

| Path     | Component                | Description         |
| -------- | ------------------------ | ------------------- |
| `/`      | Redirect to `/dashboard` | Root redirect       |
| `/login` | LoginPage                | User authentication |

#### **Protected Routes** (15 routes)

| Path                        | Component                | Description              |
| --------------------------- | ------------------------ | ------------------------ |
| `/dashboard`                | DashboardPage            | Role-based dashboard     |
| `/students`                 | StudentsPage             | Student management       |
| `/admins`                   | AdminsPage               | Admin management         |
| `/curriculums`              | CurriculumsPage          | Curriculum management    |
| `/subjects`                 | SubjectsPage             | Subject management       |
| `/units`                    | UnitsPage                | Unit management          |
| `/questions`                | QuestionsPage            | General question bank    |
| `/questions/ministerial`    | MinisterialQuestionsPage | Ministerial questions    |
| `/questions/enrichment`     | EnrichmentQuestionsPage  | Enrichment questions     |
| `/competitions`             | CompetitionsPage         | Competition list         |
| `/competitions/:id`         | CompetitionPage          | Competition details      |
| `/competitions/:id/members` | CompetitionMembersPage   | Competition participants |
| `/competitions/:id/exam`    | CompetitionExamPage      | Competition exam         |
| `/competitions/:id/result`  | CompetitionResultPage    | Competition results      |
| `/settings`                 | SettingsPage             | Application settings     |

#### **Error Routes** (1 route)

| Path | Component    | Description    |
| ---- | ------------ | -------------- |
| `*`  | NotFoundPage | 404 error page |

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
import { useAuth } from '@hooks';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render protected content
  return children;
}
```

### ProtectedRoute Features

- ✅ **Authentication Check**: Verifies user is logged in via Redux
- ✅ **Automatic Redirect**: Sends unauthenticated users to `/login`
- ✅ **Redux Integration**: Uses `useAuth()` hook for auth state
- ✅ **Replace History**: Uses `replace` to prevent back-button issues
- ✅ **Clean Syntax**: Simple wrapper component
- ✅ **Reusable**: Applied to all protected routes
- ✅ **Code Splitting**: Works seamlessly with lazy-loaded components

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

### Code Splitting

All routes use **React.lazy()** for automatic code splitting:

- Each page component is loaded only when needed
- Reduces initial bundle size
- Improves app load time
- Suspense boundary with `<Loader variant="page" />` shows loading state

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
    ├── /questions/ministerial (owner, general_admin, content_manager)
    ├── /questions/enrichment (owner, general_admin, content_manager)
    ├── /competitions
    │   ├── /competitions (list)
    │   ├── /competitions/:id (details)
    │   ├── /competitions/:id/members
    │   ├── /competitions/:id/exam
    │   └── /competitions/:id/result
    └── /settings (all authenticated users)
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
- ✅ **Code Splitting**: Lazy loading implemented with React.lazy()
- ✅ **Suspense Integration**: Loading states with Loader component
- ✅ **Optimized Bundle**: Smaller initial bundle size

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
- [ ] Route transition animations
- [ ] Breadcrumb navigation
- [ ] Route metadata (titles, descriptions)
- [ ] Preloading strategies for critical routes
- [ ] Route analytics tracking

---

## 3. Environment Configuration

**Location:** `src/config/env.js`

### Environment Variables

Centralized access to environment variables with type-safe helpers and sensible defaults. All Vite environment variables must be prefixed with `VITE_`.

#### **env.js** - Environment Configuration

The file provides:

- **Helper Functions**: `getEnv()`, `getBoolEnv()`, `getNumberEnv()` for type-safe access
- **Categorized Exports**: Organized by domain (App, API, Auth, Storage, UI, etc.)
- **Computed Values**: Derived flags like `SHOW_QUERY_DEVTOOLS`
- **Development Logging**: Prints environment info in dev mode

#### **Configuration Categories**

##### Application Settings

```javascript
APP_NAME, APP_VERSION, APP_ENV, IS_DEV, IS_PROD;
```

##### API Configuration

```javascript
API_URL; // Default: http://localhost:5000/api
API_TIMEOUT; // Default: 30000ms
```

##### Authentication

```javascript
AUTH_TOKEN_KEY; // Default: 'nebras_auth_token'
AUTH_REFRESH_TOKEN_KEY; // Default: 'nebras_refresh_token'
ACCESS_TOKEN_EXPIRY; // Default: 3600s (1 hour)
REFRESH_TOKEN_EXPIRY; // Default: 604800s (7 days)
```

##### Storage

```javascript
STORAGE_PREFIX; // Default: 'nebras_'
```

##### Feature Flags

```javascript
ENABLE_DEVTOOLS; // Default: IS_DEV
ENABLE_LOGGING; // Default: IS_DEV
ENABLE_ANALYTICS; // Default: false
```

##### External Services

```javascript
ANALYTICS_ID, SENTRY_DSN, UPLOAD_URL, MAX_FILE_SIZE;
```

##### UI Configuration

```javascript
DEFAULT_THEME; // Default: 'light'
DEFAULT_LANGUAGE; // Default: 'ar'
SIDEBAR_DEFAULT_COLLAPSED; // Default: false
```

##### Pagination

```javascript
DEFAULT_PAGE_SIZE; // Default: 10
MAX_PAGE_SIZE; // Default: 100
```

##### Development Tools

```javascript
ENABLE_QUERY_DEVTOOLS_IN_PROD; // Default: false
ENABLE_REDUX_DEVTOOLS_IN_PROD; // Default: false
SHOW_QUERY_DEVTOOLS; // Computed: IS_DEV || ENABLE_QUERY_DEVTOOLS_IN_PROD
SHOW_REDUX_DEVTOOLS; // Computed: IS_DEV || ENABLE_REDUX_DEVTOOLS_IN_PROD
```

### Usage

Import individual values or the entire config object:

```javascript
// Import individual values
import { API_URL, IS_DEV, DEFAULT_LANGUAGE } from '@config/env';

// Import configuration object
import env from '@config/env';

console.log(env.APP_NAME); // 'Nebras Dashboard'
console.log(env.API_URL); // 'http://localhost:5000/api'
console.log(env.IS_DEV); // true/false
```

### Setting Environment Variables

Create a `.env` file in the project root to override defaults:

```env
# Application
VITE_APP_NAME=Nebras Dashboard
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

# API
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000

# Authentication
VITE_AUTH_TOKEN_KEY=nebras_auth_token
VITE_ACCESS_TOKEN_EXPIRY=3600

# UI
VITE_DEFAULT_THEME=light
VITE_DEFAULT_LANGUAGE=ar

# Features
VITE_ENABLE_LOGGING=true
VITE_ENABLE_ANALYTICS=false

# External Services
VITE_ANALYTICS_ID=
VITE_SENTRY_DSN=
VITE_UPLOAD_URL=

# Pagination
VITE_DEFAULT_PAGE_SIZE=10
VITE_MAX_PAGE_SIZE=100
```

**Note:** The `.env` file should not be committed to version control. Use `.env.example` or `.env.local` for development.

### Environment Configuration Benefits

- ✅ **Centralized Access**: All env vars in one place
- ✅ **Type Safety**: Helper functions ensure correct types
- ✅ **Sensible Defaults**: Works without configuration
- ✅ **Development Tools**: Easy debugging in dev mode
- ✅ **Feature Flags**: Enable/disable features easily
- ✅ **Security**: No sensitive data in config file

---

## Future Configuration Files

- `axios.js` - Axios configuration with interceptors (when API is implemented)
- `api.js` - API endpoint definitions (when API is implemented)

---

**Last Updated:** 2025-01-27
