// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { DialogActions, Box } from '@mui/material';

// internal imports
import { useFormContext } from '../hooks/useFormContext';
import { padding, gap } from '@constants';
import { borderWidth } from '@theme/components';

const getDialogActionsStyles = (padding) => ({
  ...padding.x.lg,
  ...padding.y.md,
});

const getPageActionsStyles = (padding, gap) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  ...gap.sm,
  ...padding.top.lg,
  ...padding.bottom.md,
});

/**
 * Form.Actions Component
 *
 * Single Responsibility: Display form action buttons
 */
const FormActions = memo(function FormActions({ children, ...props }) {
  const { mode } = useFormContext();

  if (mode === 'dialog') {
    return (
      <DialogActions sx={getDialogActionsStyles(padding, gap)} {...props}>
        {children}
      </DialogActions>
    );
  }

  // Page mode
  return (
    <Box sx={getPageActionsStyles(padding, gap, borderWidth)} {...props}>
      {children}
    </Box>
  );
});

FormActions.propTypes = {
  children: PropTypes.node.isRequired,
};

FormActions.displayName = 'Form.Actions';

export default FormActions;
