import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const defaultTransform = (rows, response) => ({
  rows,
  rowCount: Number(response.headers.get('x-total-count')) || rows.length,
});

async function defaultFetcher(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = new Error('Unable to load table data.');
    error.response = response;
    throw error;
  }

  return response;
}

export default function useServerData({
  endpoint,
  queryString = '',
  fetcher = defaultFetcher,
  transform = defaultTransform,
  requestOptions,
  enabled = true,
  immediate = true,
  initialRows,
  initialRowCount,
} = {}) {
  const defaultRowsRef = useRef([]);
  const resolvedInitialRows = initialRows ?? defaultRowsRef.current;
  const resolvedInitialRowCount =
    typeof initialRowCount === 'number' ? initialRowCount : resolvedInitialRows.length;

  const [rows, setRows] = useState(resolvedInitialRows);
  const [rowCount, setRowCount] = useState(resolvedInitialRowCount);
  const [loading, setLoading] = useState(Boolean(immediate && enabled));
  const [error, setError] = useState(null);

  const abortControllerRef = useRef();

  const requestUrl = useMemo(() => {
    if (!endpoint) {
      return null;
    }

    if (!queryString) {
      return endpoint;
    }

    const hasQuery = endpoint.includes('?');
    return `${endpoint}${hasQuery ? '&' : '?'}${queryString}`;
  }, [endpoint, queryString]);

  const cancelRequest = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = undefined;
  }, []);

  const fetchData = useCallback(async () => {
    if (!requestUrl || !enabled) {
      return;
    }

    cancelRequest();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const response = await fetcher(requestUrl, {
        signal: controller.signal,
        ...requestOptions,
      });

      const data = await response.json();
      const result = transform(data, response);

      setRows(result.rows);
      setRowCount(result.rowCount);
    } catch (err) {
      if (controller.signal.aborted) {
        return;
      }

      setError(err);
      setRows(resolvedInitialRows);
      setRowCount(resolvedInitialRowCount);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [
    requestUrl,
    enabled,
    cancelRequest,
    fetcher,
    requestOptions,
    transform,
    resolvedInitialRows,
    resolvedInitialRowCount,
  ]);

  useEffect(() => {
    if (!immediate) {
      return undefined;
    }

    fetchData();

    return cancelRequest;
  }, [fetchData, cancelRequest, immediate]);

  useEffect(() => {
    setRows(resolvedInitialRows);
    setRowCount(resolvedInitialRowCount);
  }, [resolvedInitialRows, resolvedInitialRowCount]);

  return {
    rows,
    rowCount,
    loading,
    error,
    refetch: fetchData,
    cancel: cancelRequest,
  };
}
