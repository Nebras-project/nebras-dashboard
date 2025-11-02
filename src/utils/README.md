# Utils

This directory contains utility functions and helpers used throughout the Nebras Dashboard application.

## Overview

Utility functions are organized by domain to maintain clarity and promote reusability. All utilities are exported from `index.js` for easy importing.

## File Structure

```text
src/utils/
├── index.js                # Main export file (exports all utilities)
├── colorUtils.js           # Color manipulation utilities
├── dateUtils.js            # Date/time formatting utilities
├── errorLogger.js          # Error logging utilities
├── languageUtils.js        # Language detection and resolution utilities
├── layoutUtils.js          # Layout and routing utilities
├── rtl.js                  # RTL/LTR direction utilities
├── secureStorage.js        # Secure token storage utilities
└── migrateLocalStorage.js  # LocalStorage migration utility
```

## Usage

Import utilities using the `@utils` alias:

```javascript
import { adjustColor, formatDate, isRTL } from '@utils';
```

---

## Color Utilities (`colorUtils.js`)

Color manipulation functions for theme generation and color adjustments.

### Functions

#### `adjustColor(hex, percent)`

Adjusts the brightness of a hex color.

**Parameters:**
- `hex` (string) - Hex color code (with or without #)
- `percent` (number) - Brightness adjustment percentage (positive = lighter, negative = darker)

**Returns:** (string) - Adjusted hex color code

**Example:**
```javascript
import { adjustColor } from '@utils';

const lighter = adjustColor('#17cd96', 40);  // +40% lighter
const darker = adjustColor('#17cd96', -30);   // -30% darker
```

#### `generateColorPalette(baseColor)`

Generates a complete Material-UI color palette from a base color.

**Parameters:**
- `baseColor` (string) - Base hex color code

**Returns:** (object) - Color palette with `main`, `light`, `dark`, and `contrastText`

**Example:**
```javascript
import { generateColorPalette } from '@utils';

const palette = generateColorPalette('#17cd96');
// Returns:
// {
//   main: '#17cd96',
//   light: '#4ddeb5',  // +40% lighter
//   dark: '#108f6a',   // -30% darker
//   contrastText: '#ffffff'
// }
```

#### `generateBackgroundColor(baseColor, mode)`

Generates a background color variant for light/dark mode.

**Parameters:**
- `baseColor` (string) - Base hex color code
- `mode` (string) - Theme mode ('light' | 'dark')

**Returns:** (string) - Background color hex code

**Example:**
```javascript
import { generateBackgroundColor } from '@utils';

const lightBg = generateBackgroundColor('#17cd96', 'light');  // Very light
const darkBg = generateBackgroundColor('#17cd96', 'dark');    // Very dark
```

### Usage Example

```javascript
import { generateColorPalette, generateBackgroundColor } from '@utils';

// In theme configuration
const customColor = '#17cd96';
const primaryColors = generateColorPalette(customColor);
const primaryBackground = generateBackgroundColor(customColor, 'light');
```

---

## Date Utilities (`dateUtils.js`)

Date and time formatting utilities using Day.js with localization support.

### Setup

Day.js is configured with:
- `localizedFormat` plugin for locale-aware formatting
- `updateLocale` plugin for custom locale configuration
- Arabic locale configured to use Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩)

### Functions

#### `dayjs`

Day.js instance (re-exported for convenience).

**Example:**
```javascript
import { dayjs } from '@utils';

const now = dayjs();
const date = dayjs('2024-01-15');
```

#### `getLocalizedDayjs(locale)`

Gets a Day.js instance configured for a specific locale.

**Parameters:**
- `locale` (string) - Locale code ('ar' | 'en')

**Returns:** (Dayjs) - Localized Day.js instance

**Example:**
```javascript
import { getLocalizedDayjs } from '@utils';

const arDayjs = getLocalizedDayjs('ar');
const enDayjs = getLocalizedDayjs('en');
```

#### `formatDate(date, locale, format)`

Formats a date with locale-aware formatting.

**Parameters:**
- `date` (Dayjs) - Day.js date object
- `locale` (string) - Locale code ('ar' | 'en')
- `format` (string) - Format string (see Day.js format tokens)

**Returns:** (string) - Formatted date string

**Example:**
```javascript
import { dayjs, formatDate } from '@utils';

const date = dayjs();
const arFormatted = formatDate(date, 'ar', 'D MMMM YYYY');  // "١٥ يناير ٢٠٢٤"
const enFormatted = formatDate(date, 'en', 'D MMMM YYYY');  // "15 January 2024"
```

#### `getDateSeparator(locale)`

Gets the appropriate date separator for a locale.

**Parameters:**
- `locale` (string) - Locale code ('ar' | 'en')

**Returns:** (string) - Separator string ('، ' for Arabic, ', ' for English)

**Example:**
```javascript
import { getDateSeparator } from '@utils';

const arSep = getDateSeparator('ar');  // "، "
const enSep = getDateSeparator('en');  // ", "
```

