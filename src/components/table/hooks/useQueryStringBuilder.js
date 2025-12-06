function applyPaginationParams(params, paginationModel) {
  params.set('page', String(paginationModel.page + 1));
  params.set('limit', String(paginationModel.pageSize));
}

function applySortParams(params, sortModel) {
  const activeSort = sortModel?.[0];
  if (!activeSort?.field) {
    return;
  }

  params.set('sort', activeSort.field);
  params.set('order', activeSort.sort ?? 'asc');
}

/**
 * Apply custom filters from useDebouncedFilter to query params
 * @param {URLSearchParams} params - URL params object
 * @param {Object} customFilters - Filter params from useDebouncedFilter
 */
function applyCustomFilters(params, customFilters) {
  if (!customFilters || typeof customFilters !== 'object') {
    return;
  }

  Object.entries(customFilters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  });
}

export default function buildQueryString(paginationModel, sortModel, customFilters = {}) {
  const params = new URLSearchParams();

  applyPaginationParams(params, paginationModel);
  applySortParams(params, sortModel);

  // Apply custom filters from useDebouncedFilter
  applyCustomFilters(params, customFilters);

  return params.toString();
}

export { applyPaginationParams, applySortParams, applyCustomFilters };
