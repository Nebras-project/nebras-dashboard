import { useDispatch, useSelector } from "react-redux";
import {
  setDefaultColor,
  setColorScheme,
  setCustomColor,
} from "../store/slices/colorSchemeSlice";

/**
 * Custom hook for managing color scheme (blue/custom)
 * @returns {Object} Color scheme state and actions
 */
export const useColorScheme = () => {
  const dispatch = useDispatch();
  const { scheme, customColor } = useSelector((state) => state.colorScheme);

  const resetToDefault = () => {
    dispatch(setDefaultColor());
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
    setDefaultColor: resetToDefault, // Resets to default blue scheme
    setColorScheme: setScheme,
    setCustomColor: setColor,
    isBlue: scheme === "blue",
    isCustom: scheme === "custom",
  };
};
