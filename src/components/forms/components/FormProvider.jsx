// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { FormProvider as ReactHookFormProvider } from 'react-hook-form';

// internal imports
import { FormContext } from '../FormContext';

/**
 * FormProvider Component
 *
 * Single Responsibility: Wrap form with FormContext and React Hook Form Provider
 */
const FormProvider = memo(function FormProvider({ methods, contextValue, children }) {
  return (
    <FormContext.Provider value={contextValue}>
      <ReactHookFormProvider {...methods}>{children}</ReactHookFormProvider>
    </FormContext.Provider>
  );
});

FormProvider.propTypes = {
  methods: PropTypes.object.isRequired,
  contextValue: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

FormProvider.displayName = 'FormProvider';

export default FormProvider;
