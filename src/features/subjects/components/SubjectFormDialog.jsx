// external imports
import { useState } from 'react';
import PropTypes from 'prop-types';

// internal imports
import SubjectForm from './SubjectForm';

/**
 * SubjectFormDialog Component
 *
 * Single Responsibility: Manage subject form dialog state and render SubjectForm
 */
function SubjectFormDialog({ gradeId, showAddButton = false, children = null, onSuccess = null }) {
  const [open, setOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const handleOpen = (subject = null) => {
    setEditingSubject(subject);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSubject(null);
  };

  const handleAdd = () => {
    handleOpen(null);
  };

  const handleEdit = (subject) => {
    handleOpen(subject);
  };

  const handleFormSuccess = () => {
    handleClose();
    onSuccess?.();
  };

  // If children is a function, pass handlers to it
  if (typeof children === 'function') {
    return (
      <>
        {children({ onAdd: showAddButton ? handleAdd : undefined, onEdit: handleEdit })}
        <SubjectForm
          open={open}
          onClose={handleClose}
          defaultValues={editingSubject || {}}
          isEdit={!!editingSubject}
          gradeId={gradeId}
          onSuccess={handleFormSuccess}
        />
      </>
    );
  }

  // Otherwise, render children and form separately
  return (
    <>
      {children}
      <SubjectForm
        open={open}
        onClose={handleClose}
        defaultValues={editingSubject || {}}
        isEdit={!!editingSubject}
        gradeId={gradeId}
        onSuccess={handleFormSuccess}
      />
    </>
  );
}

SubjectFormDialog.propTypes = {
  gradeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  showAddButton: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onSuccess: PropTypes.func,
};

SubjectFormDialog.displayName = 'SubjectFormDialog';

export default SubjectFormDialog;
