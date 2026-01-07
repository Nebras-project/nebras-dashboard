import { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { ActionsMenu, DeleteAction } from '@components';
import Table, { useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';

import createMinisterialFormColumns from '../utils/createMinisterialFormColumns';
import { useDeleteMinisterialForm, useMinisterialForm } from '../hooks';

function MinisterialFormsTable({ customFilters = {}, onEdit, tableRef: tableRefProp }) {
  const { t } = useTranslation();
  const { deleteMinisterialForm } = useDeleteMinisterialForm();
  const tableRef = useRef(null);
  const finalTableRef = tableRefProp || tableRef;

  const {
    paginationModel,
    sortModel,
    handlePaginationModelChange,
    handleSortModelChange,
    queryString,
  } = useTable({ customFilters });

  // Fetch ministerial forms data using the hook
  const { ministerialForms, totalCount, isLoading } = useMinisterialForm({
    queryString,
  });

  console.log(ministerialForms);

  const columns = useMemo(
    () =>
      createMinisterialFormColumns({
        t,
        includeActions: true,
        renderActions: ({ row }) => (
          <ActionsMenu
            row={row}
            tooltip={t('ministerialForms.actionsTooltip')}
            actions={[
              {
                label: t('ministerialForms.editForm'),
                icon: <Icon name="edit" size={18} />,
                onClick: () => onEdit?.(row),
              },
              <DeleteAction
                key="delete"
                row={row}
                deleteFn={deleteMinisterialForm}
                getItemName={(form) => `${form.formNumber} - ${form.year}`}
                entityName="ministerialForms"
                label={t('ministerialForms.deleteForm')}
              />,
            ]}
          />
        ),
      }),
    [t, onEdit, deleteMinisterialForm]
  );

  // Handle loading state
  if (isLoading) {
    return <Table rows={[]} columns={columns} loading ref={finalTableRef} />;
  }

  return (
    <Table
      ref={finalTableRef}
      rows={ministerialForms}
      columns={columns}
      disableRowSelectionOnClick
      rowCount={totalCount}
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      getRowId={(row) => row.id || Math.random()}
      loading={isLoading}
    />
  );
}

MinisterialFormsTable.propTypes = {
  customFilters: PropTypes.object,
  onEdit: PropTypes.func,
  tableRef: PropTypes.object,
};

export default MinisterialFormsTable;
