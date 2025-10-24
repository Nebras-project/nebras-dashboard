import { createSlice } from "@reduxjs/toolkit";

// Get initial language from localStorage or default to 'ar'
const savedLanguage = localStorage.getItem("language") || "ar";

const initialState = {
  currentLanguage: savedLanguage, // 'en' or 'ar'
  isRTL: savedLanguage === "ar",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      state.isRTL = action.payload === "ar";
      // Persist to localStorage
      localStorage.setItem("language", action.payload);
    },
    toggleLanguage: (state) => {
      const newLang = state.currentLanguage === "en" ? "ar" : "en";
      state.currentLanguage = newLang;
      state.isRTL = newLang === "ar";
      // Persist to localStorage
      localStorage.setItem("language", newLang);
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
