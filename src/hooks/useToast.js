// external imports
import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// internal imports
import { showToast, closeToast, success, warning, error, info } from '@store/slices';

export const useToast = () => {
  const toastState = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  // Memoize action creators to prevent unnecessary re-renders
  const showToastAction = useCallback((payload) => dispatch(showToast(payload)), [dispatch]);
  const successAction = useCallback((payload) => dispatch(success(payload)), [dispatch]);
  const warningAction = useCallback((payload) => dispatch(warning(payload)), [dispatch]);
  const errorAction = useCallback((payload) => dispatch(error(payload)), [dispatch]);
  const infoAction = useCallback((payload) => dispatch(info(payload)), [dispatch]);
  const closeToastAction = useCallback(() => dispatch(closeToast()), [dispatch]);

  return useMemo(
    () => ({
      ...toastState,
      showToast: showToastAction,
      success: successAction,
      warning: warningAction,
      error: errorAction,
      info: infoAction,
      closeToast: closeToastAction,
    }),
    [
      toastState,
      showToastAction,
      successAction,
      warningAction,
      errorAction,
      infoAction,
      closeToastAction,
    ]
  );
};
