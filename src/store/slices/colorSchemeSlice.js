import { createSlice } from '@reduxjs/toolkit';
import { baseColors } from '@theme/colors';

const DEFAULT_COLOR = baseColors.teal500; // Default teal color

const initialState = {
  scheme: 'default', // 'default' or 'custom'
  customColor: DEFAULT_COLOR, // Custom color value
};

const colorSchemeSlice = createSlice({
  name: 'colorScheme',
  initialState,
  reducers: {
    setDefaultColor: (state) => {
      // Reset to default teal scheme
      state.scheme = 'default';
      state.customColor = DEFAULT_COLOR;
    },
    setColorScheme: (state, action) => {
      state.scheme = action.payload;
    },
    setCustomColor: (state, action) => {
      state.customColor = action.payload;
      state.scheme = 'custom';
    },
  },
});

export const { setDefaultColor, setColorScheme, setCustomColor } = colorSchemeSlice.actions;
export default colorSchemeSlice.reducer;
