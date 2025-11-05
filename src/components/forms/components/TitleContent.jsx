// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

// internal imports
import { gap } from '@constants';

const getTitleContainerStyles = (gap) => ({
  display: 'flex',
  alignItems: 'center',
  ...gap.md,
});

const getIconContainerStyles = () => ({
  display: 'flex',
  alignItems: 'center',
});

/**
 * TitleContent Component
 *
 * Single Responsibility: Render title content with icon
 */
const TitleContent = memo(function TitleContent({
  title,
  icon,
  variant = 'h6',
  component = 'span',
}) {
  return (
    <Box sx={getTitleContainerStyles(gap)}>
      {icon && <Box sx={getIconContainerStyles()}>{icon}</Box>}
      <Typography variant={variant} component={component}>
        {title}
      </Typography>
    </Box>
  );
});

TitleContent.propTypes = {
  title: PropTypes.node.isRequired,
  icon: PropTypes.node,
  variant: PropTypes.string,
  component: PropTypes.string,
};

TitleContent.displayName = 'TitleContent';

export default TitleContent;
