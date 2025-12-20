# Documentation Index

This directory contains architectural and development documentation for the Nebras Dashboard project.

## 📚 Documentation Files

### Architecture & Strategy

- **[Error Handling Strategy](./error-handling-strategy.md)** - Comprehensive guide to error handling architecture across the application
  - Axios Interceptor error handling
  - React Query hooks error management
  - Component-level error handling
  - Error utilities and formatting

### Project Planning

- **[Project Plan](./plan.md)** - Complete project overview, tech stack, architecture, and folder structure
- **[Phase 1: Foundation](./phase-1-foundation.md)** - Core infrastructure setup
- **[Phase 2: Authentication](./phase-2-authentication.md)** - Authentication system implementation
- **[Phase 3: Core Features](./phase-3-core-features.md)** - Main feature development
- **[Phase 4: Polish](./phase-4-polish.md)** - Final enhancements and optimizations

## 📖 Additional Documentation

For module-specific documentation, see README files in their respective directories:

- `src/config/README.md` - Configuration files documentation
- `src/components/README.md` - Component documentation
- `src/utils/README.md` - Utility functions documentation
- `src/theme/README.md` - Theme configuration documentation
- `src/i18n/README.md` - Internationalization documentation

---

**Last Updated:** 2025-12-19

## 🔐 Authentication System

The authentication system has been fully implemented with:

- ✅ React Query hooks for all auth operations
- ✅ Automatic token refresh on 401 errors
- ✅ Role normalization to camelCase
- ✅ Secure token storage (memory only, no localStorage)
- ✅ HttpOnly cookie support for refresh tokens
- ✅ Comprehensive error handling
- ✅ Auth initialization on page reload (AuthInit component)
- ✅ User data persistence across page reloads

See **[Phase 2: Authentication](./phase-2-authentication.md)** for complete details.
