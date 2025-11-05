// external imports
import { useContext } from 'react';

// internal imports
import { FormContext } from '../FormContext';

/**
 * Hook to access form context
 * 
 * Single Responsibility: Provide access to Form context
 */
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form sub-components must be used within Form component');
  }
  return context;
};
