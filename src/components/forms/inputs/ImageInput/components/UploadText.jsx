/**
 * UploadText Component
 *
 * Single Responsibility: Display upload area text content
 */

import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useTranslation } from '@hooks';
import { bytesToMB } from '../utils/fileHelpers';

const UploadText = memo(function UploadText({ label, maxSize }) {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        {label || t('forms.uploadImage')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t('forms.dragDropImage')}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {t('forms.maxSize', { size: bytesToMB(maxSize) })}
      </Typography>
    </Box>
  );
});

UploadText.propTypes = {
  label: PropTypes.string,
  maxSize: PropTypes.number.isRequired,
};

UploadText.displayName = 'UploadText';

export default UploadText;
