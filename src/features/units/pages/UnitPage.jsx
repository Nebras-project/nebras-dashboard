// external imports
import { useParams } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';

// internal imports
import { PageLayout, Loader, Message } from '@components';
import { useTranslation } from '@hooks';

/**
 * UnitPage Component
 *
 * Single Responsibility: Display unit details page within grade/subject context
 */
function UnitPage() {
  const { t } = useTranslation();
  const { gradeId, subjectId, unitId } = useParams();

  // TODO: Implement unit data fetching
  const isLoading = false;
  const unit = null;

  if (isLoading) {
    return (
      <PageLayout title={t('grade.viewUnit')} showBackButton>
        <Loader />
      </PageLayout>
    );
  }

  if (!unit) {
    return (
      <PageLayout title={t('grade.viewUnit')} showBackButton>
        <Message
          title={t('grade.viewUnit')}
          content={`Unit not found`}
          icon="error"
          variant="error"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={t('grade.viewUnit')}
      description={`Grade: ${gradeId}, Subject: ${subjectId}, Unit: ${unitId}`}
      showBackButton
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Unit page content coming soon
          </Typography>
          <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
            Grade ID: {gradeId}, Subject ID: {subjectId}, Unit ID: {unitId}
          </Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default UnitPage;
