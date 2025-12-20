import { buildManagerColumn } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';

import managerRenderers from './managerRenderers';

const MANAGER_COLUMN_DEFINITIONS = {
  userProfile: {
    filterable: false,
    sortable: false,
    renderer: 'profileAvatar',
  },
  userName: {
    filterable: false,
  },
  role: {
    filterable: false,
    renderer: 'roleChip',
  },
  email: {
    sortable: false,
    filterable: false,
  },
  phoneNumber: {
    filterable: false,
    renderer: 'phone',
  },
};

export default function createManagerColumns({
  t,
  includeActions,
  renderActions,
  rows,
  isOwner,
  isGeneralAdmin,
  overrides = {},
} = {}) {
  return createColumnsBase({
    columnDefinitions: MANAGER_COLUMN_DEFINITIONS,
    renderers: managerRenderers,
    buildColumnsFn: buildManagerColumn,
    t,
    includeActions,
    renderActions,
    rows,
    overrides,
    isOwner,
    isGeneralAdmin,
  });
}
