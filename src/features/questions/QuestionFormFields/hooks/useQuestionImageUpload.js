import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useTranslation, useToast } from '@hooks';
import { getErrorMessage } from '@utils';
import { uploadQuestionImage } from '../../question/services/questionsApi';

/**
 * Hook to handle automatic image upload for question image field
 * When a File is selected, it uploads to the image endpoint and stores the imageId
 * Uses React Query's useMutation for better state management
 *
 * @param {string} imageFieldName - Name of the image field (default: 'image')
 * @param {string} imageIdFieldName - Name of the hidden imageId field (default: 'imageId')
 * @returns {Object} Upload state and handlers
 */
export const useQuestionImageUpload = (imageFieldName = 'image', imageIdFieldName = 'imageId') => {
  const { watch, setValue, setError, clearErrors } = useFormContext();
  const { t } = useTranslation();
  const { success, error: showError } = useToast();
  const previousFileRef = useRef(null);

  // Watch the image field value
  const imageValue = watch(imageFieldName);

  // Create mutation for image upload
  const mutation = useMutation({
    mutationFn: uploadQuestionImage,
    onSuccess: (imageId) => {
      // Store imageId in hidden field
      setValue(imageIdFieldName, imageId, { shouldValidate: true });
      clearErrors(imageFieldName);
      clearErrors(imageIdFieldName);

      // Show success toast
      success({
        message: t('questions.imageUploadSuccessMessage'),
      });
    },
    onError: (error) => {
      // Get error message from API
      const apiErrorMessage = getErrorMessage(error);
      const errorMessage = apiErrorMessage || t('questions.imageUploadErrorMessage');

      // Set form field error
      setError(imageFieldName, {
        type: 'manual',
        message: errorMessage,
      });
      setValue(imageIdFieldName, null);

      // Show error toast
      showError({
        message: errorMessage,
      });
    },
  });

  // Upload image when File object is detected
  useEffect(() => {
    if (imageValue instanceof File) {
      // Only upload if it's a new file (different from previous)
      if (previousFileRef.current !== imageValue) {
        previousFileRef.current = imageValue;
        clearErrors(imageFieldName);
        clearErrors(imageIdFieldName);
        mutation.mutate(imageValue);
      }
    } else if (!imageValue) {
      // Clear imageId when image is removed
      previousFileRef.current = null;
      setValue(imageIdFieldName, null, { shouldValidate: false });
    }
    // mutation.mutate is stable, so we don't need it in deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageValue, imageFieldName, imageIdFieldName]);

  return {
    isUploading: mutation.isPending,
    uploadError: mutation.error,
  };
};
