// external imports
import { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Avatar, Typography, IconButton, useTheme, alpha } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { MdCloudUpload, MdDelete, MdPhotoCamera } from 'react-icons/md';

// internal imports
import { useFormFieldError } from '../hooks';
import { FORM_DEFAULTS } from '../constants';
import { useTranslation } from '@hooks';

/**
 * ProfileImageInput Component
 *
 * Single Responsibility: Profile image upload field with circular preview
 */

const ProfileImageInput = memo(function ProfileImageInput({
  name,
  rules,
  accept = 'image/*',
  size = 80,
}) {
  const { control, watch, setValue } = useFormContext();
  const { hasError, helperText } = useFormFieldError(name);
  const theme = useTheme();
  const { t } = useTranslation();
  const fileValue = watch(name);
  const [preview, setPreview] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Update preview when fileValue changes
  useEffect(() => {
    if (!fileValue) {
      setPreview(null);
      return;
    }

    if (fileValue instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(fileValue);
    } else if (typeof fileValue === 'string' && fileValue.trim()) {
      setPreview(fileValue);
    }
  }, [fileValue]);

  const handleDelete = (e) => {
    e.stopPropagation();
    setValue(name, FORM_DEFAULTS.FILE_INPUT_SINGLE_DEFAULT, { shouldValidate: true });
  };

  const imageUrl =
    preview || (typeof fileValue === 'string' && fileValue.trim() ? fileValue : null);

  const inputId = `file-input-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={FORM_DEFAULTS.FILE_INPUT_SINGLE_DEFAULT}
      render={({ field: { onChange, value, ref, ...field } }) => (
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                position: 'relative',
                cursor: 'pointer',
                '&:hover .upload-overlay': { opacity: 1 },
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <label htmlFor={inputId} style={{ cursor: 'pointer', display: 'block' }}>
                <Avatar
                  src={imageUrl || undefined}
                  sx={{
                    width: size,
                    height: size,
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    border: `2px solid ${
                      hasError ? theme.palette.error.main : theme.palette.divider
                    }`,
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      borderColor: hasError ? theme.palette.error.main : theme.palette.primary.main,
                    },
                  }}
                >
                  {!imageUrl && <MdPhotoCamera size={size * 0.4} />}
                </Avatar>

                <Box
                  className="upload-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.8),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.2s',
                    pointerEvents: 'none',
                  }}
                >
                  <MdCloudUpload size={size * 0.3} color={theme.palette.primary.contrastText} />
                </Box>
              </label>

              {imageUrl && (
                <IconButton
                  onClick={handleDelete}
                  sx={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    bgcolor: theme.palette.error.main,
                    color: theme.palette.error.contrastText,
                    width: 28,
                    height: 28,
                    boxShadow: theme.shadows[3],
                    '&:hover': { bgcolor: theme.palette.error.dark, transform: 'scale(1.1)' },
                    transition: 'all 0.2s',
                  }}
                  aria-label="Delete image"
                >
                  <MdDelete size={16} />
                </IconButton>
              )}
            </Box>

            <input
              {...field}
              ref={ref}
              type="file"
              accept={accept}
              id={inputId}
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file || FORM_DEFAULTS.FILE_INPUT_SINGLE_DEFAULT);
              }}
            />

            {helperText && (
              <Typography
                variant="caption"
                sx={{
                  color: hasError ? theme.palette.error.main : theme.palette.text.secondary,
                  textAlign: 'center',
                }}
              >
                {helperText}
              </Typography>
            )}

            {!imageUrl && (
              <Typography
                variant="caption"
                component="label"
                htmlFor={inputId}
                sx={{
                  color: theme.palette.text.secondary,
                  cursor: 'pointer',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                {t('forms.clickToUploadImage')}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    />
  );
});

ProfileImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  accept: PropTypes.string,
  size: PropTypes.number,
  showLabel: PropTypes.bool,
};

ProfileImageInput.displayName = 'ProfileImageInput';

export default ProfileImageInput;
