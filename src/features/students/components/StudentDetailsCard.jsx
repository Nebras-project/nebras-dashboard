// external imports
import { Grid, IconButton } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Card, DetailField } from '@components';
import Icon from '@components/display/Icon';
import { useTranslation } from '@i18n/hooks/useTranslation';
import { getStudentName, getStudentEmail, getStudentPhone, getStudentGrade } from '../utils';

/**
 * StudentDetailsCard Component
 *
 * Single Responsibility: Display student detailed information (name, email, phone, grade)
 */
function StudentDetailsCard({ student, onEdit }) {
  const { t } = useTranslation();

  const studentName = getStudentName(student);
  const studentEmail = getStudentEmail(student);
  const studentPhone = getStudentPhone(student);
  const studentGrade = getStudentGrade(student);

  return (
    <Card
      title={t('students.personalInformation')}
      action={
        <IconButton
          onClick={() => onEdit(student)}
          size="small"
          sx={{ color: 'primary.main' }}
          aria-label={t('students.editStudent')}
        >
          <Icon name="edit" size={20} />
        </IconButton>
      }
      sx={{ height: '100%' }}
    >
      <Grid container spacing={2}>
        <DetailField mobile={6} label={t('students.studentName')} value={studentName} />
        <DetailField mobile={6} label={t('students.studentEmail')} value={studentEmail} />
        <DetailField mobile={6} label={t('students.studentPhone')} value={studentPhone} />
        <DetailField mobile={6} label={t('students.grade')} value={studentGrade} />
      </Grid>
    </Card>
  );
}

StudentDetailsCard.propTypes = {
  student: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default StudentDetailsCard;
