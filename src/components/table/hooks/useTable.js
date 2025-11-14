import { useCallback, useMemo, useState } from 'react';

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from '@config';

import buildQueryString from './useQueryStringBuilder';

const DEFAULT_PAGINATION_MODEL = Object.freeze({
  page: 0,
  pageSize: DEFAULT_PAGE_SIZE_OPTIONS[0] ?? DEFAULT_PAGE_SIZE,
});
const DEFAULT_FILTER_MODEL = Object.freeze({ items: [], quickFilterValues: [] });

export default function useTable({
  initialPaginationModel = DEFAULT_PAGINATION_MODEL,
  initialSortModel = [],
  initialFilterModel = DEFAULT_FILTER_MODEL,
} = {}) {
  const [paginationModel, setPaginationModel] = useState(() => ({
    page: initialPaginationModel.page,
    pageSize: initialPaginationModel.pageSize,
  }));

  const [sortModel, setSortModel] = useState(() => [...initialSortModel]);

  const [filterModel, setFilterModel] = useState(() => ({
    items: [...initialFilterModel.items],
    quickFilterValues: [...initialFilterModel.quickFilterValues],
    logicOperator: initialFilterModel.logicOperator,
  }));

  const queryString = useMemo(
    () => buildQueryString(paginationModel, sortModel, filterModel),
    [filterModel, paginationModel, sortModel]
  );

  const handlePaginationModelChange = useCallback((newModel) => {
    setPaginationModel(newModel);
  }, []);

  const handleSortModelChange = useCallback((newModel) => {
    setSortModel(newModel);
    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
  }, []);

  const handleFilterModelChange = useCallback((newModel) => {
    setFilterModel(newModel);
    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
  }, []);

  return {
    paginationModel,
    sortModel,
    filterModel,
    handlePaginationModelChange,
    handleSortModelChange,
    handleFilterModelChange,
    queryString,
  };
}
