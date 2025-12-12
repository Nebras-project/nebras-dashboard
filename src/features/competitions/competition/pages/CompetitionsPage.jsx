import { useState } from 'react';
import { PageLayout, AddIconButton } from '@components';
import { useTranslation } from '@hooks';

import { CompetitionsGrid, CompetitionFormDialog, CompetitionFilter } from '../components';
import { useCompetition } from '../hooks';
import { mockCompetitions } from '../data/mockCompetitions';

function CompetitionsPage() {
  const { t } = useTranslation();
  const [filterParams, setFilterParams] = useState({});

  // Fetch competitions with filter params from backend
  const { competitions, isLoading } = useCompetition({
    params: filterParams,
  });

  const handleFilterChange = (newFilterParams) => {
    setFilterParams(newFilterParams);
    // React Query will automatically refetch when params change
  };

  return (
    <PageLayout title={t('competitions.competitions')} description={t('competitions.description')}>
      <CompetitionFormDialog showAddButton={false}>
        {(renderProps) => (
          <>
            <CompetitionFilter
              onFilterChange={handleFilterChange}
              competitions={competitions || []}
              addButton={
                <AddIconButton
                  onClick={() => renderProps.onEdit(null)}
                  tooltip={t('competitions.addCompetition')}
                />
              }
            />
            <CompetitionsGrid competitions={mockCompetitions || []} isLoading={isLoading} />
          </>
        )}
      </CompetitionFormDialog>
    </PageLayout>
  );
}

export default CompetitionsPage;
