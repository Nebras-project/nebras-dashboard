// external imports
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

// internal imports
import { margin } from '@constants';
import { fontWeights } from '@theme';
import { useResponsive } from '@hooks';
import { BackButton } from '@components';

function PageHeader({ title, description, showBackButton = false }) {
  const { isSmallScreen } = useResponsive();

  return (
    <>
      {showBackButton && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BackButton />
        </Box>
      )}
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
            variant={isSmallScreen ? 'body2' : 'body1'}
            color="text.secondary"
            sx={{ maxWidth: 700, lineHeight: 1.7 }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  maxWidth: PropTypes.oneOf(['mobile', 'tablet', 'desktop', 'widescreen']),
  showBackButton: PropTypes.bool,
};

export default PageHeader;