### Usage Example

```javascript
import { dayjs, formatDate, getDateSeparator } from '@utils';

const date = dayjs();
const locale = 'ar';

const formattedDate = formatDate(date, locale, 'D MMMM YYYY');
const separator = getDateSeparator(locale);
const time = formatDate(date, locale, 'h:mm A');

console.log(`${formattedDate}${separator}${time}`);
// "١٥ يناير ٢٠٢٤، ١٠:٣٠ ص"
```

---

## Error Logger Utilities (`errorLogger.js`)

Centralized error logging utilities for handling errors throughout the application.

### Functions

#### `logError(error, errorInfo)`

Main error logging function that coordinates error logging to multiple destinations.

**Parameters:**
- `error` (Error) - The error object that was thrown
- `errorInfo` (Object) - Additional error information from React Error Boundary

**Returns:** void

**Behavior:**
- **Development mode:** Logs to console with formatted output
- **Production mode:** Can be configured to send errors to external services (Sentry, LogRocket, etc.)

**Example:**
```javascript
import { logError } from '@utils';

// In Error Boundary
const handleError = (error, errorInfo) => {
  logError(error, errorInfo);
};
```

#### `logErrorWithMessage(message, error)`

Logs an error with a custom message.

**Parameters:**
- `message` (string) - Custom error message
- `error` (Error) - The error object

**Returns:** void

**Example:**
```javascript
import { logErrorWithMessage } from '@utils';

try {
  // Some operation
} catch (error) {
  logErrorWithMessage('Failed to load user data', error);
}
```

### Console Output (Development)

In development mode, errors are logged to the console with formatted output:

```
🔴 Error Boundary Caught Error
  Error: [error message]
  Error Info: [component stack]
  Stack: [error stack trace]
```

### External Service Integration

The error logger is designed to integrate with external error tracking services:

**Sentry Integration:**
```javascript
// Uncomment in errorLogger.js
if (window.Sentry) {
  window.Sentry.captureException(error, {
    extra: errorInfo,
    tags: { errorBoundary: true }
  });
}
```

**LogRocket Integration:**
```javascript
// Uncomment in errorLogger.js
if (window.LogRocket) {
  window.LogRocket.captureException(error, {
    extra: errorInfo
  });
}
```

### Usage Example

```javascript
import { logError } from '@utils';
import { ErrorBoundary } from '@components';

function App() {
  return (
    <ErrorBoundary onError={logError}>
      <YourApp />
    </ErrorBoundary>
  );
}
```

---

## Language Utilities (`languageUtils.js`)

Language detection and resolution utilities for internationalization.

### Functions

#### `getInitialLanguage()`

Retrieves the initial language from localStorage.

**Returns:** (string) - Language code ('ar' | 'en'), defaults to 'ar'

**Example:**
```javascript
import { getInitialLanguage } from '@utils';

const initialLang = getInitialLanguage();  // 'ar' or 'en'
```

#### `getBrowserLanguage()`

Detects the browser's preferred language.

**Returns:** (string) - Language code ('ar' | 'en')

**Example:**
```javascript
import { getBrowserLanguage } from '@utils';

const browserLang = getBrowserLanguage();  // 'ar' if browser is Arabic, 'en' otherwise
```

#### `resolveLanguage(storedLanguage)`

Resolves a stored language value, converting 'default' to browser language.

**Parameters:**
- `storedLanguage` (string) - Stored language preference ('ar' | 'en' | 'default')

**Returns:** (string) - Resolved language code ('ar' | 'en')

**Example:**
```javascript
import { resolveLanguage } from '@utils';

const resolved = resolveLanguage('default');  // Returns browser language
const explicit = resolveLanguage('ar');        // Returns 'ar'
```

### Usage Example

```javascript
import { getInitialLanguage, resolveLanguage } from '@utils';

// Initialize i18n
const storedLang = getInitialLanguage();
const resolvedLang = resolveLanguage(storedLang);

i18n.changeLanguage(resolvedLang);
```

---

## Layout Utilities (`layoutUtils.js`)

Layout and routing utilities for determining page visibility and layout requirements.

### Constants

#### `PROTECTED_ROUTES`

Array of protected route paths that require authentication.

#### `PUBLIC_PAGES`

Array of public page paths that don't require authentication.

### Functions

#### `shouldShowLayout(pathname)`

Determines if the layout should be shown for a given pathname.

**Parameters:**
- `pathname` (string) - Current route pathname

**Returns:** (boolean) - `true` if layout should be shown, `false` otherwise

**Example:**
```javascript
import { shouldShowLayout } from '@utils';

const showLayout = shouldShowLayout('/dashboard');  // true
const hideLayout = shouldShowLayout('/login');      // false
```

#### `isPublicPage(pathname)`

Determines if a pathname is a public page.

**Parameters:**
- `pathname` (string) - Current route pathname

**Returns:** (boolean) - `true` if public page, `false` otherwise

