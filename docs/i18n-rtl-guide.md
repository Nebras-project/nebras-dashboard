# Internationalization (i18n) & RTL Support Guide

## Overview

The Nebras Dashboard supports full bilingual functionality with Arabic (RTL) and English (LTR) languages. This guide explains how the system works and how to use it.

---

## ✅ What's Implemented

### 1. **i18n Configuration**
- ✅ i18next with react-i18next
- ✅ 200+ translation keys in Arabic and English
- ✅ Automatic language detection from localStorage
- ✅ Persistent language preference

### 2. **RTL Support**
- ✅ Material-UI RTL theme with stylis-plugin-rtl
- ✅ Automatic direction switching (RTL/LTR)
- ✅ Document direction and lang attributes
- ✅ Emotion cache for RTL/LTR styling

### 3. **State Management**
- ✅ Redux state synchronization
- ✅ i18n language synchronization
- ✅ LanguageSync component for consistency

### 4. **Components**
- ✅ All layout components translated
- ✅ Navigation menu translated
- ✅ Sidebar controls translated
- ✅ User roles translated
- ✅ Sample pages translated

---

## 🚀 How to Use

### Basic Translation

```javascript
import { useTranslation } from '../hooks';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('navigation.dashboard')}</p>
    </div>
  );
}
```

### Language Switching

```javascript
import { useTranslation } from '../hooks';

function LanguageSwitcher() {
  const { currentLanguage, toggleLanguage, changeLanguage } = useTranslation();
  
  return (
    <div>
      <p>Current: {currentLanguage}</p>
      
      {/* Toggle between ar and en */}
      <button onClick={toggleLanguage}>
        Toggle Language
      </button>
      
      {/* Set specific language */}
      <button onClick={() => changeLanguage('ar')}>
        العربية
      </button>
      <button onClick={() => changeLanguage('en')}>
        English
      </button>
    </div>
  );
}
```

### Using Direction Information

```javascript
import { useLanguage } from '../hooks';

function DirectionAwareComponent() {
  const { isRTL, currentLanguage } = useLanguage();
  
  return (
    <Box
      sx={{
        textAlign: isRTL ? 'right' : 'left',
        paddingRight: isRTL ? 2 : 0,
        paddingLeft: isRTL ? 0 : 2,
      }}
    >
      <p>This text is {isRTL ? 'RTL' : 'LTR'}</p>
    </Box>
  );
}
```

---

## 📚 Translation Keys Structure

### Namespaces

All translation keys are organized into namespaces:

- `common.*` - Common UI elements (buttons, labels, etc.)
- `navigation.*` - Navigation menu items
- `auth.*` - Authentication-related text
- `dashboard.*` - Dashboard content
- `users.*` - User roles and permissions
- `curriculum.*` - Curriculum-related content
- `questions.*` - Questions-related content
- `competitions.*` - Competition-related content
- `students.*` - Student-related content
- `admins.*` - Admin-related content
- `forms.*` - Form validation messages
- `messages.*` - Success/error/confirmation messages
- `pagination.*` - Pagination text
- `table.*` - Table-related text
- `reports.*` - Reports-related text
- `notifications.*` - Notifications text
- `activityLogs.*` - Activity logs text
- `settings.*` - Settings-related text

### Adding New Translations

1. **Add to both language files:**

```javascript
// src/i18n/locales/ar.js
myFeature: {
  title: 'عنوان الميزة',
  description: 'وصف الميزة',
}

// src/i18n/locales/en.js
myFeature: {
  title: 'Feature Title',
  description: 'Feature Description',
}
```

2. **Use in components:**

```javascript
const { t } = useTranslation();
<h1>{t('myFeature.title')}</h1>
```

---

## 🎨 RTL Styling Best Practices

### 1. Use Logical Properties

```javascript
// ❌ Bad - Fixed direction
sx={{
  marginLeft: 2,
  paddingRight: 3,
}}

// ✅ Good - Use MUI's automatic RTL conversion
sx={{
  ml: 2,  // Automatically becomes mr in RTL
  pr: 3,  // Automatically becomes pl in RTL
}}

// ✅ Also good - Use logical properties manually
sx={{
  marginInlineStart: 2,
  paddingInlineEnd: 3,
}}
```

### 2. Icons and Direction

```javascript
// For directional icons (arrows, etc.)
import { useLanguage } from '../hooks';

function MyComponent() {
  const { isRTL } = useLanguage();
  
  return (
    <Button>
      {isRTL ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      {t('common.back')}
    </Button>
  );
}
```

### 3. Flex Direction

```javascript
// MUI automatically handles flex direction in RTL
<Stack direction="row" spacing={2}>
  {/* Items will be reversed in RTL */}
</Stack>

// Manual control if needed
<Box
  sx={{
    display: 'flex',
    flexDirection: isRTL ? 'row-reverse' : 'row',
  }}
>
  {/* Content */}
</Box>
```

### 4. Text Alignment

```javascript
// ✅ Let MUI handle it automatically
<Typography>
  {t('myText')}
</Typography>

// Manual control for special cases
<Typography
  sx={{
    textAlign: isRTL ? 'right' : 'left',
  }}
>
  {t('myText')}
</Typography>
```

---

## 🔧 System Architecture

### Language Flow

```
User Action (Language Toggle)
    ↓
useTranslation hook
    ↓
i18n.changeLanguage()
    ↓
Redux dispatch(setLanguage())
    ↓
localStorage.setItem('language')
    ↓
LanguageSync monitors both
    ↓
useDocumentDirection updates HTML
    ↓
useMuiTheme regenerates theme
    ↓
CacheProvider switches RTL/LTR cache
    ↓
All components re-render with new language/direction
```

### Key Files

1. **`src/i18n/index.js`** - i18n initialization
2. **`src/i18n/locales/ar.js`** - Arabic translations
3. **`src/i18n/locales/en.js`** - English translations
4. **`src/i18n/hooks/useTranslation.js`** - Custom translation hook
5. **`src/components/LanguageSync.jsx`** - Synchronization component
6. **`src/providers/ThemeProvider.jsx`** - RTL cache provider
7. **`src/hooks/useDocumentDirection.js`** - HTML direction updater
8. **`src/store/slices/languageSlice.js`** - Redux language state

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Switch language from sidebar
- [ ] Verify all navigation items translate
- [ ] Check user role translates
- [ ] Verify RTL layout for Arabic (elements flip)
- [ ] Verify LTR layout for English
- [ ] Check localStorage persistence
- [ ] Refresh page - language should persist
- [ ] Test on different pages
- [ ] Verify forms align correctly
- [ ] Check tooltips translate and position correctly
- [ ] Test dropdowns and modals

---

## 🐛 Common Issues & Solutions

### Issue: Language not persisting

**Solution:** Check that localStorage is not blocked and LanguageSync component is mounted in App.jsx

### Issue: Direction not changing

**Solution:** Verify useDocumentDirection hook is called in ThemeProvider

### Issue: Some components not translating

**Solution:** Ensure you're using `t()` function and the translation keys exist in both language files

### Issue: MUI components not flipping in RTL

**Solution:** Check that CacheProvider with stylis-plugin-rtl is properly configured

### Issue: Icons pointing wrong direction

**Solution:** Use conditional rendering based on `isRTL` for directional icons

---

## 📖 Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [MUI RTL Guide](https://mui.com/material-ui/guides/right-to-left/)
- [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)

---

**Last Updated:** 2025-10-24

