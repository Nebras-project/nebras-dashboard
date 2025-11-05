// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { DialogTitle, Box } from '@mui/material';

// internal imports
import { useFormContext } from '../hooks/useFormContext';
import { padding, margin } from '@constants';
import TitleContent from './TitleContent';
import TitleCloseButton from './TitleCloseButton';
import { borderWidth } from '@theme/components';

const getDialogTitleStyles = (padding) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  ...padding.x.lg,
  ...padding.top.lg,
  ...padding.bottom.md,
  position: 'relative',
});

const getPageTitleStyles = (margin, padding, borderWidth) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  ...margin.bottom.lg,
  ...padding.bottom.md,
  borderBottom: borderWidth.xs,
  borderColor: 'divider',
});

/**
 * Form.Title Component
 *
 * Single Responsibility: Display form title
 */
const FormTitle = memo(function FormTitle({ children, title, icon, ...props }) {
  const { mode, formId, showCloseButton, onClose, title: contextTitle } = useFormContext();
  const displayTitle = title || contextTitle || children;

  if (mode === 'dialog') {
    return (
      <DialogTitle id={`${formId}-title`} sx={getDialogTitleStyles(padding)} {...props}>
        <TitleContent title={displayTitle} icon={icon} variant="h6" component="span" />
        {showCloseButton && <TitleCloseButton onClose={onClose} size="small" absolute />}
      </DialogTitle>
    );
  }

  // Page mode - Title handled by PageLayout, but can show additional header if needed
  if (!displayTitle) return null;

  return (
    <Box sx={getPageTitleStyles(margin, padding, borderWidth)} {...props}>
      <TitleContent title={displayTitle} icon={icon} variant="h5" component="h1" />
      {showCloseButton && <TitleCloseButton onClose={onClose} size="medium" />}
    </Box>
  );
});

FormTitle.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  icon: PropTypes.node,
};

FormTitle.displayName = 'Form.Title';

export default FormTitle;
