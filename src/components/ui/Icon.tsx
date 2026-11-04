import React from 'react';
import {
  Recycle,
  Leaf,
  TreePine,
  Droplets,
  Cloud,
  Check,
  CheckCircle2,
  ShieldCheck,
  FileText,
  PlusCircle,
  FilePlus,
  Search,
  SlidersHorizontal,
  Edit3,
  Trash2,
  X,
  Menu,
  ArrowRight,
  ArrowLeft,
  PiggyBank,
  Coins,
  Wallet,
  Trophy,
  Flag,
  Bookmark,
  BookmarkCheck,
  Info,
  Camera,
  Image as ImageIcon,
  AlertTriangle,
  User,
  Settings,
  Calendar,
  MapPin,
  TrendingUp,
  BarChart3,
  Activity,
  Sparkles,
  Share2,
  Download,
  RotateCw,
  Eye,
  Award,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Compass,
  BookOpen,
  HelpCircle,
  Mail,
  Phone,
  Clock,
  Send,
  Play,
  Pause,
  LucideProps
} from 'lucide-react';

export type IconName =
  | 'recycle'
  | 'leaf'
  | 'tree'
  | 'water'
  | 'cloud'
  | 'check'
  | 'check_circle'
  | 'verified'
  | 'receipt'
  | 'description'
  | 'add_circle'
  | 'post_add'
  | 'search'
  | 'filter'
  | 'edit'
  | 'delete'
  | 'close'
  | 'menu'
  | 'arrow_forward'
  | 'arrow_back'
  | 'savings'
  | 'coins'
  | 'wallet'
  | 'leaderboard'
  | 'flag'
  | 'bookmark'
  | 'bookmark_check'
  | 'info'
  | 'camera'
  | 'image'
  | 'alert'
  | 'user'
  | 'settings'
  | 'calendar'
  | 'map_pin'
  | 'trending_up'
  | 'bar_chart'
  | 'activity'
  | 'sparkles'
  | 'share'
  | 'download'
  | 'refresh'
  | 'eye'
  | 'award'
  | 'chevron_down'
  | 'chevron_up'
  | 'chevron_right'
  | 'compass'
  | 'book_open'
  | 'help'
  | 'mail'
  | 'phone'
  | 'clock';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName | string;
  size?: number | string;
  className?: string;
}

const iconMap: Record<string, React.FC<LucideProps>> = {
  recycle: Recycle,
  leaf: Leaf,
  nest_eco_leaf: Leaf,
  tree: TreePine,
  forest: TreePine,
  water: Droplets,
  water_drop: Droplets,
  cloud: Cloud,
  cloud_done: Cloud,
  check: Check,
  check_circle: CheckCircle2,
  verified: ShieldCheck,
  receipt: FileText,
  receipt_long: FileText,
  description: FileText,
  add_circle: PlusCircle,
  post_add: FilePlus,
  search: Search,
  filter: SlidersHorizontal,
  edit: Edit3,
  delete: Trash2,
  close: X,
  menu: Menu,
  arrow_forward: ArrowRight,
  arrow_back: ArrowLeft,
  savings: PiggyBank,
  coins: Coins,
  wallet: Wallet,
  leaderboard: Trophy,
  flag: Flag,
  bookmark: Bookmark,
  bookmark_border: Bookmark,
  bookmark_check: BookmarkCheck,
  info: Info,
  camera: Camera,
  photo_camera: Camera,
  image: ImageIcon,
  alert: AlertTriangle,
  user: User,
  settings: Settings,
  calendar: Calendar,
  calendar_today: Calendar,
  map_pin: MapPin,
  location_on: MapPin,
  trending_up: TrendingUp,
  bar_chart: BarChart3,
  activity: Activity,
  sparkles: Sparkles,
  share: Share2,
  download: Download,
  refresh: RotateCw,
  eye: Eye,
  award: Award,
  emoji_events: Trophy,
  chevron_down: ChevronDown,
  chevron_up: ChevronUp,
  chevron_right: ChevronRight,
  compass: Compass,
  book_open: BookOpen,
  menu_book: BookOpen,
  help: HelpCircle,
  mail: Mail,
  phone: Phone,
  clock: Clock,
  volunteer_activism: Sparkles,
  clean_hands: Droplets,
  compress: ArrowRight,
  diversity_1: User,
  touch_app: Sparkles,
  article: FileText,
  search_off: Search,
  handshake: Check,
  send: Send,
  call: Phone,
  schedule: Clock,
  auto_graph: TrendingUp,
  expand_less: ChevronUp,
  expand_more: ChevronDown,
  cancel: X,
  play: Play,
  pause: Pause
};

export const Icon: React.FC<IconProps> = ({ name, size = 18, className = '', ...props }) => {
  const Component = iconMap[name] || HelpCircle;
  return <Component size={size} className={`inline-block shrink-0 ${className}`} {...props} />;
};
