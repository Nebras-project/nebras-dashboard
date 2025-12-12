/**
 * PreviewActions Component
 *
 * Single Responsibility: Display replace and remove action buttons
 */

import { memo } from 'react';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { useTranslation } from '@hooks';

const PreviewActions = memo(function PreviewActions({ onReplace, onRemove }) {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={1}>
      <Button variant="outlined" size="small" startIcon={<MdCloudUpload />} onClick={onReplace}>
        {t('forms.replace')}
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        startIcon={<MdDelete />}
        onClick={onRemove}
      >
        {t('forms.remove')}
      </Button>
    </Stack>
  );
});

PreviewActions.propTypes = {
  onReplace: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

PreviewActions.displayName = 'PreviewActions';

export default PreviewActions;
