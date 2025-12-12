/**
 * ImagePreview Component
 *
 * Single Responsibility: Display image preview with replace/remove actions
 */

import { memo } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import DragDropArea from './DragDropArea';
import HiddenFileInput from './HiddenFileInput';
import PreviewImage from './PreviewImage';
import PreviewActions from './PreviewActions';

const ImagePreview = memo(function ImagePreview({
  preview,
  hasError,
  onReplace,
  onRemove,
  accept,
  fileInputRef,
  onInputChange,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
}) {
  return (
    <DragDropArea
      hasError={hasError}
      isDragging={false}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      borderStyle="solid"
      paddingSize="md"
    >
      <HiddenFileInput fileInputRef={fileInputRef} accept={accept} onChange={onInputChange} />
      <Stack alignItems="center" spacing={3}>
        <PreviewImage preview={preview} />
        <PreviewActions onReplace={onReplace} onRemove={onRemove} />
      </Stack>
    </DragDropArea>
  );
});

ImagePreview.propTypes = {
  preview: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  onReplace: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  accept: PropTypes.string,
  fileInputRef: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func,
};

ImagePreview.displayName = 'ImagePreview';

export default ImagePreview;
