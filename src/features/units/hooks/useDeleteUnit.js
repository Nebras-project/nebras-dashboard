// external imports
import { useDelete } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { deleteUnit as deleteUnitApi } from '../services/unitsApi';
import { getUnitName } from '../utils';

export const useDeleteUnit = ({ gradeId, subjectId, onSuccess, onError } = {}) => {
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (unit) => deleteUnitApi(gradeId, subjectId, unit.id),
    queryKey: [QUERY_KEYS.UNITS, gradeId, subjectId],
    additionalQueryKeys: [QUERY_KEYS.SUBJECTS, QUERY_KEYS.MINISTERIAL_FORMS],
    entityName: 'units',
    getItemName: (unit, vars) => {
      const name = getUnitName(vars);
      return name !== 'N/A' ? name : 'وحدة';
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
