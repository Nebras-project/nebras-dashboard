import { createSlice } from '@reduxjs/toolkit';
import { clearPersistedState } from '../middleware/localStorageMiddleware';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.role = user?.role || null;
      state.isLoading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
      state.isLoading = false;
      state.error = null;
      // Clear persisted state on logout
      clearPersistedState();
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload?.role || null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    checkAuth: (state, action) => {
      const { user, token } = action.payload;
      if (user && token) {
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        state.role = user?.role || null;
      } else {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.role = null;
      }
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.role = action.payload?.role || state.role;
      }
    },
  },
});

export const {
  login,
  logout,
  setUser,
  setToken,
  clearError,
  checkAuth,
  setLoading,
  setError,
  updateUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
