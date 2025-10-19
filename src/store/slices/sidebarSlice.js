import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
  isMobile: false,
  width: 240, // Default sidebar width
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSidebarOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setMobileMode: (state, action) => {
      state.isMobile = action.payload;
      // Auto-close sidebar on mobile when switching to mobile mode
      if (action.payload && state.isOpen) {
        state.isOpen = false;
      }
    },
    setSidebarWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setMobileMode, setSidebarWidth } = sidebarSlice.actions;
export default sidebarSlice.reducer;
