import PropTypes from 'prop-types';

/**
 * Central registry for table column definitions used across Nebras tables.
 * Each entry keeps the data field, translation key, and sensible defaults.
 */
const columnRegistry = {
  email: {
    field: 'Email',
    headerKey: 'table.columnHeaders.common.email',
    minWidth: 200,
    flex: 1,
  },
  userName: {
    field: 'UserName',
    headerKey: 'table.columnHeaders.common.userName',
    minWidth: 150,
    flex: 0.6,
  },
  role: {
    field: 'Role',
    headerKey: 'table.columnHeaders.common.role',
    minWidth: 100,
    flex: 0.7,
  },
  profileImg: {
    field: 'ProfileImg',
    headerKey: 'table.columnHeaders.common.profileImage',
    minWidth: 40,
    flex: 0.4,
  },
  phoneNumber: {
    field: 'PhoneNumber',
    headerKey: 'table.columnHeaders.common.phoneNumber',
    minWidth: 100,
    flex: 0.5,
  },
  score: {
    field: 'Score',
    headerKey: 'table.columnHeaders.competitions.score',
    minWidth: 140,
    flex: 0.8,
  },
  class: {
    field: 'Class',
    headerKey: 'table.columnHeaders.common.class',
    minWidth: 140,
    flex: 0.8,
  },
  name: {
    field: 'Name',
    headerKey: 'table.columnHeaders.common.name',
    minWidth: 200,
    flex: 1,
  },
  gradeName: {
    field: 'Grade',
    headerKey: 'table.columnHeaders.competitions.gradeName',
    minWidth: 160,
    flex: 1,
  },
  level: {
    field: 'Level',
    headerKey: 'table.columnHeaders.competitions.level',
    minWidth: 140,
    flex: 0.8,
  },
  curriculum: {
    field: 'Curriculum',
    headerKey: 'table.columnHeaders.competitions.curriculum',
    minWidth: 160,
    flex: 1,
  },
  preparationStatus: {
    field: 'PreparationStatus',
    headerKey: 'table.columnHeaders.competitions.preparationStatus',
    minWidth: 180,
    flex: 1,
  },
  runningState: {
    field: 'RunningState',
    headerKey: 'table.columnHeaders.competitions.runningState',
    minWidth: 180,
    flex: 1,
  },
  startDate: {
    field: 'StartDate',
    headerKey: 'table.columnHeaders.common.startDate',
    minWidth: 180,
    flex: 1,
  },
  endDate: {
    field: 'EndDate',
    headerKey: 'table.columnHeaders.common.endDate',
    minWidth: 180,
    flex: 1,
  },
  question: {
    field: 'Question',
    headerKey: 'table.columnHeaders.questions.question',
    minWidth: 260,
    flex: 1.5,
  },
  choices: {
    field: 'Choices',
    headerKey: 'table.columnHeaders.questions.choices',
    minWidth: 220,
    flex: 1.2,
  },
  correctChoice: {
    field: 'CorrectChoice',
    headerKey: 'table.columnHeaders.questions.correctChoice',
    minWidth: 180,
    flex: 1,
  },
  img: {
    field: 'Img',
    headerKey: 'table.columnHeaders.questions.image',
    minWidth: 140,
    flex: 0.8,
  },
  state: {
    field: 'State',
    headerKey: 'table.columnHeaders.questions.state',
    minWidth: 160,
    flex: 1,
  },
  type: {
    field: 'Type',
    headerKey: 'table.columnHeaders.questions.type',
    minWidth: 160,
    flex: 1,
  },
  manager: {
    field: 'Manager',
    headerKey: 'table.columnHeaders.common.manager',
    minWidth: 200,
    flex: 1,
  },
  lesson: {
    field: 'Lesson',
    headerKey: 'table.columnHeaders.questions.lesson',
    minWidth: 200,
    flex: 1,
  },
  formNumber: {
    field: 'FormNumber',
    headerKey: 'table.columnHeaders.questions.formNumber',
    minWidth: 140,
    flex: 0.8,
  },
  year: {
    field: 'Year',
    headerKey: 'table.columnHeaders.questions.year',
    minWidth: 140,
    flex: 0.8,
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

export function buildAdminColumn(options = {}) {
  const { includeActions = true } = options;
  return buildColumns(['profileImg', 'userName', 'email', 'role', 'phoneNumber'], {
    ...options,
    includeActions,
  });
}

export function buildStudentColumns(options = {}) {
  const { includeActions = true } = options;
  return buildColumns(['profileImg', 'userName', 'class', 'email', 'phoneNumber'], {
    ...options,
    includeActions,
  });
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
    questionType,
    hiddenFields = [],
    visibleFields,
    overrides,
  } = options;

  let keys = [
    'question',
    'choices',
    'correctChoice',
    'img',
    'state',
    'type',
    'manager',
    'lesson',
    'formNumber',
    'year',
  ];

  if (Array.isArray(visibleFields) && visibleFields.length) {
    keys = visibleFields;
  } else if (questionType && QUESTION_TYPES_WITHOUT_YEAR.has(questionType.toLowerCase())) {
    keys = keys.filter((key) => key !== 'formNumber' && key !== 'year');
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
