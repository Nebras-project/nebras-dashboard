/**
 * UploadButton Component
 *
 * Single Responsibility: Display choose file button
 */

import { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { MdCloudUpload } from 'react-icons/md';
import { useTranslation } from '@hooks';

const UploadButton = memo(function UploadButton({ fileInputRef, onClick }) {
  const { t } = useTranslation();

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <Button
      variant="contained"
      component="span"
      startIcon={<MdCloudUpload />}
      onClick={handleClick}
    >
      {t('forms.chooseFile')}
    </Button>
  );
});

UploadButton.propTypes = {
  fileInputRef: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

UploadButton.displayName = 'UploadButton';

export default UploadButton;
