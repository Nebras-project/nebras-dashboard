// external imports
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

// internal imports
import { useTranslation } from '@hooks';
import useTableLayout from './hooks/useTableLayout';

function Table({
  rows = [],
  columns = [],
  rowCount: rowCountProp,
  loading = false,
  density = 'standard',
  onRowClick,
  pageSizeOptions,
  disableRowSelectionOnClick = true,
  slots,
  slotProps,
  // checkRowSelection = true,
  sx,
  paginationMode = 'server',
  paginationModel: paginationModelProp,
  onPaginationModelChange,
  sortingMode = 'server',
  sortModel: sortModelProp,
  onSortModelChange,
  ariaLabel,
  ariaDescribedBy,
  initialState: initialStateProp,
  localeText: localeTextProp,
  ...props
}) {
  const { t } = useTranslation();
  const {
    resolvedInitialState,
    resolvedSlotProps,
    resolvedSlots,
    resolvedLocaleText,
    resolvedSx,
    effectiveRowCount,
  } = useTableLayout({
    rows,
    onRowClick,
    rowCount: rowCountProp,
    slotProps,
    slots,
    pageSizeOptions,
    t,
    localeText: localeTextProp,
    sx,
    initialState: initialStateProp,
  });

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={effectiveRowCount}
      loading={loading}
      density={density}
      onRowClick={onRowClick}
      checkRowSelection
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      pageSizeOptions={pageSizeOptions}
      initialState={resolvedInitialState}
      slotProps={resolvedSlotProps}
      sx={resolvedSx}
      paginationMode={paginationMode}
      paginationModel={paginationModelProp}
      onPaginationModelChange={onPaginationModelChange}
      sortingMode={sortingMode}
      sortModel={sortModelProp}
      onSortModelChange={onSortModelChange}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      slots={resolvedSlots}
      localeText={resolvedLocaleText}
      // checkboxSelection={checkRowSelection}
      {...props}
    />
  );
}

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  density: PropTypes.oneOf(['compact', 'standard', 'comfortable']),
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  disableRowSelectionOnClick: PropTypes.bool,
  slots: PropTypes.object,
  slotProps: PropTypes.object,
  sx: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.bool])),
    PropTypes.bool,
  ]),
  paginationMode: PropTypes.oneOf(['client', 'server']),
  paginationModel: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
  }),
  onPaginationModelChange: PropTypes.func,
  rowCount: PropTypes.number,
  sortingMode: PropTypes.oneOf(['client', 'server']),
  sortModel: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      sort: PropTypes.oneOf(['asc', 'desc', null]),
    })
  ),
  onSortModelChange: PropTypes.func,
  ariaLabel: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  initialState: PropTypes.object,
  localeText: PropTypes.object,
  checkRowSelection: PropTypes.bool,
  onRowClick: PropTypes.func,
};

export default Table;
