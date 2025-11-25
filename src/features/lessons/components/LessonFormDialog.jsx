// external imports
import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

// internal imports
import LessonForm from './LessonForm';
import { useDeleteLesson } from '../hooks';

function LessonFormDialog({ curriculumId, subjectId, unitId, children, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  const canManageLessons = useMemo(
    () => Boolean(curriculumId && subjectId && unitId),
    [curriculumId, subjectId, unitId]
  );

  const { deleteLesson } = useDeleteLesson({
    curriculumId,
    subjectId,
    unitId,
    onSuccess,
  });

  const handleOpen = useCallback(
    (lesson = null) => {
      if (!canManageLessons) return;
      setEditingLesson(lesson);
      setOpen(true);
    },
    [canManageLessons]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setEditingLesson(null);
  }, []);

  const handleAdd = useCallback(() => {
    handleOpen(null);
  }, [handleOpen]);

  const handleEdit = useCallback(
    (lesson) => {
      handleOpen(lesson);
    },
    [handleOpen]
  );

  const handleDelete = useCallback(
    (lesson) => {
      if (!canManageLessons || !lesson) return;
      deleteLesson(lesson);
    },
    [canManageLessons, deleteLesson]
  );

  const handleFormSuccess = useCallback(() => {
    handleClose();
    onSuccess?.();
  }, [handleClose, onSuccess]);

  const renderProps = {
    onAdd: canManageLessons ? handleAdd : undefined,
    onEdit: canManageLessons ? handleEdit : undefined,
    onDelete: canManageLessons ? handleDelete : undefined,
  };

  return (
    <>
      {typeof children === 'function' ? children(renderProps) : children}
      {canManageLessons && (
        <LessonForm
          open={open}
          onClose={handleClose}
          defaultValues={editingLesson || {}}
          isEdit={!!editingLesson}
          curriculumId={curriculumId}
          subjectId={subjectId}
          unitId={unitId}
          onSuccess={handleFormSuccess}
        />
      )}
    </>
  );
}

LessonFormDialog.propTypes = {
  curriculumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unitId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onSuccess: PropTypes.func,
};

LessonFormDialog.defaultProps = {
  children: null,
  onSuccess: null,
};

export default LessonFormDialog;
