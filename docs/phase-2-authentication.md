# Phase 2: Authentication

## Overview

Implement authentication system with role-based access control (RBAC) for all user roles.

## Status: ✅ Mostly Complete

---

## Tasks

- [✅] Create login page
- [✅] Role-based route protection
- [✅] Auth Redux slice
- [✅] Session management (HttpOnly cookies)
- [✅] Logout functionality
- [✅] Auth hooks (useAuth, useLogin, useLogout, useRole, useRefreshToken, useCurrentUser)
- [✅] Axios interceptor with error handling
- [✅] Automatic token refresh on 401 errors
- [✅] Role normalization to camelCase
- [✅] Auth API service (authApi)
- [✅] Password reset hooks (useForgotPassword, usePasswordReset, useResetPassword)
- [✅] Email verification hook (useVerifyEmail)
- [ ] `/me` endpoint integration (pending backend)

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
  userId: null,
  email: null,
  userName: null,
  userProfile: null, // User avatar/profile image URL
  role: null, // Normalized to camelCase (e.g., 'generalAdmin')
  isAuthenticated: false,
  accessToken: null, // Stored in Redux state (memory only, not persisted)
  isEmailConfirmed: false
}
```

**Actions implemented:**

- ✅ `login` - Set all auth state properties from login response
  - Normalizes role to camelCase automatically
  - Sets userId, email, userName, userProfile, role, accessToken, isEmailConfirmed
- ✅ `logout` - Clear all auth state and persisted state
  - Resets all properties to null/false
  - Clears persisted state from localStorage
- ✅ `setAccessToken` - Update access token (used for token refresh)
  - Updates accessToken in state
  - Updates isAuthenticated based on userId and accessToken presence

**Notes:**

- Slice is registered in `src/store/index.js`
- **Auth state is NOT persisted to localStorage** (removed for security)
- Tokens stored only in Redux state (memory) - not in localStorage/sessionStorage
- HttpOnly cookies managed by browser for refresh token
- Role is automatically normalized to camelCase on login
- Ready for backend integration

---

### 3. Auth Service

**Location:** `src/features/authentication/services/`

**Files implemented:**

- `src/features/authentication/services/authApi.js` - All authentication API functions
- `src/features/authentication/services/index.js` - Barrel export

**API Functions:**

- ✅ `login(credentials)` - Login API call
- ✅ `logout()` - Logout API call
- ✅ `refreshAccessToken()` - Refresh access token
- ✅ `getCurrentUser()` - Get current user data (`/me` endpoint)
- ✅ `verifyEmail(data)` - Verify email with code
- ✅ `sendForgotPassword(data)` - Send forgot password email
- ✅ `sendPasswordReset(data)` - Send password reset email
- ✅ `resetPassword(data)` - Reset password with token

**Implementation Notes:**

- All functions use `apiClient` from `@config/axios`
- HttpOnly cookie flow configured (`withCredentials: true`)
- Response data is automatically unwrapped by axios interceptor
- Ready for backend integration

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

- `src/features/authentication/hooks/useRole.js` - Role-based access control helpers
- `src/features/authentication/hooks/useAuth.js` - Authentication state management
- `src/features/authentication/hooks/useLogin.js` - Login mutation hook
- `src/features/authentication/hooks/useLogout.js` - Logout mutation hook
- `src/features/authentication/hooks/useRefreshToken.js` - Token refresh mutation hook
- `src/features/authentication/hooks/useCurrentUser.js` - Current user query hook
- `src/features/authentication/hooks/useVerifyEmail.js` - Email verification mutation hook
- `src/features/authentication/hooks/useForgotPassword.js` - Forgot password mutation hook
- `src/features/authentication/hooks/usePasswordReset.js` - Password reset mutation hook
- `src/features/authentication/hooks/useResetPassword.js` - Reset password mutation hook

**useRole Hook API:**

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

**useAuth Hook API:**

```javascript
const {
  // State
  userId,
  email,
  userName,
  userProfile,
  role,
  isAuthenticated,
  accessToken,
  isEmailConfirmed,
  // Actions
  login,
  logout,
  setAccessToken,
} = useAuth();
```

**useLogin Hook API:**

```javascript
const {
  login, // Function to trigger login
  loginAsync, // Async version
  isPending, // Loading state
  isError, // Error state
  isSuccess, // Success state
  error, // Error object
  data, // Response data
  reset, // Reset mutation state
} = useLogin({
  onSuccess: (response) => {
    /* custom success handler */
  },
  onError: (error) => {
    /* custom error handler */
  },
});
```

**useLogout Hook API:**

```javascript
const {
  logout, // Function to trigger logout
  logoutAsync, // Async version
  isPending, // Loading state
  // ... other React Query mutation properties
} = useLogout({
  onSuccess: (response) => {
    /* custom success handler */
  },
  onError: (error) => {
    /* custom error handler */
  },
});
```

**useRefreshToken Hook API:**

```javascript
const {
  refreshToken, // Function to trigger refresh
  refreshTokenAsync, // Async version
  isPending, // Loading state
  // ... other React Query mutation properties
} = useRefreshToken({
  onSuccess: (newAccessToken) => {
    /* custom success handler */
  },
  onError: (error) => {
    /* custom error handler */
  },
});
// Note: Automatically updates Redux state with new token on success
```

**useCurrentUser Hook API:**

```javascript
const {
  user, // Current user data
  isLoading, // Initial loading state
  isFetching, // Refetching state
  isError, // Error state
  isSuccess, // Success state
  error, // Error object
  refetch, // Manual refetch function
} = useCurrentUser();
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

