// external imports
import { List } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon, DeleteAction } from '@components';
import { useTranslation, useReduxTheme } from '@hooks';
import LessonListItem from './LessonListItem';

/**
 * LessonsList Component
 *
 * Single Responsibility: Display list of lessons with actions
 */
function LessonsList({
  lessons,
  gradeId: _gradeId = null,
  subjectId: _subjectId = null,
  unitId: _unitId = null,
  getLessonName,
  onLessonEdit = undefined,
  onLessonDelete = undefined,
}) {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();

  return (
    <List disablePadding>
      {lessons.map((lesson) => {
        const lessonName = getLessonName(lesson);
        const actions = [
          {
            label: t('grade.editLesson'),
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
              label={t('grade.deleteLesson')}
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
  gradeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unitId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getLessonName: PropTypes.func.isRequired,
  onLessonEdit: PropTypes.func,
  onLessonDelete: PropTypes.func,
};

export default LessonsList;
