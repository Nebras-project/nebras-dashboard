// external imports
import { useParams } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';

// internal imports
import { PageLayout, Loader, Message } from '@components';
import { useTranslation } from '@hooks';

/**
 * SubjectPage Component
 *
 * Single Responsibility: Display subject details page within grade context
 */
function SubjectPage() {
  const { t } = useTranslation();
  const { gradeId, subjectId } = useParams();

  // TODO: Implement subject data fetching
  const isLoading = false;
  const subject = null;

  if (isLoading) {
    return (
      <PageLayout title={t('grade.viewSubject')} showBackButton>
        <Loader />
      </PageLayout>
    );
  }

  if (!subject) {
    return (
      <PageLayout title={t('grade.viewSubject')} showBackButton>
        <Message
          title={t('grade.viewSubject')}
          content={`Subject not found`}
          icon="error"
          variant="error"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={t('grade.viewSubject')}
      description={`Grade: ${gradeId}, Subject: ${subjectId}`}
      showBackButton
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Subject page content coming soon
          </Typography>
          <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
            Grade ID: {gradeId}, Subject ID: {subjectId}
          </Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default SubjectPage;
