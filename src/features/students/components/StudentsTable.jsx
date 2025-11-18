import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Table, { RowActionsMenu, useTable, DeleteAction } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';

import createStudentColumns from '../utils/createStudentColumns.jsx';
import { useStudent, useDeleteStudent } from '../hooks';
import { getStudentName } from '../utils';

function StudentsTable({ onEdit }) {
  const { t } = useTranslation();
  const { deleteStudent } = useDeleteStudent();
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

  // Fetch students data using the hook
  const { students, isLoading } = useStudent({
    queryString,
  });

  const columns = useMemo(
    () =>
      createStudentColumns({
        t,
        includeActions: true,
        renderActions: ({ row }) => (
          <RowActionsMenu
            tooltip={t('common.actions')}
            row={row}
            actions={[
              {
                label: t('students.viewStudent'),
                icon: <Icon name="visibility" size={18} />,
                onClick: () => navigate(`/students/${row.id}`),
              },
              {
                label: t('students.editStudent'),
                icon: <Icon name="edit" size={18} />,
                onClick: () => onEdit?.(row),
              },
              <DeleteAction
                key="delete"
                row={row}
                deleteFn={deleteStudent}
                getItemName={(student) => getStudentName(student)}
                entityName="students"
                label={t('students.deleteStudent')}
              />,
            ]}
          />
        ),
      }),
    [t, onEdit, navigate, deleteStudent]
  );

  // Handle loading state
  if (isLoading) {
    return <Table rows={[]} columns={columns} loading />;
  }

  return (
    <Table
      rows={students || []}
      columns={columns}
      disableRowSelectionOnClick
      checkRowSelection
      rowCount={students?.length || 0}
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      filterModel={filterModel}
      onFilterModelChange={handleFilterModelChange}
    />
  );
}

StudentsTable.propTypes = {
  onEdit: PropTypes.func,
};

export default StudentsTable;
