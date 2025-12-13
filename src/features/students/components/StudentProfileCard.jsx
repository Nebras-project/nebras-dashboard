// external imports
import { Box, Typography, Chip } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Card, UserAvatar } from '@components';
import { padding, margin } from '@constants';
import { getStudentName, getStudentCurriculum, getStudentProfileImage } from '../utils';
import useTranslation from '@i18n/hooks/useTranslation';

/**
 * StudentProfileCard Component
 *
 * Single Responsibility: Display student profile information (avatar, name, curriculum)
 */
function StudentProfileCard({ student }) {
  const { t } = useTranslation();
  const studentName = getStudentName(student);
  const studentCurriculum = getStudentCurriculum(student);

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
          size="xlarge"
          sx={{ ...margin.bottom.md }}
        />
        <Typography variant="h5" fontWeight={600} sx={{ ...margin.bottom.xs }}>
          {studentName}
        </Typography>
        <Chip label={studentCurriculum} color="primary" size="small" />
      </Box>
    </Card>
  );
}

StudentProfileCard.propTypes = {
  student: PropTypes.object.isRequired,
};

export default StudentProfileCard;
