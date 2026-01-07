// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { createUnit, updateUnit } from '../services/unitsApi';
import { getUnitName } from '../utils';

const buildDefaultValues = (values = {}) => ({
  name: values.name,
});

export const useUnitForm = ({
  gradeId,
  subjectId,
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
} = {}) => {
  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: [QUERY_KEYS.UNITS, gradeId, subjectId],
    additionalQueryKeys: [QUERY_KEYS.SUBJECTS, QUERY_KEYS.MINISTERIAL_FORMS],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: (data) => createUnit(gradeId, subjectId, data),
    updateFn: ({ id, data }) => updateUnit(gradeId, subjectId, id, data),
    buildDefaultValues,
    entityName: 'units',
    getItemName: (unit, vars) => {
      const name = getUnitName(vars);
      return name !== 'N/A' ? name : 'وحدة';
    },
  });

  return {
    formDefaultValues,
    handleSubmit,
    isLoading,
    isError,
    error,
  };
};
