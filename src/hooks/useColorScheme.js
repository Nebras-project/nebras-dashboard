// external imports
import { useDispatch, useSelector } from "react-redux";

// internal imports
import { setDefaultColor, setColorScheme, setCustomColor } from "@store/slices";

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
    isDefault: scheme === "default",
    isCustom: scheme === "custom",
  };
};
