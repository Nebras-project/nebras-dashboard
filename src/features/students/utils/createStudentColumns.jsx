import { buildStudentColumns, TableProfileAvatar } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';

const STUDENT_COLUMN_DEFINITIONS = {
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
  email: {
    filterable: false,
  },
  class: {
    filterable: true,
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
};

export default function createStudentColumns({
  t,
  includeActions,
  renderActions,
  overrides = {},
} = {}) {
  return createColumnsBase({
    columnDefinitions: STUDENT_COLUMN_DEFINITIONS,
    renderers: RENDERERS,
    buildColumnsFn: buildStudentColumns,
    t,
    includeActions,
    renderActions,
    overrides,
  });
}
