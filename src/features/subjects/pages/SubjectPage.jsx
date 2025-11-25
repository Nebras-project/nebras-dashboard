// external imports
import { useParams } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';

// internal imports
import { PageLayout, Loader, Message } from '@components';
import { useTranslation } from '@hooks';

/**
 * SubjectPage Component
 *
 * Single Responsibility: Display subject details page within curriculum context
 */
function SubjectPage() {
  const { t } = useTranslation();
  const { curriculumId, subjectId } = useParams();

  // TODO: Implement subject data fetching
  const isLoading = false;
  const subject = null;

  if (isLoading) {
    return (
      <PageLayout title={t('curriculum.subjectDetails')} showBackButton>
        <Loader />
      </PageLayout>
    );
  }

  if (!subject) {
    return (
      <PageLayout title={t('curriculum.subjectDetails')} showBackButton>
        <Message
          title={t('curriculum.subjectNotFound')}
          content={t('curriculum.subjectNotFoundDescription')}
          icon="error"
          variant="error"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={t('curriculum.viewSubject')}
      description={`Curriculum: ${curriculumId}, Subject: ${subjectId}`}
      showBackButton
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Subject page content coming soon
          </Typography>
          <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
            Curriculum ID: {curriculumId}, Subject ID: {subjectId}
          </Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default SubjectPage;
