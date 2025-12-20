// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, useTheme } from '@mui/material';

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
  showCurriculum = false,
  roleOptions = [],
  curriculumOptions = [],
  passwordRequired = true,
  phoneRequired = true,
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { mode } = useReduxTheme();
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
      {showCurriculum && (
        <Grid item {...gridItemProps}>
          <Form.SelectInput
            name="grade"
            label={t('forms.curriculum')}
            options={curriculumOptions}
            rules={{
              required: t('validation.required', { field: t('forms.curriculum') }),
            }}
          />
        </Grid>
      )}

      {/* Password Fields - Show when showPassword is true (both create and edit modes) */}
      {showPassword && (
        <>
          <Grid item  size={{mobile: 12, desktop: passwordRequired ? 6 : 12}}>
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

      {/* Email Confirmed Checkbox */}
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
        <Form.CheckboxInput name="isEmailConfirmed" label={t('forms.emailConfirmed')} />
      </Grid>

      {/* Image */}
      <Grid item size={12}>
        <Form.ImageInput name="userProfile" label={t('forms.profileImage')} />
      </Grid>
    </Grid>
  );
});

UserFields.propTypes = {
  showPassword: PropTypes.bool,
  showRole: PropTypes.bool,
  showCurriculum: PropTypes.bool,
  roleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  curriculumOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  passwordRequired: PropTypes.bool,
  phoneRequired: PropTypes.bool,
};

UserFields.displayName = 'UserFields';

export default UserFields;
