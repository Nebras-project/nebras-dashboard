import PropTypes from 'prop-types';
import { Box, Container, Typography } from '@mui/material';
import PageDateTime from './PageDateTime';

function PageHeader({ title, description, maxWidth }) {
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 4,  mb: 4 }}>
      <Container maxWidth={maxWidth}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: { mobile: '100%', tablet: 300 } }}>
            <Typography variant="h3" component="h1" color="primary" gutterBottom fontWeight="600" sx={{ mb: 2 }}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.7 }}>
                {description}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: { mobile: 'none', tablet: 'block' } }}>
            <PageDateTime align="right" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
};

export default PageHeader;


