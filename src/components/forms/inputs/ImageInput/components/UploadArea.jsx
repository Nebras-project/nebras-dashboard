/**
 * UploadArea Component
 *
 * Single Responsibility: Display drag & drop upload area
 */

import { memo } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { gap } from '@constants';
import DragDropArea from './DragDropArea';
import HiddenFileInput from './HiddenFileInput';
import UploadIcon from './UploadIcon';
import UploadText from './UploadText';
import UploadButton from './UploadButton';

const UploadArea = memo(function UploadArea({
  label,
  maxSize,
  accept,
  hasError,
  isDragging,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  fileInputRef,
  onInputChange,
}) {
  return (
    <DragDropArea
      hasError={hasError}
      isDragging={isDragging}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      <HiddenFileInput fileInputRef={fileInputRef} accept={accept} onChange={onInputChange} />
      <Stack sx={{ ...gap.md }} alignItems="center">
        <UploadIcon />
        <UploadText label={label} maxSize={maxSize} />
        <UploadButton fileInputRef={fileInputRef} />
      </Stack>
    </DragDropArea>
  );
});

UploadArea.propTypes = {
  label: PropTypes.string,
  maxSize: PropTypes.number.isRequired,
  accept: PropTypes.string,
  hasError: PropTypes.bool,
  isDragging: PropTypes.bool.isRequired,
  onDragEnter: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

UploadArea.displayName = 'UploadArea';

export default UploadArea;
