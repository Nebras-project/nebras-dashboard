import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  clearUser,
  updateUserProfile,
} from "../store/slices/userSlice";

/**
 * Custom hook to access and manage user state from Redux
 * @returns {Object} User state and action creators
 */
export const useUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return {
    ...user,
    setUser: (userData) => dispatch(setUser(userData)),
    clearUser: () => dispatch(clearUser()),
    updateUserProfile: (updates) => dispatch(updateUserProfile(updates)),
  };
};
