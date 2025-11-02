// external imports
import { useSelector, useDispatch } from "react-redux";

// internal imports
import { toggleTheme, setThemeMode } from "@store/slices";

export const useReduxTheme = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return {
    ...theme,
    toggleTheme: () => dispatch(toggleTheme()),
    setThemeMode: (mode) => dispatch(setThemeMode(mode)),
  };
};
