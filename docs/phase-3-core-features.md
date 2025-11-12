# Phase 3: Core Features

## Overview

Build the main features for each user role: Curriculum Manager, Content Manager, Competition Manager, General Admin, and Owner.

## Status: ⏳ Pending

---

## Development Order

1. **Curriculum Manager** - Structure management
2. **Content Manager** - Question management
3. **Competition Manager** - Competition management
4. **General Admin** - User management
5. **Owner** - Admin management

---

## 3.1 Curriculum Manager

### Overview

Manages the curriculum structure: Levels → Subjects → Units → Lessons

### Tasks

#### 1. Levels Management

**Location:** `src/features/levels/`

**Files to create:**

- `src/features/levels/pages/LevelsPage.jsx`
- `src/features/levels/components/LevelForm.jsx`
- `src/features/levels/components/LevelTable.jsx`
- `src/features/levels/service/levelsApi.js`
- `src/features/levels/hooks/useLevels.js`

**Features:**

- List all levels
- Create new level
- Edit existing level
- Delete level (soft delete)
- View level details

**Level Data Structure:**

```javascript
{
  id: number,
  name: string,
  nameAr: string,
  nameEn: string,
  order: number,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}
```

#### 2. Subjects Management

**Location:** `src/features/subjects/`

**Files to create:**

- `src/features/subjects/pages/SubjectsPage.jsx`
- `src/features/subjects/components/SubjectForm.jsx`
- `src/features/subjects/components/SubjectTable.jsx`
- `src/features/subjects/service/subjectsApi.js`
- `src/features/subjects/hooks/useSubjects.js`

**Features:**

- List all subjects
- Filter by level
- Create new subject
- Edit existing subject
- Delete subject (soft delete)
- View subject details

**Subject Data Structure:**

```javascript
{
  id: number,
  name: string,
  nameAr: string,
  nameEn: string,
  levelId: number,
  levelName: string,
  order: number,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}
```

#### 3. Units Management

**Location:** `src/features/units/`

**Files to create:**

- `src/features/units/pages/UnitsPage.jsx`
- `src/features/units/components/UnitForm.jsx`
- `src/features/units/components/UnitTable.jsx`
- `src/features/units/service/unitsApi.js`
- `src/features/units/hooks/useUnits.js`

**Features:**

- List all units
- Filter by subject
- Create new unit
- Edit existing unit
- Delete unit (soft delete)
- View unit details

**Unit Data Structure:**

```javascript
{
  id: number,
  name: string,
  nameAr: string,
  nameEn: string,
  subjectId: number,
  subjectName: string,
  order: number,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}
```

#### 4. Lessons Management

**Location:** `src/features/lessons/`

**Files to create:**

- `src/features/lessons/pages/LessonsPage.jsx`
- `src/features/lessons/components/LessonForm.jsx`
- `src/features/lessons/components/LessonTable.jsx`
- `src/features/lessons/service/lessonsApi.js`
- `src/features/lessons/hooks/useLessons.js`

**Features:**

- List all lessons
- Filter by unit
- Create new lesson
- Edit existing lesson
- Delete lesson (soft delete)
- View lesson details
- Link questions to lesson

**Lesson Data Structure:**

```javascript
{
  id: number,
  name: string,
  nameAr: string,
  nameEn: string,
  unitId: number,
  unitName: string,
  description: string,
  descriptionAr: string,
  descriptionEn: string,
  order: number,
  isActive: boolean,
  questionCount: number,
  createdAt: string,
  updatedAt: string
}
```

### Access Control

- ✅ Owner can access
- ✅ General Admin can access
- ✅ Curriculum Manager can access
- ❌ Competition Manager cannot access
- ❌ Content Manager cannot access

---

## 3.2 Content Manager

### Overview

Manages the unified question bank (ministerial & enrichment types).

### Tasks

#### Question Bank

**Location:** `src/features/questions/`

**Files to create:**

- `src/features/questions/pages/QuestionsPage.jsx`
- `src/features/questions/components/QuestionCard.jsx`
- `src/features/questions/components/QuestionFilter.jsx`
- `src/features/questions/components/QuestionForm.jsx`
- `src/features/questions/service/questionsApi.js`
- `src/features/questions/hooks/useQuestions.js`

**Features:**

