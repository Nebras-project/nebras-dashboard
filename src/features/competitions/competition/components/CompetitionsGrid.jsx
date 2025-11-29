import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Loader, EmptyState } from '@components';
import { useTranslation } from '@hooks';
import CompetitionCard from './CompetitionCard';

function CompetitionsGrid({ competitions, isLoading }) {
  const { t } = useTranslation();

  if (isLoading) {
    return <Loader />;
  }

  // Empty state
  if (!competitions || competitions.length === 0) {
    return (
      <EmptyState
        icon="emojiEvents"
        title={t('common.noData')}
        description={t('competitions.description')}
      />
    );
  }

  return (
    <Grid container spacing={3}>
      {competitions.map((competition) => (
        <Grid size={{ mobile: 12, tablet: 6, desktop: 6 }} key={competition.id || competition.name}>
          <CompetitionCard competition={competition} />
        </Grid>
      ))}
    </Grid>
  );
}

CompetitionsGrid.propTypes = {
  competitions: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};

export default CompetitionsGrid;
