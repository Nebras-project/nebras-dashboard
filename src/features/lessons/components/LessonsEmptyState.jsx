import PropTypes from 'prop-types';

// internal imports
import { EmptyState } from '@components';
import { useTranslation } from '@hooks';
import { margin, padding } from '@constants/spacing';
import LessonsHeader from './LessonsHeader';

/**
 * LessonsEmptyState Component
 *
 * Single Responsibility: Display empty state for lessons with header and add button
 */
function LessonsEmptyState({ onAdd }) {
  const { t } = useTranslation();

  return (
    <>
      <LessonsHeader onAdd={onAdd} />
      <EmptyState
        icon="book"
        title={t('curriculum.noLessons')}
        sx={{ ...margin.top.sm, ...padding.y.md }}
      />
    </>
  );
}

LessonsEmptyState.propTypes = {
  onAdd: PropTypes.func,
};

LessonsEmptyState.defaultProps = {
  onAdd: null,
};

export default LessonsEmptyState;
