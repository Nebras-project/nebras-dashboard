import Chip from '@mui/material/Chip';

import { buildStudentColumns, TableProfileAvatar } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';
import { createPhoneRenderer } from '@utils/rtl';
import { getClassLabel } from '@utils/roleUtils';

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
    renderer: 'classChip',
    valueOptionsFrom: 'classes',
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
  classChip:
    (t) =>
    ({ value }) => {
      return (
        <Chip
          label={t ? getClassLabel(value, t) : value}
          size="small"
          color="primary"
          variant="outlined"
        />
      );
    },
};

const VALUE_OPTIONS = {
  classes: (t) => [
    {
      value: 'third_secondary',
      label: t ? getClassLabel('third_secondary', t) : 'Third Secondary',
    },
    {
      value: 'ninth',
      label: t ? getClassLabel('ninth', t) : 'Ninth Grade',
    },
  ],
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
    valueOptions: VALUE_OPTIONS,
    buildColumnsFn: buildStudentColumns,
    t,
    includeActions,
    renderActions,
    overrides,
  });
}
