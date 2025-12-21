import { createSlice } from '@reduxjs/toolkit';
import { clearPersistedState } from '../middleware/localStorageMiddleware';
import { toCamelCase } from '@utils/caseUtils';

const initialState = {
  userId: null,
  email: null,
  userName: null,
  phoneNumber: null,
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
    setUserData: (state, action) => {
      const { userId, email, userName, phoneNumber, userProfile, role, accessToken, isEmailConfirmed } =
        action.payload;
      state.userId = userId;
      state.email = email;
      state.userName = userName;
      state.phoneNumber = phoneNumber;
      state.userProfile = userProfile;
      // Convert role to camelCase when storing
      state.role = role ? toCamelCase(role) : null;
      state.isAuthenticated = !!userId && !!accessToken;
      state.accessToken = accessToken;
      state.isEmailConfirmed = isEmailConfirmed ?? false;
    },
    clearUserData: (state) => {
      state.userId = null;
      state.email = null;
      state.userName = null;
      state.phoneNumber = null;
      state.userProfile = null;
      state.role = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.isEmailConfirmed = false;
      // Clear persisted state
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

export const { setUserData, clearUserData, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
