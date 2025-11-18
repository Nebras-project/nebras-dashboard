import { buildStudentColumns, TableProfileAvatar } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';
import { createPhoneRenderer } from '@utils/rtl';

const STUDENT_COLUMN_DEFINITIONS = {
  profileImg: {
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
