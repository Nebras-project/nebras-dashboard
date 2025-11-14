import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import { UserAvatar } from '@components';

/**
 * Profile avatar component for table cells
 * Wraps UserAvatar with centering for table cells
 */
function TableProfileAvatar({ user, size = 36, fallback, ...rest }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <UserAvatar user={user} size={size} fallback={fallback} {...rest} />
    </Box>
  );
}

TableProfileAvatar.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      profileImage: PropTypes.string,
      image: PropTypes.string,
    }),
  ]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    PropTypes.number,
    PropTypes.object,
  ]),
  fallback: PropTypes.string,
};

export default TableProfileAvatar;
