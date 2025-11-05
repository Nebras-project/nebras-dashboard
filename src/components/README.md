# Components

This directory contains shared/reusable components used across the application.

## Component Overview

This directory is organized into subdirectories:

### `display/` - Display Components

- **Card** - Reusable card component with header, content, and actions
- **Icon** - Global icon component with centralized icon registry (60+ icons)
  - Supports both predefined icons via `name` prop and custom icons via `component` prop
  - Centralized registry for all project icons
  - Consistent API: `<Icon name="iconName" size={24} color="red" />`
- **Logo** - Theme-aware logo component that switches between light/dark variants
- **DateTime** - Displays formatted date and time with RTL support
- **UserAvatar** - User avatar with initials fallback and size presets
- **ColorSwatch** - Small color indicator for theme color selection

### `inputs/` - Input Components

- **Button** - Enhanced Material-UI button with custom styling
- **Dropdown** - Collapsible dropdown/select component for options selection
- **ListButton** - Button component styled for list items with icon support
- **ColorPicker** - Custom color picker with HEX input for theme customization
- **LogoutButton** - Specialized logout button with icon and error styling
- **Menu** - Context menu component with menu items and dividers

### `forms/` - Form Compound Components

- **Form** - Flexible form component that can render as Dialog or Page
  - Integrated with React Hook Form for form state management
  - Compound component pattern with sub-components
  - Dual mode support (dialog/page)
  - Full validation support
  - RTL and i18n ready

**Form Sub-components:**

- **Form.Title** - Form title with icon support
- **Form.Content** - Form content area wrapper
- **Form.Actions** - Form action buttons container
- **Form.SubmitButton** - Submit button with loading state
- **Form.ResetButton** - Reset button that resets form to default values

**Form Input Components:**

- **Form.TextInput** - Text input field (text, email, password, number, etc.)
- **Form.SelectInput** - Dropdown select field
- **Form.DateInput** - Date/time input field
- **Form.FileInput** - File upload field (single or multiple)
- **Form.CheckboxInput** - Checkbox field
- **Form.RadioInput** - Radio button group field

**📖 Full Documentation:** See [src/components/forms/README.md](./forms/README.md) for complete form system documentation, API reference, and usage examples.

### `layout/` - Layout Components

- **PageLayout** - Page wrapper with title and description
- **PageHeader** - Page header component for consistent page titles

### `routing/` - Routing Components

- **ProtectedRoute** - Route guard for authenticated routes

### `i18n/` - Internationalization Components

- **LanguageSync** - Synchronizes i18n language state with Redux state

### `errors/` - Error Handling Components

- **ErrorBoundary** - Catches React errors and shows fallback UI
- **ErrorFallback** - Composes error UI from sub-components
- **ErrorIcon** - Error icon display
- **ErrorMessage** - Error title and description
- **ErrorActions** - Recovery action buttons
- **ErrorDetails** - Dev-only error details

### `feedback/` - Loading & Feedback Components

- **Loader** - Unified loading component with `page` and `fullscreen` variants
- **LoadingSpinner** - Circular progress spinner
- **LoadingLogo** - Animated logo display for loading states
- **LoadingMessage** - Loading text message component

---

## Component Details

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

### Card

**Purpose:** Reusable card component with flexible content structure

**Features:**

- Header with title, subheader, avatar, and action
- Content section
- Actions section
- Hover effects with animated arrow
- RTL support

**Props:**

- `variant` - Card variant ('elevation' | 'outlined')
- `title` - Card title text
- `subheader` - Subheader text
- `avatar` - Avatar element
- `action` - Action element (button, menu, etc.)
- `children` - Card content
- `actions` - Actions section content
- `hoverable` - Enable hover effects with arrow (default: false)
- `onClick` - Click handler for hoverable cards
- `elevation` - Elevation level (default: 1)
- `sx` - Custom styles
- `contentSx` - Custom content styles

**Usage:**

```javascript
<Card title="Card Title" subheader="Card Subheader" hoverable onClick={() => navigate('/path')}>
  Card content
</Card>
```

### Logo

**Purpose:** Theme-aware logo component

**Features:**

- Automatically switches between light/dark logo variants
- Customizable height
- Supports sx prop for additional styling

**Props:**

- `height` - Logo height (default: from constants)
- `alt` - Alt text (default: 'Nebras Logo')
- `sx` - Custom styles

**Usage:**

```javascript
<Logo />
<Logo height={50} alt="Custom Logo" />
```

### DateTime

**Purpose:** Displays formatted date and time with localization

**Features:**

- Automatic date/time formatting based on locale
- RTL-aware alignment
- Auto-updates every minute
- Day name and time display

**Props:**

- `align` - Text alignment ('left' | 'right' | 'center', default: 'right')

**Usage:**

```javascript
<DateTime />
<DateTime align="left" />
```

### UserAvatar

**Purpose:** User avatar with initials fallback

**Features:**

- Size presets (small, medium, large, xlarge)
- Custom size support (number or responsive object)
- Automatic initial extraction from user name
- Fallback character support

**Props:**

- `user` - User object with name property or string
- `size` - Size preset or custom size (default: 'medium')
- `fallback` - Fallback character (default: 'U')
- `sx` - Custom styles

**Usage:**

```javascript
<UserAvatar user={user} size="large" />
<UserAvatar user={{ name: 'John Doe' }} size={64} />
```

### ColorSwatch

**Purpose:** Small color indicator for theme color selection

**Features:**

- Displays color preview
- Customizable size
- Theme color support

**Props:**

- `color` - Color value (hex or theme color key)
- `size` - Size in pixels (default: from constants)
- `sx` - Custom styles

### Icon

