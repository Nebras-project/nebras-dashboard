import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  isMobile: false,
  width: 280, // Fixed sidebar width
  collapsed: false, // Collapsed state for icon-only mode
};

const sidebarSlice = createSlice({
  name: "sidebar",
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
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setMobileMode,
  setSidebarWidth,
  toggleCollapsed,
  setCollapsed,
} = sidebarSlice.actions;
export default sidebarSlice.reducer;
