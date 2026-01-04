// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon } from '@components';
import { ActionsMenu, DeleteAction } from '@components';
import { useTranslation, useReduxTheme } from '@hooks';
import { getActionsButtonStyles } from '@constants/layout';
import { getFormName } from '../utils';

/**
 * CardActionsMenu Component
 *
 * Single Responsibility: Display actions menu (three dots) for ministerial form card
 * Uses ActionsMenu for consistency with table actions
 */

const getCardActionsMenuStyles = () => ({
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 1,
});

function CardActionsMenu({ form, onEdit, onDelete }) {
  const { t } = useTranslation();
  const { isLight } = useReduxTheme();

  const actions = [
    {
      label: t('ministerialForms.editForm'),
      icon: <Icon name="edit" size={18} />,
      onClick: onEdit,
    },
    <DeleteAction
      key="delete"
      row={form}
      deleteFn={onDelete}
      getItemName={(form) => getFormName(form)}
      entityName="ministerialForm"
      label={t('ministerialForms.deleteForm')}
    />,
  ];

  return (
    <Box sx={getCardActionsMenuStyles()} onClick={(e) => e.stopPropagation()}>
      <ActionsMenu
        tooltip={t('ministerialForms.actionsTooltip')}
        actions={actions}
        iconButtonProps={{
          size: 'small',
          sx: getActionsButtonStyles(isLight),
        }}
      />
    </Box>
  );
}

CardActionsMenu.propTypes = {
  form: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardActionsMenu;
