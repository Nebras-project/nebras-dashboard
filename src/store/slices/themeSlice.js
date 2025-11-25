import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_THEME } from '@config/env';

const initialState = {
  mode: DEFAULT_THEME, // 'light' or 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setThemeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
