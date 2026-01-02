// external imports
import { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, useTheme } from '@mui/material';

// internal imports
import { FORM_DEFAULTS } from '../constants';
import { useFormSetup, useAutoFocusFirstField } from '../hooks';
import FormProvider from '../components/FormProvider';
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
  dialogMinWidth,
  dialogWidth,
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

  const theme = useTheme();

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

  // Auto-focus first field when dialog opens
  useAutoFocusFirstField(open, formId);

  // Reset form when dialog opens (important for edit mode)
  useEffect(() => {
    if (open) {
      methods.reset(defaultValues);
    }
  }, [open, methods, defaultValues]);

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

  // Dialog styles with responsive width
  // Mobile: 100% width, Desktop: fixed width
  const finalWidth = dialogWidth || '600px';
  const finalMinWidth = dialogMinWidth || dialogWidth || '600px';
  const finalMaxWidth = dialogMaxWidth === false ? dialogWidth || '600px' : undefined;

  const dialogBG = theme.palette.background.default;

  const dialogSx = {
    '& .MuiDialog-paper': {
      // Mobile: 100% width with margins
      width: '100%',
      minWidth: 0,
      maxWidth: '100%',
      margin: theme.spacing(2),
      // Desktop: fixed width
      [theme.breakpoints.up('tablet')]: {
        width: finalWidth,
        minWidth: finalMinWidth,
        maxWidth: finalMaxWidth,
        margin: 'auto',
      },

      '& .MuiDialogTitle-root': {
        backgroundColor: dialogBG,
        color: theme.palette.primary.main,
      },
      '& .MuiDialogContent-root': {
        backgroundColor: dialogBG,
      },
      '& .MuiDialogActions-root': {
        backgroundColor: dialogBG,
      },
    },
  };

  return (
    <FormProvider methods={methods} contextValue={contextValue}>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        maxWidth={false}
        fullWidth
        sx={dialogSx}
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
  dialogMinWidth: PropTypes.string,
  dialogWidth: PropTypes.string,
  title: PropTypes.string,
  showCloseButton: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  formProps: PropTypes.object,
};

FormDialog.displayName = 'FormDialog';

export default FormDialog;
