// external imports
import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { AddButton } from '@components';
import { useTranslation } from '@hooks';

/**
 * EntityFormDialog
 *
 * Generic dialog wrapper for entity forms (admins, students, levels, subjects, ...).
 * Manages:
 * - Add button (optional)
 * - Dialog open/edit state
 * - Render-props children with onEdit
 * Note: Toast notifications are handled by useCreate and useUpdate hooks
 */
function EntityFormDialog({ addLabelKey, FormComponent, children, showAddButton = true }) {
  const { t } = useTranslation();

  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddClick = useCallback(() => {
    setEditingItem(null);
    setFormOpen(true);
  }, []);

  const handleEditClick = useCallback((item) => {
    setEditingItem(item);
    setFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setFormOpen(false);
    setEditingItem(null);
  }, []);

  return (
    <>
      {showAddButton && <AddButton label={t(addLabelKey)} onClick={handleAddClick} />}
      {children && typeof children === 'function'
        ? children({ onEdit: handleEditClick })
        : children}
      <FormComponent
        mode="dialog"
        open={formOpen}
        onClose={handleFormClose}
        defaultValues={editingItem || {}}
        isEdit={!!editingItem}
      />
    </>
  );
}

EntityFormDialog.propTypes = {
  addLabelKey: PropTypes.string.isRequired,
  FormComponent: PropTypes.elementType.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showAddButton: PropTypes.bool,
};

EntityFormDialog.displayName = 'EntityFormDialog';

export default EntityFormDialog;
