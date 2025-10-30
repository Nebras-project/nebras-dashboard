import PropTypes from 'prop-types';
import { Box, Container } from '@mui/material';
import PageHeader from './pagelayout/PageHeader';

function PageLayout({ title, description, children, maxWidth = "lg" }) {
  return (
      <Container maxWidth={maxWidth} sx={{ pb: 6, px: { mobil: 2, tablet: 3 } }}>
      <PageHeader title={title} description={description} maxWidth={maxWidth} />
    <Box>
        {children}
    </Box>
      </Container>
  );
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

export default PageLayout;


