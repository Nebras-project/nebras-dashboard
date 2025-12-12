/**
 * DragDropArea Component
 *
 * Single Responsibility: Paper wrapper with drag and drop handlers
 */

import { memo } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import { padding } from '@constants';

const DragDropArea = memo(function DragDropArea({
  children,
  hasError,
  isDragging,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  borderStyle = 'dashed',
}) {
  return (
    <Paper
      elevation={0}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
      sx={{
        border: `2px ${borderStyle}`,
        borderColor: isDragging ? 'primary.main' : hasError ? 'error.main' : 'divider',
        ...padding.all.lg,
        textAlign: 'center',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: onClick ? 'primary.main' : undefined,
        },
      }}
    >
      {children}
    </Paper>
  );
});

DragDropArea.propTypes = {
  children: PropTypes.node.isRequired,
  hasError: PropTypes.bool,
  isDragging: PropTypes.bool,
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func,
  onClick: PropTypes.func,
  borderStyle: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
  paddingSize: PropTypes.oneOf(['md', 'lg']),
};

DragDropArea.displayName = 'DragDropArea';

export default DragDropArea;
