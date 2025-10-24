import { Box, Card, CardContent, Typography } from '@mui/material';
import { useUser } from '../../../hooks/useUser';
import OwnerDashboard from '../components/OwnerDashboard';
import CurriculumDashboard from '../components/CurriculumDashboard';
import CompetitionDashboard from '../components/CompetitionDashboard';
import ContentDashboard from '../components/ContentDashboard';
import { spacing } from '../../../theme';
import { borderRadius } from '../../../theme/components';

/**
 * Main Dashboard Page
 * Conditionally renders different dashboard components based on user role
 * Lives in the 8-column main content area of MainLayout Grid
 * 
 * Route: /dashboard (single route for all roles)
 */
function DashboardPage() {
  const { role, user } = useUser();

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
    <Box bgcolor="background.paper" padding={spacing.xxs} borderRadius={borderRadius.xxs}>


      {/* Main Dashboard Content */}
      {renderDashboard()}
    </Box>
  );
}

export default DashboardPage;

