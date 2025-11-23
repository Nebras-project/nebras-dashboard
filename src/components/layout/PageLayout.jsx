// external imports
import PropTypes from 'prop-types';
import { Box, Container } from '@mui/material';

// internal imports
import { PageHeader } from '@components';
import { padding } from '@constants';

function PageLayout({
  title,
  description,
  children,
  maxWidth = 'widescreen',
  showBackButton = false,
}) {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{ ...padding.y.xl, mobile: { ...padding.x.md }, desktop: { ...padding.x.lg } }}
    >
      {(title || description) && (
        <PageHeader title={title} description={description} showBackButton={showBackButton} />
      )}
      <Box>{children}</Box>
    </Container>
  );
}

PageLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOf(['mobile', 'tablet', 'desktop', 'widescreen']),
  showBackButton: PropTypes.bool,
};

export default PageLayout;
