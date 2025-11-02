// external imports
import { useSelector, useDispatch } from "react-redux";

// internal imports
import { login, logout, updateUserProfile } from "@store/slices";

export const useUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return {
    ...user,
    user: user.userData,
    login: (userData) => dispatch(login(userData)),
    logout: () => dispatch(logout()),
    updateUserProfile: (updates) => dispatch(updateUserProfile(updates)),
  };
};
