import { Container } from '@mui/material';
import { useUser } from '@hooks';
import {
  OwnerDashboard,
  CurriculumDashboard,
  CompetitionDashboard,
  ContentDashboard,
} from '../components';
import { spacing } from '@theme';

/**
 * Main Dashboard Page
 * Conditionally renders different dashboard components based on user role
 * Uses Container with maxWidth="xl" for optimal readability and layout
 * 
 * Route: /dashboard (single route for all roles)
 */
function DashboardPage() {
  const { role } = useUser();

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
    <Container maxWidth="xl" sx={{ p: spacing.xs }}>
      {renderDashboard()}
    </Container>
  );
}

export default DashboardPage;

