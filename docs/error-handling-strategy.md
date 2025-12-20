# Error Handling Strategy

This document explains the error handling architecture in the Nebras Dashboard project.

## Overview

Error handling in this project follows a **layered approach** where errors are handled at different levels:

1. **Axios Interceptor** - Global error handling (HTTP status codes, network errors)
2. **React Query Hooks** - Automatic error state management and toast notifications
3. **Component Level** - Optional custom error handling and UI feedback

---

## 1. Axios Interceptor Level (`src/config/axios.js`)

**Responsibility:** Handle HTTP errors globally before they reach the application code.

### What it handles:

- ✅ **Network errors** (no response from server)
- ✅ **401 Unauthorized** - Automatic token refresh with fallback to logout
  - Attempts to refresh access token using HttpOnly cookies
  - Updates Redux state with new token
  - Retries original request automatically
  - If refresh fails → logs out user and redirects to login
- ✅ **403 Forbidden** - Throws error with message
- ✅ **404 Not Found** - Throws error with message
- ✅ **500+ Server Errors** - Throws error with message
- ✅ **Other HTTP errors** - Throws error with status code

### Example:

```javascript
// In axios.js response interceptor
if (status === HTTP_STATUS.UNAUTHORIZED && originalRequest && !originalRequest._retry) {
  const isAuthRequest = /* check if login/refresh/logout */;

  if (!isAuthRequest) {
    originalRequest._retry = true;

    try {
      // Automatically refresh token
      const newAccessToken = await refreshTokenAndUpdateStore();

      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      // Refresh failed - logout user
      const { clearUserData } = await import('@store/slices');
      store.dispatch(clearUserData());
      window.location.href = NAVIGATION_PATHS.LOGIN;
      return Promise.reject(refreshError);
    }
  }
}
```

### Result:

- Errors are normalized into JavaScript `Error` objects
- 401 errors trigger automatic token refresh (seamless user experience)
- Failed refresh triggers logout and redirect to login
- All errors propagate to React Query hooks

---

## 2. React Query Hooks Level

### A. Fetching Data (Queries)

**File:** `src/hooks/useEntity.js`

**Responsibility:** Handle errors for all data fetching operations (GET requests).

#### Error Handling Flow:

1. React Query catches errors from API calls
2. `useEntity` hook automatically shows error toast notification
3. Returns error state to components (`isError`, `error`)

#### Example:

```javascript
// In useEntity.js
const query = useQuery({
  queryKey: [...],
  queryFn: () => getSingleFn(id),
  onError: (error) => {
    // Automatic error toast
    showError({
      message: t('common.fetchErrorMessage', { entityName: t(`${entityName}.entityName`) }),
    });
    // Optional custom callback
    onError?.(error);
  },
});
```

#### Usage in Components:

```javascript
const { curriculum, isLoading, isError, error } = useCurriculum({ id: curriculumId });

if (isError) {
  return <ErrorState error={error} />;
}
```

### B. Mutations (Create, Update, Delete)

**File:** `src/hooks/useEntityMutation.js`

**Responsibility:** Handle errors for all mutation operations (POST, PUT, PATCH, DELETE).

#### Error Handling Flow:

1. React Query catches errors from API calls
2. `useEntityMutation` hook automatically shows error toast notification
3. Calls optional `onError` callback for custom handling
4. Returns error state to components (`isError`, `error`)

#### Example:

```javascript
// In useEntityMutation.js
onError: (error, variables) => {
  // Automatic error toast
  showError({
    message: t(`${entityName}.${action}ErrorMessage`, { name: itemName, action }),
  });
  // Optional custom callback
  onError?.(error, variables);
},
```

#### Usage in Components:

```javascript
const { createItem, isLoading, isError, error } = useCreate({
  createFn: createCurriculum,
  queryKey: [QUERY_KEYS.CURRICULUMS],
  entityName: 'curriculum',
  onError: (error) => {
    // Optional: Additional custom error handling
    console.error('Custom error handling:', error);
  },
});

createItem(data, {
  onError: (error) => {
    // Optional: Per-mutation error handling
  },
});
```

---

## 3. Service Layer (`src/features/*/services/*Api.js`)

**Responsibility:** NO error handling - Just make API calls.

### Current Implementation:

- ✅ Services only call `apiClient` methods
- ✅ No try-catch blocks
- ✅ No error handling logic
- ✅ Errors propagate directly to React Query

### Example:

```javascript
// In curriculumsApi.js
export const fetchCurriculums = async (_params = {}) => {
  return await apiClient.get(API_ENDPOINTS.CURRICULUMS.BASE);
};
// If error occurs, it's caught by React Query hooks
```

---

## 4. Component Level

**Responsibility:** Optional custom error handling and UI feedback.

### Examples:

#### A. Using Error State:

```javascript
function CurriculumPage() {
  const { curriculum, isLoading, isError, error } = useCurriculum({ id: curriculumId });

  if (isError) {
    return <CurriculumErrorState error={error} />;
  }

  // Render curriculum...
}
```

#### B. Custom Error Callback:

```javascript
const { createItem } = useCreate({
  createFn: createCurriculum,
  queryKey: [QUERY_KEYS.CURRICULUMS],
  entityName: 'curriculum',
  onError: (error, data) => {
    // Custom error handling
    if (error.message.includes('duplicate')) {
      // Show specific UI feedback
    }
  },
});
```

---

## Error Flow Diagram

```
API Call (Service Layer)
    ↓
Axios Interceptor
    ├─ Network Error → Error Object
    ├─ 401 → Try Token Refresh
    │   ├─ Refresh Success → Retry Original Request → Return Data
    │   └─ Refresh Failed → Logout + Redirect to Login + Error Object
    ├─ 403/404/500 → Error Object
    └─ Success → Return Data (unwrapped)
    ↓
React Query Hook (useEntity / useEntityMutation)
    ├─ Error → Show Toast Notification
    ├─ Error → Call onError Callback (if provided)
    └─ Return Error State to Component
    ↓
Component
    ├─ Check isError State
    ├─ Show Error UI (if needed)
    └─ Optional Custom Error Handling
```

---

## Summary: Who Handles What?

| Layer                 | Responsibility           | Error Handling                                                            |
| --------------------- | ------------------------ | ------------------------------------------------------------------------- |
| **Axios Interceptor** | HTTP-level errors        | ✅ Handles status codes, automatic token refresh (401), normalizes errors |
| **React Query Hooks** | Application-level errors | ✅ Shows toast notifications, provides error state                        |
| **Service Layer**     | API calls only           | ❌ No error handling - just calls                                         |
| **Components**        | UI feedback              | ⚪ Optional - can handle errors for custom UI                             |

---

## Best Practices

1. ✅ **Let React Query handle errors** - Don't add try-catch in services
2. ✅ **Use error state in components** - Check `isError` for UI feedback
3. ✅ **Use optional callbacks** - For custom error handling when needed
4. ✅ **Trust Axios interceptor** - It handles global concerns (401, network errors)
5. ❌ **Don't duplicate error handling** - Don't add try-catch in services or components unless needed

---

## Translation Keys

Error messages are automatically translated using these keys:

- `common.fetchErrorMessage` - For fetch errors
- `${entityName}.${action}ErrorMessage` - For mutation errors (create/update/delete)
- `${entityName}.${action}SuccessMessage` - For success messages

Example:

- `curriculum.createErrorMessage`
- `curriculum.updateErrorMessage`
- `curriculum.deleteErrorMessage`
