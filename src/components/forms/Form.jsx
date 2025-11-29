// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { FORM_DEFAULTS } from './constants';
import FormDialog from './layout/FormDialog';
import FormPage from './layout/FormPage';
import {
  TextInput,
  EmailInput,
  UsernameInput,
  PhoneInput,
  PasswordInput,
  ConfirmPasswordInput,
  SelectInput,
  CheckboxInput,
  RadioInput,
  DateInput,
  TimeInput,
  NumberInput,
} from './inputs';
import {
  FormTitle,
  FormContent,
  FormActions,
  FormSubmitButton,
  FormResetButton,
} from './components';

/**
 * Form Compound Component
 *
 * Single Responsibility: Wrapper component that renders FormDialog or FormPage based on mode.
 * Delegates implementation to specialized components.
 */

// Main Form Component - Single Responsibility: Route to appropriate form implementation
const Form = memo(function Form({
  mode = FORM_DEFAULTS.MODE, // 'dialog' | 'page'
  open, // Required when mode is 'dialog'
  onClose, // Required when mode is 'dialog'
  onSubmit,
  defaultValues = {},
  children,
  dialogMaxWidth = FORM_DEFAULTS.DIALOG_MAX_WIDTH,
  dialogMinWidth,
  dialogWidth,
  title,
  description,
  showCloseButton = FORM_DEFAULTS.SHOW_CLOSE_BUTTON,
  disableBackdropClick = FORM_DEFAULTS.DISABLE_BACKDROP_CLICK,
  formProps = {},
  pageLayoutProps = {},
  ...props
}) {
  // Render as Dialog
  if (mode === 'dialog') {
    return (
      <FormDialog
        open={open}
        onClose={onClose}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        dialogMaxWidth={dialogMaxWidth}
        dialogMinWidth={dialogMinWidth}
        dialogWidth={dialogWidth}
        title={title}
        showCloseButton={showCloseButton}
        disableBackdropClick={disableBackdropClick}
        formProps={formProps}
        {...props}
      >
        {children}
      </FormDialog>
    );
  }

  // Render as Page
  return (
    <FormPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      title={title}
      description={description}
      showCloseButton={showCloseButton}
      onClose={onClose}
      formProps={formProps}
      pageLayoutProps={pageLayoutProps}
    >
      {children}
    </FormPage>
  );
});

Form.propTypes = {
  mode: PropTypes.oneOf(['dialog', 'page']),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  children: PropTypes.node.isRequired,
  dialogMaxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  dialogMinWidth: PropTypes.string,
  dialogWidth: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  showCloseButton: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  formProps: PropTypes.object,
  pageLayoutProps: PropTypes.object,
};

// Attach sub-components to Form
Form.Title = FormTitle;
Form.Content = FormContent;
Form.Actions = FormActions;
Form.SubmitButton = FormSubmitButton;
Form.ResetButton = FormResetButton;
Form.TextInput = TextInput;
Form.EmailInput = EmailInput;
Form.UsernameInput = UsernameInput;
Form.PhoneInput = PhoneInput;
Form.PasswordInput = PasswordInput;
Form.ConfirmPasswordInput = ConfirmPasswordInput;
Form.SelectInput = SelectInput;
Form.CheckboxInput = CheckboxInput;
Form.RadioInput = RadioInput;
Form.DateInput = DateInput;
Form.TimeInput = TimeInput;
Form.NumberInput = NumberInput;

Form.displayName = 'Form';

export default Form;
