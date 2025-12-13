import { buildQuestionColumns } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';
import {
  yearFormRenderer,
  choicesRenderer,
  typeRenderer,
  categoryRenderer,
} from './questionRenderers';

const QUESTION_COLUMN_DEFINITIONS = {
  question: {
    filterable: false,
    sortable: false,
  },
  choices: {
    filterable: false,
    sortable: false,
  },
  correctAnswer: {
    filterable: false,
    sortable: false,
  },
  img: {
    sortable: false,
    filterable: false,
  },
  type: {
    filterable: false,
    sortable: true,
  },
  category: {
    filterable: false,
    sortable: true,
  },
  subject: {
    filterable: false,
    sortable: false,
  },
  unit: {
    filterable: false,
    sortable: false,
  },
  curriculum: {
    filterable: false,
    sortable: false,
    
  },
  lesson: {
    filterable: false,
    sortable: false,
  },
  yearForm: {
    filterable: false,
    sortable: true,
  },
  addedBy: {
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
  visibleFields,
  type,
  category,
  overrides = {},
} = {}) {
  // Calculate column visibility based on type and category filters
  // Hide yearForm column for enrichment questions
  const yearFormHidden = category === 'Enrichment';

  // Hide img and choices columns for trueFalse questions
  const isTrueFalse = type === 'TrueFalse';

  const combinedOverrides = {
    ...overrides,
    yearForm: {
      ...overrides.yearForm,
      renderCell: overrides.yearForm?.renderCell || yearFormRenderer,
      hide: yearFormHidden,
    },
    img: {
      ...overrides.img,
      hide: isTrueFalse,
    },
    choices: {
      ...overrides.choices,
      renderCell: overrides.choices?.renderCell || choicesRenderer,
      hide: isTrueFalse,
    },
    type: {
      ...overrides.type,
      renderCell: overrides.type?.renderCell || typeRenderer(t),
    },
    category: {
      ...overrides.category,
      renderCell: overrides.category?.renderCell || categoryRenderer(t),
    },
    addedBy: {
      ...overrides.addedBy,
      description: t('users.contentManager'),
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
