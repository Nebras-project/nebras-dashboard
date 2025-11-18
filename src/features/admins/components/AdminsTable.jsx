import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Table, { RowActionsMenu, useTable, DeleteAction } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';
import { useRole } from '@hooks';

import createAdminColumns from '../utils/createAdminColumns.jsx';
import { dummyAdmins } from '../data/dummyAdmins';
import { useDeleteAdmin } from '../hooks';

function AdminsTable({ onEdit }) {
  const { t } = useTranslation();
  const { isOwner, isGeneralAdmin } = useRole();
  const { deleteAdmin } = useDeleteAdmin();
  const navigate = useNavigate();

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
        isOwner,
        isGeneralAdmin,
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
                onClick: () => navigate(`/admins/${row.id}`),
              },
              {
                label: t('admins.editAdmin'),
                icon: <Icon name="edit" size={18} />,
                onClick: () => onEdit?.(row),
              },
              <DeleteAction
                key="delete"
                row={row}
                deleteFn={deleteAdmin}
                getItemName={(admin) => admin.UserName}
                entityName="admins"
                label={t('admins.deleteAdmin')}
              />,
            ]}
          />
        ),
      }),
    [t, isOwner, isGeneralAdmin, onEdit, navigate, deleteAdmin]
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
};

export default AdminsTable;
