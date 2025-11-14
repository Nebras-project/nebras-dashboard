# Table Module

Reusable wrapper around MUI X `DataGrid` with opinionated defaults tailored for the Nebras Dashboard. The module exposes composable hooks and UI primitives so feature teams can extend the table without rewriting core wiring.

## Directory Overview

- `index.js`: Barrel file exporting the table component, hooks, and commonly used sub-components.
- `Table.jsx`: Presentation component that configures `DataGrid` (density, toolbar, localization, layout, slot wiring).
- `tableConfig.jsx`: Shared configuration helpers for slots, slotProps, locale text, and density presets.
- `components/`
  - `TablePagination.jsx`: Responsive pagination layout combining the counter, controls, and page-size selector.
  - `pagination/TablePaginationCounter.jsx`: “x–y of z” counter with i18n-friendly rendering.
  - `pagination/TablePaginationControls.jsx`: Tooltip-aware wrapper around MUI's `Pagination`.
  - `pagination/TablePageSizeSelector.jsx`: Page-size dropdown integrated with `react-hook-form`.
  - `NoRowsMessage.jsx`: Empty-state overlay used for both “no rows” and “no results”.
  - `RowActionsMenu.jsx`: Reusable vertical-ellipsis menu for per-row actions.
- `hooks/`
  - `useTable.js`: Local state for pagination, sorting, filtering, and deriving `queryString`.
  - `useServerData.js`: Fetches row data, tracks loading/error, and normalises `rowCount`.
  - `usePagination.js`: Bridges DataGrid pagination state with the custom pagination components.
  - `useTableLayout.js`: Computes responsive sizing/layout behaviour for table containers.
  - `useQueryStringBuilder.js`: Converts pagination/sort/filter models into REST-friendly query strings.
- `examples/`
  - `SampleTable.jsx`: Demonstrates server-side pagination with row actions against JSONPlaceholder.
  - `index.js`: Re-exports bundled examples for Storybook or documentation sandboxes.

## Public API

```js
import Table, {
  RowActionsMenu,
  TablePagination,
  TablePaginationCounter,
  TablePaginationControls,
  TablePageSizeSelector,
  useTable,
  useServerData,
  usePagination,
  useTableLayout,
  buildColumns,
  buildAdminColumn,
  buildStudentColumns,
  buildQuestionColumns,
  buildCompetitionColumns,
  QUESTION_TYPES_WITHOUT_YEAR,
} from '@components/table';
```

Most consumers stick to `Table`, `useTable`, and `useServerData`. The additional exports exist for advanced or bespoke scenarios.

### Hooks

- `useTable`: Drives local state for pagination, sorting, and filtering (client or server). Produces a `queryString` compatible with REST endpoints.
- `useServerData`: Accepts an endpoint (and optional `fetcher`/`transform`) to retrieve rows, compute `rowCount`, and expose `loading`, `error`, and `refetch`.
- `usePagination`: Provides the reactive pagination state used by `TablePagination` and friends. Handles page changes and synchronises page-size updates with the DataGrid.
- `useTableLayout`: Supplies responsive layout helpers (auto height vs fixed height, compact spacing, etc.).
- `useQueryStringBuilder`: Lower-level helper that maps model changes into a URL search string. Usually consumed by `useTable`.

### Components

- `Table`: Default export wrapping MUI X `DataGrid` with Nebras styling, slot defaults, and localisation.
- `NoRowsMessage`: Empty-state overlay used by default for both “no rows” and “no results”. Can be overridden via `slotProps` or imported directly.
- `RowActionsMenu`: MUI `Menu` backed action list for per-row operations. Accepts `actions` (label, icon, onClick, disabled, hidden).
- `TablePagination`: Composite pagination footer that adapts between column and row layouts on smaller screens.
- `TablePaginationCounter`: Renders the localized “from–to of total” text via a supplied `textBuilder`.
- `TablePaginationControls`: Adds tooltips and responsive spacing to MUI `Pagination`.
- `TablePageSizeSelector`: `SelectInput` wired to `react-hook-form` to keep the grid’s page size in sync.

### Column builders

