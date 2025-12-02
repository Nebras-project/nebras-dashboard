// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// Icon imports
import {
  MdErrorOutline,
  MdRefresh,
  MdHome,
  MdVisibility,
  MdClose,
  MdContrast,
  MdLightMode,
  MdDarkMode,
  MdPerson,
  MdEmail,
  MdPhone,
  MdArrowForward,
  MdArrowBack,
  MdLogout,
  MdExpandMore,
  MdExpandLess,
  MdCheck,
  MdSentimentDissatisfied,
  MdMenuBook,
  MdSchool,
  MdAutoStories,
  MdBookmark,
  MdEmojiEvents,
  MdGroups,
  MdQuestionAnswer,
  MdGavel,
  MdLightbulb,
  MdManageAccounts,
  MdSettings,
  MdAccountCircle,
  MdTune,
  MdPeople,
  MdAdminPanelSettings,
  MdQuiz,
  MdClass,
  MdCheckCircle,
  MdLibraryBooks,
  MdTrendingUp,
  MdUpcoming,
  MdPendingActions,
  MdLogin,
  MdInfo,
  MdInfoOutline,
  MdLock,
  MdMoreVert,
  MdContentCopy,
  MdEdit,
  MdDelete,
  MdAdd,
  MdTaskAlt,
  MdPlayArrow,
  MdSwapHoriz,
  MdBarChart,
  MdCalendarToday,
  MdDateRange,
  MdAccessTime,
  MdSearch,
  MdFilterList,
  MdClear,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from 'react-icons/md';
import { GoSidebarExpand, GoSidebarCollapse } from 'react-icons/go';

import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { IoClose, IoLanguage } from 'react-icons/io5';
import { TbPalette, TbLayoutDashboardFilled, TbClock24 } from 'react-icons/tb';
import { CgColorBucket } from 'react-icons/cg';
import { RiEnglishInput } from 'react-icons/ri';
import { FaEarthAmericas } from 'react-icons/fa6';
import { BiSolidSelectMultiple } from 'react-icons/bi';
import { HiMenuAlt2, HiMenuAlt3, HiViewGridAdd } from 'react-icons/hi';
import { HiDocumentPlus } from 'react-icons/hi2';
import { FaCalendarCheck } from 'react-icons/fa';

// Icon map - centralized icon registry
const ICON_MAP = {
  // Error & Status
  error: MdErrorOutline,
  info: MdInfo,
  infoOutline: MdInfoOutline,
  refresh: MdRefresh,

  // Navigation
  home: MdHome,
  dashboard: TbLayoutDashboardFilled,
  arrowForward: MdArrowForward,
  arrowBack: MdArrowBack,

  // UI Actions
  close: MdClose,
  closeAlt: IoClose,
  visibility: MdVisibility,
  eye: LuEye,
  eyeClosed: LuEyeClosed,
  expandMore: MdExpandMore,
  expandLess: MdExpandLess,
  keyboardArrowUp: MdKeyboardArrowUp,
  keyboardArrowDown: MdKeyboardArrowDown,
  check: MdCheck,
  checkCircle: MdCheckCircle,
  logout: MdLogout,
  login: MdLogin,
  moreVert: MdMoreVert,
  contentCopy: MdContentCopy,
  edit: MdEdit,
  delete: MdDelete,
  add: MdAdd,
  addGrid: HiViewGridAdd,
  documentPlus: HiDocumentPlus,
  search: MdSearch,
  filterList: MdFilterList,
  clear: MdClear,

  // Theme
  contrast: MdContrast,
  lightMode: MdLightMode,
  darkMode: MdDarkMode,
  palette: TbPalette,
  colorBucket: CgColorBucket,

  // User
  person: MdPerson,
  email: MdEmail,
  phone: MdPhone,
  accountCircle: MdAccountCircle,
  manageAccounts: MdManageAccounts,
  groups: MdGroups,
  people: MdPeople,
  adminPanel: MdAdminPanelSettings,

  // Language & Locale
  language: IoLanguage,
  english: RiEnglishInput,
  earth: FaEarthAmericas,

  // Menu
  menuLeft: HiMenuAlt2,
  menuRight: HiMenuAlt3,
  panelLeft: GoSidebarExpand,
  panelRight: GoSidebarCollapse,

  // Content & Education
  book: MdMenuBook,
  menuBook: MdMenuBook,
  school: MdSchool,
  autoStories: MdAutoStories,
  bookmark: MdBookmark,
  selectMultiple: BiSolidSelectMultiple,
  questionAnswer: MdQuestionAnswer,
  gavel: MdGavel,
  lightbulb: MdLightbulb,

  // Competitions & Events
  emojiEvents: MdEmojiEvents,

  // Settings
  settings: MdSettings,
  tune: MdTune,

  // Education & Content
  quiz: MdQuiz,
  class: MdClass,
  libraryBooks: MdLibraryBooks,
  trendingUp: MdTrendingUp,

  // Status & Time
  upcoming: MdUpcoming,
  pendingActions: MdPendingActions,

  // Emotions
  sad: MdSentimentDissatisfied,

  // Security
  lock: MdLock,

  // Completion & Tasks
  taskAlt: MdTaskAlt,

  // Actions
  playArrow: MdPlayArrow,
  swapHoriz: MdSwapHoriz,

  // Charts & Analytics
  barChart: MdBarChart,

  // Calendar & Events
  calendarCheck: FaCalendarCheck,
  calendarToday: MdCalendarToday,
  dateRange: MdDateRange,
  accessTime: MdAccessTime,
  clock: TbClock24,
};

const Icon = memo(function Icon({
  name,
  component,
  size = 24,
  color,
  style,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  ...props
}) {
  // If custom component is provided, use it directly
  if (component) {
    const CustomIcon = component;
    return (
      <CustomIcon
        size={size}
        color={color}
        style={style}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden !== undefined ? ariaHidden : ariaLabel ? false : true}
        {...props}
      />
    );
  }

  // Otherwise, use the icon from the registry
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in ICON_MAP. Use 'component' prop for custom icons.`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      style={style}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden !== undefined ? ariaHidden : ariaLabel ? false : true}
      {...props}
    />
  );
});

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICON_MAP)),
  component: PropTypes.elementType,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
  'aria-label': PropTypes.string,
  'aria-hidden': PropTypes.bool,
};

Icon.displayName = 'Icon';

export default Icon;
