import { buildMinisterialFormColumns } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';

import ministerialFormRenderers from './ministerialFormRenderers';

const MINISTERIAL_FORM_COLUMN_DEFINITIONS = {
  formNumber: {
    filterable: false,
  },
  year: {
    filterable: false,
  },
  gradeName: {
    filterable: false,
    renderer: 'gradeChip',
  },
  subjectName: {
    filterable: false,
    renderer: 'subjectChip',
  },
};

export default function createMinisterialFormColumns({
  t,
  includeActions = true,
  renderActions,
  overrides = {},
} = {}) {
  return createColumnsBase({
    columnDefinitions: MINISTERIAL_FORM_COLUMN_DEFINITIONS,
    renderers: ministerialFormRenderers,
    buildColumnsFn: buildMinisterialFormColumns,
    t,
    includeActions,
    renderActions,
    overrides,
  });
}
