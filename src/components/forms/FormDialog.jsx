// external imports
import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';

// internal imports
import { FORM_DEFAULTS } from './constants';
import { useFormSetup } from './hooks';
import FormProvider from './components/FormProvider';

/**
 * FormDialog Component
 *
 * Single Responsibility: Form container rendered as a Dialog
 */
const FormDialog = memo(function FormDialog({
  open,
  onClose,
  onSubmit,
  defaultValues = {},
  children,
  dialogMaxWidth = FORM_DEFAULTS.DIALOG_MAX_WIDTH,
  title,
  showCloseButton = FORM_DEFAULTS.SHOW_CLOSE_BUTTON,
  disableBackdropClick = FORM_DEFAULTS.DISABLE_BACKDROP_CLICK,
  formProps = {},
  ...props
}) {
  // Validate required props
  if (open === undefined || !onClose) {
    throw new Error('FormDialog requires "open" and "onClose" props');
  }

  // Setup form (React Hook Form, context, handlers)
  const { methods, formId, handleSubmit, contextValue } = useFormSetup({
    defaultValues,
    onSubmit,
    formProps,
    mode: 'dialog',
    title,
    showCloseButton,
    onClose,
  });

  const handleDialogClose = useCallback(
    (event, reason) => {
      if (disableBackdropClick && reason === 'backdropClick') {
        return;
      }
      if (reason !== 'backdropClick') {
        onClose?.(event, reason);
      }
    },
    [onClose, disableBackdropClick]
  );

  return (
    <FormProvider methods={methods} contextValue={contextValue}>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        maxWidth={dialogMaxWidth}
        fullWidth
        aria-labelledby={`${formId}-title`}
        aria-describedby={`${formId}-description`}
        {...props}
      >
        <form onSubmit={methods.handleSubmit(handleSubmit)} id={formId}>
          {children}
        </form>
      </Dialog>
    </FormProvider>
  );
});

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  children: PropTypes.node.isRequired,
  dialogMaxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  title: PropTypes.string,
  showCloseButton: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  formProps: PropTypes.object,
};

FormDialog.displayName = 'FormDialog';

export default FormDialog;
