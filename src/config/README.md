# Configuration Files

This directory contains global configuration files for the application.

## Files

### `queryClient.js`

React Query client configuration with default options for all queries and mutations.

**Key Settings:**
- **Stale Time:** 5 minutes (data is fresh for 5 minutes before refetch)
- **Cache Time (gcTime):** 10 minutes (inactive queries are garbage collected after 10 minutes)
- **Retry:** 1 attempt for queries, 0 for mutations
- **Refetch on Window Focus:** Disabled (prevents unnecessary refetches)
- **Refetch on Reconnect:** Enabled (refetch when network reconnects)

**Usage:**
```javascript
import { queryClient } from './config/queryClient';

// Use with QueryClientProvider
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

### `routes.jsx`

React Router v6 route definitions for the entire application.

**Route Structure:**
- **Public Routes:** `/login`
- **Protected Routes:** All other routes (require authentication)
- **Dynamic Routes:** `/competitions/:id` and nested routes
- **Fallback:** `*` → 404 Not Found page

**All Routes:**
```
Public:
  /login → LoginPage

Protected:
  /dashboard → DashboardPage
  /students → StudentsPage
  /competitions → CompetitionsPage (list all)
  /competitions/:id → CompetitionPage (details)
  /competitions/:id/members → CompetitionMembersPage
  /competitions/:id/exam → CompetitionExamPage
  /competitions/:id/result → CompetitionResultPage
  /curriculums → CurriculumsPage
  /subjects → SubjectsPage
  /units → UnitsPage
  /admins → AdminsPage
  /questions → QuestionsPage
  /ministerial-questions → MinisterialQuestionsPage
  /enrichment-questions → EnrichmentQuestionsPage

Fallback:
  * → NotFoundPage (404)
```

**Usage:**
```javascript
import routes from './config/routes';

// In App.jsx with React Router
<Routes>
  {routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
  ))}
</Routes>
```

**Protected Routes:**
All protected routes are wrapped with `<ProtectedRoute>` component which:
- Checks if user is authenticated (from Redux store)
- Redirects to `/login` if not authenticated
- Allows access if authenticated

---

## Future Configuration Files

- `axios.js` - Axios configuration with interceptors (Phase 2)
- `constants.js` - Application-wide constants (Phase 2+)
- `api.js` - API endpoint definitions (Phase 2+)

