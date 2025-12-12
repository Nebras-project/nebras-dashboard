/**
 * ImageInput Component
 *
 * Single Responsibility: Image upload field with drag & drop, preview, and validation
 * Integrated with React Hook Form
 */

import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, FormHelperText } from '@mui/material';
import { useFormContext, Controller, useWatch } from 'react-hook-form';

// internal imports
import { useFormFieldError } from '../../hooks';
import { FORM_DEFAULTS } from '../../constants';
import { useImagePreview } from './hooks/useImagePreview';
import { useFileValidation } from './hooks/useFileValidation';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useFileInput } from './hooks/useFileInput';
import ImagePreview from './components/ImagePreview';
import UploadArea from './components/UploadArea';
import { MAX_FILE_SIZE } from './constants';

const ImageInput = memo(function ImageInput({
  name,
  label,
  rules,
  defaultValue = FORM_DEFAULTS.FILE_INPUT_SINGLE_DEFAULT,
  accept = 'image/*',
  maxSize = MAX_FILE_SIZE,
}) {
  const { control, setError, clearErrors } = useFormContext();
  const { hasError, helperText } = useFormFieldError(name);

  // Watch form value
  const formValue = useWatch({ control, name });

  // Manage preview
  const [preview, setPreview, createPreview] = useImagePreview(formValue);

  // File validation
  const validateFile = useFileValidation(maxSize);

  // File input handlers (called at top level)
  const fileInput = useFileInput({
    validateFile,
    setError,
    clearErrors,
    createPreview,
    setPreview,
    name,
  });

  // Drag and drop handlers (called at top level)
  const dragAndDrop = useDragAndDrop(fileInput.handleFileSelect);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange } }) => {
        // Set onChange in hook
        fileInput.setOnChange(onChange);

        return (
          <Box>
            {preview ? (
              <ImagePreview
                preview={preview}
                hasError={hasError}
                onReplace={fileInput.handleReplace}
                onRemove={fileInput.handleRemove}
                accept={accept}
                fileInputRef={fileInput.fileInputRef}
                onInputChange={fileInput.handleInputChange}
                onDragEnter={dragAndDrop.handleDragEnter}
                onDragOver={dragAndDrop.handleDragOver}
                onDragLeave={dragAndDrop.handleDragLeave}
                onDrop={dragAndDrop.handleDrop}
              />
            ) : (
              <UploadArea
                label={label}
                maxSize={maxSize}
                accept={accept}
                hasError={hasError}
                isDragging={dragAndDrop.isDragging}
                onDragEnter={dragAndDrop.handleDragEnter}
                onDragOver={dragAndDrop.handleDragOver}
                onDragLeave={dragAndDrop.handleDragLeave}
                onDrop={dragAndDrop.handleDrop}
                onClick={() => fileInput.fileInputRef.current?.click()}
                fileInputRef={fileInput.fileInputRef}
                onInputChange={fileInput.handleInputChange}
              />
            )}
            {hasError && helperText && (
              <FormHelperText error sx={{ mt: 1, mx: 0 }}>
                {helperText}
              </FormHelperText>
            )}
          </Box>
        );
      }}
    />
  );
});

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.oneOfType([
    PropTypes.instanceOf(File),
    PropTypes.string, // URL string for existing images
    PropTypes.oneOf([null]),
  ]),
  accept: PropTypes.string,
  maxSize: PropTypes.number,
};

ImageInput.displayName = 'ImageInput';

export default ImageInput;
