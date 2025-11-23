// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { useLanguage } from '@hooks';
import { createCurriculum, updateCurriculum } from '../services/curriculumsApi';
import { getCurriculumName } from '../utils';

/**
 * useCurriculumForm Hook
 *
 * Single Responsibility: Manage curriculum form state, validation, and submission
 *
 * @param {Object} options - Hook options
 * @param {Object} options.defaultValues - Default form values
 * @param {boolean} options.isEdit - Whether this is an edit form
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} Form hook object with methods and state
 */

const buildDefaultValues = (values) => ({
  name: values.name || values.nameAr || '',
  nameAr: values.nameAr || values.name || '',
  nameEn: values.nameEn || values.name || '',
  image: values.image || null,
});

export const useCurriculumForm = ({
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
} = {}) => {
  const { currentLanguage } = useLanguage();
  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: QUERY_KEYS.CURRICULUMS,
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: createCurriculum,
    updateFn: ({ id, data }) => updateCurriculum(id, data),
    buildDefaultValues,
    entityName: 'curriculums',
    getItemName: (data) => {
      const name = getCurriculumName(data, currentLanguage);
      return name !== 'N/A' ? name : 'Curriculum';
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
