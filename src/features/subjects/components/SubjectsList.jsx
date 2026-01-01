import { Box, List, ListItem, Divider } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon, DeleteAction } from '@components';
import SubjectActions from './SubjectActions';
import SubjectListItemButton from './SubjectListItemButton';
import { useTranslation, useLanguage, useReduxTheme } from '@hooks';
import { getSubjectName } from '../utils';
import { margin } from '@constants/spacing';

/**
 * SubjectsList Component
 *
 * Single Responsibility: Display list of subjects with actions
 */
function SubjectsList({
  subjects,
  gradeId: _gradeId,
  selectedSubjectId = null,
  onSubjectSelect,
  onSubjectEdit,
  onSubjectDelete,
}) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { mode } = useReduxTheme();

  return (
    <List disablePadding>
      {subjects.map((subject, index) => {
        const isSelected = selectedSubjectId === subject.id;
        const subjectName = getSubjectName(subject, currentLanguage);
        const unitsCount = subject.unitCount || 0;
        const lessonsCount = subject.lessonsCount || 0;

        const actions = [
          {
            label: t('grade.editSubject'),
            icon: <Icon name="edit" size={18} />,
            onClick: () => onSubjectEdit(subject),
          },
          <DeleteAction
            key="delete"
            row={subject}
            deleteFn={onSubjectDelete}
            getItemName={(subject) => getSubjectName(subject, currentLanguage)}
            entityName="subjects"
            label={t('grade.deleteSubject')}
          />,
        ];

        return (
          <Box key={subject.id}>
            <ListItem
              disablePadding
              sx={{
                position: 'relative',
                '&:hover .subject-actions': {
                  opacity: 1,
                },
              }}
            >
              <SubjectListItemButton
                subjectName={subjectName}
                unitsCount={unitsCount}
                lessonsCount={lessonsCount}
                isSelected={isSelected}
                onSelect={() => onSubjectSelect(subject.id)}
                mode={mode}
                unitsLabel={t('units.entityName')}
                lessonsLabel={t('lessons.entityName')}
              />
              <SubjectActions actions={actions} />
            </ListItem>
            {index < subjects.length - 1 && <Divider sx={margin.y.xs} />}
          </Box>
        );
      })}
    </List>
  );
}

SubjectsList.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  gradeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectedSubjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSubjectSelect: PropTypes.func.isRequired,
  onSubjectEdit: PropTypes.func.isRequired,
  onSubjectDelete: PropTypes.func.isRequired,
};

SubjectsList.displayName = 'SubjectsList';

export default SubjectsList;
