// external imports
import { useParams } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';

// internal imports
import { PageLayout, Loader, Message } from '@components';
import { useTranslation } from '@hooks';

/**
 * LessonPage Component
 *
 * Single Responsibility: Display lesson details page within curriculum/subject/unit context
 */
function LessonPage() {
  const { t } = useTranslation();
  const { curriculumId, subjectId, unitId, lessonId } = useParams();

  // TODO: Implement lesson data fetching
  const isLoading = false;
  const lesson = null;

  if (isLoading) {
    return (
      <PageLayout title={t('curriculum.lessonDetails')} showBackButton>
        <Loader />
      </PageLayout>
    );
  }

  if (!lesson) {
    return (
      <PageLayout title={t('curriculum.lessonDetails')} showBackButton>
        <Message
          title={t('curriculum.lessonNotFound')}
          content={t('curriculum.lessonNotFoundDescription')}
          icon="error"
          variant="error"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={t('curriculum.viewLesson')}
      description={`Curriculum: ${curriculumId}, Subject: ${subjectId}, Unit: ${unitId}, Lesson: ${lessonId}`}
      showBackButton
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Lesson page content coming soon
          </Typography>
          <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
            Curriculum ID: {curriculumId}, Subject ID: {subjectId}, Unit ID: {unitId}, Lesson ID:{' '}
            {lessonId}
          </Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default LessonPage;

