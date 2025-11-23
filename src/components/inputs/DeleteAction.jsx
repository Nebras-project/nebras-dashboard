// external imports
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, ListItemIcon, ListItemText } from '@mui/material';

// internal imports
import { ConfirmDialog, Icon } from '@components';
import { useTranslation, useConfirmDialog } from '@hooks';

/**
 * DeleteAction Component
 *
 * Single Responsibility: Handle delete action with confirmation dialog
 * Note: Toast notifications are handled by useDelete hook
 */
function DeleteAction({
  row,
  deleteFn,
  getItemName,
  entityName,
  label,
  icon = <Icon name="delete" size={18} />,
}) {
  const { t } = useTranslation();
  const { open, show, close } = useConfirmDialog();

  const handleDeleteClick = useCallback(
    (event) => {
      event.stopPropagation(); // Prevent menu from closing
      show();
    },
    [show]
  );

  const handleConfirmDelete = useCallback(() => {
    deleteFn(row);
    close();
  }, [row, deleteFn, close]);

  return (
    <>
      <Box
        onClick={handleDeleteClick}
        style={{ cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center' }}
      >
        {icon ? (
          <ListItemIcon
            sx={{
              minWidth: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: (theme) => theme.palette.error.main,
            }}
          >
            {icon}
          </ListItemIcon>
        ) : null}
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            sx: {
              color: (theme) => theme.palette.error.main,
            },
          }}
        />
      </Box>

      <ConfirmDialog
        open={open}
        onClose={close}
        onConfirm={handleConfirmDelete}
        title={t(`${entityName}.deleteConfirmTitle`)}
        message={t(`${entityName}.deleteConfirmMessage`, { name: getItemName(row) })}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        confirmColor="error"
      />
    </>
  );
}

DeleteAction.propTypes = {
  row: PropTypes.object.isRequired,
  deleteFn: PropTypes.func.isRequired,
  getItemName: PropTypes.func.isRequired,
  entityName: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  icon: PropTypes.node,
};

export default DeleteAction;
