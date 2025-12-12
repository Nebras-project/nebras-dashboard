/**
 * UploadIcon Component
 *
 * Single Responsibility: Display upload icon
 */

import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { MdImage } from 'react-icons/md';
import { Icon } from '@components';

const UploadIcon = memo(function UploadIcon({ size = 48 }) {
  return (
    <Box sx={{ color: 'text.secondary' }}>
      <Icon component={MdImage} size={size} />
    </Box>
  );
});

UploadIcon.propTypes = {
  size: PropTypes.number,
};

UploadIcon.displayName = 'UploadIcon';

export default UploadIcon;
