import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_COLOR = "#0075ff"; // Default blue color

const initialState = {
  scheme: "default", // 'blue' or 'custom'
  customColor: DEFAULT_COLOR, // Custom color value
};

const colorSchemeSlice = createSlice({
  name: "colorScheme",
  initialState,
  reducers: {
    setDefaultColor: (state) => {
      // Reset to default blue scheme
      state.scheme = "default";
      state.customColor = DEFAULT_COLOR;
    },
    setColorScheme: (state, action) => {
      state.scheme = action.payload;
    },
    setCustomColor: (state, action) => {
      state.customColor = action.payload;
      state.scheme = "custom";
    },
  },
});

export const { setDefaultColor, setColorScheme, setCustomColor } =
  colorSchemeSlice.actions;
export default colorSchemeSlice.reducer;