- View all questions across ministerial/enrichment types
- Filter by type (ministerial/enrichment)
- Filter by lesson
- Manage ministerial metadata (form number, year)
- Manage enrichment metadata (source, difficulty)
- Search questions
- View and edit question details
- Upload question images
- Bulk import/export (future)

**Question Data Structure:**

```javascript
{
  id: number,
  question: string,
  questionAr: string,
  questionEn: string,
  questionImage: string | null,
  type: 'multiple_choice' | 'true_false',
  category: 'ministerial' | 'enrichment',
  ministerialMeta?: {
    formNumber: string,
    year: number
  },
  enrichmentMeta?: {
    source: string
  },
  options: Array<{
    id: number,
    text: string,
    textAr: string,
    textEn: string,
    isCorrect: boolean
  }>,
  correctAnswer: string,
  lessonId: number,
  lessonName: string,
  difficulty: 'easy' | 'medium' | 'hard',
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}
```

### Access Control

- ✅ Owner can access
- ✅ General Admin can access
- ❌ Curriculum Manager cannot access
- ❌ Competition Manager cannot access
- ✅ Content Manager can access

---

## 3.3 Competition Manager

### Overview

Manages competitions for students

### Tasks

**Location:** `src/features/competitions/`

**Files to create:**

- `src/features/competitions/pages/CompetitionsPage.jsx`
- `src/features/competitions/components/CompetitionForm.jsx`
- `src/features/competitions/components/CompetitionTable.jsx`
- `src/features/competitions/components/CompetitionDetails.jsx`
- `src/features/competitions/service/competitionsApi.js`
- `src/features/competitions/hooks/useCompetitions.js`

**Features:**

- List all competitions
- Create new competition
- Edit existing competition
- Delete competition (soft delete)
- View competition details
- Set competition dates
- Set competition rules
- View participants
- View results (future)

**Competition Data Structure:**

```javascript
{
  id: number,
  name: string,
  nameAr: string,
  nameEn: string,
  description: string,
  descriptionAr: string,
  descriptionEn: string,
  startDate: string,
  endDate: string,
  duration: number, // minutes
  questionCount: number,
  passingScore: number,
  isActive: boolean,
  participants: number,
  createdAt: string,
  updatedAt: string
}
```

### Access Control

- ✅ Owner can access
- ✅ General Admin can access
- ❌ Curriculum Manager cannot access
- ✅ Competition Manager can access
- ❌ Content Manager cannot access

---

## 3.4 General Admin

### Overview

Manages all users (managers and students)

### Tasks

#### 1. Students Management

**Location:** `src/features/students/`

**Files to create:**

- `src/features/students/pages/StudentsPage.jsx`
- `src/features/students/components/StudentForm.jsx`
- `src/features/students/components/StudentTable.jsx`
- `src/features/students/components/StudentDetails.jsx`
- `src/features/students/service/studentsApi.js`
- `src/features/students/hooks/useStudents.js`

**Features:**

- List all students
- Create new student
- Edit existing student
- Delete student (soft delete)
- View student details
- View student progress
- Search students
- Filter students
- Bulk import students (maybe)

**Student Data Structure:**

```javascript
{
  id: number,
  username: string,
  email: string,
  phone: string,
  name: string,
  nameAr: string,
  nameEn: string,
  grade: string,
  isActive: boolean,
  registeredAt: string,
  lastLogin: string,
  totalScore: number,
  competitionsParticipated: number
}
```

#### 2. Managers Management

**Location:** `src/features/admins/`

**Files to create:**

- `src/features/admins/pages/AdminsPage.jsx`
- `src/features/admins/components/AdminForm.jsx`
- `src/features/admins/components/AdminTable.jsx`
- `src/features/admins/components/AdminDetails.jsx`
- `src/features/admins/service/adminsApi.js`
- `src/features/admins/hooks/useAdmins.js`

**Features:**

- List all managers
- Create new manager
- Edit existing manager
- Delete manager (soft delete)
- Assign roles to managers
- View manager details
- Search managers
- Filter by role

**Manager Data Structure:**

```javascript
{
  id: number,
  username: string,
  email: string,
  phone: string,
  name: string,
  nameAr: string,
  nameEn: string,
  role: string,
  roles: string[],
  isActive: boolean,
  createdAt: string,
  lastLogin: string
}
```

### Access Control

