# Phase 2: Authentication

## Overview

Implement authentication system with role-based access control (RBAC) for all user roles.

## Status: ⚒️ in progress

---

## Tasks

###

- [✅] Create login page
- [✅] Role-based route protection
- [✅] Auth Redux slice
- [ ] JWT token management
- [ ] Session management
- [ ] Logout functionality
- [ ] Password reset (future)
- [ ] Remember me functionality

---

## Detailed Tasks

### 1. Login Page

**Location:** `src/features/authentication/pages/`

**Files to create:**

- `src/features/authentication/pages/LoginPage.jsx`

**Components:**

- Email/username input
- Password input
- Login button
- Error message display
- Loading state

**Features:**

- Form validation (client-side)
- Password visibility toggle
- Bilingual support (AR/EN)
- Responsive design
- RTL support

---

### 2. Auth Redux Slice

**Location:** `src/store/slices/`

**Files implemented:**

- `src/store/slices/authSlice.js`

**State:**

```javascript
{
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  role: null
}
```

**Actions implemented:**

- `login` - Login user and persist token/user data
- `logout` - Logout user and clear persisted state
- `setUser` - Set user data
- `setToken` - Set JWT token value
- `clearError` - Clear error message
- `checkAuth` - Hydrate auth state from persisted storage
- `setLoading` / `setError` - Manage loading & error states

**Notes:** Slice is registered in `src/store/index.js` and persisted via `localStorageMiddleware`.

---

### 3. Auth Service

**Location:** `src/features/authentication/service/`

**Files to create:**

- `src/features/authentication/service/authApi.js`

**API Functions:**

- `login(credentials)` - Login API call
- `logout()` - Logout API call
- `getCurrentUser()` - Get current user data
- `refreshToken()` - Refresh JWT token
- `validateToken(token)` - Validate token

---

### 4. Protected Route Component

**Location:** `src/components/routing/ProtectedRoute.jsx`

**Features:**

- Checks authentication status using `useAuth`
- Validates role-based access using `useRole`
- Displays a fullscreen loader while auth state is resolving
- Redirects unauthenticated users to `/login`
- Redirects unauthorized users to `/unauthorized`
- Accepts `allowedRoles` and `requireAuth` props for flexible protection

---

### 5. Auth Hooks

**Location:** `src/features/authentication/hooks/`

**Files implemented:**

- `src/features/authentication/hooks/useRole.js`

**Current Hook API:**

```javascript
const {
  role,
  isOwner,
  isGeneralAdmin,
  isCurriculumManager,
  isCompetitionManager,
  isContentManager,
  hasRole,
} = useRole();
```

> **Note:** The project already exposes a global `useAuth` hook under `src/hooks/useAuth.js` which integrates with the Redux slice.

---

### 6. Token Management

**Location:** `src/utils/`

**Files to create:**

- `src/utils/token.js`

**Functions:**

- `setToken(token)` - Save token to localStorage
- `getToken()` - Get token from localStorage
- `removeToken()` - Remove token from localStorage
- `isTokenExpired(token)` - Check if token is expired
- `decodeToken(token)` - Decode JWT token

---

### 7. Auth Interceptor

**Location:** `src/config/`

**Files to create:**

- `src/config/axios.js` - Axios configuration

**Features:**

- Add JWT token to all requests
- Handle 401 errors (unauthorized)
- Refresh token automatically
- Logout user on token expiration

---

## User Roles & Permissions

### Role Hierarchy

```text
Owner (Level 5)
  ↓
General Admin (Level 4)
  ↓
Curriculum Manager (Level 3)
  ↓
Competition Manager (Level 2)
  ↓
Content Manager (Level 1)
```

### Route Access Matrix

| Route                  | Owner | General Admin | Curriculum Manager | Competition Manager | Content Manager |
| ---------------------- | ----- | ------------- | ------------------ | ------------------- | --------------- |
| /dashboard             | ✅    | ✅            | ✅                 | ✅                  | ✅              |
| /subjects              | ✅    | ✅            | ✅                 | ❌                  | ❌              |
| /units                 | ✅    | ✅            | ✅                 | ❌                  | ❌              |
| /lessons               | ✅    | ✅            | ✅                 | ❌                  | ❌              |
| /questions             | ✅    | ✅            | ❌                 | ❌                  | ✅              |
| /ministerial-questions | ✅    | ✅            | ❌                 | ❌                  | ✅              |
| /enrichment-questions  | ✅    | ✅            | ❌                 | ❌                  | ✅              |
| /competitions          | ✅    | ✅            | ❌                 | ✅                  | ❌              |
| /students              | ✅    | ✅            | ❌                 | ❌                  | ❌              |
| /admins                | ✅    | ✅            | ❌                 | ❌                  | ❌              |
| /settings              | ✅    | ✅            | ❌                 | ❌                  | ❌              |

---

## Authentication Flow

### Login Flow

1. User enters credentials
2. Validate form (client-side)
3. Call login API
4. Store JWT token in localStorage
5. Store user data in Redux
6. Set isAuthenticated to true
7. Redirect to dashboard

### Logout Flow

1. User clicks logout
2. Call logout API (optional)
3. Clear token from localStorage
4. Clear user data from Redux
5. Set isAuthenticated to false
6. Redirect to login page

### Protected Route Flow

1. User navigates to protected route
2. Check if token exists
3. Check if token is valid
4. Check if user has required role
5. Allow access OR redirect to login/unauthorized

---

## Dummy Data

### Mock Users

```javascript
const mockUsers = [
  {
    id: 1,
    username: 'owner@nebras.com',
    password: 'password123',
    name: 'Owner User',
    role: 'owner',
    roles: ['owner', 'general_admin'],
  },
  {
    id: 2,
    username: 'admin@nebras.com',
    password: 'password123',
    name: 'General Admin',
    role: 'general_admin',
    roles: ['general_admin'],
  },
  {
    id: 3,
    username: 'curriculum@nebras.com',
    password: 'password123',
    name: 'Curriculum Manager',
    role: 'curriculum_manager',
    roles: ['curriculum_manager'],
  },
  {
    id: 4,
    username: 'competition@nebras.com',
    password: 'password123',
    name: 'Competition Manager',
    role: 'competition_manager',
    roles: ['competition_manager'],
  },
  {
    id: 5,
    username: 'content@nebras.com',
    password: 'password123',
    name: 'Content Manager',
    role: 'content_manager',
    roles: ['content_manager'],
  },
];
```

---

## Testing Checklist

- [ ] Login page displays correctly
- [ ] Form validation works
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials fails
- [ ] Token is stored in localStorage
- [ ] User data is stored in Redux
- [ ] Protected routes redirect to login when not authenticated
- [ ] Protected routes allow access when authenticated
- [ ] Role-based access control works correctly
- [ ] Logout clears all data
- [ ] Logout redirects to login page
- [ ] Remember me persists session
- [ ] Token expiration is handled
- [ ] RTL layout works on login page
- [ ] Bilingual support works

---

## Success Criteria

✅ Users can login with valid credentials

✅ Invalid credentials show error messages

✅ JWT token is stored and managed properly

✅ User data is stored in Redux

✅ Protected routes are accessible only to authenticated users

✅ Role-based access control works correctly

✅ Logout functionality works

✅ Session persistence works with "Remember Me"

✅ Error handling is comprehensive

✅ UI is responsive and supports RTL

---

## Next Phase

After completing Phase 2, proceed to **[Phase 3: Core Features](phase-3-core-features.md)**

---

**Last Updated:** 2025-01-18
