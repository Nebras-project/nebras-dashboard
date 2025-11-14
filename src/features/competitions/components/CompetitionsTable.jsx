import { useMemo } from 'react';

import Table, { RowActionsMenu, useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';

import createCompetitionColumns from '../utils/createCompetitionColumns.jsx';

function CompetitionsTable() {
  const { t } = useTranslation();

  const {
    paginationModel,
    sortModel,
    filterModel,
    handlePaginationModelChange,
    handleSortModelChange,
    handleFilterModelChange,
    queryString, // eslint-disable-line no-unused-vars
  } = useTable();

  const columns = useMemo(
    () =>
      createCompetitionColumns({
        t,
        includeActions: true,
        rows: [],
        renderActions: ({ row }) => (
          <RowActionsMenu
            tooltip={t('common.actions')}
            actions={[
              {
                label: t('competitions.viewCompetition'),
                icon: <Icon name="visibility" size={18} />,
                onClick: () => console.log('View competition', row),
              },
              {
                label: t('competitions.editCompetition'),
                icon: <Icon name="edit" size={18} />,
                onClick: () => console.log('Edit competition', row),
              },
              {
                label: t('competitions.deleteCompetition'),
                icon: <Icon name="delete" size={18} />,
                onClick: () => console.log('Delete competition', row),
              },
            ]}
          />
        ),
      }),
    [t]
  );

  // TODO: Use queryString to fetch data from server
  // Example: const { data, isLoading } = useQuery(['competitions', queryString], () => fetchCompetitions(queryString));

  return (
    <Table
      rows={[]}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      filterModel={filterModel}
      onFilterModelChange={handleFilterModelChange}
      disableRowSelectionOnClick
    />
  );
}

export default CompetitionsTable;