**Files implemented:**

- `src/config/axios.js` - Axios configuration with interceptors
- `src/features/authentication/utils/refreshTokenUtils.js` - Shared refresh token logic

**Request Interceptor Features:**

- ✅ Adds `Authorization: Bearer <token>` header from Redux state
- ✅ Adds `Accept-Language` header from Redux state
- ✅ HttpOnly cookie support (`withCredentials: true`)
- ✅ Automatic FormData handling (removes Content-Type header)

**Response Interceptor Features:**

- ✅ Response data unwrapping (returns `response.data` directly)
- ✅ **401 Unauthorized handling with automatic token refresh:**
  - Detects 401 errors on API requests
  - Automatically calls refresh token endpoint
  - Updates Redux state with new access token
  - Retries original request with new token
  - Logs out and redirects to login if refresh fails
- ✅ Prevents infinite loops (skips refresh for login/refresh/logout endpoints)
- ✅ Uses `HTTP_STATUS.UNAUTHORIZED` constant for maintainability

**Token Refresh Flow:**

1. API request returns 401 Unauthorized
2. Interceptor detects 401 (if not an auth request)
3. Calls `refreshTokenAndUpdateStore()` utility
4. Utility uses separate axios instance (avoids circular dependency)
5. Refresh endpoint called with HttpOnly cookies
6. New access token extracted and stored in Redux
7. Original request retried with new token
8. If refresh fails → logout and redirect to login

**Notes:**

- Access tokens stored in Redux state (memory only)
- Refresh tokens managed via HttpOnly cookies (backend responsibility)
- Separate axios instance used for refresh to avoid circular dependency
- Role normalization happens automatically on login

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

**Current Implementation:**

1. User enters credentials
2. Validate form (client-side)
3. Call login API (`POST /auth/login_manager`) via `useLogin` hook
4. Backend returns user data and access token
5. Role normalized to camelCase (e.g., "General Admin" → "generalAdmin")
6. Dispatch `login` action with user data and access token
7. Access token stored in Redux state (memory only)
8. Show success toast notification
9. Navigate to dashboard

**Response Structure:**

```javascript
{
  userId: string,
  email: string,
  userName: string,
  userProfile: string, // Avatar URL
  role: string,        // Will be normalized to camelCase
  accessToken: string,
  isEmailConfirmed: boolean
}
```

### Logout Flow

**Current Implementation:**

1. User clicks logout (via `useLogout` hook or `LogoutButton` component)
2. Call logout API (`POST /auth/logout`) to invalidate cookies
3. Dispatch `logout` action to clear Redux state
4. Show success toast notification
5. Navigate to login page

**Notes:**

- Redux state is completely cleared
- Persisted state is cleared from localStorage
- Access token removed from memory
- HttpOnly cookies cleared by backend

### Protected Route Flow

1. User navigates to protected route
2. `AuthenticatedRoute` component checks `isAuthenticated` from Redux
3. If not authenticated → redirect to `/login`
4. If authenticated → check role-based access
5. If role not allowed → redirect to `/access-denied`
6. If role allowed → render protected content

### Token Refresh Flow

1. User makes API request
2. Request includes `Authorization: Bearer <token>` header
3. If token expired → backend returns 401
4. Axios interceptor catches 401 error
5. Automatically calls refresh token endpoint (using HttpOnly cookies)
6. New access token received and stored in Redux
7. Original request retried with new token
8. User sees no interruption (seamless experience)

**If Refresh Fails:**

1. Refresh token also expired/invalid
2. Redux state cleared (logout dispatched)
3. User redirected to login page
4. Error message displayed (if configured)

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

- [✅] Login page displays correctly
- [✅] Form validation works
- [✅] Login with valid credentials succeeds
- [✅] Login with invalid credentials fails
- [✅] Role normalization to camelCase works
- [✅] Protected routes redirect to login when not authenticated
- [✅] Protected routes allow access when authenticated
- [✅] Role-based access control works correctly
- [✅] Logout clears Redux auth state
- [✅] Logout redirects to login page
- [✅] RTL layout works on login page
- [✅] Bilingual support works
- [✅] Automatic token refresh on 401 errors
- [✅] Token refresh updates Redux state
- [✅] Failed refresh logs out user
- [✅] User avatar displays from userProfile
- [✅] UserName displays correctly in header
- [ ] `/me` endpoint integration (pending backend)
- [ ] Remember me extends cookie expiration (pending backend)

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

**Last Updated:** 2025-01-27

**Current Status:**

- ✅ Frontend authentication infrastructure is complete
- ✅ React Query hooks implemented for all auth operations
- ✅ Automatic token refresh on 401 errors
- ✅ Role normalization to camelCase
- ✅ Auth state structure updated (userId, email, userName, userProfile, role, accessToken, isEmailConfirmed)
- ✅ Auth state removed from localStorage (security improvement)
- ✅ Circular dependency resolved with separate axios instance
- ⏳ Waiting for `/me` endpoint integration
- 🔄 HttpOnly cookie-based session management ready
