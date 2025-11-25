// external imports
import { useDelete, useLanguage } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { deleteUnit as deleteUnitApi } from '../services/unitsApi';
import { getUnitName } from '../utils';

export const useDeleteUnit = ({ curriculumId, subjectId, onSuccess, onError } = {}) => {
  const { currentLanguage } = useLanguage();

  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (unit) => deleteUnitApi(curriculumId, subjectId, unit.id),
    queryKey: [QUERY_KEYS.UNITS, curriculumId, subjectId],
    entityName: 'units',
    getItemName: (unit) => {
      const name = getUnitName(unit, currentLanguage);
      return name !== 'N/A' ? name : 'Unit';
    },
    onSuccess,
    onError,
  });

  return {
    deleteUnit: deleteItem,
    deleteUnitAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};
