import { buildCompetitionColumns } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';

const COMPETITION_COLUMN_DEFINITIONS = {
  name: {
    filterable: true,
  },
  curriculum: {
    filterable: true,
  },
  score: {
    filterable: true,
  },
  manager: {
    filterable: false,
  },
  preparationStatus: {
    filterable: true,
  },
  runningState: {
    filterable: true,
  },
  startDate: {
    filterable: false,
  },
  endDate: {
    filterable: false,
  },
};

export default function createCompetitionColumns({
  t,
  includeActions,
  renderActions,
  rows,
  overrides = {},
} = {}) {
  return createColumnsBase({
    columnDefinitions: COMPETITION_COLUMN_DEFINITIONS,
    buildColumnsFn: buildCompetitionColumns,
    t,
    includeActions,
    renderActions,
    rows,
    overrides,
  });
}
