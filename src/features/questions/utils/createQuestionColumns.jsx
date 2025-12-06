import { buildQuestionColumns } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';

const QUESTION_COLUMN_DEFINITIONS = {
  question: {
    filterable: false,
    sortable: false,
  },
  choices: {
    filterable: false,
    sortable: false,
  },
  correctChoice: {
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
  // Custom renderer for Year/Form column that combines Year and FormNumber
  const yearFormRenderer = ({ row }) => {
    const year = row.Year ?? row.year ?? null;
    const formNumber = row.FormNumber ?? row.formNumber ?? null;

    // Handle null/undefined/empty string cases
    const yearValue = year !== null && year !== undefined && year !== '' ? String(year) : null;
    const formValue =
      formNumber !== null && formNumber !== undefined && formNumber !== ''
        ? String(formNumber)
        : null;

    if (!yearValue && !formValue) {
      return '-';
    }

    const parts = [];
    if (yearValue) parts.push(yearValue);
    if (formValue) parts.push(formValue);

    return parts.join(' / ');
  };

  // Calculate column visibility based on type and category filters
  // Hide yearForm column for enrichment questions
  const yearFormVisible = category !== 'enrichment';

  // Hide img and choices columns for trueFalse questions
  const isTrueFalse = type === 'trueFalse';

  const combinedOverrides = {
    ...overrides,
    yearForm: {
      ...overrides.yearForm,
      renderCell: overrides.yearForm?.renderCell || yearFormRenderer,
      visible: yearFormVisible,
    },
    img: {
      ...overrides.img,
      visible: !isTrueFalse,
    },
    choices: {
      ...overrides.choices,
      visible: !isTrueFalse,
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
