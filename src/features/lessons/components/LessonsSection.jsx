// external imports
import PropTypes from 'prop-types';

// internal imports
import { CircularLoader } from '@components';
import { useLessons } from '../hooks';
import { useLanguage } from '@hooks';
import { getLessonName } from '../utils';
import LessonsHeader from './LessonsHeader';
import LessonsList from './LessonsList';
import LessonsEmptyState from './LessonsEmptyState';
import LessonFormDialog from './LessonFormDialog';

/**
 * LessonsSection Component
 *
 * Single Responsibility: Fetch lessons data and manage state, pass to LessonsList
 */
function LessonsSection({ unit, curriculumId, subjectId, enabled = true }) {
  const { currentLanguage } = useLanguage();

  const unitId = unit?.id;

  const {
    lessons = [],
    isLoading,
    refetch,
  } = useLessons({
    curriculumId,
    subjectId,
    unitId,
    enabled: enabled && !!curriculumId && !!subjectId && !!unitId,
  });

  const safeLessons = Array.isArray(lessons) ? lessons : [];
  const hasLessons = safeLessons.length > 0;
  const showEmptyState = !hasLessons;

  if (!unitId) {
    return null;
  }

  return (
    <LessonFormDialog
      curriculumId={curriculumId}
      subjectId={subjectId}
      unitId={unitId}
      onSuccess={refetch}
    >
      {({ onAdd, onEdit, onDelete }) => (
        <>
          {/* Loading state */}
          {isLoading && <CircularLoader />}

          {/* Empty state or error - show header and empty state */}
          {!isLoading && showEmptyState && <LessonsEmptyState onAdd={onAdd} />}

          {/* Lessons list - show header and list */}
          {!isLoading && !showEmptyState && (
            <>
              <LessonsHeader onAdd={onAdd} />
              <LessonsList
                lessons={safeLessons}
                curriculumId={curriculumId}
                subjectId={subjectId}
                unitId={unitId}
                getLessonName={(lesson) => getLessonName(lesson, currentLanguage)}
                onLessonEdit={onEdit}
                onLessonDelete={onDelete}
              />
            </>
          )}
        </>
      )}
    </LessonFormDialog>
  );
}

LessonsSection.propTypes = {
  unit: PropTypes.object.isRequired,
  curriculumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  enabled: PropTypes.bool,
};

LessonsSection.defaultProps = {
  curriculumId: null,
  subjectId: null,
  enabled: true,
};

export default LessonsSection;
