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
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdNumbers,
  MdFunctions,
  MdOutlineDeleteSweep,
  MdOutlineDelete,
} from 'react-icons/md';  

import { GoSidebarExpand, GoSidebarCollapse, GoDotFill } from 'react-icons/go';

import { LuEye, LuEyeClosed, LuLayoutList } from 'react-icons/lu';
import { IoClose, IoLanguage } from 'react-icons/io5';
import {
  TbPalette,
  TbLayoutDashboardFilled,
  TbClock24,
  TbLayoutListFilled,
  TbAlphabetGreek,
  TbArrowBigRightLines,
  TbArrowBigLeftLines,
  TbArrowBigDownLines,
} from 'react-icons/tb';

import { CgColorBucket } from 'react-icons/cg';
import { RiEnglishInput } from 'react-icons/ri';
import { FaEarthAmericas, FaListOl } from 'react-icons/fa6';
import { BiSolidSelectMultiple, BiAddToQueue } from 'react-icons/bi';
import { HiMenuAlt2, HiMenuAlt3, HiViewGridAdd, HiOutlineFilter } from 'react-icons/hi';
import { HiDocumentPlus } from 'react-icons/hi2';
import { FaCalendarCheck, FaClipboardList } from 'react-icons/fa';
import { PiListNumbersFill } from 'react-icons/pi';
import { TiThListOutline } from 'react-icons/ti';

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
  delete: MdOutlineDelete,
  add: MdAdd,
  addGrid: HiViewGridAdd,
  addToQueue: BiAddToQueue,
  documentPlus: HiDocumentPlus,
  search: MdSearch,
  filterList: MdFilterList,
  filterOutline: HiOutlineFilter,
  clear: MdOutlineDeleteSweep,
  dot: GoDotFill,
  arrowLeftLines: TbArrowBigLeftLines,
  arrowRightLines: TbArrowBigRightLines,
  arrowDownLines: TbArrowBigDownLines,
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
  functions: MdFunctions,
  alphabetGreek: TbAlphabetGreek,

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

  // Numbers & Forms
  numbers: MdNumbers,

  // Lists & Views
  clipboardList: FaClipboardList,
  layoutListFilled: TbLayoutListFilled,
  listNumbersFill: PiListNumbersFill,
  listOl: FaListOl,
  layoutList: LuLayoutList,
  thListOutline: TiThListOutline,
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
