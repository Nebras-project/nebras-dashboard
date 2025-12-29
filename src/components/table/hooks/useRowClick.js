import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * useRowClick
 *
 * Generic hook that returns a row click handler for DataGrid rows.
 * Options:
 * - onRowClick: optional custom handler (row) => void
 * - navigateTo: optional navigator; if function, called as navigateTo(row, { navigate });
 *               if string, navigates to that path.
 */
export const useRowClick = ({ onRowClick, navigateTo } = {}) => {
  const navigate = useNavigate();

  return useCallback(
    (params) => {
      const row = params?.row ?? params;
      if (!row) return;
      if (typeof onRowClick === 'function') return onRowClick(row);
      if (typeof navigateTo === 'function') return navigateTo(row, { navigate });
      if (typeof navigateTo === 'string') return navigate(navigateTo);
    },
    [onRowClick, navigateTo, navigate]
  );
};

export default useRowClick;
