import { buildStudentColumns, TableProfileAvatar } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';
import { createPhoneRenderer } from '@utils/rtl';

const STUDENT_COLUMN_DEFINITIONS = {
  userProfile: {
    renderer: 'profileAvatar',
    sortable: false,
    filterable: false,
  },
  userName: {
    filterable: false,
    sortable: true,
  },
  email: {
    filterable: false,
    sortable: false,
  },
  curriculum: {
    filterable: false,
    sortable: false,
    field: 'Grade',
  },
  phoneNumber: {
    filterable: false,
    sortable: false,
    renderer: 'phone',
  },
};

const RENDERERS = {
  profileAvatar:
    () =>
    ({ value, row }) =>
      <TableProfileAvatar user={{ ...row, avatar: value, profileImage: value }} size={36} />,
  phone: createPhoneRenderer,
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
