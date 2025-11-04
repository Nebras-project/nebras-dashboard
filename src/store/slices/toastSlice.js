import { createSlice } from '@reduxjs/toolkit';

// Toast default configuration
const TOAST_DEFAULTS = {
  variant: 'info',
  autoHideDuration: 4000,
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
};

const initialState = {
  open: false,
  title: null,
  content: null,
  message: null, // alias for content
  variant: TOAST_DEFAULTS.variant,
  autoHideDuration: TOAST_DEFAULTS.autoHideDuration,
  anchorOrigin: TOAST_DEFAULTS.anchorOrigin,
  sx: null,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    // Show toast with all properties
    showToast: (state, action) => {
      const {
        title,
        content,
        message,
        variant = state.variant,
        autoHideDuration = state.autoHideDuration,
        anchorOrigin = state.anchorOrigin,
        sx,
      } = action.payload;

      state.open = true;
      state.title = title ?? null;
      // Normalize content/message alias
      const normalizedContent = content ?? message ?? null;
      state.content = normalizedContent;
      state.message = normalizedContent;
      state.variant = variant;
      state.autoHideDuration = autoHideDuration;
      state.anchorOrigin = anchorOrigin;
      state.sx = sx ?? null;
    },
    // Close toast
    closeToast: (state) => {
      state.open = false;
    },
  },
});

export const { showToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;

// Convenience action creators for different toast variants
export const success = (payload) => showToast({ ...payload, variant: 'success' });

export const warning = (payload) => showToast({ ...payload, variant: 'warning' });

export const error = (payload) => showToast({ ...payload, variant: 'error' });

export const info = (payload) => showToast({ ...payload, variant: 'info' });
