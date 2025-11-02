// external imports
import { useSelector, useDispatch } from "react-redux";

// internal imports
import { setLanguage, toggleLanguage } from "@store/slices";
import { resolveLanguage } from "@utils";

export const useLanguage = () => {
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();

  return {
    ...language,
    // Return resolved language for components that need the actual language
    resolvedLanguage: resolveLanguage(language.currentLanguage),
    setLanguage: (lang) => dispatch(setLanguage(lang)),
    toggleLanguage: () => dispatch(toggleLanguage()),
  };
};
