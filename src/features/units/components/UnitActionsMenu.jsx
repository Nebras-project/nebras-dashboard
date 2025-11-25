// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { ActionsMenu, DeleteAction, Icon } from '@components';

function UnitActionsMenu({ onView, onEdit, onDelete, unit, labels, getItemName }) {
  const actions = [
    {
      label: labels.view,
      icon: <Icon name="visibility" size={18} />,
      onClick: onView,
    },
    {
      label: labels.edit,
      icon: <Icon name="edit" size={18} />,
      onClick: onEdit,
    },
  ];

  if (onDelete) {
    actions.push(
      <DeleteAction
        key="delete"
        row={unit}
        deleteFn={() => onDelete(unit)}
        getItemName={getItemName}
        entityName="units"
        label={labels.delete}
      />
    );
  }

  return (
    <Box
      className="unit-actions"
      sx={{
        opacity: 0,
        transition: 'opacity 0.2s ease',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <ActionsMenu
        actions={actions}
        iconButtonProps={{
          size: 'small',
        }}
        checkPermissions={false}
      />
    </Box>
  );
}

UnitActionsMenu.propTypes = {
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  unit: PropTypes.object.isRequired,
  labels: PropTypes.shape({
    view: PropTypes.string.isRequired,
    edit: PropTypes.string.isRequired,
    delete: PropTypes.string.isRequired,
  }).isRequired,
  getItemName: PropTypes.func.isRequired,
};

UnitActionsMenu.defaultProps = {
  onDelete: undefined,
};

export default UnitActionsMenu;
