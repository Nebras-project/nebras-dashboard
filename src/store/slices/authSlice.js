import { createSlice } from '@reduxjs/toolkit';
import { clearPersistedState } from '../middleware/localStorageMiddleware';
import { toCamelCase } from '@utils/caseUtils';

const initialState = {
  userId: null,
  email: null,
  userName: null,
  userProfile: null,
  role: null,
  isAuthenticated: false,
  accessToken: null,
  isEmailConfirmed: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { userId, email, userName, userProfile, role, accessToken, isEmailConfirmed } =
        action.payload;
      state.userId = userId;
      state.email = email;
      state.userName = userName;
      state.userProfile = userProfile;
      // Convert role to camelCase when storing
      state.role = role ? toCamelCase(role) : null;
      state.isAuthenticated = !!userId && !!accessToken;
      state.accessToken = accessToken;
      state.isEmailConfirmed = isEmailConfirmed ?? false;
    },
    logout: (state) => {
      state.userId = null;
      state.email = null;
      state.userName = null;
      state.userProfile = null;
      state.role = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.isEmailConfirmed = false;
      // Clear persisted state on logout
      clearPersistedState();
    },
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      if (accessToken) {
        state.accessToken = accessToken;
        // Update isAuthenticated based on whether we have both userId and accessToken
        state.isAuthenticated = !!state.userId && !!accessToken;
      }
    },
  },
});

export const { login, logout, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
