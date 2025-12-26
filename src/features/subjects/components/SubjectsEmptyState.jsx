import PropTypes from 'prop-types';

// internal imports
import { EmptyState } from '@components';
import { useTranslation } from '@hooks';
import SubjectsHeader from './SubjectsHeader';

/**
 * SubjectsEmptyState Component
 *
 * Single Responsibility: Display empty state for subjects with header and add button
 */
function SubjectsEmptyState({ onAdd }) {
  const { t } = useTranslation();

  return (
    <>
      <SubjectsHeader onAdd={onAdd} />
      <EmptyState
        icon="libraryBooks"
        title={t('grade.noSubjects')}
        description={t('grade.noSubjectsDescription')}
      />
    </>
  );
}

SubjectsEmptyState.propTypes = {
  onAdd: PropTypes.func,
};

SubjectsEmptyState.defaultProps = {
  onAdd: null,
};

export default SubjectsEmptyState;
