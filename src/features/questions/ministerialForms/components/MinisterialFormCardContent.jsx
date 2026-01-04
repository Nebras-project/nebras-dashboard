// external imports
import { Box, Stack, Chip } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { margin } from '@constants';
import { Icon } from '@components';
import MinisterialFormCardTitle from './MinisterialFormCardTitle';

/**
 * MinisterialFormCardContent Component
 *
 * Single Responsibility: Display ministerial form information (form number, year, grade name, subject name)
 */
function MinisterialFormCardContent({ formNumber, year, gradeName, subjectName }) {
  return (
    <Box>
      <Icon name="fileList" size={80} />

      <MinisterialFormCardTitle formNumber={formNumber} year={year} />

      <Stack direction="row" spacing={1} justifyContent="center" sx={{ ...margin.top.md }}>
        {gradeName && <Chip label={gradeName} size="small" variant="outlined" />}

        {subjectName && <Chip label={subjectName} size="small" variant="outlined" />}
      </Stack>
    </Box>
  );
}

MinisterialFormCardContent.propTypes = {
  formNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  gradeName: PropTypes.string,
  subjectName: PropTypes.string,
};

export default MinisterialFormCardContent;
