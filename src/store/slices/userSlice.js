import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userData: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        state.role = action.payload.role;
      }
    },
    clearUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      state.role = null;
    },
    updateUserProfile: (state, action) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },
  },
});

export const { setUser, clearUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
