import { createSlice } from '@reduxjs/toolkit';
import { resolveLanguage } from '@utils';
import { DEFAULT_LANGUAGE } from '@config/env';

const initialLanguage = DEFAULT_LANGUAGE;
const resolvedInitialLanguage = resolveLanguage(initialLanguage);

const initialState = {
  currentLanguage: initialLanguage, // 'en', 'ar', or 'system' - Will be overridden by preloadedState
  isRTL: resolvedInitialLanguage === 'ar',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      // Resolve the actual language for RTL calculation
      const resolvedLang = resolveLanguage(action.payload);
      state.isRTL = resolvedLang === 'ar';
    },
    toggleLanguage: (state) => {
      const resolvedLang = resolveLanguage(state.currentLanguage);
      const newLang = resolvedLang === 'en' ? 'ar' : 'en';
      state.currentLanguage = newLang;
      state.isRTL = newLang === 'ar';
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
