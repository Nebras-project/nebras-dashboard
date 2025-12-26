import { buildAdminColumn } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';

import adminRenderers from './adminRenderers';

const ADMIN_COLUMN_DEFINITIONS = {
  profileImage: {
    filterable: false,
    sortable: false,
    renderer: 'profileAvatar',
  },
  userName: {
    filterable: false,
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

export default function createAdminColumns({
  t,
  includeActions,
  renderActions,
  rows,
  isOwner,
  isGeneralAdmin,
  overrides = {},
} = {}) {
  return createColumnsBase({
    columnDefinitions: ADMIN_COLUMN_DEFINITIONS,
    renderers: adminRenderers,
    buildColumnsFn: buildAdminColumn,
    t,
    includeActions,
    renderActions,
    rows,
    overrides,
    isOwner,
    isGeneralAdmin,
  });
}
