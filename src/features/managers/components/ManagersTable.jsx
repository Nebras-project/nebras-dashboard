import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { ActionsMenu, DeleteAction } from '@components';
import Table, { useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';
import { useRole } from '@hooks';
import { NAVIGATION_PATHS } from '@config';

import createManagerColumns from '../utils/createManagerColumns.jsx';
import { useDeleteManager, useManager } from '../hooks';
import { getManagerName } from '../utils';
import { getTopTableStyles } from '@constants/layout';
import { useRowClick } from '@hooks';

function ManagersTable({ customFilters = {}, onEdit }) {
  const { t } = useTranslation();
  const { isOwner, isGeneralAdmin } = useRole();
  const { deleteManager } = useDeleteManager();
  const navigate = useNavigate();

  const {
    paginationModel,
    sortModel,
    handlePaginationModelChange,
    handleSortModelChange,
    queryString,
  } = useTable({ customFilters });

  // Fetch managers data using the hook
  const { managers, totalCount, isLoading } = useManager({
    queryString,
  });

  const columns = useMemo(
    () =>
      createManagerColumns({
        t,
        isOwner,
        isGeneralAdmin,
        includeActions: true,
        renderActions: ({ row }) => (
          <ActionsMenu
            row={row}
            checkPermissions
            tooltip={t('managers.actionsTooltip')}
            actions={[
              {
                label: t('managers.viewManager'),
                icon: <Icon name="visibility" size={18} />,
                onClick: () => navigate(NAVIGATION_PATHS.MANAGERS.BY_ID(row.userId)),
              },
              {
                label: t('managers.editManager'),
                icon: <Icon name="edit" size={18} />,
                onClick: () => onEdit?.(row),
              },
              <DeleteAction
                key="delete"
                row={row}
                deleteFn={deleteManager}
                getItemName={(manager) => getManagerName(manager)}
                entityName="managers"
                label={t('managers.deleteManager')}
              />,
            ]}
          />
        ),
      }),
    [t, isOwner, isGeneralAdmin, onEdit, navigate, deleteManager]
  );

    const handleRowClick = useRowClick({
      navigateTo: (row, { navigate: nav } = {}) => nav(NAVIGATION_PATHS.MANAGERS.BY_ID(row.userId)),
    });


  // Handle loading state
  if (isLoading) {
    return <Table rows={[]} columns={columns} loading />;
  }

  return (
    <Table
      rows={managers || []}
      columns={columns}
      disableRowSelectionOnClick
      rowCount={totalCount}
      onRowClick={handleRowClick}
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      sx={getTopTableStyles()}
      getRowId={(row) => row.userId || row.email || Math.random()}
      loading={isLoading}
    />
  );
}

ManagersTable.propTypes = {
  customFilters: PropTypes.object,
  onEdit: PropTypes.func,
};

export default ManagersTable;
