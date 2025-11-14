import { buildQuestionColumns } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';

const QUESTION_COLUMN_DEFINITIONS = {
  question: {
    filterable: true,
  },
  choices: {
    filterable: false,
  },
  correctChoice: {
    filterable: false,
  },
  img: {
    sortable: false,
    filterable: false,
  },
  state: {
    filterable: true,
  },
  type: {
    filterable: true,
  },
  manager: {
    filterable: false,
  },
  lesson: {
    filterable: true,
  },
  formNumber: {
    filterable: false,
  },
  year: {
    filterable: false,
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
  overrides = {},
} = {}) {
  return createColumnsBase({
    columnDefinitions: QUESTION_COLUMN_DEFINITIONS,
    buildColumnsFn: buildQuestionColumns,
    t,
    includeActions,
    renderActions,
    rows,
    overrides,
    questionType,
    hiddenFields,
    visibleFields,
  });
}
