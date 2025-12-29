// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon } from '@components';
import { ActionsMenu, DeleteAction } from '@components';
import { useTranslation, useReduxTheme, useLanguage } from '@hooks';
import { getActionsButtonStyles } from '@constants/layout';
import { getGradeName } from '../utils';

/**
 * CardActionsMenu Component
 *
 * Single Responsibility: Display actions menu (three dots) for grade card
 * Uses ActionsMenu for consistency with table actions
 */

const getCardActionsMenuStyles = () => ({
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 1,
  opacity: 0,
  transition: 'opacity 0.2s ease',
  '.MuiCard-root:hover &': {
    opacity: 1,
  },
});

function CardActionsMenu({ grade, onView, onEdit, onDelete }) {
  const { t } = useTranslation();
  const { isLight } = useReduxTheme();
  const { currentLanguage } = useLanguage();

  const actions = [
    {
      label: t('grade.viewGrade'),
      icon: <Icon name="visibility" size={18} />,
      onClick: onView,
    },
    {
      label: t('grade.editGrade'),
      icon: <Icon name="edit" size={18} />,
      onClick: onEdit,
    },
    <DeleteAction
      key="delete"
      row={grade}
      deleteFn={onDelete}
      getItemName={(grade) => getGradeName(grade, currentLanguage)}
      entityName="grade"
      label={t('grade.deleteGrade')}
    />,
  ];

  return (
    <Box sx={getCardActionsMenuStyles()} onClick={(e) => e.stopPropagation()}>
      <ActionsMenu
        tooltip={t('grades.actionsTooltip')}
        actions={actions}
        iconButtonProps={{
          size: 'small',
          sx: getActionsButtonStyles(isLight),
        }}
        checkPermissions={false}
      />
    </Box>
  );
}

CardActionsMenu.propTypes = {
  grade: PropTypes.object.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardActionsMenu;
