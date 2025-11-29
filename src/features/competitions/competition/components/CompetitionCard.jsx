import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import { useReduxTheme } from '@hooks';
import CompetitionCardHeader from './CompetitionCardHeader';
import CompetitionCardDetails from './CompetitionCardDetails';
import CompetitionForm from './CompetitionForm';
import { useCompetitionCard } from '../hooks';
import { getCardStyles } from '@constants/layout';

function CompetitionCard({ competition }) {
  const { mode } = useReduxTheme();
  const {
    formOpen,
    handleView,
    handleViewParticipants,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleFormClose,
    handleCardClick,
  } = useCompetitionCard(competition);

  return (
    <>
      <Card
        onClick={handleCardClick}
        sx={getCardStyles(mode, { position: 'relative', cursor: 'pointer' })}
      >
        <CompetitionCardHeader
          competition={competition}
          onView={handleView}
          onViewParticipants={handleViewParticipants}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <CompetitionCardDetails competition={competition} />
      </Card>

      <CompetitionForm
        mode="dialog"
        open={formOpen}
        onClose={handleFormClose}
        defaultValues={competition}
        isEdit={true}
      />
    </>
  );
}

CompetitionCard.propTypes = {
  competition: PropTypes.object.isRequired,
};

export default CompetitionCard;
