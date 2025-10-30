import { Container } from '@mui/material';
import { useUser, useTranslation } from '@hooks';
import { PageLayout } from '@components';
import {
  OwnerDashboard,
  CurriculumDashboard,
  CompetitionDashboard,
  ContentDashboard,
} from '../components';

/**
 * Main Dashboard Page
 * Conditionally renders different dashboard components based on user role
 * Uses Container with maxWidth="xl" for optimal readability and layout
 * 
 * Route: /dashboard (single route for all roles)
 */
function DashboardPage() {
  const { role } = useUser();
  const { t } = useTranslation();

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
    <PageLayout title={t('navigation.dashboard')} description={t('dashboard.overview')} maxWidth="xl">
      <Container maxWidth="xl">
        {renderDashboard()}
      </Container>
    </PageLayout>
  );
}

export default DashboardPage;

