# Authentication Implementation - Backup

هذا الملف يحتوي على التغييرات التي تم تنفيذها لإعداد نظام التحقق (Authentication) باستخدام Redux Toolkit و Axios و React Query.

## الملفات المعدلة

### 1. Redux Slice (`src/store/slices/authSlice.js`)

**الحالة الحالية:**

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.user = user;
      state.isAuthenticated = !!accessToken && !!user;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
```

**التغييرات:**

- تم تبسيط الحالة لتشمل فقط: `accessToken`, `user`, `isAuthenticated`
- تم إزالة: `token`, `isLoading`, `error`, `role`
- تم استبدال `login` و `logout` بـ `setCredentials` و `logOut`
- تم إزالة جميع الـ reducers الأخرى: `setUser`, `setToken`, `clearError`, `checkAuth`, `setLoading`, `setError`, `updateUserProfile`

---

### 2. Axios Configuration (`src/config/axios.js`)

**التغييرات المضافة:**

#### أ. Request Interceptor

```javascript
apiClient.interceptors.request.use(
  (config) => {
    // Handle FormData - remove Content-Type header to let browser set it
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    // Attach Authorization header with Bearer token from Redux state
    const state = store.getState();
    const accessToken = state.auth?.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

#### ب. Response Interceptor

```javascript
apiClient.interceptors.response.use(
  (response) => {
    // Return data directly (axios wraps it in data property)
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const response = await axios.post(
          `${API_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
          {},
          {
            withCredentials: true,
          }
        );

        const { accessToken, user } = response.data;

        // Update Redux state with new credentials
        store.dispatch(setCredentials({ accessToken, user }));

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        store.dispatch(logOut());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

#### ج. Imports المضافة

```javascript
import { store } from '@store';
import { setCredentials, logOut } from '@store/slices/authSlice';
```

#### د. API_ENDPOINTS تم نقله قبل الـ interceptors

- تم نقل تعريف `API_ENDPOINTS` قبل الـ interceptors لاستخدامه في response interceptor

---

### 3. React Query Hooks

#### أ. `useLogin` (`src/features/authentication/hooks/useLogin.js`)

**الكود الكامل:**

```javascript
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@store/slices/authSlice';
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * React Query hook for login mutation
 * Posts to /auth/login and dispatches setCredentials with access token and user
 */
export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return response;
    },
    onSuccess: (data) => {
      const { accessToken, user } = data;
      dispatch(setCredentials({ accessToken, user }));
    },
  });
};
```

#### ب. `useLogout` (`src/features/authentication/hooks/useLogout.js`)

**الكود الكامل:**

```javascript
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { logOut } from '@store/slices/authSlice';
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * React Query hook for logout mutation
 * Posts to /auth/logout and dispatches logOut
 */
export const useLogout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      return response;
    },
    onSuccess: () => {
      dispatch(logOut());
    },
  });
};
```

#### ج. `useUser` (`src/features/authentication/hooks/useUser.js`)

**الكود الكامل:**

```javascript
import { useQuery } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * React Query hook for fetching current user
 * Calls /auth/me with Axios and returns user data
 */
export const useUser = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
      return response;
    },
  });
};
```

---

### 4. `useAuth` Hook (`src/features/authentication/hooks/useAuth.js`)

**الكود الكامل:**

```javascript
// external imports
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';

// internal imports
import { setCredentials, logOut } from '@store/slices';

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Memoize action creators to prevent unnecessary re-renders
  const setCredentialsAction = useCallback(
    (payload) => dispatch(setCredentials(payload)),
    [dispatch]
  );
  const logoutAction = useCallback(() => dispatch(logOut()), [dispatch]);

  return useMemo(
    () => ({
      // State
      user: auth.user,
      accessToken: auth.accessToken,
      token: auth.accessToken, // Legacy compatibility
      isAuthenticated: auth.isAuthenticated,
      role: auth.user?.role || null, // Extract role from user object
      // Legacy compatibility - keep userData for backward compatibility
      userData: auth.user,
      // Actions
      setCredentials: setCredentialsAction,
      logout: logoutAction, // Backward compatibility alias
      logOut: logoutAction,
    }),
    [auth, setCredentialsAction, logoutAction]
  );
};
```

**التغييرات:**

- تم إزالة جميع الـ imports القديمة: `login`, `logout`, `setUser`, `setToken`, `clearError`, `checkAuth`, `setLoading`, `setError`, `updateUserProfile`
- تم إضافة فقط: `setCredentials`, `logOut`
- تم تحديث الحالة للعمل مع `accessToken` بدلاً من `token`
- تم إزالة: `isLoading`, `error` من الحالة المُرجعة
- تم استخراج `role` من `user` object

---

### 5. Store Slices Index (`src/store/slices/index.js`)

**التغييرات:**

```javascript
// Auth slice
export { default as authReducer, setCredentials, logOut } from './authSlice';
```

**تم إزالة:**

- `login`, `logout`, `setUser`, `setToken`, `clearError`, `checkAuth`, `setLoading`, `setError`, `updateUserProfile`

---

### 6. Authentication Index (`src/features/authentication/index.js`)

**التغييرات:**

```javascript
// Pages
export * from './pages';

// Hooks
export { useRole } from './hooks/useRole';
export { useLogin } from './hooks/useLogin';
export { useLogout } from './hooks/useLogout';
export { useUser } from './hooks/useUser';
```

**تم إضافة:**

- `useLogout` export
- `useUser` export

---

### 7. LocalStorage Middleware (`src/store/middleware/localStorageMiddleware.js`)

**التغييرات:**

#### أ. PERSISTED_SLICES

```javascript
// قبل: const PERSISTED_SLICES = ['theme', 'language', 'sidebar', 'auth', 'colorScheme'];
// بعد:
const PERSISTED_SLICES = ['theme', 'language', 'sidebar', 'colorScheme'];
```

- تم إزالة `'auth'` من المصفوفة

#### ب. EXCLUDED_FIELDS

```javascript
// قبل: const EXCLUDED_FIELDS = { auth: ['token', 'refreshToken'], sidebar: ['isOpen'] };
// بعد:
const EXCLUDED_FIELDS = {
  sidebar: ['isOpen'],
};
```

- تم إزالة `auth` من الـ object

#### ج. loadPersistedState

```javascript
export const loadPersistedState = () => {
  try {
    // 1. Read from localStorage
    const serializedState = localStorage.getItem(STORAGE_KEY);

    // 2. If nothing saved, return undefined
    if (serializedState === null) {
      return undefined;
    }

    // 3. Parse JSON
    const parsedState = JSON.parse(serializedState);

    // 4. Remove auth state if it exists (don't persist auth state)
    if (parsedState.auth) {
      delete parsedState.auth;
    }

    // 5. Return filtered state
    return parsedState;
  } catch (error) {
    console.error('Error loading persisted state:', error);
    return undefined;
  }
};
```

- تم إضافة خطوة لإزالة `auth` state عند التحميل

---

## ملخص التغييرات

### الملفات الجديدة:

1. `src/features/authentication/hooks/useLogout.js`
2. `src/features/authentication/hooks/useUser.js`

### الملفات المعدلة:

1. `src/store/slices/authSlice.js` - تبسيط كامل
2. `src/config/axios.js` - إضافة interceptors للتحقق
3. `src/features/authentication/hooks/useLogin.js` - تحديث لاستخدام React Query
4. `src/features/authentication/hooks/useAuth.js` - تبسيط
5. `src/store/slices/index.js` - تحديث exports
6. `src/features/authentication/index.js` - إضافة exports جديدة
7. `src/store/middleware/localStorageMiddleware.js` - إزالة auth من localStorage

### الملفات المحذوفة:

- لا يوجد (تم استخدام `axios.js` الموجود بدلاً من إنشاء `api.js` جديد)

---

## كيفية إعادة التطبيق

عند إعادة تطبيق هذه التغييرات:

1. ابدأ بتحديث `authSlice.js` بالحالة والـ reducers الجديدة
2. أضف الـ interceptors إلى `axios.js`
3. أنشئ أو حدث الـ hooks في `src/features/authentication/hooks/`
4. حدث `useAuth.js` ليتوافق مع البنية الجديدة
5. حدث `localStorageMiddleware.js` لإزالة auth من localStorage
6. حدث الـ exports في `index.js` files

---

## ملاحظات مهمة

- **لا يتم حفظ authentication state في localStorage** - الأمان أولوية
- **استخدام API_ENDPOINTS** - جميع الـ endpoints تستخدم `API_ENDPOINTS` من `axios.js`
- **Token refresh تلقائي** - عند 401، يتم محاولة refresh تلقائياً
- **Backward compatibility** - `useAuth` يوفر `token` و `logout` كـ aliases للتوافق مع الكود القديم
