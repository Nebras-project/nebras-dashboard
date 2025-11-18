import { useMemo } from 'react';
import PropTypes from 'prop-types';

import Table, { RowActionsMenu, useTable } from '@components/table';
import Icon from '@components/display/Icon';
import useTranslation from '@i18n/hooks/useTranslation';

import createStudentColumns from '../utils/createStudentColumns.jsx';
import { dummyStudents } from '../data/dummyStudents';

function StudentsTable({ onEdit }) {
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
                onClick: () => console.log('View student', row),
              },
              {
                label: t('students.editStudent'),
                icon: <Icon name="edit" size={18} />,
                onClick: () => onEdit?.(row),
              },
              {
                label: t('students.deleteStudent'),
                icon: <Icon name="delete" size={18} />,
                onClick: () => console.log('Delete student', row),
              },
            ]}
          />
        ),
      }),
    [t, onEdit]
  );

  // TODO: Use queryString to fetch data from server
  // Example: const { data, isLoading } = useQuery(['students', queryString], () => fetchStudents(queryString));

  return (
    <Table
      rows={dummyStudents}
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

StudentsTable.propTypes = {
  onEdit: PropTypes.func,
};

export default StudentsTable;