- `buildColumns(keys, options)`: Low-level helper that maps registry keys to column definitions. Supports overrides, translation via `t`, hiding fields, and injecting a consistent actions column.
- `buildAdminColumn(options)`: Returns the managers table shape (Email, User Name, Role, Profile Image, Phone Number) with optional actions.
- `buildStudentColumns(options)`: Returns the students table shape (Email, User Name, Grade, Profile Image, Phone Number) with optional actions.
- `buildQuestionColumns({ questionType, visibleFields, ...options })`: Builds the questions table columns. All columns are included by default; enrichment questions (case-insensitive match of `QUESTION_TYPES_WITHOUT_YEAR`) omit `FormNumber` and `Year` automatically. Pass `visibleFields` when a filtered subset is required.
- `buildCompetitionColumns(options)`: Returns the competitions table shape (Name, Start Date, End Date, Grade, Grade Name, Preparation Status, Running State, Manager) with optional actions.
- `QUESTION_TYPES_WITHOUT_YEAR`: Set of question types that should hide `FormNumber` and `Year`; can be extended per domain needs.

Each helper accepts:

- `includeActions` (default `true`): toggle the actions column.
- `renderActions` / `actionsRenderer`: render function for the actions cell (falls back to a noop renderer).
- `overrides`: per-column overrides (e.g., `{ email: { flex: 1.4 } }`).
- `hiddenFields`: array of registry keys to omit without redefining the order.
- `t`: inject a translation function when building columns outside of a hook/component that already has access to `useTranslation`.

## Usage

```jsx
import Table, { useTable, useServerData } from '@components/table';

const tableState = useTable();

const { rows, rowCount, loading } = useServerData({
  endpoint: '/api/items',
  queryString: tableState.queryString,
});

return (
  <Table
    rows={rows}
    columns={columns}
    loading={loading}
    paginationMode="server"
    paginationModel={tableState.paginationModel}
    onPaginationModelChange={tableState.handlePaginationModelChange}
    sortingMode="server"
    sortModel={tableState.sortModel}
    onSortModelChange={tableState.handleSortModelChange}
    filterMode="server"
    filterModel={tableState.filterModel}
    onFilterModelChange={tableState.handleFilterModelChange}
  />
);
```

### Server data integration

Inject a custom `fetcher` or `transform` when backend contracts differ from the defaults:

```js
const { rows, rowCount } = useServerData({
  endpoint: '/api/items',
  queryString,
  fetcher: (url, options) => authenticatedClient.get(url, options),
  transform: (payload) => ({
    rows: payload.items,
    rowCount: payload.meta.total,
  }),
});
```

### Row actions menu

```jsx
import Table, { RowActionsMenu } from '@components/table';

const columns = [
  // ...
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => (
      <RowActionsMenu
        tooltip="Actions"
        actions={[
          { label: 'Edit', onClick: () => editItem(row.id) },
          { label: 'Delete', onClick: () => deleteItem(row.id) },
        ]}
      />
    ),
  },
];
```

Each action accepts `label`, optional `icon`, `onClick`, and can be conditionally `hidden` or `disabled`.

### Pagination

The table uses MUI's `Pagination` component via the `pagination` slot:

```jsx
<Table
  rows={rows}
  columns={columns}
  slotProps={{
    pagination: {
      showFirstButton: false,
      color: 'secondary',
    },
  }}
/>
```

#### Pagination building blocks

The `components/pagination/` directory houses primitives for reuse outside the default slot:

- `TablePagination`: Responsive wrapper combining counter, controls, and page-size selector.
- `TablePaginationCounter`: I18n-aware “x–y of z” renderer. Supply a `textBuilder` to format the copy.
- `TablePaginationControls`: Tooltip-enabled pagination controls that respect responsive spacing.
- `TablePageSizeSelector`: Page-size dropdown connected to the DataGrid via `react-hook-form`.

Pick and mix these pieces when building bespoke footers.

### Empty state overlay

`Table` registers `NoRowsMessage` for both “no rows” and “no results”. Override copy or append actions with `slotProps`:

```jsx
<Table
  rows={rows}
  columns={columns}
  slotProps={{
    noRowsOverlay: {
      title: 'No data yet',
      description: 'Start by creating your first record.',
    },
    noResultsOverlay: {
      description: 'Nothing matches these filters. Try a different query.',
    },
  }}
/>
```

If a feature needs bespoke behaviour, import `NoRowsMessage` and pass it through the `slots` API.

## Examples

- `examples/SampleTable.jsx`: Full example using server-side pagination, custom actions, and logging.
- `examples/index.js`: Convenience re-export for Storybook/docs imports.

## Notes

- Keep UI-specific pieces inside `components/` to preserve single-responsibility.
- Swap `useServerData` for domain-specific data hooks when a backend exists while reusing `useTable` for orchestration.
- Prefer importing from `@components/table` (the barrel) to stay aligned with future refactors.
