const DEFAULT_FILTER_OPERATOR = 'equals';
const FILTER_OPERATORS_WITHOUT_VALUE = new Set(['isEmpty', 'isNotEmpty']);
const FILTER_OPERATOR_ALIASES = Object.freeze({
  '=': 'equals',
  '!=': 'notEqual',
  '>': 'greaterThan',
  '>=': 'greaterThanOrEqual',
  '<': 'lessThan',
  '<=': 'lessThanOrEqual',
  startsWith: 'startsWith',
  endsWith: 'endsWith',
  contains: 'contains',
  doesNotContain: 'doesNotContain',
  is: 'equals',
  not: 'notEqual',
  isAnyOf: 'in',
  after: 'after',
  onOrAfter: 'onOrAfter',
  before: 'before',
  onOrBefore: 'onOrBefore',
});

function serializeFilterValue(value) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    const serializedEntries = value
      .map((entry) => serializeFilterValue(entry))
      .filter((entry) => entry !== undefined && entry !== null && entry !== '');

    if (!serializedEntries.length) {
      return undefined;
    }

    return serializedEntries.join(',');
  }

  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
  }

  if (typeof value === 'number' && Number.isNaN(value)) {
    return undefined;
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch (_error) {
    return String(value);
  }
}

function applyPaginationParams(params, paginationModel) {
  params.set('_page', String(paginationModel.page + 1));
  params.set('_limit', String(paginationModel.pageSize));
}

function applySortParams(params, sortModel) {
  const activeSort = sortModel?.[0];
  if (!activeSort?.field) {
    return;
  }

  params.set('sort', activeSort.field);
  params.set('order', activeSort.sort ?? 'asc');
}

function applyQuickFilterParams(params, filterModel) {
  const quickFilterValues = filterModel?.quickFilterValues?.filter(Boolean);
  if (!quickFilterValues?.length) {
    return;
  }

  params.set('q', quickFilterValues.join(' '));
}

function applyFilterLogicParam(params, filterModel) {
  if (!filterModel?.logicOperator) {
    return;
  }

  params.set('filter_logic', filterModel.logicOperator);
}

function getNormalizedOperator(operator) {
  return FILTER_OPERATOR_ALIASES[operator] ?? operator ?? DEFAULT_FILTER_OPERATOR;
}

function appendFilterItem(params, field, operator, value) {
  const normalizedOperator = getNormalizedOperator(operator);
  const requiresValue = !FILTER_OPERATORS_WITHOUT_VALUE.has(normalizedOperator);
  const serializedValue = serializeFilterValue(value);

  if (requiresValue && (serializedValue === undefined || serializedValue === null)) {
    return;
  }

  const valueToUse = requiresValue ? serializedValue : 'true';

  if (valueToUse === undefined || valueToUse === null || valueToUse === '') {
    return;
  }

  params.append('filter_field', field);
  params.append('filter_operator', normalizedOperator);
  params.append('filter_value', valueToUse);
}

function applyFilterItemParams(params, filterModel) {
  const filterItems = filterModel?.items?.filter((item) => item?.field);

  if (!filterItems?.length) {
    return;
  }

  filterItems.forEach(({ field, operator, value }) => {
    appendFilterItem(params, field, operator, value);
  });
}

export default function buildQueryString(paginationModel, sortModel, filterModel) {
  const params = new URLSearchParams();

  applyPaginationParams(params, paginationModel);
  applySortParams(params, sortModel);
  applyQuickFilterParams(params, filterModel);
  applyFilterLogicParam(params, filterModel);
  applyFilterItemParams(params, filterModel);

  return params.toString();
}

export {
  serializeFilterValue,
  applyPaginationParams,
  applySortParams,
  applyQuickFilterParams,
  applyFilterLogicParam,
  applyFilterItemParams,
  appendFilterItem,
  getNormalizedOperator,
  DEFAULT_FILTER_OPERATOR,
  FILTER_OPERATORS_WITHOUT_VALUE,
  FILTER_OPERATOR_ALIASES,
};
