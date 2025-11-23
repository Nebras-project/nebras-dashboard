// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon } from '@components';
import { ActionsMenu, DeleteAction } from '@components';
import { useTranslation, useReduxTheme, useLanguage } from '@hooks';
import { baseColors } from '@theme/colors';
import { getCurriculumName } from '../utils';

/**
 * CardActionsMenu Component
 *
 * Single Responsibility: Display actions menu (three dots) for curriculum card
 * Uses ActionsMenu for consistency with table actions
 */

const getCardActionsButtonStyles = (isLight) => ({
  bgcolor: isLight ? baseColors.gray200 : baseColors.dark900,
  color: isLight ? 'primary.main' : 'primary.contrastText',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: isLight ? baseColors.gray300 : baseColors.dark800,
    transform: 'scale(1.05)',
  },
});

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

function CardActionsMenu({ curriculum, onView, onEdit, onDelete }) {
  const { t } = useTranslation();
  const { isLight } = useReduxTheme();
  const { currentLanguage } = useLanguage();

  const actions = [
    {
      label: t('curriculum.viewCurriculum'),
      icon: <Icon name="visibility" size={18} />,
      onClick: onView,
    },
    {
      label: t('curriculum.editCurriculum'),
      icon: <Icon name="edit" size={18} />,
      onClick: onEdit,
    },
    <DeleteAction
      key="delete"
      row={curriculum}
      deleteFn={onDelete}
      getItemName={(curriculum) => getCurriculumName(curriculum, currentLanguage)}
      entityName="curriculum"
      label={t('curriculum.deleteCurriculum')}
    />,
  ];

  return (
    <Box sx={getCardActionsMenuStyles()} onClick={(e) => e.stopPropagation()}>
      <ActionsMenu
        actions={actions}
        iconButtonProps={{
          size: 'small',
          sx: getCardActionsButtonStyles(isLight),
        }}
        checkPermissions={false}
      />
    </Box>
  );
}

CardActionsMenu.propTypes = {
  curriculum: PropTypes.object.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardActionsMenu;
