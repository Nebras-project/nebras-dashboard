import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { Form } from '@components';
import { useQuestionImageUpload } from '../hooks/useQuestionImageUpload';

/**
 * QuestionImageInput Component
 *
 * Wrapper around ImageInput that automatically uploads images to the question image endpoint
 * and stores the imageId in a hidden field
 */
function QuestionImageInput({ name = 'image', label, rules, ...props }) {
  const { control, setValue } = useFormContext();
  const { isUploading } = useQuestionImageUpload(name, 'imageId');

  // Initialize hidden imageId field
  useEffect(() => {
    setValue('imageId', null, { shouldValidate: false });
  }, [setValue]);

  return (
    <>
      {/* Hidden field for imageId */}
      <Controller
        name="imageId"
        control={control}
        render={({ field }) => <input type="hidden" {...field} />}
      />

      <Form.ImageInput name={name} label={label} rules={rules} disabled={isUploading} {...props} />
    </>
  );
}

QuestionImageInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
};

export default QuestionImageInput;
