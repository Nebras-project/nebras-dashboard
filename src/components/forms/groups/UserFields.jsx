// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, useTheme } from '@mui/material';
import { useWatch } from 'react-hook-form';

// internal imports
import { Form } from '@components';
import { useTranslation, useReduxTheme } from '@hooks';
import { borderColors } from '@theme/colors';
import { padding } from '@constants';
import { borderRadius } from '@theme/components';

/**
 * UserFields Component
 *
 * Single Responsibility: Reusable form fields for user-related forms (admins, students)
 * Uses existing Form components without duplication
 * Responsive layout: 1 column on mobile, 2 columns on desktop
 */
const UserFields = memo(function UserFields({
  showPassword = false,
  showRole = false,
  showGrade = false,
  roleOptions = [],
  gradeOptions = [],
  passwordRequired = true,
  phoneRequired = true,
  isEdit = false,
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { mode } = useReduxTheme();

  // Watch verifyEmail to conditionally show sendVerificationEmail
  const verifyEmail = useWatch({ name: 'verifyEmail' });

  // Grid item props for responsive layout
  // mobile (0-767px): full width (12 columns) - single column
  // tablet (768-1023px): full width (12 columns) - single column
  // desktop (1024px+): half width (6 columns) - two columns
  const gridItemProps = {
    sx: {
      // Mobile and tablet: full width (single column)
      width: '100%',
      flexBasis: '100%',
      maxWidth: '100%',
      [theme.breakpoints.up('desktop')]: {
        // Desktop and above: half width (two columns)
        flexBasis: 'calc(50% - 12px)',
        maxWidth: 'calc(50% - 12px)',
        width: 'auto',
      },
    },
  };

  return (
    <Grid container spacing={3}>
      {/* Username */}
      <Grid item {...gridItemProps}>
        <Form.UsernameInput />
      </Grid>

      {/* Email */}
      <Grid item {...gridItemProps}>
        <Form.EmailInput />
      </Grid>

      {/* Phone Number */}
      <Grid item {...gridItemProps}>
        <Form.PhoneInput required={phoneRequired} />
      </Grid>

      {/* Role - Only for admins */}
      {showRole && roleOptions.length > 0 && (
        <Grid item {...gridItemProps}>
          <Form.SelectInput
            name="role"
            label={t('forms.role')}
            options={roleOptions}
            rules={{
              required: t('validation.required', { field: t('forms.role') }),
            }}
          />
        </Grid>
      )}

      {/* Curriculum - Only for students */}
      {/* {showCurriculum && curriculumOptions.length > 0 && ( */}
      {showGrade && (
        <Grid item {...gridItemProps}>
          <Form.SelectInput
            name="grade"
            label={t('forms.grade')}
            options={gradeOptions}
            rules={{
              required: t('validation.required', { field: t('forms.grade') }),
            }}
          />
        </Grid>
      )}

      {/* Password Fields - Show when showPassword is true (both create and edit modes) */}
      {showPassword && (
        <>
          <Grid item size={{ mobile: 12, desktop: passwordRequired ? 6 : 12 }}>
            <Form.PasswordInput required={passwordRequired} />
          </Grid>

          {/* Confirm Password */}
          {passwordRequired && (
            <Grid item {...gridItemProps}>
              <Form.ConfirmPasswordInput
                label={t('forms.confirmPassword')}
                autoComplete="new-password"
                passwordRequired={passwordRequired}
              />
            </Grid>
          )}
        </>
      )}

      {/* Email Confirmed Checkbox - Show only in create mode */}
      {!isEdit && (
        <Grid
          item
          size={12}
          sx={{
            border: `1px solid ${borderColors[mode]}`,
            ...padding.y.sm,
            ...padding.x.md,
            borderRadius: borderRadius.xxs,
          }}
        >
          <Stack spacing={1}>
            <Form.CheckboxInput name="verifyEmail" label={t('forms.verifyEmail')} />
            {!verifyEmail && (
              <Form.CheckboxInput
                name="sendVerificationEmail"
                label={t('forms.sendVerificationEmail')}
              />
            )}
          </Stack>
        </Grid>
      )}

      {/* Image - Show only in edit mode */}
      {isEdit && (
        <Grid item size={12}>
          <Form.ImageInput name="profileImage" label={t('forms.profileImage')} />
        </Grid>
      )}
    </Grid>
  );
});

UserFields.propTypes = {
  showPassword: PropTypes.bool,
  showRole: PropTypes.bool,
  showGrade: PropTypes.bool,
  roleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  gradeOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  passwordRequired: PropTypes.bool,
  phoneRequired: PropTypes.bool,
  isEdit: PropTypes.bool,
};

UserFields.displayName = 'UserFields';

export default UserFields;
