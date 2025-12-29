// external imports
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// internal imports
import { Card, DetailField, DeleteAction, ActionsMenu } from '@components';
import Icon from '@components/display/Icon';
import { useTranslation } from '@i18n/hooks/useTranslation';
import { NAVIGATION_PATHS } from '@config';
import { getStudentName, getStudentEmail, getStudentPhone, getStudentGrade } from '../utils';
import { useDeleteStudent } from '../hooks';

/**
 * StudentDetailsCard Component
 *
 * Single Responsibility: Display student detailed information (name, email, phone, grade)
 */
function StudentDetailsCard({ student, onEdit }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteStudent } = useDeleteStudent({
    onSuccess: () => navigate(NAVIGATION_PATHS.STUDENTS.BASE),
  });

  const studentName = getStudentName(student);
  const studentEmail = getStudentEmail(student);
  const studentPhone = getStudentPhone(student);
  const studentGrade = getStudentGrade(student);

  const actions = [
    {
      label: t('students.editStudent'),
      icon: <Icon name="edit" size={20} />,
      onClick: () => onEdit(student),
    },
    <DeleteAction
      key="delete"
      row={student}
      deleteFn={deleteStudent}
      getItemName={(item) => getStudentName(item)}
      entityName="students"
      label={t('students.deleteStudent')}
    />,
  ];

  return (
    <Card
      title={t('students.personalInformation')}
      action={<ActionsMenu actions={actions} />}
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
