// external imports
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';

// internal imports
import { setUserData, clearUserData, setAccessToken } from '@store/slices';

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Memoize action creators to prevent unnecessary re-renders
  const setUserDataAction = useCallback((payload) => dispatch(setUserData(payload)), [dispatch]);
  const clearUserDataAction = useCallback(() => dispatch(clearUserData()), [dispatch]);
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
      phoneNumber: auth.phoneNumber,
      profileImage: auth.profileImage,
      role: auth.role,
      isAuthenticated: auth.isAuthenticated,
      accessToken: auth.accessToken,
      isEmailConfirmed: auth.isEmailConfirmed,
      // Actions
      setUserData: setUserDataAction,
      clearUserData: clearUserDataAction,
      setAccessToken: setAccessTokenAction,
    }),
    [auth, setUserDataAction, clearUserDataAction, setAccessTokenAction]
  );
};
