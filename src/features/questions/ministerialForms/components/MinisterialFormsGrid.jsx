// external imports
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Loader, EmptyState } from '@components';
import { useTranslation } from '@hooks';
import MinisterialFormCard from './MinisterialFormCard';
import { margin } from '@constants';

/**
 * MinisterialFormsGrid Component
 *
 * Single Responsibility: Display ministerial forms in a grid layout
 */
function MinisterialFormsGrid({ forms, isLoading, onEdit }) {
  const { t } = useTranslation();

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  // Empty state
  if (!forms || forms.length === 0) {
    return (
      <EmptyState
        icon="fileList"
        title={t('ministerialForms.noForms')}
        description={t('ministerialForms.noFormsDescription')}
      />
    );
  }

  return (
    <Grid container spacing={3} sx={{ ...margin.top.xl }}>
      {forms.map((form) => (
        <Grid size={{ mobile: 12, tablet: 6, desktop: 4, widescreen: 3 }} key={form.id}>
          <MinisterialFormCard form={form} onEdit={onEdit} />
        </Grid>
      ))}
    </Grid>
  );
}

MinisterialFormsGrid.propTypes = {
  forms: PropTypes.array,
  isLoading: PropTypes.bool,
  onEdit: PropTypes.func,
};

export default MinisterialFormsGrid;
