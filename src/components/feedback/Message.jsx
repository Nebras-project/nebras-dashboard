// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

/**
 * Message Component
 *
 * Single Responsibility: Display a regular message with an optional title and content
 */
const Message = memo(function Message({
  title,
  content,
  message, // alias for content to support existing usages
  sx,
  ...boxProps
}) {
  const body = content ?? message;

  return (
    <Box sx={sx} {...boxProps}>
      {title ? (
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: body ? 0.5 : 0 }}>
          {title}
        </Typography>
      ) : null}
      {body ? (
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      ) : null}
    </Box>
  );
});

Message.propTypes = {
  /** Title text to display at the top of the message */
  title: PropTypes.string,
  /** Main content of the message */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Alias for content to maintain compatibility */
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Style overrides */
  sx: PropTypes.object,
};

Message.displayName = 'Message';

export default Message;
