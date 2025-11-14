import Chip from '@mui/material/Chip';

import { buildAdminColumn, TableProfileAvatar } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';

const ADMIN_ROLE_VALUES = [
  'Owner',
  'General Admin',
  'Curriculum Manager',
  'Competition Manager',
  'Content Manager',
];

const ADMIN_COLUMN_DEFINITIONS = {
  profileImg: {
    headerKey: 'table.columnHeaders.common.profileImage',
    sortable: false,
    filterable: false,
    width: 48,
    align: 'center',
    headerAlign: 'center',
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
  },
};

const RENDERERS = {
  profileAvatar:
    () =>
    ({ value, row }) =>
      <TableProfileAvatar user={{ ...row, avatar: value, profileImage: value }} size={36} />,
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
  roles: (t) =>
    ADMIN_ROLE_VALUES.map((value) => ({
      value,
      label: t ? t(`admins.roles.${value}`) : value,
    })),
};

export default function createAdminColumns({
  t,
  includeActions,
  renderActions,
  rows,
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
  });
}
