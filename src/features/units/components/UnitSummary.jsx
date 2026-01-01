// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import UnitSummaryInfo from './UnitSummaryInfo';
import UnitActionsMenu from './UnitActionsMenu';

function UnitSummary({
  unitName,
  lessonsCount,
  lessonsLabel,
  onEdit,
  onDelete = undefined,
  unit,
  labels,
  getItemName,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <UnitSummaryInfo
        unitName={unitName}
        lessonsCount={lessonsCount}
        lessonsLabel={lessonsLabel}
      />
      <UnitActionsMenu
        onEdit={onEdit}
        onDelete={onDelete}
        unit={unit}
        labels={labels}
        getItemName={getItemName}
      />
    </Box>
  );
}

UnitSummary.propTypes = {
  unitName: PropTypes.string.isRequired,
  lessonsCount: PropTypes.number.isRequired,
  lessonsLabel: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  unit: PropTypes.object.isRequired,
  labels: PropTypes.shape({
    edit: PropTypes.string.isRequired,
    delete: PropTypes.string.isRequired,
  }).isRequired,
  getItemName: PropTypes.func.isRequired,
};

export default UnitSummary;
