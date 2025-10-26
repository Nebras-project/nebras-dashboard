# Components

This directory contains shared/reusable components used across the application.

## Components

### LanguageSync

**Purpose:** Synchronizes i18n language state with Redux state

**Features:**
- Listens to Redux language changes and updates i18n
- Listens to i18n language changes and updates Redux
- Ensures consistency across the entire app
- Runs on app initialization to sync saved language preference

**Usage:**
This component is automatically included in the App component and doesn't need to be manually added elsewhere.

```javascript
// Already included in App.jsx
<LanguageSync />
```

### ProtectedRoute

**Purpose:** Route guard for authenticated routes

**Features:**
- Checks if user is logged in
- Redirects to login if not authenticated
- Protects routes from unauthorized access

**Usage:**
```javascript
<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>
```

### ColorPicker

**Purpose:** Custom color picker for theme customization

**Features:**
- HEX color input
- Color presets (Blue, Green)
- Real-time preview
- Persistence to Redux and localStorage

**Usage:**
Used in the sidebar controls for theme customization.

### Dropdown

**Purpose:** Reusable dropdown/select component for options selection

**Features:**
- Collapsible dropdown with smooth animations
- Support for icons, descriptions, and disabled states
- Checkmark indicator for selected items (optional)
- Fully customizable styling via sx props
- RTL-aware design
- Event handlers defined per option

**Props:**
- `icon` - Icon to display next to the label
- `label` - Label text for the dropdown trigger (required)
- `options` - Array of option objects (required)
  - Each option: `{ value, label, icon, onClick, disabled, description }`
- `currentValue` - Currently selected value (required)
- `showCheckmark` - Show checkmark on selected item (default: true)
- `sx` - Custom styles for root element
- `buttonSx` - Custom styles for trigger button
- `listItemSx` - Custom styles for dropdown items
- `indentLevel` - Indentation for nested items (default: 4)
- `defaultOpen` - Open by default (default: false)

**Usage:**
```javascript
import Dropdown from '@/components/Dropdown';

const options = [
  { value: 'en', label: 'English', icon: <Icon />, onClick: () => setLang('en') },
  { value: 'ar', label: 'العربية', icon: <Icon />, onClick: () => setLang('ar') },
];

<Dropdown
  icon={<MdLanguage />}
  label="Language"
  options={options}
  currentValue={currentLang}
/>
```

See `Dropdown.example.jsx` for more usage examples.

---

## Adding New Components

When adding new shared components:

1. Create component file in this directory
2. Add propTypes validation
3. Add JSDoc comments
4. Export from index.js if needed
5. Add documentation to this README
6. Ensure RTL support for layout components
7. Use translation keys for text content

