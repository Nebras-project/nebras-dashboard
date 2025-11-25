// external imports
import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

// internal imports
import UnitForm from './UnitForm';
import { useDeleteUnit } from '../hooks';

function UnitFormDialog({ curriculumId, subjectId, children, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);

  const canManageUnits = useMemo(
    () => Boolean(curriculumId && subjectId),
    [curriculumId, subjectId]
  );

  const { deleteUnit } = useDeleteUnit({
    curriculumId,
    subjectId,
    onSuccess,
  });

  const handleOpen = useCallback(
    (unit = null) => {
      if (!canManageUnits) return;
      setEditingUnit(unit);
      setOpen(true);
    },
    [canManageUnits]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setEditingUnit(null);
  }, []);

  const handleAdd = useCallback(() => {
    handleOpen(null);
  }, [handleOpen]);

  const handleEdit = useCallback(
    (unit) => {
      handleOpen(unit);
    },
    [handleOpen]
  );

  const handleDelete = useCallback(
    (unit) => {
      if (!canManageUnits || !unit) return;
      deleteUnit(unit);
    },
    [canManageUnits, deleteUnit]
  );

  const handleFormSuccess = useCallback(() => {
    handleClose();
    onSuccess?.();
  }, [handleClose, onSuccess]);

  const renderProps = {
    onAdd: canManageUnits ? handleAdd : undefined,
    onEdit: canManageUnits ? handleEdit : undefined,
    onDelete: canManageUnits ? handleDelete : undefined,
  };

  return (
    <>
      {typeof children === 'function' ? children(renderProps) : children}
      {canManageUnits && (
        <UnitForm
          open={open}
          onClose={handleClose}
          defaultValues={editingUnit || {}}
          isEdit={!!editingUnit}
          curriculumId={curriculumId}
          subjectId={subjectId}
          onSuccess={handleFormSuccess}
        />
      )}
    </>
  );
}

UnitFormDialog.propTypes = {
  curriculumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onSuccess: PropTypes.func,
};

UnitFormDialog.defaultProps = {
  subjectId: null,
  children: null,
  onSuccess: null,
};

export default UnitFormDialog;
