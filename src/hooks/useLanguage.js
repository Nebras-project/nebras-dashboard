import { useSelector, useDispatch } from "react-redux";
import { setLanguage, toggleLanguage } from "../store/slices/languageSlice";

/**
 * Custom hook to access and manage language state from Redux
 * @returns {Object} Language state and action creators
 */
export const useLanguage = () => {
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();

  return {
    ...language,
    setLanguage: (lang) => dispatch(setLanguage(lang)),
    toggleLanguage: () => dispatch(toggleLanguage()),
  };
};
