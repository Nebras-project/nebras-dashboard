// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';

// internal imports
import { PageLayout } from '@components';
import { padding } from '@constants';
import { FORM_DEFAULTS } from '../constants';
import { useFormSetup, useAutoFocusFirstField } from '../hooks';
import FormProvider from '../components/FormProvider';
import { borderRadius } from '@theme/components';

const getPaperStyles = (paddingValue, borderRadiusValue) => ({
  ...paddingValue.all.lg,
  borderRadius: borderRadiusValue.xs,
});

/**
 * FormPage Component
 *
 * Single Responsibility: Form container rendered as a Page with PageLayout
 */
const FormPage = memo(function FormPage({
  onSubmit,
  defaultValues = {},
  children,
  title,
  description,
  showCloseButton = FORM_DEFAULTS.SHOW_CLOSE_BUTTON,
  onClose,
  formProps = {},
  pageLayoutProps = {},
}) {
  // Setup form (React Hook Form, context, handlers)
  const { methods, formId, handleSubmit, contextValue } = useFormSetup({
    defaultValues,
    onSubmit,
    formProps,
    mode: 'page',
    title,
    showCloseButton,
    onClose,
  });

  // Auto-focus first field when page mounts
  useAutoFocusFirstField(true, formId);

  return (
    <FormProvider methods={methods} contextValue={contextValue}>
      <PageLayout title={title} description={description} {...pageLayoutProps}>
        <Paper elevation={0} sx={getPaperStyles(padding, borderRadius)}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} id={formId}>
            {children}
          </form>
        </Paper>
      </PageLayout>
    </FormProvider>
  );
});

FormPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  showCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
  formProps: PropTypes.object,
  pageLayoutProps: PropTypes.object,
};

FormPage.displayName = 'FormPage';

export default FormPage;
