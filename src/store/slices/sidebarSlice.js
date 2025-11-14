import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false, // Start closed to prevent flash on mobile
  collapsed: false, // Collapsed state for icon-only mode
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    // Sidebar open/close actions
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    // Sidebar collapse/expand actions
    collapseSidebar: (state) => {
      state.collapsed = true;
    },
    expandSidebar: (state) => {
      state.collapsed = false;
    },
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const {
  openSidebar,
  closeSidebar,
  toggleSidebar,
  collapseSidebar,
  expandSidebar,
  toggleCollapsed,
} = sidebarSlice.actions;
export default sidebarSlice.reducer;
