import NoRowsMessage from './components/NoRowsMessage';
import TablePagination from './components/TablePagination';

export function buildSlotProps({ slotProps, t, pageSizeOptions }) {
  const userBasePagination = slotProps?.basePagination ?? {};
  const basePagination = {
    showFirstButton: userBasePagination.showFirstButton ?? true,
    showLastButton: userBasePagination.showLastButton ?? true,
    ...userBasePagination,
  };

  const resolvedPageSizeOptions = slotProps?.pagination?.pageSizeOptions?.length
    ? slotProps.pagination.pageSizeOptions
    : pageSizeOptions;

  return {
    ...slotProps,
    basePagination,
    noRowsOverlay: {
      title: t('table.noRecords'),
      description: t('table.noRecordsDescription'),
      ...slotProps?.noRowsOverlay,
    },
    noResultsOverlay: {
      title: t('table.noRecordsFound'),
      description: t('table.noRecordsFoundDescription'),
      ...slotProps?.noResultsOverlay,
    },
    pagination: {
      showFirstButton: basePagination.showFirstButton,
      showLastButton: basePagination.showLastButton,
      ...slotProps?.pagination,
      pageSizeOptions: resolvedPageSizeOptions,
    },
  };
}

export function buildSlots({ slots }) {
  const mergedSlots = {
    ...slots,
  };

  if (!mergedSlots.noRowsOverlay) {
    mergedSlots.noRowsOverlay = NoRowsMessage;
  }

  if (!mergedSlots.noResultsOverlay) {
    mergedSlots.noResultsOverlay = NoRowsMessage;
  }

  if (!mergedSlots.pagination) {
    mergedSlots.pagination = TablePagination;
  }

  return mergedSlots;
}

const localeTextMappings = (t) => ({
  toolbarColumns: t('table.toolbar.columns'),
  toolbarColumnsLabel: t('table.toolbar.columnsLabel'),
  toolbarDensity: t('table.toolbar.density'),
  toolbarDensityLabel: t('table.toolbar.densityLabel'),
  toolbarDensityCompact: t('table.toolbar.densityCompact'),
  toolbarDensityStandard: t('table.toolbar.densityStandard'),
  toolbarDensityComfortable: t('table.toolbar.densityComfortable'),
  toolbarExport: t('table.toolbar.export'),
  toolbarExportLabel: t('table.toolbar.exportLabel'),
  toolbarExportCSV: t('table.toolbar.exportCSV'),
  toolbarExportPrint: t('table.toolbar.exportPrint'),
  columnMenuLabel: t('table.columnMenu.label'),
  columnMenuShowColumns: t('table.columnMenu.showColumns'),
  columnMenuManageColumns: t('table.columnMenu.manageColumns'),
  columnMenuHideColumn: t('table.columnMenu.hideColumn'),
  columnMenuUnsort: t('table.columnMenu.unsort'),
  columnMenuSortAsc: t('table.columnMenu.sortAsc'),
  columnMenuSortDesc: t('table.columnMenu.sortDesc'),
  columnsManagementSearchTitle: t('table.columnsManagement.searchTitle'),
  columnsManagementNoColumns: t('table.columnsManagement.noColumns'),
  columnsManagementShowHideAllText: t('table.columnsManagement.showHideAll'),
  columnsManagementReset: t('table.columnsManagement.reset'),
  columnsManagementDeleteIconLabel: t('table.columnsManagement.deleteIconLabel'),
  columnHeaderSortIconLabel: t('table.columnHeader.sortIconLabel'),
  noRowsLabel: t('table.noRecords'),
  noResultsOverlayLabel: t('table.noRecordsFound'),
  footerTotalRows: t('table.footer.totalRows'),
  footerRowSelected: (count) => t('table.footer.rowSelected', { count }),
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    t('table.footer.totalVisibleRows', { visibleCount, totalCount }),
  paginationRowsPerPage: t('table.pagination.rowsPerPage'),
  paginationDisplayedRows: ({ from, to, count, estimated }) =>
    t('table.pagination.displayedRows', { from, to, count, estimated }),
  paginationItemAriaLabel: (type) => t(`table.pagination.${type}`),
});

export function buildLocaleText({ t, localeText }) {
  return {
    ...localeText,
    ...localeTextMappings(t),
  };
}
