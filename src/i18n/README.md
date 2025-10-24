# Internationalization (i18n)

This directory contains the internationalization setup for the Nebras Dashboard, supporting Arabic (RTL) and English (LTR) languages.

## Structure

```
i18n/
├── index.js              # i18n initialization and configuration
├── locales/              # Translation files
│   ├── ar.js            # Arabic translations
│   └── en.js            # English translations
└── hooks/
    └── useTranslation.js # Custom translation hook with Redux integration
```

## Usage

### Import the hook

```javascript
import { useTranslation } from '../i18n/hooks/useTranslation';
// or
import { useTranslation } from '../hooks';
```

### Use in components

```javascript
function MyComponent() {
  const { t, currentLanguage, changeLanguage, toggleLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('navigation.dashboard')}</p>
      <button onClick={toggleLanguage}>
        {currentLanguage === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      </button>
    </div>
  );
}
```

## Translation Keys

All translation keys are organized into namespaces:

- **common**: Common UI elements (save, cancel, delete, etc.)
- **navigation**: Navigation menu items
- **auth**: Authentication-related text
- **dashboard**: Dashboard content
- **users**: User roles and permissions
- **curriculum**: Curriculum-related content
- **questions**: Questions-related content
- **competitions**: Competition-related content
- **students**: Student-related content
- **admins**: Admin-related content
- **forms**: Form validation messages
- **messages**: Success/error/confirmation messages
- **pagination**: Pagination text
- **table**: Table-related text
- **reports**: Reports-related text
- **notifications**: Notifications text
- **activityLogs**: Activity logs text
- **settings**: Settings-related text

## Adding New Translations

1. Add the translation key and value to both `ar.js` and `en.js` files
2. Use the key in your component with the `t()` function

Example:
```javascript
// In locales/ar.js and locales/en.js
export default {
  myFeature: {
    title: 'My Feature Title',
    description: 'My Feature Description',
  }
};

// In your component
const { t } = useTranslation();
<h1>{t('myFeature.title')}</h1>
```

## Features

- ✅ Automatic language detection from localStorage
- ✅ Persistent language preference
- ✅ RTL/LTR switching based on language
- ✅ Redux integration for state management
- ✅ Comprehensive translation coverage
- ✅ Support for interpolation (placeholders)
- ✅ Custom hook with utility functions

## Language Switching

The language is automatically persisted to localStorage and synchronized with Redux state. When the user changes the language:

1. i18n updates the active language
2. Redux store is updated
3. localStorage is updated
4. RTL/LTR direction is updated
5. All components re-render with new translations

## Default Language

The default language is Arabic (`ar`) with RTL support.

