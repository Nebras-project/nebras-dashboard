import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import {
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  gridRowCountSelector,
} from '@mui/x-data-grid';

export default function usePagination({ pageSizeOptions: pageSizeOptionsProp } = {}) {
  const apiRef = useGridApiContext();

  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const rowCount = useGridSelector(apiRef, gridRowCountSelector);

  const pageSizeOptions = useMemo(() => {
    let options = [];

    if (Array.isArray(pageSizeOptionsProp) && pageSizeOptionsProp.length) {
      options = pageSizeOptionsProp;
    } else {
      const stateOptions = apiRef.current?.state?.pagination?.pageSizeOptions;
      if (Array.isArray(stateOptions) && stateOptions.length) {
        options = stateOptions;
      } else {
        const rootOptions = apiRef.current?.rootProps?.pageSizeOptions;
        if (Array.isArray(rootOptions) && rootOptions.length) {
          options = rootOptions;
        }
      }
    }

    // Filter options based on actual row count
    // Only show options that are less than or equal to rowCount
    if (rowCount && rowCount > 0 && options.length > 0) {
      const filtered = options.filter((option) => option <= rowCount);

      // Always include current pageSize if it's valid (even if not in original options)
      if (pageSize > 0 && pageSize <= rowCount && !filtered.includes(pageSize)) {
        filtered.push(pageSize);
      }

      // Sort and remove duplicates
      const uniqueOptions = [...new Set(filtered)].sort((a, b) => a - b);

      // Ensure we have at least one option (the rowCount itself if nothing else)
      return uniqueOptions.length > 0 ? uniqueOptions : [rowCount];
    }

    return options;
  }, [apiRef, pageSizeOptionsProp, rowCount, pageSize]);

  const showPageSizeSelect = pageSizeOptions.length > 1;

  const formMethods = useForm({
    defaultValues: { pageSize },
  });

  useEffect(() => {
    formMethods.reset({ pageSize });
  }, [formMethods, pageSize]);

  const selectedPageSize = useWatch({
    control: formMethods.control,
    name: 'pageSize',
  });

  useEffect(() => {
    if (!showPageSizeSelect) {
      return;
    }

    const parsedValue = Number(selectedPageSize);
    if (Number.isNaN(parsedValue) || parsedValue === pageSize) {
      return;
    }

    apiRef.current.setPageSize(parsedValue);
  }, [apiRef, pageSize, selectedPageSize, showPageSizeSelect]);

  const handlePageChange = (_, value) => {
    apiRef.current.setPage(value - 1);
  };

  return {
    page,
    pageCount,
    pageSize,
    rowCount,
    pageSizeOptions,
    showPageSizeSelect,
    formMethods,
    handlePageChange,
  };
}
