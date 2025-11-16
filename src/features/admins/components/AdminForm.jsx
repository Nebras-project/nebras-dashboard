// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { Form, UserFields } from '@components';
import { useTranslation } from '@hooks';
import { useAdminForm } from '../hooks';

/**
 * AdminForm Component
 *
 * Single Responsibility: Form for creating/editing admin users
 * Uses existing Form component and UserFields group without duplication
 */
const AdminForm = memo(function AdminForm({
  mode = 'dialog',
  open,
  onClose,
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
}) {
  const { t } = useTranslation();
  const { roleOptions, formDefaultValues, handleSubmit, isLoading } = useAdminForm({
    defaultValues,
    isEdit,
    onSuccess: (data, action) => {
      onSuccess?.(data, action);
      onClose?.();
    },
    onError,
  });

  return (
    <Form
      mode={mode}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      defaultValues={formDefaultValues}
      dialogWidth="700px"
      dialogMinWidth="700px"
      dialogMaxWidth={false}
    >
      <Form.Title title={isEdit ? t('admins.editAdmin') : t('admins.addAdmin')} />
      <Form.Content>
        <UserFields
          showPassword={!isEdit}
          showRole
          showProfileImage
          roleOptions={roleOptions}
          isEdit={isEdit}
        />
      </Form.Content>
      <Form.Actions>
        <Form.ResetButton onClick={onClose}>{t('common.cancel')}</Form.ResetButton>
        <Form.SubmitButton loading={isLoading}>
          {isEdit ? t('common.update') : t('common.create')}
        </Form.SubmitButton>
      </Form.Actions>
    </Form>
  );
});

AdminForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

AdminForm.displayName = 'AdminForm';

export default AdminForm;
