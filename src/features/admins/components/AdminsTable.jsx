import { useMemo } from 'react';
import PropTypes from 'prop-types';

import Table, { RowActionsMenu, useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';

import createAdminColumns from '../utils/createAdminColumns.jsx';
import { dummyAdmins } from '../data/dummyAdmins';

function AdminsTable({ onEdit, onView, onDelete }) {
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
            row={row}
            checkPermissions
            tooltip={t('common.actions')}
            actions={[
              {
                label: t('admins.viewAdmin'),
                icon: <Icon name="visibility" size={18} />,
                onClick: () => onView?.(row),
              },
              {
                label: t('admins.editAdmin'),
                icon: <Icon name="edit" size={18} />,
                onClick: () => onEdit?.(row),
              },
              {
                label: t('admins.deleteAdmin'),
                icon: <Icon name="delete" size={18} />,
                onClick: () => onDelete?.(row),
              },
            ]}
          />
        ),
      }),
    [t, onEdit, onView, onDelete]
  );

  return (
    <Table
      rows={dummyAdmins}
      columns={columns}
      disableRowSelectionOnClick
      checkRowSelection
      rowCount={dummyAdmins.length}
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      filterModel={filterModel}
      onFilterModelChange={handleFilterModelChange}
    />
  );
}

AdminsTable.propTypes = {
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onDelete: PropTypes.func,
};

export default AdminsTable;
