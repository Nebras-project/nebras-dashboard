// external imports
import { useCallback } from 'react';
import { useUpdate, useLanguage } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { patchCompetition } from '../services/competitionsApi';
import { getCompetitionName } from '../utils';

/**
 * useUpdateCompetitionStatus Hook
 *
 * Single Responsibility: Competition status update wrapper for useUpdate hook
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onSuccess - Optional callback after successful status update
 * @param {Function} options.onError - Optional callback after failed status update
 * @returns {Object} Mutation object with updateStatus function and state
 */
export const useUpdateCompetitionStatus = ({ onSuccess, onError } = {}) => {
  const { currentLanguage } = useLanguage();

  const { updateItem, updateItemAsync, isLoading, isError, error } = useUpdate({
    updateFn: ({ id, data }) => patchCompetition(id, data),
    queryKey: [QUERY_KEYS.COMPETITIONS],
    entityName: 'competitions',
    getItemName: (competition) => {
      const name = getCompetitionName(competition, currentLanguage);
      return name !== 'N/A' ? name : 'Competition';
    },
    onSuccess: (data) => {
      // Show success message with status
      onSuccess?.(data);
    },
    onError,
  });

  const updateStatus = useCallback(
    (competition, newStatus) => {
      // Send English keys to server (status is already in English, just map runningState)
      updateItem({
        id: competition.id,
        data: {
          preparationStatus: newStatus, // Already in English format
        },
      });
    },
    [updateItem]
  );

  return {
    updateStatus,
    updateStatusAsync: updateItemAsync,
    isLoading,
    isError,
    error,
  };
};
