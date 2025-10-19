import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import languageReducer from "./slices/languageSlice";
import sidebarReducer from "./slices/sidebarSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    sidebar: sidebarReducer,
    user: userReducer,
  },
});

export default store;
