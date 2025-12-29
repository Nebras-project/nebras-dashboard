// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Card, UserAvatar } from '@components';
import { padding, margin } from '@constants';
import { getStudentName, getStudentProfileImage } from '../utils';

/**
 * StudentProfileCard Component
 *
 * Single Responsibility: Display student profile information (avatar, name, grade)
 */
function StudentProfileCard({ student }) {
  const studentName = getStudentName(student);

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
            name: studentName,
            profileImage: getStudentProfileImage(student),
          }}
          size={200}
          sx={{ ...margin.bottom.md }}
        />
      </Box>
    </Card>
  );
}

StudentProfileCard.propTypes = {
  student: PropTypes.object.isRequired,
};

export default StudentProfileCard;
