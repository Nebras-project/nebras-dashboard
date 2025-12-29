import { buildStudentColumns } from '@components/table';
import { createColumnsBase } from '@components/table/utils/createColumnsBase';
import RENDERERS from './studentRenderers';

const STUDENT_COLUMN_DEFINITIONS = {
  profileImage: {
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
  grade: {
    filterable: false,
    sortable: false,
    field: 'gradeName',
    renderer: 'grade',
  },
  phoneNumber: {
    filterable: false,
    sortable: false,
    renderer: 'phone',
  },
};

// renderers are imported from ./studentRenderers

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
