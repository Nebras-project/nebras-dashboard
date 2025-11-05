# Form Compound Component

A flexible form component that can be rendered as a **Dialog** or as a **Page**. Integrated with React Hook Form for form state management.

## Features

- ✅ **Dual Mode**: Render as dialog or page
- ✅ **React Hook Form Integration**: Built-in form state management
- ✅ **Compound Component Pattern**: Flexible composition with sub-components
- ✅ **Accessible**: ARIA labels and keyboard navigation
- ✅ **Internationalized**: Built-in translation support
- ✅ **RTL Support**: Works with Arabic and English
- ✅ **Theme Aware**: Follows your theme system

## Usage

### As a Dialog

```jsx
import { useState } from 'react';
import { Form, Button } from '@components';

function MyComponent() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data) => {
    console.log('Form data:', data);
    // Handle form submission
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Form Dialog</Button>

      <Form
        mode="dialog"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        title="Create New Item"
        defaultValues={{
          name: '',
          email: '',
        }}
      >
        <Form.Title />
        <Form.Content>
          <Form.TextInput name="name" label="Name" rules={{ required: 'Name is required' }} />
          <Form.TextInput
            name="email"
            label="Email"
            type="email"
            rules={{ required: 'Email is required' }}
          />
        </Form.Content>
        <Form.Actions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </Form.Actions>
      </Form>
    </>
  );
}
```

### As a Page

```jsx
import { Form, Button } from '@components';
import { useNavigate } from 'react-router-dom';

function CreateItemPage() {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log('Form data:', data);
    // Handle form submission
    navigate('/items');
  };

  return (
    <Form
      mode="page"
      onSubmit={handleSubmit}
      title="Create New Item"
      description="Fill in the details to create a new item"
      defaultValues={{
        name: '',
        email: '',
        description: '',
        category: '',
      }}
      onClose={() => navigate('/items')}
    >
      <Form.Content>
        <Form.TextInput name="name" label="Name" rules={{ required: 'Name is required' }} />
        <Form.TextInput
          name="email"
          label="Email"
          type="email"
          rules={{ required: 'Email is required' }}
        />
        <Form.SelectInput
          name="category"
          label="Category"
          options={[
            { value: 'tech', label: 'Technology' },
            { value: 'business', label: 'Business' },
          ]}
          rules={{ required: 'Category is required' }}
        />
        <Form.TextInput name="description" label="Description" multiline rows={4} />
      </Form.Content>
      <Form.Actions>
        <Form.ResetButton onClick={() => navigate('/items')}>Cancel</Form.ResetButton>
        <Form.SubmitButton>Create Item</Form.SubmitButton>
      </Form.Actions>
    </Form>
  );
}
```

## API Reference

### Form Props

| Prop                   | Type                                            | Default  | Description                                             |
| ---------------------- | ----------------------------------------------- | -------- | ------------------------------------------------------- |
| `mode`                 | `'dialog' \| 'page'`                            | `'page'` | Render mode                                             |
| `open`                 | `boolean`                                       | -        | **Required** when `mode='dialog'`                       |
| `onClose`              | `function`                                      | -        | **Required** when `mode='dialog'`                       |
| `onSubmit`             | `function(data, methods)`                       | -        | **Required**. Called on form submit                     |
| `defaultValues`        | `object`                                        | `{}`     | Default form values                                     |
| `title`                | `string`                                        | -        | Form title (displayed by PageLayout in page mode)       |
| `description`          | `string`                                        | -        | Form description (displayed by PageLayout in page mode) |
| `dialogMaxWidth`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| false` | `'sm'`   | Max width for dialog mode                               |
| `showCloseButton`      | `boolean`                                       | `true`   | Show close button in title                              |
| `disableBackdropClick` | `boolean`                                       | `false`  | Prevent closing dialog on backdrop click                |
| `formProps`            | `object`                                        | `{}`     | Props passed to React Hook Form's `useForm`             |
| `pageLayoutProps`      | `object`                                        | `{}`     | Props passed to PageLayout (page mode)                  |

### Form.Title Props

| Prop       | Type        | Default | Description                               |
| ---------- | ----------- | ------- | ----------------------------------------- |
| `title`    | `string`    | -       | Title text (overrides Form's title prop)  |
| `icon`     | `ReactNode` | -       | Icon to display before title              |
| `children` | `ReactNode` | -       | Title content (alternative to title prop) |

### Form.Content Props

| Prop       | Type        | Default | Description                           |
| ---------- | ----------- | ------- | ------------------------------------- |
| `children` | `ReactNode` | -       | **Required**. Form fields and content |

### Form.Actions Props

| Prop       | Type        | Default | Description                  |
| ---------- | ----------- | ------- | ---------------------------- |
| `children` | `ReactNode` | -       | **Required**. Action buttons |

### Form.SubmitButton Props

| Prop       | Type                                                                      | Default       | Description                                                      |
| ---------- | ------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------- |
| `children` | `ReactNode`                                                               | `'Submit'`    | Button text                                                      |
| `variant`  | `'text' \| 'outlined' \| 'contained'`                                     | `'contained'` | Button variant                                                   |
| `color`    | `'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning'` | `'primary'`   | Button color                                                     |
| `loading`  | `boolean`                                                                 | -             | Manual loading state (overrides form's isSubmitting)             |
| `disabled` | `boolean`                                                                 | -             | Manual disabled state (overrides auto-disable during submission) |

### Form.ResetButton Props

| Prop       | Type                                                                      | Default      | Description                                          |
| ---------- | ------------------------------------------------------------------------- | ------------ | ---------------------------------------------------- |
| `children` | `ReactNode`                                                               | `'Reset'`    | Button text                                          |
| `variant`  | `'text' \| 'outlined' \| 'contained'`                                     | `'outlined'` | Button variant                                       |
| `color`    | `'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning'` | `'primary'`  | Button color                                         |
| `onClick`  | `function`                                                                | -            | Additional onClick handler (form reset is automatic) |

## React Hook Form Integration

The Form component uses React Hook Form internally. You can access the form methods via the `onSubmit` callback:

```jsx
const handleSubmit = (data, methods) => {
  // data: form values
  // methods: React Hook Form methods (reset, setValue, etc.)

  console.log('Form values:', data);

  // Example: Reset form after successful submission
  methods.reset();
};
```

You can also pass React Hook Form options via the `formProps` prop:

```jsx
<Form
  formProps={{
    validationSchema: myValidationSchema,
    mode: 'onChange', // Validation mode
    resolver: yupResolver(schema), // If using Yup
  }}
  onSubmit={handleSubmit}
