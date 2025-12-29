import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { ActionsMenu, DeleteAction } from '@components';
import Table, { useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';
import { NAVIGATION_PATHS } from '@config';

import createStudentColumns from '../utils/createStudentColumns.jsx';
import { useStudent, useDeleteStudent } from '../hooks';
import { getStudentName } from '../utils';
import { getTopTableStyles } from '@constants/layout';

function StudentsTable({ customFilters = {}, onEdit }) {
  const { t } = useTranslation();
  const { deleteStudent } = useDeleteStudent();
  const navigate = useNavigate();

  const {
    paginationModel,
    sortModel,
    handlePaginationModelChange,
    handleSortModelChange,
    queryString,
  } = useTable({ customFilters });

  // Fetch students data using the hook
  const { students, isLoading, totalCount } = useStudent({
    queryString,
  });
  const columns = useMemo(
    () =>
      createStudentColumns({
        t,
        includeActions: true,
        renderActions: ({ row }) => (
          <ActionsMenu
            tooltip={t('common.actions')}
            row={row}
            actions={[
              {
                label: t('students.viewStudent'),
                icon: <Icon name="visibility" size={18} />,
                onClick: () => navigate(NAVIGATION_PATHS.STUDENTS.BY_ID(row.id)),
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
      // checkRowSelection
      rowCount={totalCount}
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      sx={getTopTableStyles()}
      getRowId={(row) => row.id || row.email || Math.random()}
    />
  );
}

StudentsTable.propTypes = {
  customFilters: PropTypes.object,
  onEdit: PropTypes.func,
};

export default StudentsTable;
