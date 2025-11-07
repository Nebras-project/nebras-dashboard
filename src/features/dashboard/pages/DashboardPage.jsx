import { useState } from 'react';
import { Container, Fab, Box } from '@mui/material';
import { useAuth, useTranslation } from '@hooks';
import { PageLayout, Loader, Icon } from '@components';
import {
  OwnerDashboard,
  CurriculumDashboard,
  CompetitionDashboard,
  ContentDashboard,
} from '../components';

function DashboardPage() {
  const { role } = useAuth();
  const { t } = useTranslation();

  // Temporary state for testing Loader
  const [showLoader, setShowLoader] = useState(false);

  // Render appropriate dashboard based on role
  const renderDashboard = () => {
    switch (role) {
      case 'owner':
      case 'general_admin':
        return <OwnerDashboard />;

      case 'curriculum_manager':
        return <CurriculumDashboard />;

      case 'competition_manager':
        return <CompetitionDashboard />;

      case 'content_manager':
        return <ContentDashboard />;

      default:
        // Fallback: show owner dashboard for undefined roles
        return <OwnerDashboard />;
    }
  };

  return (
    <>
      <PageLayout
        title={t('navigation.dashboard')}
        description={t('dashboard.overview')}
        maxWidth="xl"
      >
        <Container maxWidth="xl">{renderDashboard()}</Container>
      </PageLayout>

      {/* Temporary: Test Loader Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Fab
          color="secondary"
          variant="extended"
          onClick={() => {
            setShowLoader(true);
            setTimeout(() => setShowLoader(false), 3000);
          }}
          sx={{
            textTransform: 'none',
            gap: 1,
            px: 3,
          }}
        >
          <Icon name="visibility" size={20} />
          Test Loader
        </Fab>
      </Box>

      {/* Loader Component - Full Screen */}
      <Loader variant="fullscreen" open={showLoader} message="Processing your request..." />
    </>
  );
}

export default DashboardPage;
