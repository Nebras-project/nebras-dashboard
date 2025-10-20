import { useSelector, useDispatch } from "react-redux";
import {
  toggleTheme,
  setThemeMode,
  setPrimaryColor,
  setSecondaryColor,
} from "../store/slices/themeSlice";

/**
 * Custom hook to access and manage theme state from Redux
 * @returns {Object} Theme state and action creators
 */
export const useReduxTheme = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return {
    ...theme,
    toggleTheme: () => dispatch(toggleTheme()),
    setThemeMode: (mode) => dispatch(setThemeMode(mode)),
    setPrimaryColor: (color) => dispatch(setPrimaryColor(color)),
    setSecondaryColor: (color) => dispatch(setSecondaryColor(color)),
  };
};
