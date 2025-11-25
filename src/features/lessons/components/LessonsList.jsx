// external imports
import { List } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// internal imports
import { Icon, DeleteAction } from '@components';
import { useTranslation, useReduxTheme } from '@hooks';
import { NAVIGATION_PATHS } from '@config';
import LessonListItem from './LessonListItem';

/**
 * LessonsList Component
 *
 * Single Responsibility: Display list of lessons with actions
 */
function LessonsList({
  lessons,
  curriculumId,
  subjectId,
  unitId,
  getLessonName,
  onLessonEdit,
  onLessonDelete,
}) {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();
  const navigate = useNavigate();

  const handleLessonView = (lesson) => {
    if (lesson.curriculumId && lesson.subjectId && lesson.unitId) {
      navigate(
        NAVIGATION_PATHS.CURRICULUMS.LESSON(
          lesson.curriculumId,
          lesson.subjectId,
          lesson.unitId,
          lesson.id
        )
      );
    }
  };

  return (
    <List disablePadding>
      {lessons.map((lesson) => {
        const lessonName = getLessonName(lesson);
        const actions = [
          {
            label: t('curriculum.viewLesson'),
            icon: <Icon name="visibility" size={18} />,
            onClick: () =>
              handleLessonView({
                ...lesson,
                curriculumId,
                subjectId,
                unitId,
              }),
          },
          {
            label: t('curriculum.editLesson'),
            icon: <Icon name="edit" size={18} />,
            onClick: () => onLessonEdit && onLessonEdit(lesson),
          },
          onLessonDelete ? (
            <DeleteAction
              key="delete"
              row={lesson}
              deleteFn={onLessonDelete}
              getItemName={getLessonName}
              entityName="lessons"
              label={t('curriculum.deleteLesson')}
            />
          ) : null,
        ];

        return (
          <LessonListItem
            key={lesson.id}
            lesson={lesson}
            lessonName={lessonName}
            actions={actions}
            mode={mode}
          />
        );
      })}
    </List>
  );
}

LessonsList.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.object).isRequired,
  curriculumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unitId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getLessonName: PropTypes.func.isRequired,
  onLessonEdit: PropTypes.func,
  onLessonDelete: PropTypes.func,
};

LessonsList.defaultProps = {
  curriculumId: null,
  subjectId: null,
  unitId: null,
  onLessonEdit: undefined,
  onLessonDelete: undefined,
};

export default LessonsList;
