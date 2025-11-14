import { useMemo } from 'react';

import Table, { RowActionsMenu, useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';

import createAdminColumns from '../utils/createAdminColumns.jsx';

function AdminsTable() {
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
      createAdminColumns({
        t,
        includeActions: true,
        renderActions: ({ row }) => (
          <RowActionsMenu
            tooltip={t('common.actions')}
            actions={[
              {
                label: t('admins.viewAdmin'),
                icon: <Icon name="visibility" size={18} />,
                onClick: () => console.log('View admin', row),
              },
              {
                label: t('admins.editAdmin'),
                icon: <Icon name="edit" size={18} />,
                onClick: () => console.log('Edit admin', row),
              },
              {
                label: t('admins.deleteAdmin'),
                icon: <Icon name="delete" size={18} />,
                onClick: () => console.log('Delete admin', row),
              },
            ]}
          />
        ),
      }),
    [t]
  );

  return (
    <Table
      rows={{}}
      columns={columns}
      disableRowSelectionOnClick
      checkRowSelection
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      filterModel={filterModel}
      onFilterModelChange={handleFilterModelChange}
    />
  );
}

export default AdminsTable;
