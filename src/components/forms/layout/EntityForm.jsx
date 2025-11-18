// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import Form from '../Form';
import { useTranslation } from '@hooks';

/**
 * EntityForm
 *
 * Generic form wrapper for entities (admins, students, levels, subjects, ...).
 * It delegates:
 * - form logic to a passed hook (useFormHook)
 * - fields rendering to renderFields
 * - actions rendering to renderActions
 *
 * This keeps AdminForm / StudentForm / LevelForm very thin and avoids duplication.
 */
const EntityForm = memo(function EntityForm({
  mode = 'dialog',
  open,
  onClose,
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
  titleAdd,
  titleEdit,
  useFormHook,
  renderFields,
  renderActions,
  cancelLabel,
  submitLabelCreate,
  submitLabelUpdate,
}) {
  const { formDefaultValues, handleSubmit, isLoading, ...hookRest } = useFormHook({
    defaultValues,
    isEdit,
    onSuccess: (data, action) => {
      onSuccess?.(data, action);
      onClose?.(); // Close dialog after successful create/update
    },
    onError,
  });

  const { t } = useTranslation();
  const cancelLabelText = cancelLabel ? t(cancelLabel) : t('common.cancel');
  const submitLabelCreateText = submitLabelCreate ? t(submitLabelCreate) : t('common.create');
  const submitLabelUpdateText = submitLabelUpdate ? t(submitLabelUpdate) : t('common.update');

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
      <Form.Title title={isEdit ? titleEdit : titleAdd} />
      <Form.Content>{renderFields({ isEdit, ...hookRest })}</Form.Content>
      <Form.Actions>
        {renderActions ? (
          renderActions({ isEdit, isLoading, onClose })
        ) : (
          <>
            <Form.ResetButton onClick={onClose}>{cancelLabelText}</Form.ResetButton>
            <Form.SubmitButton loading={isLoading}>
              {isEdit ? submitLabelUpdateText : submitLabelCreateText}
            </Form.SubmitButton>
          </>
        )}
      </Form.Actions>
    </Form>
  );
});

EntityForm.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  titleAdd: PropTypes.string.isRequired,
  titleEdit: PropTypes.string.isRequired,
  useFormHook: PropTypes.func.isRequired,
  renderFields: PropTypes.func.isRequired,
  renderActions: PropTypes.func,
  cancelLabel: PropTypes.string,
  submitLabelCreate: PropTypes.string,
  submitLabelUpdate: PropTypes.string,
};

EntityForm.displayName = 'EntityForm';

export default EntityForm;