>
  {/* Form content */}
</Form>
```

## Accessing Form Methods

If you need to access React Hook Form methods outside of `onSubmit`, you can use the `useFormContext` hook:

```jsx
import { useFormContext } from 'react-hook-form';

function CustomInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      {...register('fieldName', { required: true })}
      error={!!errors.fieldName}
      helperText={errors.fieldName?.message}
    />
  );
}
```

## Input Sub-Components

All input components are integrated with React Hook Form and automatically handle validation errors.

### Form.TextInput

Text input field for strings, emails, numbers, etc.

```jsx
<Form.TextInput
  name="email"
  label="Email"
  type="email"
  rules={{
    required: 'Email is required',
    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
  }}
/>
```

### Form.SelectInput

Dropdown select field.

```jsx
<Form.SelectInput
  name="category"
  label="Category"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  rules={{ required: 'Category is required' }}
/>
```

### Form.DateInput

Date, time, or datetime-local input field.

```jsx
<Form.DateInput
  name="birthDate"
  label="Birth Date"
  type="date"
  rules={{ required: 'Date is required' }}
/>
```

### Form.FileInput

File upload field (single or multiple).

```jsx
<Form.FileInput
  name="avatar"
  label="Avatar"
  accept="image/*"
  buttonText="Choose Image"
  rules={{ required: 'Image is required' }}
/>
```

### Form.CheckboxInput

Checkbox field.

```jsx
<Form.CheckboxInput
  name="agree"
  label="I agree to the terms"
  rules={{ required: 'You must agree' }}
/>
```

### Form.RadioInput

Radio button group field.

```jsx
<Form.RadioInput
  name="gender"
  label="Gender"
  options={[
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ]}
  rules={{ required: 'Gender is required' }}
  row
/>
```

## Form Constants

### FORM_INPUT_TYPES

Predefined constants for input types to prevent typos and ensure consistency:

```jsx
import { FORM_INPUT_TYPES } from '@components/forms/constants';

// Text types
FORM_INPUT_TYPES.TEXT; // 'text'
FORM_INPUT_TYPES.EMAIL; // 'email'
FORM_INPUT_TYPES.PASSWORD; // 'password'
FORM_INPUT_TYPES.SEARCH; // 'search'
FORM_INPUT_TYPES.TEL; // 'tel'
FORM_INPUT_TYPES.URL; // 'url'

// Number types
FORM_INPUT_TYPES.NUMBER; // 'number'

// Date/Time types
FORM_INPUT_TYPES.DATE; // 'date'
FORM_INPUT_TYPES.TIME; // 'time'
FORM_INPUT_TYPES.DATETIME_LOCAL; // 'datetime-local'
FORM_INPUT_TYPES.MONTH; // 'month'
FORM_INPUT_TYPES.WEEK; // 'week'

