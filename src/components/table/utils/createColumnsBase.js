/**
 * Base function for creating table columns with common logic
 * This removes code duplication across createAdminColumns, createStudentColumns, etc.
 */
export function createColumnsBase({
  columnDefinitions,
  renderers = {},
  valueOptions = {},
  buildColumnsFn,
  t,
  includeActions,
  renderActions,
  overrides = {},
  // Additional options for specific column types (e.g., questionType for questions)
  ...additionalOptions
} = {}) {
  const combinedColumns = { ...columnDefinitions, ...overrides };
  const columnOverrides = {};

  // Helper to resolve renderer
  function resolveRenderer(key, translate) {
    const factory = key ? renderers[key] : undefined;
    return factory ? factory(translate) : undefined;
  }

  // Helper to resolve value options
  function resolveValueOptions(key, translate) {
    const factory = key ? valueOptions[key] : undefined;
    return factory ? factory(translate) : undefined;
  }

  Object.entries(combinedColumns).forEach(([key, config]) => {
    const { headerKey, renderer, valueOptionsFrom, ...rest } = config;
    const columnConfig = { ...rest };

    if (headerKey && t) {
      columnConfig.headerName = t(headerKey);
    }

    const renderCell = resolveRenderer(renderer, t);
    if (renderCell) {
      columnConfig.renderCell = renderCell;
    }

    const valueOptionsResolved = resolveValueOptions(valueOptionsFrom, t);
    if (valueOptionsResolved) {
      columnConfig.valueOptions = valueOptionsResolved;
      columnConfig.type = 'singleSelect';
    }

    columnOverrides[key] = columnConfig;
  });

  const buildOptions = {
    t,
    overrides: columnOverrides,
    ...additionalOptions,
  };

  if (typeof includeActions === 'boolean') {
    buildOptions.includeActions = includeActions;
  }

  if (renderActions) {
    buildOptions.renderActions = renderActions;
  }


  return buildColumnsFn(buildOptions);
}
