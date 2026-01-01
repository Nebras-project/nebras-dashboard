import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useRowClick } from '@hooks';

import { ActionsMenu, DeleteAction } from '@components';
import Table, { useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';
import { NAVIGATION_PATHS } from '@config';

import createStudentColumns from '../utils/createStudentColumns.jsx';
import { useStudent, useDeleteStudent } from '../hooks';
import { getStudentName } from '../utils';
import { getTopTableStyles } from '@constants/layout';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@config';

function StudentsTable({ customFilters = {}, onEdit }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { deleteStudent } = useDeleteStudent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GRADES] });
    },
  });
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
            tooltip={t('students.actionsTooltip')}
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

  const handleRowClick = useRowClick({
    navigateTo: (row, { navigate: nav } = {}) => nav(NAVIGATION_PATHS.STUDENTS.BY_ID(row.id)),
  });

  // Handle loading state
  if (isLoading) {
    return <Table rows={[]} columns={columns} loading />;
  }

  return (
    <Table
      rows={students || []}
      columns={columns}
      disableRowSelectionOnClick
      onRowClick={handleRowClick}
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
  onRowClick: PropTypes.func,
};

export default StudentsTable;
