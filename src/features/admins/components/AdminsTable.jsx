import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { ActionsMenu, DeleteAction } from '@components';
import Table, { useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';
import { useRole } from '@hooks';
import { NAVIGATION_PATHS } from '@config';

import createAdminColumns from '../utils/createAdminColumns.jsx';
import { useDeleteAdmin, useAdmin } from '../hooks';
import { getAdminName } from '../utils';

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
    queryString,
  } = useTable();

  console.log(queryString);

  // Fetch admins data using the hook
  const { admins = [], isLoading } = useAdmin({
    queryString,
  });

  const columns = useMemo(
    () =>
      createAdminColumns({
        t,
        isOwner,
        isGeneralAdmin,
        includeActions: true,
        renderActions: ({ row }) => (
          <ActionsMenu
            row={row}
            checkPermissions
            tooltip={t('common.actions')}
            actions={[
              {
                label: t('admins.viewAdmin'),
                icon: <Icon name="visibility" size={18} />,
                onClick: () => navigate(NAVIGATION_PATHS.ADMINS.BY_ID(row.id)),
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
                getItemName={(admin) => getAdminName(admin)}
                entityName="admins"
                label={t('admins.deleteAdmin')}
              />,
            ]}
          />
        ),
      }),
    [t, isOwner, isGeneralAdmin, onEdit, navigate, deleteAdmin]
  );

  // Handle loading state
  if (isLoading) {
    return <Table rows={[]} columns={columns} loading />;
  }

  return (
    <Table
      rows={admins}
      columns={columns}
      disableRowSelectionOnClick
      checkRowSelection
      rowCount={admins.length}
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
