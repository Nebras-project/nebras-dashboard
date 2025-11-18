// external imports
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useTranslation } from '@hooks';
import { PageLayout, Loader } from '@components';

// internal imports
import { useStudent } from '../hooks';
import {
  StudentFormDialog,
  StudentProfileCard,
  StudentDetailsCard,
  StudentErrorState,
} from '../components';

function StudentPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { student, isLoading, isError } = useStudent({ id });

  if (isLoading) {
    return (
      <PageLayout title={t('students.studentDetails')}>
        <Loader />
      </PageLayout>
    );
  }

  if (isError || !student) {
    return (
      <PageLayout title={t('students.studentDetails')}>
        <StudentErrorState />
      </PageLayout>
    );
  }

  return (
    <StudentFormDialog showAddButton={false}>
      {({ onEdit }) => (
        <>
          <PageLayout title={t('students.studentDetails')} showBackButton={true}>
            <Grid container spacing={3} alignItems="stretch">
              {/* Profile Card */}
              <Grid item size={{ mobile: 12, desktop: 3 }}>
                <StudentProfileCard student={student} />
              </Grid>

              {/* Details Card */}
              <Grid item size={{ mobile: 12, desktop: 5 }}>
                <StudentDetailsCard student={student} onEdit={onEdit} />
              </Grid>
            </Grid>
          </PageLayout>
        </>
      )}
    </StudentFormDialog>
  );
}

export default StudentPage;
