import { useMemo } from 'react';

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from '@config';

import { buildLocaleText, buildSlotProps, buildSlots } from '../tableConfig';

export default function useTableLayout({
  rows,
  rowCount,
  showToolbar,
  slotProps,
  slots,
  pageSizeOptions,
  localeText,
  initialState,
  sx,
  t,
}) {
  const resolvedPageSizeOptions = pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS;

  const defaultPageSize =
    resolvedPageSizeOptions[0] ?? DEFAULT_PAGE_SIZE_OPTIONS[0] ?? DEFAULT_PAGE_SIZE;

  const defaultInitialState = useMemo(
    () => ({
      pagination: {
        paginationModel: {
          pageSize: defaultPageSize,
          page: 0,
        },
      },
    }),
    [defaultPageSize]
  );

  const resolvedInitialState = useMemo(
    () => initialState ?? defaultInitialState,
    [defaultInitialState, initialState]
  );

  const resolvedSlotProps = useMemo(
    () => buildSlotProps({ showToolbar, slotProps, t, pageSizeOptions: resolvedPageSizeOptions }),
    [resolvedPageSizeOptions, showToolbar, slotProps, t]
  );

  const resolvedSlots = useMemo(() => buildSlots({ showToolbar, slots }), [showToolbar, slots]);

  const resolvedLocaleText = useMemo(() => buildLocaleText({ t, localeText }), [localeText, t]);

  const resolvedSx = useMemo(() => {
    const baseSx = {
      width: '100%',
      maxHeight: 'calc(100vh - 200px)',
    };

    if (!sx) {
      return baseSx;
    }

    if (Array.isArray(sx)) {
      return [baseSx, ...sx];
    }

    return [baseSx, sx];
  }, [sx]);

  const totalRows = rows?.length ?? 0;
  const effectiveRowCount = rowCount ?? totalRows;

  return {
    resolvedInitialState,
    resolvedSlotProps,
    resolvedSlots,
    resolvedLocaleText,
    resolvedSx,
    effectiveRowCount,
  };
}
