import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scheme: "blue", // 'blue', 'green', or 'custom'
  customColor: "#0075ff", // Custom color value
};

const colorSchemeSlice = createSlice({
  name: "colorScheme",
  initialState,
  reducers: {
    toggleColorScheme: (state) => {
      state.scheme = state.scheme === "blue" ? "green" : "blue";
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

export const { toggleColorScheme, setColorScheme, setCustomColor } =
  colorSchemeSlice.actions;
export default colorSchemeSlice.reducer;
