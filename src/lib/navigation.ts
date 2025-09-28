import {
  LayoutDashboard,
  Building2,
  Wrench,
  MessageSquare,
  UserCheck,
  Folder,
  Settings,
  BarChart,
  Monitor,
  Store,
  AreaChart,
  Server,
  FileText,
  AlertTriangle,
  Bell,
  TrendingUp,
  FileCheck,
  FileX,
  BookUser,
  Users,
  CreditCard,
  Paintbrush,
  Megaphone,
  LifeBuoy,
  FilePlus,
  FileCog,
  FileClock,
  Briefcase,
  Landmark,
  History,
  Database,
  TestTube2,
  Mail,
  FileImage,
  Calendar,
  Video,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Bot,
  Code,
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
  FileQuestion,
  ListTodo,
  BotMessageSquare,
  Workflow,
  Shield,
  Plug,
  KeyRound,
  Book,
  LucideIcon,
  Handshake,
  UserRound,
  UserRoundCog,
  Ticket,
  BadgePercent,
  Palette,
  Globe,
  Languages,
  Lock,
  Fingerprint,
  FileUp,
  Mic,
  HistoryIcon,
  UserCog,
  FileBarChart,
  FileBarChart2,
  UsersRound,
  FileSearch,
  FileDiff,
  GitBranch,
  GitPullRequest,
  MailCheck,
  MailWarning,
  MailSearch,
  CalendarPlus,
  CalendarClock,
  VideoIcon,
  Film,
  ClipboardCheck,
  BookOpen,
  BookMarked,
  Pencil,
  Trophy,
  MessageCircle,
  CalendarDays,
  UserSquare,
  Heart,
  Wallet,
  BrainCircuit,
} from 'lucide-react';
export type Role = 'Owner' | 'School Admin' | 'Teacher' | 'Student' | 'Parent';
export interface SubnavItem {
  key: string;
  name: string;
  icon: LucideIcon;
  path: string;
}
export interface HeaderItem {
  key: string;
  name: string;
  subnav: SubnavItem[];
}
export interface RightSidebarItem {
  key: string;
  name: string;
  icon: LucideIcon;
  header: HeaderItem[];
}
export const navigationData: Record<Role, RightSidebarItem[]> = {
  Owner: [
    {
      key: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      header: [
        {
          key: 'analytics',
          name: 'Analytics',
          subnav: [
            { key: 'usage-stats', name: 'Usage', icon: BarChart, path: '/dashboard/owner/analytics/usage-stats' },
            { key: 'revenue-reports', name: 'Revenue', icon: FileBarChart2, path: '/dashboard/owner/analytics/revenue-reports' },
            { key: 'active-users', name: 'Users', icon: UsersRound, path: '/dashboard/owner/analytics/active-users' },
            { key: 'growth-trends', name: 'Growth', icon: TrendingUp, path: '/dashboard/owner/analytics/growth-trends' },
          ],
        },
        {
          key: 'monitoring',
          name: 'Monitoring',
          subnav: [
            { key: 'server-status', name: 'Status', icon: Server, path: '/dashboard/owner/monitoring/server-status' },
            { key: 'logs', name: 'Logs', icon: FileText, path: '/dashboard/owner/monitoring/logs' },
            { key: 'incidents', name: 'Incidents', icon: AlertTriangle, path: '/dashboard/owner/monitoring/incidents' },
            { key: 'alerts', name: 'Alerts', icon: Bell, path: '/dashboard/owner/monitoring/alerts' },
          ],
        },
        {
          key: 'market',
          name: 'Market',
          subnav: [
            { key: 'competitor-analysis', name: 'Competitors', icon: Users, path: '/dashboard/owner/market/competitor-analysis' },
            { key: 'trends', name: 'Trends', icon: TrendingUp, path: '/dashboard/owner/market/trends' },
            { key: 'benchmarks', name: 'Benchmarks', icon: FileBarChart, path: '/dashboard/owner/market/benchmarks' },
            { key: 'forecasts', name: 'Forecasts', icon: AreaChart, path: '/dashboard/owner/market/forecasts' },
          ],
        },
        {
          key: 'system',
          name: 'System',
          subnav: [
            { key: 'release-notes', name: 'Releases', icon: FileDiff, path: '/dashboard/owner/system/release-notes' },
            { key: 'uptime-reports', name: 'Uptime', icon: FileClock, path: '/dashboard/owner/system/uptime-reports' },
            { key: 'error-tracking', name: 'Errors', icon: FileX, path: '/dashboard/owner/system/error-tracking' },
          ],
        },
      ],
    },
    {
      key: 'schools',
      name: 'Schools',
      icon: Building2,
      header: [
        {
          key: 'management',
          name: 'Management',
          subnav: [
            { key: 'all-schools', name: 'All Schools', icon: Building2, path: '/dashboard/owner/schools' },
          ],
        },
        {
          key: 'onboarding',
          name: 'Onboarding',
          subnav: [
            { key: 'new-school-wizard', name: 'Wizard', icon: FilePlus, path: '/dashboard/owner/schools/onboarding/wizard' },
            { key: 'required-docs', name: 'Docs', icon: FileCheck, path: '/dashboard/owner/schools/onboarding/docs' },
            { key: 'config-setup', name: 'Config', icon: FileCog, path: '/dashboard/owner/schools/onboarding/config' },
          ],
        },
        {
          key: 'billing',
          name: 'Billing',
          subnav: [
            { key: 'subscriptions', name: 'Subs', icon: FileClock, path: '/dashboard/owner/schools/billing/subscriptions' },
            { key: 'invoices', name: 'Invoices', icon: FileText, path: '/dashboard/owner/schools/billing/invoices' },
            { key: 'payments', name: 'Payments', icon: CreditCard, path: '/dashboard/owner/schools/billing/payments' },
            { key: 'discounts', name: 'Discounts', icon: BadgePercent, path: '/dashboard/owner/schools/billing/discounts' },
          ],
        },
        {
          key: 'white-labeling',
          name: 'White Label',
          subnav: [
            { key: 'branding', name: 'Branding', icon: Paintbrush, path: '/dashboard/owner/schools/white-labeling/branding' },
            { key: 'domains', name: 'Domains', icon: Globe, path: '/dashboard/owner/schools/white-labeling/domains' },
            { key: 'themes', name: 'Themes', icon: Palette, path: '/dashboard/owner/schools/white-labeling/themes' },
            { key: 'logos', name: 'Logos', icon: FileImage, path: '/dashboard/owner/schools/white-labeling/logos' },
          ],
        },
        {
          key: 'announcements',
          name: 'Announce',
          subnav: [
            { key: 'system-updates', name: 'Updates', icon: Megaphone, path: '/dashboard/owner/schools/announcements/system-updates' },
            { key: 'newsletters', name: 'News', icon: Mail, path: '/dashboard/owner/schools/announcements/newsletters' },
            { key: 'push-notifications', name: 'Push', icon: Bell, path: '/dashboard/owner/schools/announcements/push-notifications' },
          ],
        },
        {
          key: 'support',
          name: 'Support',
          subnav: [
            { key: 'knowledge-base', name: 'Docs', icon: Book, path: '/dashboard/owner/schools/support/knowledge-base' },
            { key: 'tickets', name: 'Tickets', icon: Ticket, path: '/dashboard/owner/schools/support/tickets' },
            { key: 'live-chat', name: 'Chat', icon: MessageSquare, path: '/dashboard/owner/schools/support/live-chat' },
            { key: 'faqs', name: 'FAQs', icon: FileQuestion, path: '/dashboard/owner/schools/support/faqs' },
          ],
        },
      ],
    },
    {
      key: 'tools',
      name: 'Tools',
      icon: Wrench,
      header: [
        {
          key: 'marketing',
          name: 'Marketing',
          subnav: [
            { key: 'campaign-manager', name: 'Campaigns', icon: Megaphone, path: '/dashboard/owner/tools/marketing/campaigns' },
            { key: 'email-tools', name: 'Email', icon: Mail, path: '/dashboard/owner/tools/marketing/email' },
            { key: 'ads-tracking', name: 'Ads', icon: TrendingUp, path: '/dashboard/owner/tools/marketing/ads' },
          ],
        },
        {
          key: 'finance',
          name: 'Finance',
          subnav: [
            { key: 'balance-sheets', name: 'Balance', icon: Landmark, path: '/dashboard/owner/tools/finance/balance' },
            { key: 'invoices', name: 'Invoices', icon: FileText, path: '/dashboard/owner/tools/finance/invoices' },
            { key: 'tax-reports', name: 'Tax', icon: FileBarChart, path: '/dashboard/owner/tools/finance/tax' },
          ],
        },
        {
          key: 'updates',
          name: 'Updates',
          subnav: [
            { key: 'feature-rollouts', name: 'Rollouts', icon: GitBranch, path: '/dashboard/owner/tools/updates/rollouts' },
            { key: 'version-control', name: 'Versions', icon: GitPullRequest, path: '/dashboard/owner/tools/updates/versions' },
            { key: 'rollback', name: 'Rollback', icon: History, path: '/dashboard/owner/tools/updates/rollback' },
          ],
        },
        {
          key: 'data-studio',
          name: 'Data Studio',
          subnav: [
            { key: 'analytics-builder', name: 'Builder', icon: Wrench, path: '/dashboard/owner/tools/data-studio/builder' },
            { key: 'dashboards', name: 'Dashboards', icon: LayoutDashboard, path: '/dashboard/owner/tools/data-studio/dashboards' },
            { key: 'reports-export', name: 'Export', icon: FileUp, path: '/dashboard/owner/tools/data-studio/export' },
            { key: 'knowledge-base', name: 'KB', icon: BrainCircuit, path: '/dashboard/owner/tools/data-studio/kb' },
          ],
        },
        {
          key: 'sandbox',
          name: 'Sandbox',
          subnav: [
            { key: 'beta-features', name: 'Beta', icon: TestTube2, path: '/dashboard/owner/tools/sandbox/beta' },
            { key: 'api-testing', name: 'API Test', icon: Code, path: '/dashboard/owner/tools/sandbox/api-testing' },
            { key: 'demo-accounts', name: 'Demo', icon: Users, path: '/dashboard/owner/tools/sandbox/demo' },
          ],
        },
      ],
    },
    {
      key: 'communication',
      name: 'Communicate',
      icon: MessageSquare,
      header: [
        {
          key: 'email',
          name: 'Email',
          subnav: [
            { key: 'inbox', name: 'Inbox', icon: Mail, path: '/dashboard/owner/communication/email/inbox' },
            { key: 'sent', name: 'Sent', icon: MailCheck, path: '/dashboard/owner/communication/email/sent' },
            { key: 'drafts', name: 'Drafts', icon: MailSearch, path: '/dashboard/owner/communication/email/drafts' },
            { key: 'spam', name: 'Spam', icon: MailWarning, path: '/dashboard/owner/communication/email/spam' },
          ],
        },
        {
          key: 'templates',
          name: 'Templates',
          subnav: [
            { key: 'email-templates', name: 'Email', icon: FileImage, path: '/dashboard/owner/communication/templates/email' },
            { key: 'notification-templates', name: 'Notify', icon: Bell, path: '/dashboard/owner/communication/templates/notification' },
          ],
        },
        {
          key: 'schedule',
          name: 'Schedule',
          subnav: [
            { key: 'calendar', name: 'Calendar', icon: Calendar, path: '/dashboard/owner/communication/schedule/calendar' },
            { key: 'reminders', name: 'Reminders', icon: CalendarClock, path: '/dashboard/owner/communication/schedule/reminders' },
            { key: 'auto-posts', name: 'Auto-Post', icon: CalendarPlus, path: '/dashboard/owner/communication/schedule/auto-posts' },
          ],
        },
        {
          key: 'video-calls',
          name: 'Video Calls',
          subnav: [
            { key: 'meeting-rooms', name: 'Rooms', icon: VideoIcon, path: '/dashboard/owner/communication/video/rooms' },
            { key: 'recordings', name: 'Recordings', icon: Film, path: '/dashboard/owner/communication/video/recordings' },
            { key: 'webinars', name: 'Webinars', icon: Users, path: '/dashboard/owner/communication/video/webinars' },
          ],
        },
        {
          key: 'social-media',
          name: 'Social Media',
          subnav: [
            { key: 'facebook', name: 'Facebook', icon: Facebook, path: '/dashboard/owner/communication/social/facebook' },
            { key: 'instagram', name: 'Instagram', icon: Instagram, path: '/dashboard/owner/communication/social/instagram' },
            { key: 'twitter', name: 'Twitter', icon: Twitter, path: '/dashboard/owner/communication/social/twitter' },
            { key: 'linkedin', name: 'LinkedIn', icon: Linkedin, path: '/dashboard/owner/communication/social/linkedin' },
          ],
        },
      ],
    },
    {
      key: 'concierge',
      name: 'Concierge',
      icon: UserCheck,
      header: [
        {
          key: 'chat',
          name: 'Chat',
          subnav: [
            { key: 'upload-file', name: 'Upload', icon: FileUp, path: '/dashboard/owner/concierge/chat/upload' },
            { key: 'microphone', name: 'Voice AI', icon: Mic, path: '/dashboard/owner/concierge/chat/voice' },
            { key: 'history', name: 'History', icon: HistoryIcon, path: '/dashboard/owner/concierge/chat/history' },
            { key: 'ai-personalization', name: 'AI Personal', icon: UserCog, path: '/dashboard/owner/concierge/chat/personalization' },
          ],
        },
        {
          key: 'technical-help',
          name: 'Tech Help',
          subnav: [
            { key: 'debug', name: 'Debug', icon: Code, path: '/dashboard/owner/concierge/tech/debug' },
            { key: 'api-issues', name: 'API', icon: Plug, path: '/dashboard/owner/concierge/tech/api' },
            { key: 'logs', name: 'Logs', icon: FileText, path: '/dashboard/owner/concierge/tech/logs' },
            { key: 'diagnostics', name: 'Diag', icon: FileSearch, path: '/dashboard/owner/concierge/tech/diagnostics' },
          ],
        },
        {
          key: 'business-help',
          name: 'Biz Help',
          subnav: [
            { key: 'marketing-plans', name: 'Marketing', icon: Megaphone, path: '/dashboard/owner/concierge/business/marketing' },
            { key: 'sales-boost', name: 'Sales', icon: TrendingUp, path: '/dashboard/owner/concierge/business/sales' },
            { key: 'partnerships', name: 'Partners', icon: Handshake, path: '/dashboard/owner/concierge/business/partners' },
            { key: 'growth-strategies', name: 'Growth', icon: AreaChart, path: '/dashboard/owner/concierge/business/growth' },
          ],
        },
        {
          key: 'school',
          name: 'School',
          subnav: [
            { key: 'setup-wizard', name: 'Wizard', icon: FilePlus, path: '/dashboard/owner/concierge/school/setup' },
            { key: 'training-materials', name: 'Training', icon: Book, path: '/dashboard/owner/concierge/school/training' },
            { key: 'ai-advisor', name: 'AI Advisor', icon: Bot, path: '/dashboard/owner/concierge/school/advisor' },
            { key: 'compliance', name: 'Compliance', icon: Shield, path: '/dashboard/owner/concierge/school/compliance' },
          ],
        },
        {
          key: 'custom-requests',
          name: 'Custom',
          subnav: [
            { key: 'feature-requests', name: 'Features', icon: FilePlus, path: '/dashboard/owner/concierge/custom/features' },
            { key: 'consulting', name: 'Consulting', icon: Briefcase, path: '/dashboard/owner/concierge/custom/consulting' },
            { key: 'integrations', name: 'Integrate', icon: Plug, path: '/dashboard/owner/concierge/custom/integrations' },
            { key: 'advisory', name: 'Advisory', icon: UserCheck, path: '/dashboard/owner/concierge/custom/advisory' },
          ],
        },
        {
          key: 'productivity-hub',
          name: 'Productivity',
          subnav: [
            { key: 'todo-ai', name: 'To-Do AI', icon: ListTodo, path: '/dashboard/owner/concierge/productivity/todo' },
            { key: 'meeting-summaries', name: 'Summaries', icon: FileText, path: '/dashboard/owner/concierge/productivity/summaries' },
            { key: 'notes-ai', name: 'Notes AI', icon: FileCog, path: '/dashboard/owner/concierge/productivity/notes' },
            { key: 'scheduling', name: 'Schedule', icon: Calendar, path: '/dashboard/owner/concierge/productivity/scheduling' },
          ],
        },
        {
          key: 'ai-tutor',
          name: 'AI Tutor',
          subnav: [
            { key: 'teacher-training', name: 'Teachers', icon: GraduationCap, path: '/dashboard/owner/concierge/tutor/teachers' },
            { key: 'student-coaching', name: 'Students', icon: UserRound, path: '/dashboard/owner/concierge/tutor/students' },
            { key: 'ai-scenarios', name: 'Scenarios', icon: BotMessageSquare, path: '/dashboard/owner/concierge/tutor/scenarios' },
          ],
        },
        {
          key: 'automation-flows',
          name: 'Automation',
          subnav: [
            { key: 'workflow-builder', name: 'Builder', icon: Workflow, path: '/dashboard/owner/concierge/automation/builder' },
            { key: 'auto-reports', name: 'Reports', icon: FileBarChart, path: '/dashboard/owner/concierge/automation/reports' },
            { key: 'event-triggers', name: 'Triggers', icon: Bell, path: '/dashboard/owner/concierge/automation/triggers' },
            { key: 'alerts', name: 'Alerts', icon: AlertTriangle, path: '/dashboard/owner/concierge/automation/alerts' },
          ],
        },
      ],
    },
    {
      key: 'directories',
      name: 'Directories',
      icon: Folder,
      header: [
        {
          key: 'schools',
          name: 'Schools',
          subnav: [
            { key: 'active', name: 'Active', icon: FileCheck, path: '/dashboard/owner/schools' },
            { key: 'pending', name: 'Pending', icon: FileClock, path: '/dashboard/owner/directories/schools/pending' },
            { key: 'archived', name: 'Archived', icon: FileX, path: '/dashboard/owner/directories/schools/archived' },
          ],
        },
        {
          key: 'staff',
          name: 'Staff',
          subnav: [
            { key: 'teachers', name: 'Teachers', icon: GraduationCap, path: '/dashboard/owner/directories/staff/teachers' },
            { key: 'admins', name: 'Admins', icon: UserCog, path: '/dashboard/owner/directories/staff/admins' },
            { key: 'hr', name: 'HR', icon: Users, path: '/dashboard/owner/directories/staff/hr' },
          ],
        },
        {
          key: 'students',
          name: 'Students',
          subnav: [
            { key: 'active', name: 'Active', icon: UserRound, path: '/dashboard/owner/directories/students/active' },
            { key: 'alumni', name: 'Alumni', icon: Users, path: '/dashboard/owner/directories/students/alumni' },
            { key: 'prospective', name: 'Prospects', icon: UserRoundCog, path: '/dashboard/owner/directories/students/prospective' },
          ],
        },
        {
          key: 'partners',
          name: 'Partners',
          subnav: [
            { key: 'vendors', name: 'Vendors', icon: Briefcase, path: '/dashboard/owner/directories/partners/vendors' },
            { key: 'sponsors', name: 'Sponsors', icon: Handshake, path: '/dashboard/owner/directories/partners/sponsors' },
            { key: 'affiliates', name: 'Affiliates', icon: Users, path: '/dashboard/owner/directories/partners/affiliates' },
          ],
        },
      ],
    },
    {
      key: 'system-settings',
      name: 'Settings',
      icon: Settings,
      header: [
        {
          key: 'general-settings',
          name: 'General',
          subnav: [
            { key: 'branding', name: 'Branding', icon: Paintbrush, path: '/dashboard/owner/settings/general/branding' },
            { key: 'language', name: 'Language', icon: Languages, path: '/dashboard/owner/settings/general/language' },
            { key: 'preferences', name: 'Prefs', icon: Settings, path: '/dashboard/owner/settings/general/preferences' },
          ],
        },
        {
          key: 'security',
          name: 'Security',
          subnav: [
            { key: 'roles', name: 'Roles', icon: Users, path: '/dashboard/owner/settings/security/roles' },
            { key: 'permissions', name: 'Perms', icon: Shield, path: '/dashboard/owner/settings/security/permissions' },
            { key: 'encryption', name: 'Encrypt', icon: Lock, path: '/dashboard/owner/settings/security/encryption' },
            { key: 'sso', name: 'SSO', icon: Fingerprint, path: '/dashboard/owner/settings/security/sso' },
          ],
        },
        {
          key: 'integrations',
          name: 'Integrations',
          subnav: [
            { key: 'third-party-apps', name: 'Apps', icon: Briefcase, path: '/dashboard/owner/settings/integrations/apps' },
            { key: 'api-connectors', name: 'Connectors', icon: Plug, path: '/dashboard/owner/settings/integrations/connectors' },
            { key: 'plugins', name: 'Plugins', icon: Wrench, path: '/dashboard/owner/settings/integrations/plugins' },
          ],
        },
        {
          key: 'api-keys',
          name: 'API Keys',
          subnav: [
            { key: 'create-key', name: 'Create', icon: FilePlus, path: '/dashboard/owner/settings/api-keys/create' },
            { key: 'manage-keys', name: 'Manage', icon: KeyRound, path: '/dashboard/owner/settings/api-keys/manage' },
            { key: 'permissions', name: 'Perms', icon: Shield, path: '/dashboard/owner/settings/api-keys/permissions' },
          ],
        },
        {
          key: 'logs',
          name: 'Logs',
          subnav: [
            { key: 'system-logs', name: 'System', icon: FileText, path: '/dashboard/owner/settings/logs/system' },
            { key: 'audit-logs', name: 'Audit', icon: FileSearch, path: '/dashboard/owner/settings/logs/audit' },
            { key: 'access-logs', name: 'Access', icon: FileCog, path: '/dashboard/owner/settings/logs/access' },
          ],
        },
      ],
    },
  ],
  'School Admin': [
    {
      key: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      header: [
        {
          key: 'overview',
          name: 'Overview',
          subnav: [
            { key: 'school-stats', name: 'Stats', icon: BarChart, path: '/dashboard/admin/overview/stats' },
            { key: 'alerts', name: 'Alerts', icon: Bell, path: '/dashboard/admin/overview/alerts' },
          ],
        },
      ],
    },
    {
      key: 'management',
      name: 'Management',
      icon: Building2,
      header: [
        {
          key: 'users',
          name: 'Users',
          subnav: [
            { key: 'teachers', name: 'Teachers', icon: GraduationCap, path: '/dashboard/admin/users' },
            { key: 'students', name: 'Students', icon: UserRound, path: '/dashboard/admin/users' },
            { key: 'parents', name: 'Parents', icon: Users, path: '/dashboard/admin/users' },
          ],
        },
        {
          key: 'classes',
          name: 'Classes',
          subnav: [
            { key: 'manage-classes', name: 'Manage', icon: BookUser, path: '/dashboard/admin/classes/manage' },
            { key: 'schedule', name: 'Schedule', icon: Calendar, path: '/dashboard/admin/classes/schedule' },
          ],
        },
      ],
    },
  ],
  Teacher: [
    {
      key: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      header: [
        {
          key: 'my-classes',
          name: 'My Classes',
          subnav: [
            { key: 'class-list', name: 'Classes', icon: BookOpen, path: '/dashboard/teacher/classes/list' },
            { key: 'schedule', name: 'Schedule', icon: Calendar, path: '/dashboard/teacher/classes/schedule' },
          ],
        },
        {
          key: 'assignments',
          name: 'Assignments',
          subnav: [
            { key: 'view-all', name: 'View All', icon: FileText, path: '/dashboard/teacher/assignments/view' },
            { key: 'create-new', name: 'Create', icon: Pencil, path: '/dashboard/teacher/assignments/create' },
            { key: 'grading', name: 'Grading', icon: ClipboardCheck, path: '/dashboard/teacher/assignments/grading' },
          ],
        },
      ],
    },
    {
      key: 'communication',
      name: 'Communicate',
      icon: MessageSquare,
      header: [
        {
          key: 'messages',
          name: 'Messages',
          subnav: [
            { key: 'inbox', name: 'Inbox', icon: Mail, path: '/dashboard/teacher/messages/inbox' },
            { key: 'sent', name: 'Sent', icon: MailCheck, path: '/dashboard/teacher/messages/sent' },
          ],
        },
        {
          key: 'announcements',
          name: 'Announce',
          subnav: [
            { key: 'class-news', name: 'Class News', icon: Megaphone, path: '/dashboard/teacher/announcements/class' },
          ],
        },
      ],
    },
  ],
  Student: [
    {
      key: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      header: [
        {
          key: 'my-courses',
          name: 'My Courses',
          subnav: [
            { key: 'active-courses', name: 'Courses', icon: BookOpen, path: '/dashboard/student/courses/active' },
            { key: 'grades', name: 'Grades', icon: Trophy, path: '/dashboard/student/courses/grades' },
          ],
        },
        {
          key: 'assignments',
          name: 'Assignments',
          subnav: [
            { key: 'upcoming', name: 'Upcoming', icon: CalendarClock, path: '/dashboard/student/assignments/upcoming' },
            { key: 'submitted', name: 'Submitted', icon: FileCheck, path: '/dashboard/student/assignments/submitted' },
          ],
        },
      ],
    },
    {
      key: 'resources',
      name: 'Resources',
      icon: BookMarked,
      header: [
        {
          key: 'library',
          name: 'Library',
          subnav: [
            { key: 'search', name: 'Search', icon: FileSearch, path: '/dashboard/student/library/search' },
          ],
        },
        {
          key: 'schedule',
          name: 'Schedule',
          subnav: [
            { key: 'my-schedule', name: 'Calendar', icon: CalendarDays, path: '/dashboard/student/schedule/calendar' },
          ],
        },
      ],
    },
  ],
  Parent: [
    {
      key: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      header: [
        {
          key: 'my-children',
          name: 'My Children',
          subnav: [
            { key: 'child-1', name: 'Alex', icon: UserSquare, path: '/dashboard/parent/children/alex' },
            { key: 'child-2', name: 'Sarah', icon: UserSquare, path: '/dashboard/parent/children/sarah' },
          ],
        },
        {
          key: 'school-info',
          name: 'School Info',
          subnav: [
            { key: 'announcements', name: 'Announce', icon: Megaphone, path: '/dashboard/parent/school/announcements' },
            { key: 'calendar', name: 'Calendar', icon: Calendar, path: '/dashboard/parent/school/calendar' },
          ],
        },
      ],
    },
    {
      key: 'communication',
      name: 'Communicate',
      icon: MessageSquare,
      header: [
        {
          key: 'messages',
          name: 'Messages',
          subnav: [
            { key: 'inbox', name: 'Inbox', icon: Mail, path: '/dashboard/parent/messages/inbox' },
            { key: 'teachers', name: 'Teachers', icon: GraduationCap, path: '/dashboard/parent/messages/teachers' },
          ],
        },
      ],
    },
    {
      key: 'finance',
      name: 'Finance',
      icon: Wallet,
      header: [
        {
          key: 'billing',
          name: 'Billing',
          subnav: [
            { key: 'invoices', name: 'Invoices', icon: FileText, path: '/dashboard/parent/billing/invoices' },
            { key: 'payments', name: 'Payments', icon: CreditCard, path: '/dashboard/parent/billing/payments' },
          ],
        },
      ],
    },
  ],
};