// Other types
FORM_INPUT_TYPES.COLOR; // 'color'
FORM_INPUT_TYPES.RANGE; // 'range'
```

**Usage:**

```jsx
<Form.TextInput
  name="email"
  label="Email"
  type={FORM_INPUT_TYPES.EMAIL}
  rules={{ required: 'Email is required' }}
/>
```

### FORM_DEFAULTS

Default values used throughout the form system:

```jsx
FORM_DEFAULTS.MODE; // 'page'
FORM_DEFAULTS.DIALOG_MAX_WIDTH; // 'mobile'
FORM_DEFAULTS.SHOW_CLOSE_BUTTON; // true
FORM_DEFAULTS.DISABLE_BACKDROP_CLICK; // false
FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE; // ''
FORM_DEFAULTS.CHECKBOX_DEFAULT_VALUE; // false
FORM_DEFAULTS.SELECT_DEFAULT_VALUE; // ''
FORM_DEFAULTS.RADIO_DEFAULT_VALUE; // ''
FORM_DEFAULTS.FILE_INPUT_SINGLE_DEFAULT; // null
FORM_DEFAULTS.FILE_INPUT_MULTIPLE_DEFAULT; // []
```

## Component Architecture

The Form component follows a modular architecture with clear separation of concerns:

```text
forms/
├── Form.jsx              # Main wrapper (routes to FormDialog/FormPage)
├── FormDialog.jsx        # Dialog mode implementation
├── FormPage.jsx          # Page mode implementation
├── FormContext.js        # Form context definition
├── constants.js          # Form constants and defaults
├── index.js              # Form exports
│
├── components/           # Form sub-components
│   ├── FormTitle.jsx     # Title component
│   ├── FormContent.jsx   # Content component
│   ├── FormActions.jsx   # Actions component
│   ├── FormSubmitButton.jsx  # Submit button
│   ├── FormResetButton.jsx   # Reset button
│   ├── FormProvider.jsx  # Form provider wrapper
│   ├── TitleContent.jsx  # Title content helper
│   ├── TitleCloseButton.jsx  # Close button helper
│   └── index.js          # Components exports
│
├── inputs/               # Input components
│   ├── TextInput.jsx     # Text input field
│   ├── SelectInput.jsx   # Select dropdown
│   ├── DateInput.jsx     # Date/time input
│   ├── FileInput.jsx     # File upload
│   ├── CheckboxInput.jsx # Checkbox field
│   ├── RadioInput.jsx    # Radio button group
│   └── index.js          # Inputs exports
│
├── hooks/                # Custom hooks
│   ├── useFormContext.js     # Access form context
│   ├── useFormFieldError.js  # Extract field errors
│   ├── useFormSetup.js       # Form setup logic
│   └── index.js              # Hooks exports
│
└── utils/                # Utility functions
    ├── parseOption.js    # Normalize option data
    └── index.js          # Utils exports
```

## Design Principles

### Single Responsibility Principle

Each component has a single, well-defined responsibility:

- **Form**: Routes to appropriate implementation
- **FormDialog**: Handles dialog-specific logic
- **FormPage**: Handles page-specific logic
- **Input Components**: Handle individual input types
- **Style Getters**: Extract and organize styles

### Code Organization

- **Style Getter Functions**: All inline styles extracted to getter functions for better maintainability
- **Centralized Constants**: All form-related constants in `constants.js`
- **Modular Structure**: Components organized by responsibility
- **Reusable Utilities**: Shared utilities for common operations

## Best Practices

1. **Use Constants**: Always use `FORM_INPUT_TYPES` for input types
2. **Form Buttons**: Use `Form.SubmitButton` and `Form.ResetButton` for consistent behavior
3. **Validation**: Define validation rules in the `rules` prop
4. **Default Values**: Provide default values for all form fields
5. **Error Handling**: Errors are automatically displayed by input components

## Examples

### With Validation

```jsx
import { Form, Button } from '@components';

function ValidatedForm() {
  const handleSubmit = (data) => {
    console.log('Validated data:', data);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      title="Create Account"
      formProps={{
        mode: 'onChange',
      }}
    >
      <Form.Title />
      <Form.Content>
        <Form.TextInput
          name="email"
          label="Email"
          type="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
        />
        <Form.TextInput
          name="password"
          label="Password"
          type="password"
          rules={{
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          }}
        />
      </Form.Content>
      <Form.Actions>
        <Button type="submit">Submit</Button>
      </Form.Actions>
    </Form>
  );
}
```

### With Icon

```jsx
import { Form, Icon } from '@components';

<Form mode="dialog" open={open} onClose={handleClose} onSubmit={handleSubmit}>
  <Form.Title icon={<Icon name="add" />}>Create New Item</Form.Title>
  {/* Rest of form */}
</Form>;
```
