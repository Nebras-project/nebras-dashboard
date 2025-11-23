// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { Icon, Message } from '@components';
import { padding, margin } from '@constants';

const getEmptyStateContainerStyles = (sx) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  ...padding.y.xxxl,
  ...padding.x.md,
  ...sx,
});

const getIconStyles = () => ({
  ...margin.bottom.lg,
  color: 'text.secondary',
  opacity: 0.6,
});

/**
 * EmptyState Component
 *
 * Single Responsibility: Display empty state with icon, title, and description
 * Used when there's no data to display
 */
const EmptyState = memo(function EmptyState({
  icon = 'info',
  iconSize = 80,
  title,
  description,
  content,
  sx,
  ...boxProps
}) {
  const messageContent = content ?? description;

  return (
    <Box sx={getEmptyStateContainerStyles(sx)} {...boxProps}>
      <Icon name={icon} size={iconSize} sx={getIconStyles()} />
      <Message title={title} content={messageContent} />
    </Box>
  );
});

EmptyState.propTypes = {
  /** Icon name to display */
  icon: PropTypes.string,
  /** Icon size in pixels */
  iconSize: PropTypes.number,
  /** Title text */
  title: PropTypes.string,
  /** Description text (alias for content) */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Content text */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Style overrides */
  sx: PropTypes.object,
};

EmptyState.displayName = 'EmptyState';

export default EmptyState;
