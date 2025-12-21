// external imports
import { Box} from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Card, UserAvatar } from '@components';
import { padding, margin } from '@constants';
import { getManagerName, getManagerProfileImage } from '../utils';


/**
 * ManagerProfileCard Component
 *
 * Single Responsibility: Display manager profile information (avatar, name, role)
 */
function ManagerProfileCard({ manager }) {
  const managerName = getManagerName(manager);

  return (
    <Card sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          ...padding.all.lg,
          height: '100%',
        }}
      >
        <UserAvatar
          user={{
            name: managerName,
            profileImage: getManagerProfileImage(manager),
          }}
          size={200}
          sx={{ ...margin.bottom.md }}
        />
       
      </Box>
    </Card>
  );
}

ManagerProfileCard.propTypes = {
  manager: PropTypes.object.isRequired,
};

export default ManagerProfileCard;