- ✅ Owner can access
- ✅ General Admin can access
- ❌ Curriculum Manager cannot access
- ❌ Competition Manager cannot access
- ❌ Content Manager cannot access

---

## 3.5 Owner

### Overview

Manages General Admins and has full system access

### Tasks

#### 1. General Admins Management

**Location:** `src/features/admins/`

**Files to create:**

- `src/features/admins/pages/GeneralAdminsPage.jsx`
- `src/features/admins/components/GeneralAdminForm.jsx`
- `src/features/admins/components/GeneralAdminTable.jsx`
- `src/features/admins/components/GeneralAdminDetails.jsx`

**Features:**

- List all General Admins
- Create new General Admin
- Edit existing General Admin
- Delete General Admin (soft delete)
- View General Admin details
- Search General Admins

#### 2. System Settings

**Location:** `src/features/settings/`

**Files to create:**

- `src/features/settings/pages/SettingsPage.jsx`
- `src/features/settings/components/SystemSettings.jsx`
- `src/features/settings/components/EmailSettings.jsx`
- `src/features/settings/service/settingsApi.js`

**Features:**

- System configuration
- Email settings
- Notification settings
- Backup settings
- Security settings

### Access Control

- ✅ Owner can access
- ❌ General Admin cannot access (separate from admins management)
- ❌ Other managers cannot access

---

## Common Components

### Data Grid

**Location:** `src/components/`

**Files to create:**

- `src/components/DataGrid.jsx` - Reusable data grid component

**Features:**

- Sorting
- Filtering
- Pagination
- Export to Excel/CSV
- Row selection
- Column visibility toggle
- Responsive design

### Form Components

**Location:** `src/components/forms/`

**Files to create:**

- `src/components/forms/TextInput.jsx`
- `src/components/forms/SelectInput.jsx`
- `src/components/forms/DateInput.jsx`
- `src/components/forms/FileInput.jsx`
- `src/components/forms/CheckboxInput.jsx`
- `src/components/forms/RadioInput.jsx`

**Features:**

- Validation
- Error messages (AR/EN)
- RTL support
- Responsive design

### Modal Components

**Location:** `src/components/`

**Files to create:**

- `src/components/Modal.jsx`
- `src/components/ConfirmDialog.jsx`

**Features:**

- Open/close animation
- Backdrop click to close
- Keyboard navigation
- Responsive design

---

## Testing Checklist

### Curriculum Manager

- [ ] Create level
- [ ] Edit level
- [ ] Delete level
- [ ] Create subject
- [ ] Edit subject
- [ ] Delete subject
- [ ] Create unit
- [ ] Edit unit
- [ ] Delete unit
- [ ] Create lesson
- [ ] Edit lesson
- [ ] Delete lesson
- [ ] Filter by level/subject/unit
- [ ] Search functionality

### Content Manager

- [ ] Create question (ministerial type)
- [ ] Edit question (ministerial type)
- [ ] Delete question (ministerial type)
- [ ] Upload question image
- [ ] Create question (enrichment type)
- [ ] Edit question (enrichment type)
- [ ] Delete question (enrichment type)
- [ ] Filter by lesson
- [ ] Search questions
- [ ] View all questions

### Competition Manager

- [ ] Create competition
- [ ] Edit competition
- [ ] Delete competition
- [ ] Set competition dates
- [ ] View participants
- [ ] View competition details

### General Admin

- [ ] Create student
- [ ] Edit student
- [ ] Delete student
- [ ] View student details
- [ ] Create manager
- [ ] Edit manager
- [ ] Delete manager
- [ ] Assign roles
- [ ] View manager details

### Owner

- [ ] Create General Admin
- [ ] Edit General Admin
- [ ] Delete General Admin
- [ ] View system settings
- [ ] Update system settings

---

## Success Criteria

✅ All CRUD operations work for each feature
✅ Role-based access control is enforced
✅ Forms validate correctly (client + server)
✅ Data grid displays data correctly
✅ Pagination works for large datasets
✅ Search and filter work correctly
✅ Soft delete is implemented
✅ Image upload works
✅ All UI is responsive
✅ RTL support works
✅ Bilingual support works
✅ Error handling is comprehensive

---

## Next Phase

After completing Phase 3, proceed to **[Phase 4: Polish](phase-4-polish.md)**

---

**Last Updated:** 2025-01-18
