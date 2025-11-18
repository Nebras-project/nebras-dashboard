import Chip from '@mui/material/Chip';

import { buildAdminColumn, TableProfileAvatar } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';
import { createPhoneRenderer } from '@utils/rtl';
import { buildRoleOptions } from '@utils/roleUtils';

const ADMIN_COLUMN_DEFINITIONS = {
  profileImg: {
    renderer: 'profileAvatar',
  },
  userName: {
    filterable: true,
  },
  role: {
    filterable: true,
    renderer: 'roleChip',
    valueOptionsFrom: 'roles',
  },
  email: {
    filterable: false,
  },
  phoneNumber: {
    filterable: false,
    renderer: 'phone',
  },
};

const RENDERERS = {
  profileAvatar:
    () =>
    ({ value, row }) =>
      <TableProfileAvatar user={{ ...row, avatar: value, profileImage: value }} size={36} />,
  phone: createPhoneRenderer,
  roleChip:
    (t) =>
    ({ value }) =>
      (
        <Chip
          label={t ? t(`admins.roles.${value}`) : value}
          size="small"
          color={['Owner', 'General Admin'].includes(value) ? 'primary' : 'default'}
          variant="outlined"
        />
      ),
};

const VALUE_OPTIONS = {
  roles: (t, { isOwner, isGeneralAdmin }) => buildRoleOptions(t, isOwner, isGeneralAdmin),
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
    renderers: RENDERERS,
    valueOptions: VALUE_OPTIONS,
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
