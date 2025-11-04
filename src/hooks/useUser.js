// external imports
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';

// internal imports
import { login, logout, updateUserProfile } from '@store/slices';

export const useUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Memoize action creators to prevent unnecessary re-renders
  const loginAction = useCallback((userData) => dispatch(login(userData)), [dispatch]);
  const logoutAction = useCallback(() => dispatch(logout()), [dispatch]);
  const updateUserProfileAction = useCallback(
    (updates) => dispatch(updateUserProfile(updates)),
    [dispatch]
  );

  return useMemo(
    () => ({
      ...user,
      user: user.userData,
      login: loginAction,
      logout: logoutAction,
      updateUserProfile: updateUserProfileAction,
    }),
    [user, loginAction, logoutAction, updateUserProfileAction]
  );
};
