import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import languageReducer from "./slices/languageSlice";
import sidebarReducer from "./slices/sidebarSlice";
import userReducer from "./slices/userSlice";
import colorSchemeReducer from "./slices/colorSchemeSlice";
import {
  localStorageMiddleware,
  loadPersistedState,
} from "./middleware/localStorageMiddleware";
import { migrateLocalStorage } from "@utils";

// Run migration BEFORE loading state
migrateLocalStorage();

// Load persisted state from localStorage
const preloadedState = loadPersistedState(); // Loads state on app startup

console.log(preloadedState);

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    sidebar: sidebarReducer,
    user: userReducer,
    colorScheme: colorSchemeReducer,
  },
  preloadedState, // 👈 Pre-fill store with saved data
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware), // Saves state after every action
});

export default store;
