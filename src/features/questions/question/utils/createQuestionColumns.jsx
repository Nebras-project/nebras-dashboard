import { buildQuestionColumns } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';
import { yearFormRenderer, choicesRenderer, typeRenderer, classRenderer } from './renderers';

const QUESTION_COLUMN_DEFINITIONS = {
  question: {
    field: 'text',
    filterable: false,
    sortable: false,
  },
  choices: {
    filterable: false,
    sortable: false,
  },
  type: {
    filterable: false,
    sortable: true,
  },
  class: {
    filterable: false,
    sortable: true,
  },
  subject: {
    field: 'subjectName',
    filterable: false,
    sortable: false,
  },
  unit: {
    field: 'unitName',
    filterable: false,
    sortable: false,
  },
  grade: {
    field: 'gradeName',
    filterable: false,
    sortable: false,
  },
  lesson: {
    field: 'lessonName',
    filterable: false,
    sortable: false,
  },
  yearForm: {
    filterable: false,
    sortable: true,
  },
};

export default function createQuestionColumns({
  t,
  includeActions,
  renderActions,
  rows,
  questionType,
  hiddenFields = [],
  visibleFields = [],
  class: classValue,
  overrides = {},
} = {}) {
  // Calculate column visibility based on type and class filters
  // Hide yearForm column for enrichment questions
  const yearFormHidden = classValue === 'Enrichment';

  // Keep choices visible for True/False questions

  const combinedOverrides = {
    ...overrides,
    yearForm: {
      ...overrides.yearForm,
      renderCell: overrides.yearForm?.renderCell || yearFormRenderer,
      hide: yearFormHidden,
    },
    choices: {
      ...overrides.choices,
      renderCell: overrides.choices?.renderCell || choicesRenderer,

    },
    type: {
      ...overrides.type,
      renderCell: overrides.type?.renderCell || typeRenderer(t),
    },
    class: {
      ...overrides.class,
      renderCell: overrides.class?.renderCell || classRenderer(t),
    },
  };

  return createColumnsBase({
    columnDefinitions: QUESTION_COLUMN_DEFINITIONS,
    buildColumnsFn: buildQuestionColumns,
    t,
    includeActions,
    renderActions,
    rows,
    overrides: combinedOverrides,
    questionType,
    hiddenFields,
    visibleFields,
  });
}
