// external imports
import { useParams } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';

// internal imports
import { PageLayout, Loader, Message } from '@components';
import { useTranslation } from '@hooks';

/**
 * UnitPage Component
 *
 * Single Responsibility: Display unit details page within curriculum/subject context
 */
function UnitPage() {
  const { t } = useTranslation();
  const { curriculumId, subjectId, unitId } = useParams();

  // TODO: Implement unit data fetching
  const isLoading = false;
  const unit = null;

  if (isLoading) {
    return (
      <PageLayout title={t('curriculum.unitDetails')} showBackButton>
        <Loader />
      </PageLayout>
    );
  }

  if (!unit) {
    return (
      <PageLayout title={t('curriculum.unitDetails')} showBackButton>
        <Message
          title={t('curriculum.unitNotFound')}
          content={t('curriculum.unitNotFoundDescription')}
          icon="error"
          variant="error"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={t('curriculum.viewUnit')}
      description={`Curriculum: ${curriculumId}, Subject: ${subjectId}, Unit: ${unitId}`}
      showBackButton
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Unit page content coming soon
          </Typography>
          <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
            Curriculum ID: {curriculumId}, Subject ID: {subjectId}, Unit ID: {unitId}
          </Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default UnitPage;

