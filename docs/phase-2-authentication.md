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

- `login` - Hydrate auth state with user profile returned after successful login
- `logout` - Reset auth state after server clears session cookies
- `setUser` - Update user data in memory
- `setToken` - (Legacy) will be deprecated once HttpOnly cookie flow is complete
- `clearError` - Clear error message
- `checkAuth` - Hydrate auth state using `/me` response (session established via HttpOnly cookies)
- `setLoading` / `setError` - Manage loading & error states

**Notes:** Slice is registered in `src/store/index.js`. Tokens are **not** stored in Redux or `localStorage`; they live exclusively in backend-issued HttpOnly cookies.

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

**Location:** `src/components/routing/AuthenticatedRoute.jsx`

**Features:**

- Checks authentication status using `useAuth`
- Validates role-based access using `useRole`
- Displays a fullscreen loader while auth state is resolving
- Redirects unauthenticated users to `/login`
- Redirects unauthorized users to `/access-denied`
- Accepts `allowedRoles` and `requireAuth` props for flexible protection

---

### 5. Auth Hooks

**Location:** `src/features/authentication/hooks/`

**Files implemented:**

- `src/features/authentication/hooks/useRole.js`
- `src/features/authentication/hooks/useAuth.js`

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

---

### 6. Session Management (HttpOnly Cookies)

**Location:** `src/features/authentication/service/`

**Implementation Notes:**

- Backend issues Secure, SameSite HttpOnly cookies on login.
- Frontend never touches tokens directly—API clients call endpoints with `credentials: 'include'`.
- Provide a `/me` endpoint that returns the authenticated user when cookies are valid.
- Optional: expose `/refresh` to rotate the access token and keep the session alive.

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

| Route         | Owner | General Admin | Curriculum Manager | Competition Manager | Content Manager |
| ------------- | ----- | ------------- | ------------------ | ------------------- | --------------- |
| /dashboard    | ✅    | ✅            | ✅                 | ✅                  | ✅              |
| /subjects     | ✅    | ✅            | ✅                 | ❌                  | ❌              |
| /units        | ✅    | ✅            | ✅                 | ❌                  | ❌              |
| /lessons      | ✅    | ✅            | ✅                 | ❌                  | ❌              |
| /questions    | ✅    | ✅            | ❌                 | ❌                  | ✅              |
| /competitions | ✅    | ✅            | ❌                 | ✅                  | ❌              |
| /students     | ✅    | ✅            | ❌                 | ❌                  | ❌              |
| /admins       | ✅    | ✅            | ❌                 | ❌                  | ❌              |
| /settings     | ✅    | ✅            | ❌                 | ❌                  | ❌              |

---

## Authentication Flow

### Login Flow

1. User enters credentials
2. Validate form (client-side)
3. Call login API (`POST /login`) with `credentials: 'include'`
4. Backend sets HttpOnly session cookies and returns user profile
5. Dispatch `login`/`checkAuth` with response payload
6. Set `isAuthenticated` to true and redirect to dashboard

### Logout Flow

1. User clicks logout
2. Call logout API to invalidate cookies
3. Dispatch `logout` to clear Redux state
4. Redirect to login page

### Protected Route Flow

1. User navigates to protected route
2. Ensure bootstrap `/me` call has completed
3. Check if `isAuthenticated` is true
4. Validate role-based access
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
- [ ] Backend issues HttpOnly cookies on successful login
- [ ] `/me` bootstrap call hydrates Redux auth state
- [ ] Protected routes redirect to login when not authenticated
- [ ] Protected routes allow access when authenticated
- [ ] Role-based access control works correctly
- [ ] Logout clears session cookies and Redux auth state
- [ ] Logout redirects to login page
- [ ] Remember me extends cookie expiration
- [ ] Token expiration is handled
- [ ] RTL layout works on login page
- [ ] Bilingual support works

---

## Success Criteria

✅ Users can login with valid credentials

✅ Invalid credentials show error messages

✅ HttpOnly session cookies are issued securely and refreshed as needed

✅ User data is stored in Redux

✅ Protected routes are accessible only to authenticated users

✅ Role-based access control works correctly

✅ Logout functionality works

✅ Session persistence works with "Remember Me" cookie settings

✅ Error handling is comprehensive

✅ UI is responsive and supports RTL

---

## Next Phase

After completing Phase 2, proceed to **[Phase 3: Core Features](phase-3-core-features.md)**

---

**Last Updated:** 2025-11-07