**Example:**
```javascript
import { isPublicPage } from '@utils';

const isPublic = isPublicPage('/login');  // true
const isProtected = isPublicPage('/dashboard');  // false
```

### Usage Example

```javascript
import { shouldShowLayout } from '@utils';
import { useLocation } from 'react-router-dom';

function MainLayout({ children }) {
  const location = useLocation();
  const showLayout = shouldShowLayout(location.pathname);

  if (!showLayout) {
    return <>{children}</>;
  }

  return (
    <Layout>
      {children}
    </Layout>
  );
}
```

---

## RTL Utilities (`rtl.js`)

Right-to-left (RTL) and left-to-right (LTR) direction utilities.

### Functions

#### `isRTL(language)`

Checks if a language is RTL.

**Parameters:**
- `language` (string) - Language code

**Returns:** (boolean) - `true` if RTL language, `false` otherwise

**Supported RTL Languages:** 'ar', 'he', 'fa', 'ur'

**Example:**
```javascript
import { isRTL } from '@utils';

const isArabicRTL = isRTL('ar');  // true
const isEnglishRTL = isRTL('en');  // false
```

#### `getDirection(language)`

Gets the text direction for a language.

**Parameters:**
- `language` (string) - Language code

**Returns:** (string) - 'rtl' or 'ltr'

**Example:**
```javascript
import { getDirection } from '@utils';

const dir = getDirection('ar');  // 'rtl'
const dirEn = getDirection('en');  // 'ltr'
```

#### `getTextAlign(direction)`

Gets the text alignment for a direction.

**Parameters:**
- `direction` (string) - Text direction ('rtl' | 'ltr')

**Returns:** (string) - 'right' or 'left'

**Example:**
```javascript
import { getTextAlign } from '@utils';

const align = getTextAlign('rtl');  // 'right'
const alignLtr = getTextAlign('ltr');  // 'left'
```

#### `getFlexDirection(direction, baseDirection)`

Gets the flex direction for a given text direction.

**Parameters:**
- `direction` (string) - Text direction ('rtl' | 'ltr')
- `baseDirection` (string) - Base flex direction ('row' | 'row-reverse', default: 'row')

**Returns:** (string) - Flex direction value

**Example:**
```javascript
import { getFlexDirection } from '@utils';

const flexDir = getFlexDirection('rtl', 'row');  // 'row-reverse'
const flexDirLtr = getFlexDirection('ltr', 'row');  // 'row'
```

### Usage Example

```javascript
import { isRTL, getDirection, getTextAlign } from '@utils';

const language = 'ar';
const direction = getDirection(language);  // 'rtl'
const textAlign = getTextAlign(direction);  // 'right'

<div style={{ direction, textAlign }}>
  Content
</div>
```

---

## Storage Utilities

### Secure Storage (`secureStorage.js`)

In-memory token storage for maximum security. Tokens are lost on page refresh.

**Note:** This is the most secure client-side option. For session persistence, consider using the commented sessionStorage alternative in the file.

#### Functions

- **`setSecureToken(accessToken, refreshToken)`** - Store access and refresh tokens
- **`getSecureToken()`** - Get stored access token
- **`getRefreshToken()`** - Get stored refresh token
- **`clearSecureTokens()`** - Clear all stored tokens
- **`hasValidToken()`** - Check if access token exists

**Example:**
```javascript
import { setSecureToken, getSecureToken, clearSecureTokens } from '@utils';

// Store tokens
setSecureToken('access-token', 'refresh-token');

// Retrieve token
const token = getSecureToken();

// Clear tokens
clearSecureTokens();
```

### Migration Utility (`migrateLocalStorage.js`)

Utility for migrating old localStorage structure to the unified state structure.

#### Functions

- **`migrateLocalStorage()`** - Migrates old localStorage keys to unified structure

**Example:**
```javascript
import { migrateLocalStorage } from '@utils';

// Run on app initialization
migrateLocalStorage();
```

---

## Best Practices

1. **Import from `@utils`** - Use the centralized export for consistency
2. **Pure functions** - Utilities should be pure functions without side effects
3. **Documentation** - Add JSDoc comments for all exported functions
4. **Type safety** - Use PropTypes or TypeScript for parameter validation
5. **Error handling** - Handle edge cases and invalid inputs gracefully
6. **Reusability** - Keep utilities generic and reusable across the codebase

---

## Adding New Utilities

When adding new utilities:

1. **Choose the right file** - Add to existing file or create new one based on domain
2. **Export from index.js** - Ensure new utilities are exported
3. **Add documentation** - Document parameters, return values, and usage examples
4. **Update this README** - Document the new utility in this file
5. **Write tests** - Consider adding tests for complex utilities
6. **Follow naming** - Use descriptive function names (camelCase)

---

## Related Documentation

- [Constants](../constants/README.md) - Centralized constants
- [Theme System](../theme/README.md) - Theme configuration using color utilities
- [i18n](../i18n/README.md) - Internationalization using language utilities
