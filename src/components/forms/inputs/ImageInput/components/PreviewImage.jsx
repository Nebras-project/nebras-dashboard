/**
 * PreviewImage Component
 *
 * Single Responsibility: Display preview image
 */

import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const PreviewImage = memo(function PreviewImage({ preview, alt = 'Preview' }) {
  return (
    <Box
      component="img"
      src={preview}
      alt={alt}
      sx={{
        maxWidth: '100%',
        maxHeight: 300,
        objectFit: 'contain',
        borderRadius: 1,
      }}
    />
  );
});

PreviewImage.propTypes = {
  preview: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

PreviewImage.displayName = 'PreviewImage';

export default PreviewImage;
