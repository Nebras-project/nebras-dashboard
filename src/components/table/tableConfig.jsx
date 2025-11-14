import NoRowsMessage from './components/NoRowsMessage';
import TablePagination from './components/TablePagination';

export function buildSlotProps({ showToolbar, slotProps, t, pageSizeOptions }) {
  const userBasePagination = slotProps?.basePagination ?? {};
  const basePagination = {
    showFirstButton: userBasePagination.showFirstButton ?? true,
    showLastButton: userBasePagination.showLastButton ?? true,
    ...userBasePagination,
  };

  const resolvedPageSizeOptions = slotProps?.pagination?.pageSizeOptions?.length
    ? slotProps.pagination.pageSizeOptions
    : pageSizeOptions;

  const overlaySlotProps = {
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

  if (!showToolbar) {
    return {
      ...slotProps,
      basePagination,
      ...overlaySlotProps,
    };
  }

  return {
    ...slotProps,
    basePagination,
    ...overlaySlotProps,
    toolbar: {
      showQuickFilter: true,
      ...slotProps?.toolbar,
      quickFilterProps: {
        placeholder: t('table.toolbar.quickFilterPlaceholder'),
        quickFilterFormatter: (value) => t('table.toolbar.quickFilterValue', { value }),
        ...slotProps?.toolbar?.quickFilterProps,
      },
    },
  };
}

export function buildSlots({ slots, showToolbar }) {
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

  if (!showToolbar && mergedSlots.toolbar) {
    delete mergedSlots.toolbar;
  }

  return mergedSlots;
}

const localeTextMappings = (t) => ({
  toolbarColumns: t('table.toolbar.columns'),
  toolbarColumnsLabel: t('table.toolbar.columnsLabel'),
  toolbarFilters: t('table.toolbar.filters'),
  toolbarFiltersLabel: t('table.toolbar.filtersLabel'),
  toolbarFiltersTooltipHide: t('table.toolbar.filtersTooltipHide'),
  toolbarFiltersTooltipShow: t('table.toolbar.filtersTooltipShow'),
  toolbarDensity: t('table.toolbar.density'),
  toolbarDensityLabel: t('table.toolbar.densityLabel'),
  toolbarDensityCompact: t('table.toolbar.densityCompact'),
  toolbarDensityStandard: t('table.toolbar.densityStandard'),
  toolbarDensityComfortable: t('table.toolbar.densityComfortable'),
  toolbarExport: t('table.toolbar.export'),
  toolbarExportLabel: t('table.toolbar.exportLabel'),
  toolbarExportCSV: t('table.toolbar.exportCSV'),
  toolbarExportPrint: t('table.toolbar.exportPrint'),
  toolbarQuickFilterPlaceholder: t('table.toolbar.quickFilterPlaceholder'),
  toolbarQuickFilterLabel: t('table.toolbar.quickFilterLabel'),
  toolbarQuickFilterDeleteIconLabel: t('table.toolbar.quickFilterDeleteIconLabel'),
  columnMenuLabel: t('table.columnMenu.label'),
  columnMenuShowColumns: t('table.columnMenu.showColumns'),
  columnMenuManageColumns: t('table.columnMenu.manageColumns'),
  columnMenuFilter: t('table.columnMenu.filter'),
  columnMenuHideColumn: t('table.columnMenu.hideColumn'),
  columnMenuUnsort: t('table.columnMenu.unsort'),
  columnMenuSortAsc: t('table.columnMenu.sortAsc'),
  columnMenuSortDesc: t('table.columnMenu.sortDesc'),
  columnsManagementSearchTitle: t('table.columnsManagement.searchTitle'),
  columnsManagementNoColumns: t('table.columnsManagement.noColumns'),
  columnsManagementShowHideAllText: t('table.columnsManagement.showHideAll'),
  columnsManagementReset: t('table.columnsManagement.reset'),
  columnsManagementDeleteIconLabel: t('table.columnsManagement.deleteIconLabel'),
  columnHeaderFiltersTooltipActive: (count) =>
    t('table.columnHeader.filtersTooltipActive', { count }),
  columnHeaderFiltersTooltipInactive: t('table.columnHeader.filtersTooltipInactive'),
  columnHeaderFiltersLabel: t('table.columnHeader.filtersLabel'),
  columnHeaderSortIconLabel: t('table.columnHeader.sortIconLabel'),
  filterPanelAddFilter: t('table.filterPanel.addFilter'),
  filterPanelRemoveAll: t('table.filterPanel.removeAll'),
  filterPanelDeleteIconLabel: t('table.filterPanel.deleteIconLabel'),
  filterPanelColumns: t('table.filterPanel.columns'),
  filterPanelOperator: t('table.filterPanel.operator'),
  filterPanelInputLabel: t('table.filterPanel.inputLabel'),
  filterPanelInputPlaceholder: t('table.filterPanel.inputPlaceholder'),
  filterOperatorContains: t('table.filterOperators.contains'),
  filterOperatorDoesNotContain: t('table.filterOperators.doesNotContain'),
  filterOperatorEquals: t('table.filterOperators.equals'),
  filterOperatorDoesNotEqual: t('table.filterOperators.doesNotEqual'),
  filterOperatorStartsWith: t('table.filterOperators.startsWith'),
  filterOperatorEndsWith: t('table.filterOperators.endsWith'),
  filterOperatorIs: t('table.filterOperators.is'),
  filterOperatorNot: t('table.filterOperators.not'),
  filterOperatorAfter: t('table.filterOperators.after'),
  filterOperatorOnOrAfter: t('table.filterOperators.onOrAfter'),
  filterOperatorBefore: t('table.filterOperators.before'),
  filterOperatorOnOrBefore: t('table.filterOperators.onOrBefore'),
  filterOperatorIsEmpty: t('table.filterOperators.isEmpty'),
  filterOperatorIsNotEmpty: t('table.filterOperators.isNotEmpty'),
  filterOperatorIsAnyOf: t('table.filterOperators.isAnyOf'),
  'filterOperator=': t('table.filterOperators.equalsSymbol'),
  'filterOperator!=': t('table.filterOperators.notEqualSymbol'),
  'filterOperator>': t('table.filterOperators.greaterThanSymbol'),
  'filterOperator>=': t('table.filterOperators.greaterThanOrEqualSymbol'),
  'filterOperator<': t('table.filterOperators.lessThanSymbol'),
  'filterOperator<=': t('table.filterOperators.lessThanOrEqualSymbol'),
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
