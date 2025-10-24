import { useDispatch, useSelector } from "react-redux";
import {
  toggleColorScheme,
  setColorScheme,
  setCustomColor,
} from "../store/slices/colorSchemeSlice";

/**
 * Custom hook for managing color scheme (blue/green/custom)
 * @returns {Object} Color scheme state and actions
 */
export const useColorScheme = () => {
  const dispatch = useDispatch();
  const { scheme, customColor } = useSelector((state) => state.colorScheme);

  const toggle = () => {
    dispatch(toggleColorScheme());
  };

  const setScheme = (newScheme) => {
    dispatch(setColorScheme(newScheme));
  };

  const setColor = (color) => {
    dispatch(setCustomColor(color));
  };

  return {
    scheme,
    customColor,
    toggleColorScheme: toggle,
    setColorScheme: setScheme,
    setCustomColor: setColor,
    isBlue: scheme === "blue",
    isGreen: scheme === "green",
    isCustom: scheme === "custom",
  };
};
