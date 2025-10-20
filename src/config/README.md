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

## Future Configuration Files

- `routes.js` - React Router route definitions (Phase 1)
- `axios.js` - Axios configuration with interceptors (Phase 2)
- `constants.js` - Application-wide constants (Phase 2+)

