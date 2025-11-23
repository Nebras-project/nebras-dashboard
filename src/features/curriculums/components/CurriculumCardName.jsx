// external imports
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { fontWeights } from '@theme/typography';
import { margin } from '@constants';

/**
 * CurriculumCardName Component
 *
 * Single Responsibility: Display curriculum name in card format
 */
function CurriculumCardName({ name }) {
  return (
    <Typography
      variant="h6"
      fontWeight={fontWeights.semiBold}
      sx={{
        ...margin.bottom.md,
      }}
      noWrap
    >
      {name}
    </Typography>
  );
}

CurriculumCardName.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CurriculumCardName;
