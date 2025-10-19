import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light', // 'light' or 'dark'
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action) => {
      state.secondaryColor = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setPrimaryColor, setSecondaryColor } = themeSlice.actions;
export default themeSlice.reducer;
