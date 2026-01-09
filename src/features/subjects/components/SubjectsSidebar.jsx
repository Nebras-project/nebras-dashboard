// external imports
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { CircularLoader } from '@components';
import SubjectFormDialog from './SubjectFormDialog';
import SubjectsEmptyState from './SubjectsEmptyState';
import SubjectsHeader from './SubjectsHeader';
import SubjectsList from './SubjectsList';
import { useReduxTheme } from '@hooks';
import { useDeleteSubject, useSubjects, useAutoSelectSubject } from '../hooks';
import { getSectionPaperStyles } from '@constants/layout';

/**
 * SubjectsSidebar Component
 *
 * Displays subjects sidebar with name, units count, and lessons count
 */
function SubjectsSidebar({ gradeId, selectedSubjectId, onSubjectSelect }) {
  const { mode } = useReduxTheme();

  // Delete subject hook
  const { deleteSubject } = useDeleteSubject({
    gradeId,
    selectedSubjectId,
    onSuccess: () => {
      // Note: query invalidation is handled automatically by useEntityMutation
      // If deleted subject was selected, clear selection
      if (selectedSubjectId) {
        onSubjectSelect(null);
      }
    },
  });

  // Fetch subjects from API
  const {
    subjects = [],
    isLoading,
    isError,
  } = useSubjects({
    gradeId,
    enabled: !!gradeId,
  });

  // Auto-select first subject when subjects are loaded
  useAutoSelectSubject({
    subjects,
    selectedSubjectId,
    onSubjectSelect,
  });

  const hasNoData = !subjects || subjects.length === 0;
  const showEmptyState = isError || hasNoData;

  return (
    <SubjectFormDialog gradeId={gradeId} showAddButton={true}>
      {({ onAdd, onEdit }) => (
        <Paper
          sx={getSectionPaperStyles(mode, {
            height: 'fit-content',
            position: 'sticky',
            top: 24,
          })}
        >
          {/* Loading state */}
          {isLoading && <CircularLoader />}

          {/* Empty state or error - show header and empty state */}
          {!isLoading && showEmptyState && <SubjectsEmptyState onAdd={onAdd} />}

          {/* Subjects list - show header and list */}
          {!isLoading && !showEmptyState && (
            <>
              <SubjectsHeader onAdd={onAdd} />
              <SubjectsList
                subjects={subjects}
                gradeId={gradeId}
                selectedSubjectId={selectedSubjectId}
                onSubjectSelect={onSubjectSelect}
                onSubjectEdit={onEdit}
                onSubjectDelete={deleteSubject}
              />
            </>
          )}
        </Paper>
      )}
    </SubjectFormDialog>
  );
}

SubjectsSidebar.propTypes = {
  gradeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectedSubjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSubjectSelect: PropTypes.func.isRequired,
};

export default SubjectsSidebar;
