// external imports
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Loader, EmptyState } from '@components';
import { useTranslation } from '@hooks';
import CurriculumCard from './CurriculumCard';

/**
 * CurriculumsGrid Component
 *
 * Single Responsibility: Display curriculums in a grid layout
 */
function CurriculumsGrid({ curriculums, isLoading, onEdit }) {
  const { t } = useTranslation();

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  // Empty state
  if (!curriculums || curriculums.length === 0) {
    return (
      <EmptyState
        icon="book"
        title={t('curriculum.noCurriculums')}
        description={t('curriculum.noCurriculumsDescription')}
      />
    );
  }

  return (
    <Grid container spacing={3}>
      {curriculums.map((curriculum) => (
        <Grid size={{ mobile: 12, tablet: 6, desktop: 4, widescreen: 3 }} key={curriculum.id}>
          <CurriculumCard curriculum={curriculum} onEdit={onEdit} />
        </Grid>
      ))}
    </Grid>
  );
}

CurriculumsGrid.propTypes = {
  curriculums: PropTypes.array,
  isLoading: PropTypes.bool,
  onEdit: PropTypes.func,
};

export default CurriculumsGrid;
