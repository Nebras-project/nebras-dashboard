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
  showClass = false,
  roleOptions = [],
  classOptions = [],
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
            name="Role"
            label={t('forms.role')}
            options={roleOptions}
            rules={{
              required: t('validation.required', { field: t('forms.role') }),
            }}
          />
        </Grid>
      )}

      {/* Class - Only for students */}
      {showClass && classOptions.length > 0 && (
        <Grid item {...gridItemProps}>
          <Form.SelectInput
            name="Grade"
            label={t('forms.class')}
            options={classOptions}
            rules={{
              required: t('validation.required', { field: t('forms.class') }),
            }}
          />
        </Grid>
      )}

      {/* Password Fields - Show when showPassword is true (both create and edit modes) */}
      {showPassword && (
        <>
          <Grid item {...gridItemProps}>
            <Form.PasswordInput />
          </Grid>

          {/* Confirm Password */}
          <Grid item {...gridItemProps}>
            <Form.ConfirmPasswordInput
              name="ConfirmPassword"
              label={t('forms.confirmPassword')}
              autoComplete="new-password"
              passwordRequired={passwordRequired}
            />
          </Grid>
        </>
      )}

      {/* Email Confirmed Checkbox */}
      <Grid
        item
        size={12}
        sx={{
          border: `1px solid ${borderColors[mode]}`,
          ...padding.all.md,
          borderRadius: borderRadius.xxs,
          
        }}
      >
        <Form.CheckboxInput name="isEmailConfirmed" label={t('forms.emailConfirmed')} />
      </Grid>

      {/* Image */}
      <Grid item size={12}>
        <Form.ImageInput name="UserProfile" label={t('forms.profileImage')} />
      </Grid>
    </Grid>
  );
});

UserFields.propTypes = {
  showPassword: PropTypes.bool,
  showRole: PropTypes.bool,
  showClass: PropTypes.bool,
  roleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  classOptions: PropTypes.arrayOf(
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