**Purpose:** Global icon component with centralized icon registry

**Features:**

- Centralized registry of 60+ predefined icons
- Supports both predefined icons via `name` prop and custom icons via `component` prop
- Consistent API with size, color, and style customization
- Memoized for performance

**Props:**

- `name` - Icon name from registry (see available icons below)
- `component` - Custom icon component (optional, alternative to name)
- `size` - Icon size in pixels (default: 24)
- `color` - Icon color
- `style` - Custom inline styles
- `...props` - Additional props passed to icon component

**Usage:**

```javascript
// Using predefined icons
<Icon name="home" />
<Icon name="settings" size={32} color="#1976d2" />
<Icon name="logout" size={20} />

// Using custom icons
import { MdCustomIcon } from 'react-icons/md';
<Icon component={MdCustomIcon} size={24} />
```

**Available Icons:**
error, refresh, home, dashboard, arrowForward, arrowBack, close, closeAlt, visibility, eye, eyeClosed, expandMore, expandLess, check, checkCircle, logout, login, contrast, lightMode, darkMode, palette, colorBucket, person, email, phone, accountCircle, manageAccounts, groups, people, adminPanel, language, english, earth, menuLeft, menuRight, panelLeft, panelRight, book, school, autoStories, bookmark, selectMultiple, questionAnswer, gavel, lightbulb, emojiEvents, settings, tune, quiz, class, libraryBooks, trendingUp, upcoming, pendingActions, sad

### Button

**Purpose:** Enhanced Material-UI button component

**Features:**

- All Material-UI Button features
- Custom styling from theme
- RTL support

**Usage:**

```javascript
<Button variant="contained" color="primary">
  Click Me
</Button>
```

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
const options = [
  { value: 'en', label: 'English', icon: <Icon />, onClick: () => setLang('en') },
  { value: 'ar', label: 'العربية', icon: <Icon />, onClick: () => setLang('ar') },
];

<Dropdown icon={<MdLanguage />} label="Language" options={options} currentValue={currentLang} />;
```

### ListButton

**Purpose:** Button component styled for list items

**Features:**

- Icon support with customizable styling
- Text label with typography props
- End content slot for additional elements
- Selected state styling
- RTL support

**Props:**

- `icon` - Icon element
- `text` - Button text
- `collapsed` - Collapsed state (hides text, shows only icon)
- `selected` - Selected state
- `disabled` - Disabled state
- `onClick` - Click handler
- `iconSx` - Custom icon styles
- `textProps` - Typography props for text
- `endContent` - End content element
- `sx` - Custom styles

### ColorPicker

**Purpose:** Custom color picker for theme customization

**Features:**

- HEX color input with validation
- Real-time preview
- Persistence to Redux and localStorage
- Popover-based UI

**Usage:**
Used in the sidebar controls for theme customization.

### LogoutButton

**Purpose:** Specialized logout button

**Features:**

- Integrated logout functionality
- Error color styling
- Icon support with RTL awareness
- Customizable variant and size

**Props:**

- `variant` - Button variant ('contained' | 'outlined' | 'text')
- `size` - Button size ('small' | 'medium' | 'large')
- `color` - Button color (default: 'error')
- `fullWidth` - Full width button
- `width` - Custom width
- `onLogout` - Additional logout handler
- `showIcon` - Show logout icon (default: true)
- `disableHover` - Disable hover effects (default: true)

### Menu

**Purpose:** Context menu component

**Features:**

- Menu items with icons
- Dividers for grouping
- Context-based menu state
- RTL support

### PageLayout

**Purpose:** Page wrapper with title and description

**Features:**

- Consistent page layout
- Title and description display
- Wraps page content

**Props:**

- `title` - Page title
- `description` - Page description
- `children` - Page content

### PageHeader

**Purpose:** Page header component

**Features:**

- Consistent page header styling
- Title display

**Props:**

- `title` - Header title

### Form

**Purpose:** Flexible form compound component with React Hook Form integration

**Features:**

- Dual mode: Render as Dialog or Page
- React Hook Form integration with automatic validation
- Compound component pattern for flexible composition
- All input types supported (text, select, date, file, checkbox, radio)
- Automatic error handling and display
- RTL and i18n support
- Theme aware

**Quick Example:**

```jsx
import { Form } from '@components';

<Form
  mode="page"
  onSubmit={(data) => console.log(data)}
  title="Create Item"
  defaultValues={{ name: '', email: '' }}
>
  <Form.Content>
    <Form.TextInput name="name" label="Name" rules={{ required: 'Required' }} />
    <Form.TextInput name="email" label="Email" type="email" />
  </Form.Content>
  <Form.Actions>
    <Form.ResetButton>Reset</Form.ResetButton>
    <Form.SubmitButton>Submit</Form.SubmitButton>
  </Form.Actions>
</Form>;
```

**Available Input Components:**

- `Form.TextInput` - Text, email, password, number, tel, url, etc.
- `Form.SelectInput` - Dropdown select with options
- `Form.DateInput` - Date, time, datetime-local inputs
- `Form.FileInput` - Single or multiple file upload
- `Form.CheckboxInput` - Checkbox with validation
- `Form.RadioInput` - Radio button group with options

**📖 Full Documentation:** See [src/components/forms/README.md](./forms/README.md) for complete API reference, all props, validation examples, and advanced usage.

---

## Adding New Components

When adding new shared components:

1. Create component file in appropriate subdirectory (display, inputs, layout, etc.)
2. Add propTypes validation
3. Export from index.js if needed
4. Add documentation to this README
5. Ensure RTL support for layout components
6. Use translation keys for text content
7. Extract styles into helper functions or constants
8. Use centralized spacing/theme constants from `@constants` and `@theme`
