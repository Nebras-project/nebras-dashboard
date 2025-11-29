// external imports
import { useDelete, useLanguage } from '@hooks';
import { QUERY_KEYS } from '@config';
import { deleteCompetition as deleteCompetitionApi } from '../services/competitionsApi';
import { getCompetitionName } from '../utils';

/**
 * useDeleteCompetition Hook
 *
 * Single Responsibility: Competition-specific wrapper for useDelete hook
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onSuccess - Optional callback after successful deletion
 * @param {Function} options.onError - Optional callback after failed deletion
 * @returns {Object} Mutation object with deleteCompetition function and state
 */
export const useDeleteCompetition = ({ onSuccess, onError } = {}) => {
  const { currentLanguage } = useLanguage();
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (competition) => deleteCompetitionApi(competition.id),
    queryKey: [QUERY_KEYS.COMPETITIONS],
    entityName: 'competitions',
    getItemName: (competition) => {
      const name = getCompetitionName(competition, currentLanguage);
      return name !== 'N/A' ? name : 'Competition';
    },
    onSuccess,
    onError,
  });

  return {
    deleteCompetition: deleteItem,
    deleteCompetitionAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};
