import PropTypes from 'prop-types';

/**
 * Central registry for table column definitions used across Nebras tables.
 * Each entry keeps the data field, translation key, and sensible defaults.
 */
const columnRegistry = {
  email: {
    field: 'email',
    headerKey: 'table.columnHeaders.common.email',
    minWidth: 200,
    flex: 1,
  },
  userName: {
    field: 'userName',
    headerKey: 'table.columnHeaders.common.userName',
    minWidth: 150,
    flex: 0.6,
  },
  role: {
    field: 'role',
    headerKey: 'table.columnHeaders.common.permissions',
    minWidth: 100,
    flex: 0.7,
  },
  profileImage: {
    field: 'profileImage',
    headerKey: 'table.columnHeaders.common.profileImage',
    sortable: false,
    filterable: false,
    width: 48,
    align: 'center',
    headerAlign: 'center',
    minWidth: 40,
    flex: 0.4,
  },
  phoneNumber: {
    field: 'phoneNumber',
    headerKey: 'table.columnHeaders.common.phoneNumber',
    minWidth: 100,
    flex: 0.5,
  },
  name: {
    field: 'name',
    headerKey: 'table.columnHeaders.common.name',
    minWidth: 200,
    flex: 1,
  },
  question: {
    field: 'question',
    headerKey: 'table.columnHeaders.questions.question',
    minWidth: 260,
    flex: 1.5,
  },
  choices: {
    field: 'choices',
    headerKey: 'table.columnHeaders.questions.choices',
    minWidth: 220,
    flex: 1.2,
  },
  correctAnswer: {
    field: 'correctAnswer',
    headerKey: 'table.columnHeaders.questions.correctAnswer',
    minWidth: 180,
    flex: 1,
  },
  img: {
    field: 'image',
    headerKey: 'table.columnHeaders.questions.image',
    minWidth: 140,
    flex: 0.8,
    align: 'center',
    headerAlign: 'center',
  },
  state: {
    field: 'state',
    headerKey: 'table.columnHeaders.questions.state',
    minWidth: 160,
    flex: 1,
  },
  type: {
    field: 'type',
    headerKey: 'table.columnHeaders.questions.type',
    minWidth: 160,
    flex: 1,
  },
  category: {
    field: 'category',
    headerKey: 'table.columnHeaders.questions.category',
    minWidth: 160,
    flex: 1,
  },
  lesson: {
    field: 'lesson',
    headerKey: 'table.columnHeaders.questions.lesson',
    minWidth: 200,
    flex: 1,
  },
  unit: {
    field: 'unit',
    headerKey: 'table.columnHeaders.questions.unit',
    minWidth: 180,
    flex: 1,
  },
  subject: {
    field: 'subject',
    headerKey: 'table.columnHeaders.questions.subject',
    minWidth: 180,
    flex: 1,
  },
  curriculum: {
    field: 'grade',
    headerKey: 'table.columnHeaders.questions.curriculum',
    minWidth: 160,
    flex: 1,
  },

  yearForm: {
    field: 'yearForm',
    headerKey: 'table.columnHeaders.questions.yearForm',
    minWidth: 160,
    flex: 1,
  },
  addedBy: {
    field: 'addedBy',
    headerKey: 'table.columnHeaders.questions.addedBy',
    minWidth: 200,
    flex: 1,
  },
  actions: (options = {}) => {
    const width = options.actionsWidth ?? 80;
    const renderActions = options.renderActions ?? options.actionsRenderer;

    return {
      field: 'actions',
      headerKey: 'common.actions',
      type: 'actions',
      width,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: renderActions ?? (() => null),
    };
  },
};

function resolveHeaderName({ headerKey, headerName }, translate) {
  if (typeof translate === 'function' && headerKey) {
    return translate(headerKey);
  }

  if (headerName) {
    return headerName;
  }

  return headerKey;
}

function cloneColumn(column, translate, options) {
  const config = typeof column === 'function' ? column(options) : column;
  const { headerKey, headerName, ...rest } = config;

  return {
    ...rest,
    headerName: resolveHeaderName({ headerKey, headerName }, translate),
  };
}

/**
 * Generic column builder that fetches definitions from the registry.
 */
export function buildColumns(keys, options = {}) {
  const { overrides = {}, t, hiddenFields = [], includeActions = false } = options;

  const result = [];

  keys.forEach((key) => {
    if (hiddenFields.includes(key)) {
      return;
    }

    const column = columnRegistry[key];

    if (!column) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn(`[tableColumns] Unknown column key "${key}"`);
      }
      return;
    }

    const resolved = cloneColumn(column, t, options);
    const override = overrides[key];

    result.push(override ? { ...resolved, ...override } : resolved);
  });

  if (includeActions) {
    const actionsColumn = cloneColumn(columnRegistry.actions, t, options);
    const override = overrides.actions;
    result.push(override ? { ...actionsColumn, ...override } : actionsColumn);
  }

  return result;
}

const USER_COLUMN_KEYS = {
  admin: ['profileImage', 'userName', 'email', 'phoneNumber'],
  manager: ['profileImage', 'userName', 'email', 'role', 'phoneNumber'],
  student: ['profileImage', 'userName', 'email', 'curriculum', 'phoneNumber'],
};

/**
 * Build columns for user-like tables (admins, students, ...).
 *
 * @param {Object} options
 * @param {'admin'|'student'} options.variant - Type of user table
 * @param {boolean} [options.includeActions=true] - Whether to include actions column
 * @returns {Array} columns definition for DataGrid
 */
export function buildUserColumns(options = {}) {
  const { variant = 'admin', includeActions = true, ...rest } = options;
  const keys = USER_COLUMN_KEYS[variant] || USER_COLUMN_KEYS.admin;

  return buildColumns(keys, {
    ...rest,
    includeActions,
  });
}

export function buildAdminColumn(options = {}) {
  return buildUserColumns({ variant: 'admin', ...options });
}

export function buildManagerColumn(options = {}) {
  return buildUserColumns({ variant: 'manager', ...options });
}

export function buildStudentColumns(options = {}) {
  return buildUserColumns({ variant: 'student', ...options });
}

export function buildCompetitionColumns(options = {}) {
  const { includeActions = true } = options;
  return buildColumns(
    [
      'name',
      'curriculum',
      'grade',
      'manager',
      'preparationStatus',
      'runningState',
      'startDate',
      'endDate',
    ],
    {
      ...options,
      includeActions,
    }
  );
}

export const QUESTION_TYPES_WITHOUT_YEAR = new Set(['enrichment']);

export function buildQuestionColumns(options = {}) {
  const {
    includeActions = true,

    hiddenFields = [],
    overrides,
  } = options;

  let keys = [
    'img',
    'question',
    'choices',
    'correctAnswer',
    'type',
    'category',
    'curriculum',
    'subject',
    'unit',
    'lesson',
    'yearForm',
    'addedBy',
  ];

  // Filter out columns that have hide: true in overrides
  if (overrides) {
    keys = keys.filter((key) => {
      const override = overrides[key];
      return !(override && override.hide === true);
    });
  }

  const mergedHiddenFields = Array.isArray(hiddenFields) ? hiddenFields : [];

  return buildColumns(keys, {
    ...options,
    hiddenFields: mergedHiddenFields,
    overrides,
    includeActions,
  });
}

export const columnPropTypes = PropTypes.shape({
  field: PropTypes.string.isRequired,
  headerName: PropTypes.string,
});

export default columnRegistry;
