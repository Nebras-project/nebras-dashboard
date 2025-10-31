// external imports
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

// internal imports
import { margin } from '@constants';
import { fontWeights } from '@theme';
import { useSidebar } from '@hooks';

function PageHeader({ title, description }) {
  const { isMobile } = useSidebar();

  return (
    <Box sx={{ ...margin.bottom.xxl }}>
      <Typography
        variant="h2"
        component="h2"
        color="primary"
        gutterBottom
        fontWeight={fontWeights.semiBold}
        sx={{ ...margin.bottom.sm }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant={isMobile ? 'body2' : 'body1'}
          color="text.secondary"
          sx={{ maxWidth: 700, lineHeight: 1.7 }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  maxWidth: PropTypes.oneOf(['mobile', 'tablet', 'desktop', 'widescreen']),
};

export default PageHeader;
