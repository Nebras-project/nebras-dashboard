// external imports
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';

// internal imports
import { login, logout, setAccessToken } from '@store/slices';

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Memoize action creators to prevent unnecessary re-renders
  const loginAction = useCallback((payload) => dispatch(login(payload)), [dispatch]);
  const logoutAction = useCallback(() => dispatch(logout()), [dispatch]);
  const setAccessTokenAction = useCallback(
    (payload) => dispatch(setAccessToken(payload)),
    [dispatch]
  );

  return useMemo(
    () => ({
      // State
      userId: auth.userId,
      email: auth.email,
      userName: auth.userName,
      userProfile: auth.userProfile,
      role: auth.role,
      isAuthenticated: auth.isAuthenticated,
      accessToken: auth.accessToken,
      isEmailConfirmed: auth.isEmailConfirmed,
      // Actions
      login: loginAction,
      logout: logoutAction,
      setAccessToken: setAccessTokenAction,
    }),
    [auth, loginAction, logoutAction, setAccessTokenAction]
  );
};
