// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// internal imports
import { useFormFieldError } from '../hooks';
import { FORM_DEFAULTS } from '../constants';

/**
 * FileInput Component
 *
 * Single Responsibility: File input field integrated with React Hook Form
 */

const getFileInputStyles = () => ({
  display: 'none',
});


const getLabelStyles = (fullWidth) => ({
  cursor: 'pointer',
  width: fullWidth ? '100%' : 'auto',
});

const getButtonStyles = () => ({
  cursor: 'pointer',
  pointerEvents: 'none',
});

const getFileDisplayValue = (fileValue, multiple) => {
  if (!fileValue) return '';
  if (multiple) {
    return `${fileValue.length} file(s) selected`;
  }
  return fileValue?.name || 'No file selected';
};

const FileInput = memo(function FileInput({
  name,
  label,
  rules,
  accept,
  multiple = false,
  buttonText,
  ...textFieldProps
}) {
  const { control, watch } = useFormContext();
  const { hasError, helperText } = useFormFieldError(name);
  const fileValue = watch(name);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={
        multiple
          ? FORM_DEFAULTS.FILE_INPUT_MULTIPLE_DEFAULT
          : FORM_DEFAULTS.FILE_INPUT_SINGLE_DEFAULT
      }
      render={({ field: { onChange, value, ref, ...field } }) => {
        const inputId = `file-input-${name}`;

        return (
          <Box>
            <input
              {...field}
              ref={ref}
              type="file"
              accept={accept}
              multiple={multiple}
              style={getFileInputStyles()}
              id={inputId}
              onChange={(e) => {
                const files = e.target.files;
                onChange(
                  multiple
                    ? Array.from(files)
                    : files?.[0] || FORM_DEFAULTS.FILE_INPUT_SINGLE_DEFAULT
                );
              }}
            />
            <label htmlFor={inputId} style={getLabelStyles(textFieldProps.fullWidth)}>
              <Button
                variant="outlined"
                component="span"
                fullWidth={textFieldProps.fullWidth}
                sx={getButtonStyles()}
              >
                {buttonText || label || 'Choose File'}
              </Button>
            </label>
            {(fileValue || hasError) && (
              <TextField
                fullWidth
                margin="normal"
                value={getFileDisplayValue(fileValue, multiple)}
                error={hasError}
                helperText={helperText}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          </Box>
        );
      }}
    />
  );
});

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  buttonText: PropTypes.string,
};

FileInput.displayName = 'FileInput';

export default FileInput;
