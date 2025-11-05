// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { DialogContent, Box } from '@mui/material';

// internal imports
import { useFormContext } from '../hooks/useFormContext';
import { padding } from '@constants';

const getDialogContentStyles = (padding) => ({
  ...padding.x.lg,
  ...padding.top.md,
  ...padding.bottom.md,
});

const getPageContentStyles = (padding) => ({
  ...padding.y.md,
});

/**
 * Form.Content Component
 *
 * Single Responsibility: Display form content area
 */
const FormContent = memo(function FormContent({ children, ...props }) {
  const { mode } = useFormContext();

  if (mode === 'dialog') {
    return (
      <DialogContent sx={getDialogContentStyles(padding)} {...props}>
        {children}
      </DialogContent>
    );
  }

  // Page mode
  return (
    <Box sx={getPageContentStyles(padding)} {...props}>
      {children}
    </Box>
  );
});

FormContent.propTypes = {
  children: PropTypes.node.isRequired,
};

FormContent.displayName = 'Form.Content';

export default FormContent;
