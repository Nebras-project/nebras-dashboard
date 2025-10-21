import { createSlice } from "@reduxjs/toolkit";
import { clearPersistedState } from "../middleware/localStorageMiddleware";

const initialState = {
  isAuthenticated: false,
  userData: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      state.role = null;
      // Clear persisted state on logout
      clearPersistedState();
    },
    updateUserProfile: (state, action) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
