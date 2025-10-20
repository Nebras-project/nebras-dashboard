import { createSlice } from "@reduxjs/toolkit";

// Import theme colors to sync with MUI palette
const THEME_COLORS = {
  primary: {
    main: "#006239", // Nebras Green
    light: "#33a872",
    dark: "#004d2d",
  },
  secondary: {
    main: "#dc004e", // Pink
    light: "#ff5983",
    dark: "#9a0036",
  },
};

const initialState = {
  mode: "dark", // 'light' or 'dark'
  primaryColor: THEME_COLORS.primary.main,
  secondaryColor: THEME_COLORS.secondary.main,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
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

export const { toggleTheme, setTheme, setPrimaryColor, setSecondaryColor } =
  themeSlice.actions;
export default themeSlice.reducer;
