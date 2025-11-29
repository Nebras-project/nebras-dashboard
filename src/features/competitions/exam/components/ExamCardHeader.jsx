import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { margin } from '@constants';
import ExamCardName from './ExamCardName';
import ExamCardActions from './ExamCardActions';

function ExamCardHeader({ exam, onViewResults, onEdit, onDelete }) {
  const handleActionsClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        ...margin.bottom.md,
      }}
    >
      <ExamCardName exam={exam} />

      <Box onClick={handleActionsClick}>
        <ExamCardActions
          exam={exam}
          onViewResults={onViewResults}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Box>
    </Box>
  );
}

ExamCardHeader.propTypes = {
  exam: PropTypes.object.isRequired,
  competitionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onViewResults: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ExamCardHeader;
