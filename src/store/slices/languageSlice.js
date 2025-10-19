import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLanguage: 'en', // 'en' or 'ar'
  isRTL: false,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      state.isRTL = action.payload === 'ar';
    },
    toggleLanguage: (state) => {
      const newLang = state.currentLanguage === 'en' ? 'ar' : 'en';
      state.currentLanguage = newLang;
      state.isRTL = newLang === 'ar';
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
