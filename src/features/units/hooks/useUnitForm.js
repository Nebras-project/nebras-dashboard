// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { useLanguage } from '@hooks';
import { createUnit, updateUnit } from '../services/unitsApi';
import { getUnitName } from '../utils';

const buildDefaultValues = (values = {}) => ({
  nameAr: values.nameAr || values.name || '',
  nameEn: values.nameEn || values.name || '',
  order: values.order || 1,
  isActive: values.isActive ?? true,
});

export const useUnitForm = ({
  gradeId,
  subjectId,
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
} = {}) => {
  const { currentLanguage } = useLanguage();

  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: [QUERY_KEYS.UNITS, gradeId, subjectId],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: (data) => createUnit(gradeId, subjectId, data),
    updateFn: ({ id, data }) => updateUnit(gradeId, subjectId, id, data),
    buildDefaultValues,
    entityName: 'units',
    getItemName: (unit) => {
      const name = getUnitName(unit, currentLanguage);
      return name !== 'N/A' ? name : 'Unit';
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
