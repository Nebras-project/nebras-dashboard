# Internationalization (i18n) 🌍

A comprehensive internationalization system for the Nebras Dashboard, supporting Arabic (RTL) and English (LTR) with seamless language switching, Redux integration, and persistent state management.

## 📚 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Usage](#-usage)
  - [Basic Translation](#basic-translation)
  - [Language Switching](#language-switching)
  - [Interpolation](#interpolation)
  - [Helper Functions](#helper-functions)
- [Hook API Reference](#-hook-api-reference)
- [Translation Structure](#-translation-structure)
- [Adding New Translations](#-adding-new-translations)
- [Best Practices](#-best-practices)
- [RTL/LTR Support](#-rtlltr-support)
- [Redux Integration](#-redux-integration)
- [Troubleshooting](#-troubleshooting)
- [Advanced Topics](#-advanced-topics)

---

## ✨ Features

- 🌐 **Dual Language Support**: Arabic (RTL) and English (LTR)
- 🔄 **Automatic Language Detection**: Loads language from localStorage on initialization
- 💾 **Persistent State**: Language preference saved automatically
- 🎨 **RTL/LTR Auto-Switching**: Automatic text direction based on language
- 🔗 **Redux Integration**: Centralized state management
- 🎯 **Type-Safe**: Full TypeScript support (if migrated)
- 📦 **Comprehensive Coverage**: 300+ translation keys across 17 namespaces
- 🔌 **React Hooks**: Simple, intuitive API with custom hooks
- 🚀 **Zero Configuration**: Works out of the box
- 🎭 **Interpolation Support**: Dynamic content in translations

---

## 🏗️ Architecture

### Directory Structure

```
i18n/
├── index.js                    # i18n initialization & configuration
├── locales/                    # Translation files
│   ├── index.js               # Locale exports
│   ├── ar.js                  # Arabic translations (default)
│   └── en.js                  # English translations
└── hooks/
    └── useTranslation.js      # Custom translation hook with Redux
```

### Technology Stack

- **i18next**: Core internationalization framework
- **react-i18next**: React integration
- **Redux**: State management
- **localStorage**: Persistence layer

### Data Flow

```
User Action (Change Language)
        ↓
useTranslation Hook
        ↓
i18n.changeLanguage()
        ↓
Redux Dispatch (setLanguage)
        ↓
localStorage (via middleware)
        ↓
Component Re-render
```

---

## 🚀 Quick Start

### 1. Import the Hook

```javascript
// Direct import from i18n
import { useTranslation } from '@/i18n/hooks/useTranslation';

// Or from the centralized hooks index
import { useTranslation } from '@/hooks';
```

### 2. Use in Component

```javascript
function MyComponent() {
  const { t, currentLanguage, changeLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('navigation.dashboard')}</p>
      <span>Current: {currentLanguage}</span>
    </div>
  );
}
```

### 3. That's it! 🎉

The hook automatically:
- Loads the saved language preference
- Provides translation function
- Handles language switching
- Syncs with Redux store
- Persists to localStorage

---

## 📖 Usage

### Basic Translation

```javascript
const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      {/* Simple translation */}
      <h1>{t('common.welcome')}</h1>
      
      {/* Nested keys */}
      <p>{t('auth.loginTitle')}</p>
      
      {/* With fallback */}
      <span>{t('nonexistent.key', 'Default Text')}</span>
    </div>
  );
};
```

### Language Switching

#### Method 1: Direct Language Change

```javascript
const LanguageSelector = () => {
  const { changeLanguage, currentLanguage } = useTranslation();
  
  return (
    <select 
      value={currentLanguage} 
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="ar">العربية</option>
      <option value="en">English</option>
    </select>
  );
};
```

#### Method 2: Toggle Between Languages

```javascript
const LanguageToggle = () => {
  const { toggleLanguage, currentLanguage } = useTranslation();
  
  return (
    <button onClick={toggleLanguage}>
      {currentLanguage === 'ar' ? 'English' : 'العربية'}
    </button>
  );
};
```

#### Method 3: Using Helper Booleans

```javascript
const LanguageSwitch = () => {
  const { isArabic, isEnglish, changeLanguage } = useTranslation();
  
  return (
    <div>
      {isArabic && <button onClick={() => changeLanguage('en')}>Switch to English</button>}
      {isEnglish && <button onClick={() => changeLanguage('ar')}>التبديل إلى العربية</button>}
    </div>
  );
};
```

### Interpolation

For dynamic content, use interpolation with placeholders:

```javascript
const PaginationInfo = ({ from, to, count }) => {
  const { t } = useTranslation();
  
  // Translation key: "{{from}}-{{to}} of {{count}}"
  return (
    <span>
      {t('pagination.displayedRows', { from, to, count })}
    </span>
  );
};

// Output (en): "1-10 of 50"
// Output (ar): "1-10 من 50"
```

**Translation Definition:**

```javascript
// en.js
pagination: {
  displayedRows: "{{from}}-{{to}} of {{count}}"
}

// ar.js
pagination: {
  displayedRows: "{{from}}-{{to}} من {{count}}"
}
```

### Helper Functions

#### Get Raw i18n Instance

```javascript
const AdvancedComponent = () => {
  const { i18n } = useTranslation();
  
  // Access i18next API directly
  console.log(i18n.language);
  console.log(i18n.languages);
  console.log(i18n.hasResourceBundle('ar', 'translation'));
};
```

#### Conditional Rendering Based on Language

```javascript
const WelcomeMessage = () => {
  const { isArabic, isEnglish } = useTranslation();
  
  return (
    <>
      {isArabic && <ArabicFormattedDate />}
      {isEnglish && <EnglishFormattedDate />}
    </>
  );
};
```

---

## 🔧 Hook API Reference

### `useTranslation()`

Returns an object with the following properties and methods:

| Property | Type | Description |
|----------|------|-------------|
| `t` | `function` | Translation function - converts keys to localized strings |
| `i18n` | `object` | Raw i18next instance for advanced usage |
| `currentLanguage` | `string` | Current active language code (`'ar'` or `'en'`) |
| `isArabic` | `boolean` | `true` if current language is Arabic |
| `isEnglish` | `boolean` | `true` if current language is English |
| `changeLanguage` | `function` | Changes language and syncs with Redux/localStorage |
| `toggleLanguage` | `function` | Toggles between Arabic and English |

#### `t(key, options)`

Translates a key to the current language.

**Parameters:**
- `key` (string): Translation key (e.g., `'common.save'`)
- `options` (object | string): Interpolation values or default value

**Returns:** Translated string

**Examples:**

```javascript
// Simple translation
t('common.save') // → "Save" or "حفظ"

// With interpolation
t('forms.minLength', { min: 8 }) // → "Minimum 8 characters"

// With default value
t('unknown.key', 'Fallback text')
```

#### `changeLanguage(lng)`

Changes the application language.

**Parameters:**
- `lng` (string): Language code (`'ar'` or `'en'`)

**Side Effects:**
- Updates i18n language
- Dispatches Redux action
- Saves to localStorage (via middleware)
- Triggers re-render of all components using translations

**Example:**

```javascript
changeLanguage('en'); // Switch to English
```

#### `toggleLanguage()`

Toggles between Arabic and English.

**Example:**

```javascript
// If current language is 'ar', switches to 'en'
// If current language is 'en', switches to 'ar'
toggleLanguage();
```

---

## 📋 Translation Structure

Translations are organized into **17 namespaces** for better organization and maintenance:

### Available Namespaces

| Namespace | Description | Key Count |
|-----------|-------------|-----------|
| `common` | Common UI elements (buttons, labels, statuses) | 67 |
| `navigation` | Navigation menu items | 11 |
| `auth` | Authentication (login, logout, sessions) | 8 |
| `dashboard` | Dashboard content and statistics | 8 |
| `users` | User roles and permissions | 7 |
| `curriculum` | Curriculum management (levels, subjects, units, lessons) | 28 |
| `questions` | Question management and types | 23 |
| `competitions` | Competition features | 24 |
| `students` | Student management | 16 |
| `admins` | Admin management | 12 |
| `forms` | Form validation messages | 10 |
| `messages` | Success/error/confirmation messages | 14 |
| `pagination` | Pagination controls | 7 |
| `table` | Table operations | 11 |
| `reports` | Report generation | 7 |
| `notifications` | Notification system | 6 |
| `activityLogs` | Activity tracking | 6 |
| `settings` | Application settings | 9 |

### Example Structure

```javascript
// locales/ar.js
export default {
  common: {
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف"
  },
  auth: {
    loginTitle: "تسجيل الدخول",
    username: "اسم المستخدم",
    password: "كلمة المرور"
  },
  // ... more namespaces
};
```

---

## ➕ Adding New Translations

### Step-by-Step Guide

#### 1. Identify the Namespace

Choose an existing namespace or create a new one:

```javascript
// Existing namespace
common: { ... }

// New namespace (if needed)
myFeature: { ... }
```

#### 2. Add to Both Language Files

Always add translations to **both** `ar.js` and `en.js`:

```javascript
// locales/ar.js
export default {
  myFeature: {
    title: "عنوان الميزة",
    description: "وصف الميزة",
    action: "إجراء"
  }
};
```

```javascript
// locales/en.js
export default {
  myFeature: {
    title: "Feature Title",
    description: "Feature Description",
    action: "Action"
  }
};
```

#### 3. Use in Components

```javascript
const MyFeature = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('myFeature.title')}</h1>
      <p>{t('myFeature.description')}</p>
      <button>{t('myFeature.action')}</button>
    </div>
  );
};
```

### Translation Key Naming Conventions

✅ **Good:**
```javascript
user: {
  profileTitle: "Profile",
  editProfile: "Edit Profile",
  deleteAccount: "Delete Account"
}
```

❌ **Avoid:**
```javascript
user: {
  profile_title: "Profile",      // Use camelCase
  EditProfile: "Edit Profile",   // Don't capitalize first letter
  "delete-account": "Delete"     // Avoid kebab-case
}
```

### Organizing Complex Translations

For complex features, use nested structures:

```javascript
competitions: {
  list: {
    title: "المسابقات",
    empty: "لا توجد مسابقات",
    loadMore: "تحميل المزيد"
  },
  details: {
    title: "تفاصيل المسابقة",
    participants: "المشاركون",
    duration: "المدة"
  },
  create: {
    title: "إنشاء مسابقة جديدة",
    submit: "إنشاء",
    cancel: "إلغاء"
  }
}
```

Usage:

```javascript
t('competitions.list.title')
t('competitions.details.participants')
t('competitions.create.submit')
```

---

## 💡 Best Practices

### 1. Always Use Translation Keys

✅ **Good:**
```javascript
<button>{t('common.save')}</button>
```

❌ **Avoid:**
```javascript
<button>Save</button>  // Hardcoded text
```

### 2. Keep Keys Consistent

Use the same pattern across your app:

```javascript
// Pattern: feature.action
t('user.delete')
t('competition.create')
t('question.edit')
```

### 3. Use Meaningful Key Names

✅ **Good:**
```javascript
t('auth.invalidCredentials')
t('messages.success.saved')
```

❌ **Avoid:**
```javascript
t('error1')
t('msg2')
```

### 4. Group Related Translations

```javascript
forms: {
  required: "Required",
  invalidEmail: "Invalid email",
  invalidPhone: "Invalid phone"
}
```

### 5. Extract Repeated Text

❌ **Before:**
```javascript
<button>Save</button>
<button>Save</button>
<button>Save</button>
```

✅ **After:**
```javascript
const SaveButton = () => {
  const { t } = useTranslation();
  return <button>{t('common.save')}</button>;
};
```

### 6. Handle Missing Translations Gracefully

```javascript
// With default value
t('nonexistent.key', 'Default Text')

// Or check existence
if (i18n.exists('optional.key')) {
  return t('optional.key');
}
```

### 7. Use Interpolation for Dynamic Content

✅ **Good:**
```javascript
t('messages.welcome', { name: userName })
```

❌ **Avoid:**
```javascript
`Welcome, ${userName}`  // Loses translation
```

### 8. Test Both Languages

Always test your UI in both Arabic and English:

```javascript
// Development helper
const TestLanguageToggle = () => {
  const { toggleLanguage, currentLanguage } = useTranslation();
  
  if (process.env.NODE_ENV === 'development') {
    return (
      <button onClick={toggleLanguage}>
        Test: {currentLanguage}
      </button>
    );
  }
  return null;
};
```

---

## 🌓 RTL/LTR Support

The i18n system automatically handles text direction based on the selected language.

### Automatic Direction Switching

When language changes, the following happens automatically:

1. **Document Direction**: `<html dir="rtl">` or `<html dir="ltr">`
2. **Material-UI Direction**: Theme direction updates
3. **CSS Variables**: RTL-specific styles apply
4. **Layout**: Sidebar and content flow direction changes

### How It Works

```javascript
// src/hooks/useDocumentDirection.js
useEffect(() => {
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
}, [language]);
```

### RTL-Safe Styling

When writing CSS, use logical properties when possible:

✅ **Good (RTL-safe):**
```css
.element {
  margin-inline-start: 16px;  /* Auto-flips for RTL */
  padding-inline-end: 8px;    /* Auto-flips for RTL */
  border-inline-start: 1px solid;
}
```

❌ **Avoid (RTL-unsafe):**
```css
.element {
  margin-left: 16px;   /* Fixed direction */
  padding-right: 8px;  /* Fixed direction */
  border-left: 1px solid;
}
```

### Testing RTL Layout

```javascript
const RTLTester = () => {
  const { isArabic } = useTranslation();
  
  return (
    <div className={isArabic ? 'rtl-mode' : 'ltr-mode'}>
      {/* Your content */}
    </div>
  );
};
```

---

## 🔗 Redux Integration

The i18n system is fully integrated with Redux for centralized state management.

### State Structure

```javascript
// Redux Store
{
  language: {
    current: 'ar' | 'en'
  }
}
```

### Automatic Synchronization

The `useTranslation` hook automatically synchronizes:

1. **i18next state** ↔️ **Redux state** ↔️ **localStorage**

```javascript
// When you call changeLanguage:
changeLanguage('en');

// Triggers:
// 1. i18n.changeLanguage('en')
// 2. dispatch(setLanguage('en'))
// 3. localStorage.setItem('language', 'en') [via middleware]
```

### Accessing Language from Redux

If you need to access the language outside of React components:

```javascript
import store from '@/store';

const currentLanguage = store.getState().language.current;
```

### Redux Actions

```javascript
// Available actions from languageSlice
import { setLanguage } from '@/store/slices/languageSlice';

// Manual dispatch (not recommended, use hook instead)
dispatch(setLanguage('en'));
```

### Middleware Integration

The language state is automatically persisted via `localStorageMiddleware`:

```javascript
// src/store/middleware/localStorageMiddleware.js
// Automatically saves to localStorage when Redux state changes
```

---

## 🐛 Troubleshooting

### Issue: Translations Not Showing

**Problem:** Text shows as keys instead of translated text (e.g., `"common.save"`)

**Solutions:**

1. Check if the key exists in both language files:
   ```javascript
   // Check in ar.js and en.js
   common: {
     save: "Save" // Make sure this exists
   }
   ```

2. Verify the key path:
   ```javascript
   // ❌ Wrong
   t('save')
   
   // ✅ Correct
   t('common.save')
   ```

3. Check for typos:
   ```javascript
   // ❌ Wrong
   t('common.savee')
   
   // ✅ Correct
   t('common.save')
   ```

### Issue: Language Not Persisting

**Problem:** Language resets on page reload

**Solutions:**

1. Ensure localStorage middleware is registered:
   ```javascript
   // src/store/index.js
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(localStorageMiddleware)
   ```

2. Check browser localStorage:
   ```javascript
   // In browser console
   localStorage.getItem('language')
   ```

3. Verify `getInitialLanguage` utility:
   ```javascript
   // src/utils/getInitialLanguage.js
   ```

### Issue: RTL Not Working

**Problem:** Layout doesn't flip for Arabic

**Solutions:**

1. Check document direction:
   ```javascript
   console.log(document.documentElement.dir); // Should be 'rtl'
   ```

2. Verify `useDocumentDirection` hook is used in app root:
   ```javascript
   // Should be in App.jsx or MainLayout.jsx
   useDocumentDirection();
   ```

3. Check Material-UI theme direction:
   ```javascript
   const theme = useMuiTheme(); // Should include direction: 'rtl'
   ```

### Issue: Interpolation Not Working

**Problem:** Placeholders show instead of values

**Solutions:**

1. Check placeholder format:
   ```javascript
   // ✅ Correct
   "Hello {{name}}"
   
   // ❌ Wrong
   "Hello {name}"
   "Hello $name"
   ```

2. Verify you're passing values:
   ```javascript
   // ❌ Wrong
   t('greeting')
   
   // ✅ Correct
   t('greeting', { name: 'Ahmed' })
   ```

### Issue: Language Toggle Not Working

**Problem:** `toggleLanguage()` doesn't change language

**Solutions:**

1. Check Redux DevTools for action dispatch
2. Verify i18n instance is initialized:
   ```javascript
   console.log(i18n.isInitialized); // Should be true
   ```

3. Check for errors in console
4. Ensure component is wrapped in providers:
   ```javascript
   <ReduxProvider>
     <QueryProvider>
       <ThemeProvider>
         <App />
       </ThemeProvider>
     </QueryProvider>
   </ReduxProvider>
   ```

### Debugging Tips

```javascript
// Add to component for debugging
const DebugTranslation = () => {
  const { i18n, currentLanguage } = useTranslation();
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Current Language:', currentLanguage);
    console.log('Available Languages:', i18n.languages);
    console.log('Is Initialized:', i18n.isInitialized);
    console.log('Resources:', i18n.store.data);
  }
  
  return null;
};
```

---

## 🚀 Advanced Topics

### Lazy Loading Translations

For very large applications, consider lazy loading translations:

```javascript
// Future enhancement
i18n.init({
  // ...
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  },
  ns: ['common'], // Load common by default
  defaultNS: 'common'
});

// Load additional namespaces on demand
i18n.loadNamespaces(['competitions', 'students']);
```

### Pluralization

For count-based translations:

```javascript
// Translation
const translations = {
  item: 'item',
  item_plural: 'items'
};

// Usage
t('item', { count: 1 });  // → "item"
t('item', { count: 5 });  // → "items"
```

### Context-Based Translations

For gender or context-specific translations:

```javascript
// Translation
const translations = {
  friend: 'friend',
  friend_male: 'male friend',
  friend_female: 'female friend'
};

// Usage
t('friend', { context: 'male' });    // → "male friend"
t('friend', { context: 'female' });  // → "female friend"
```

### Date and Number Formatting

Use internationalized formatters:

```javascript
const FormattedDate = ({ date }) => {
  const { currentLanguage } = useTranslation();
  
  const formatted = new Intl.DateTimeFormat(
    currentLanguage === 'ar' ? 'ar-SA' : 'en-US',
    { dateStyle: 'long' }
  ).format(date);
  
  return <span>{formatted}</span>;
};
```

### Custom Namespace Loading

```javascript
// Load specific namespace
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('myNamespace');
  return <div>{t('key')}</div>;
};
```

### Nested Component Translation

```javascript
// Pass translation function to child components
const Parent = () => {
  const { t } = useTranslation();
  
  return <Child translateFn={t} />;
};

const Child = ({ translateFn }) => {
  return <button>{translateFn('common.save')}</button>;
};
```

### Server-Side Rendering (SSR) Considerations

If moving to Next.js or similar:

```javascript
// next-i18next configuration
module.exports = {
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
  },
};
```

---

## 📊 Translation Coverage

Current translation statistics:

- **Total Keys**: 254+ (per language)
- **Namespaces**: 17
- **Languages**: 2 (Arabic, English)
- **Coverage**: 100% (all keys exist in both languages)
- **Lines of Code**: ~400 per language file

### Coverage by Feature

| Feature | Keys | Status |
|---------|------|--------|
| Common UI | 67 | ✅ Complete |
| Authentication | 8 | ✅ Complete |
| Dashboard | 8 | ✅ Complete |
| Curriculum Management | 28 | ✅ Complete |
| Question Management | 23 | ✅ Complete |
| Competitions | 24 | ✅ Complete |
| Students | 16 | ✅ Complete |
| Admins | 12 | ✅ Complete |
| Forms & Validation | 10 | ✅ Complete |
| Messages & Alerts | 14 | ✅ Complete |
| Tables & Pagination | 18 | ✅ Complete |
| Reports | 7 | ✅ Complete |
| Notifications | 6 | ✅ Complete |
| Activity Logs | 6 | ✅ Complete |
| Settings | 9 | ✅ Complete |

---

## 📝 Migration Guide

### From Hardcoded Text

If you're migrating from hardcoded text:

**Before:**
```javascript
<button>Save</button>
<h1>Dashboard</h1>
```

**After:**
```javascript
const { t } = useTranslation();

<button>{t('common.save')}</button>
<h1>{t('navigation.dashboard')}</h1>
```

### Adding Translation Support to Existing Component

1. Import the hook
2. Replace all hardcoded text
3. Add missing keys to translation files
4. Test in both languages

**Example:**

```javascript
// Before
const UserProfile = ({ user }) => {
  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

// After
const UserProfile = ({ user }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('users.profileTitle')}</h1>
      <p>{t('common.name')}: {user.name}</p>
      <button>{t('common.edit')}</button>
      <button>{t('common.delete')}</button>
    </div>
  );
};
```

---

## 🔮 Future Enhancements

Potential improvements for the i18n system:

- [ ] Add more languages (French, Spanish, etc.)
- [ ] Implement lazy loading for large translation files
- [ ] Add translation management UI
- [ ] Integrate with translation service (Lokalise, Crowdin)
- [ ] Add TypeScript type generation for translation keys
- [ ] Implement pluralization rules
- [ ] Add context-based translations
- [ ] Create translation validation tool
- [ ] Add missing translation detection in development

---

## 📞 Support

For issues or questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [Best Practices](#-best-practices)
3. Consult the [API Reference](#-hook-api-reference)
4. Contact the development team

---

## 📜 License

Part of the Nebras Dashboard project.

---

**Happy Translating! 🌐✨**
