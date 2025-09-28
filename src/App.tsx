import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from '@/pages/HomePage';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardPlaceholder } from '@/pages/DashboardPlaceholder';
import { navigationData, Role } from './lib/navigation';
import { RouteErrorBoundary } from './components/RouteErrorBoundary';
import { RouterContextWrapper } from './components/router/RouterComponents';
// --- Page Imports ---
// Owner
import { AnalyticsUsagePage } from './pages/owner/AnalyticsUsagePage';
import { MonitoringServerStatusPage } from './pages/owner/MonitoringServerStatusPage';
import { ConciergeChatPage } from './pages/owner/ConciergeChatPage';
import { SchoolsOnboardingWizardPage } from './pages/owner/SchoolsOnboardingWizardPage';
import { SchoolsListPage } from './pages/owner/schools/SchoolsListPage';
import { SchoolUsersPage } from './pages/owner/schools/SchoolUsersPage';
import { OwnerBillingPage } from './pages/owner/schools/OwnerBillingPage';
import { OwnerSecurityPage } from './pages/owner/settings/OwnerSecurityPage';
import { OwnerApiKeysPage } from './pages/owner/settings/OwnerApiKeysPage';
import { OwnerFinancePage } from './pages/owner/tools/OwnerFinancePage';
import { OwnerCommunicationPage } from './pages/owner/communication/OwnerCommunicationPage';
import { OwnerDirectoryPage } from './pages/owner/directories/OwnerDirectoryPage';
import { OwnerGeneralSettingsPage } from './pages/owner/settings/OwnerGeneralSettingsPage';
import { OwnerSupportPage } from './pages/owner/schools/OwnerSupportPage';
import { OwnerWhiteLabelingPage } from './pages/owner/schools/OwnerWhiteLabelingPage';
import { KnowledgeBasePage } from './pages/owner/tools/KnowledgeBasePage';
import { OwnerDataStudioPage } from './pages/owner/tools/OwnerDataStudioPage';
// Admin
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminManageClassesPage } from './pages/admin/classes/AdminManageClassesPage';
import { AdminSchedulePage } from './pages/admin/classes/AdminSchedulePage';
import { AdminAlertsPage } from './pages/admin/overview/AdminAlertsPage';
// Teacher
import { TeacherDashboardPage } from './pages/teacher/TeacherDashboardPage';
import { TeacherAssignmentsPage } from './pages/teacher/assignments/TeacherAssignmentsPage';
import { TeacherCreateAssignmentPage } from './pages/teacher/assignments/TeacherCreateAssignmentPage';
import { TeacherGradingPage } from './pages/teacher/assignments/TeacherGradingPage';
import { TeacherCommunicationPage } from './pages/teacher/communication/TeacherCommunicationPage';
import { TeacherSchedulePage } from './pages/teacher/classes/TeacherSchedulePage';
import { TeacherMessagesPage } from './pages/teacher/communication/TeacherMessagesPage';
// Student
import { StudentDashboardPage } from './pages/student/StudentDashboardPage';
import { StudentGradesPage } from './pages/student/courses/StudentGradesPage';
import { StudentAssignmentViewPage } from './pages/student/assignments/StudentAssignmentViewPage';
import { StudentSchedulePage } from './pages/student/schedule/StudentSchedulePage';
import { StudentLibraryPage } from './pages/student/resources/StudentLibraryPage';
import { StudentSubmittedPage } from './pages/student/assignments/StudentSubmittedPage';
import { StudentUpcomingAssignmentsPage } from './pages/student/assignments/StudentUpcomingAssignmentsPage';
import { StudentCourseDetailPage } from './pages/student/courses/StudentCourseDetailPage';
// Parent
import { ParentDashboardPage } from './pages/parent/ParentDashboardPage';
import { ParentChildReportPage } from './pages/parent/children/ParentChildReportPage';
import { ParentBillingPage } from './pages/parent/finance/ParentBillingPage';
import { ParentAnnouncementsPage } from './pages/parent/school/ParentAnnouncementsPage';
import { ParentCalendarPage } from './pages/parent/school/ParentCalendarPage';
import { ParentCommunicationPage } from './pages/parent/communication/ParentCommunicationPage';
import { ParentMessagesPage } from './pages/parent/communication/ParentMessagesPage';
// Shared
import { ReportsPlaceholderPage } from './pages/shared/ReportsPlaceholderPage';
import { ComingSoonPage } from './pages/shared/ComingSoonPage';
const allRoles: Role[] = ['Owner', 'School Admin', 'Teacher', 'Student', 'Parent'];
const pageComponentMap: Record<string, React.ComponentType<any>> = {
  // --- Owner ---
  '/dashboard/owner/analytics/usage-stats': AnalyticsUsagePage,
  '/dashboard/owner/analytics/revenue-reports': ReportsPlaceholderPage,
  '/dashboard/owner/analytics/active-users': ReportsPlaceholderPage,
  '/dashboard/owner/analytics/growth-trends': ReportsPlaceholderPage,
  '/dashboard/owner/monitoring/server-status': MonitoringServerStatusPage,
  '/dashboard/owner/monitoring/logs': ComingSoonPage,
  '/dashboard/owner/monitoring/incidents': ComingSoonPage,
  '/dashboard/owner/monitoring/alerts': ComingSoonPage,
  '/dashboard/owner/market/competitor-analysis': ReportsPlaceholderPage,
  '/dashboard/owner/market/trends': ReportsPlaceholderPage,
  '/dashboard/owner/market/benchmarks': ReportsPlaceholderPage,
  '/dashboard/owner/market/forecasts': ReportsPlaceholderPage,
  '/dashboard/owner/system/release-notes': ComingSoonPage,
  '/dashboard/owner/system/uptime-reports': ReportsPlaceholderPage,
  '/dashboard/owner/system/error-tracking': ComingSoonPage,
  '/dashboard/owner/schools': SchoolsListPage,
  '/dashboard/owner/schools/onboarding/wizard': SchoolsOnboardingWizardPage,
  '/dashboard/owner/schools/onboarding/docs': ComingSoonPage,
  '/dashboard/owner/schools/onboarding/config': ComingSoonPage,
  '/dashboard/owner/schools/billing/subscriptions': OwnerBillingPage,
  '/dashboard/owner/schools/billing/invoices': OwnerBillingPage,
  '/dashboard/owner/schools/billing/payments': OwnerBillingPage,
  '/dashboard/owner/schools/billing/discounts': OwnerBillingPage,
  '/dashboard/owner/schools/white-labeling/branding': OwnerWhiteLabelingPage,
  '/dashboard/owner/schools/white-labeling/domains': OwnerWhiteLabelingPage,
  '/dashboard/owner/schools/white-labeling/themes': OwnerWhiteLabelingPage,
  '/dashboard/owner/schools/white-labeling/logos': OwnerWhiteLabelingPage,
  '/dashboard/owner/schools/announcements/system-updates': ComingSoonPage,
  '/dashboard/owner/schools/announcements/newsletters': ComingSoonPage,
  '/dashboard/owner/schools/announcements/push-notifications': ComingSoonPage,
  '/dashboard/owner/schools/support/knowledge-base': ComingSoonPage,
  '/dashboard/owner/schools/support/tickets': OwnerSupportPage,
  '/dashboard/owner/schools/support/live-chat': ComingSoonPage,
  '/dashboard/owner/schools/support/faqs': ComingSoonPage,
  '/dashboard/owner/tools/marketing/campaigns': ComingSoonPage,
  '/dashboard/owner/tools/marketing/email': ComingSoonPage,
  '/dashboard/owner/tools/marketing/ads': ComingSoonPage,
  '/dashboard/owner/tools/finance/balance': OwnerFinancePage,
  '/dashboard/owner/tools/finance/invoices': OwnerFinancePage,
  '/dashboard/owner/tools/finance/tax': OwnerFinancePage,
  '/dashboard/owner/tools/updates/rollouts': ComingSoonPage,
  '/dashboard/owner/tools/updates/versions': ComingSoonPage,
  '/dashboard/owner/tools/updates/rollback': ComingSoonPage,
  '/dashboard/owner/tools/data-studio/builder': OwnerDataStudioPage,
  '/dashboard/owner/tools/data-studio/dashboards': OwnerDataStudioPage,
  '/dashboard/owner/tools/data-studio/export': OwnerDataStudioPage,
  '/dashboard/owner/tools/data-studio/kb': KnowledgeBasePage,
  '/dashboard/owner/tools/sandbox/beta': ComingSoonPage,
  '/dashboard/owner/tools/sandbox/api-testing': ComingSoonPage,
  '/dashboard/owner/tools/sandbox/demo': ComingSoonPage,
  '/dashboard/owner/communication/email/inbox': OwnerCommunicationPage,
  '/dashboard/owner/communication/email/sent': OwnerCommunicationPage,
  '/dashboard/owner/communication/email/drafts': OwnerCommunicationPage,
  '/dashboard/owner/communication/email/spam': OwnerCommunicationPage,
  '/dashboard/owner/communication/templates/email': OwnerCommunicationPage,
  '/dashboard/owner/communication/templates/notification': OwnerCommunicationPage,
  '/dashboard/owner/communication/schedule/calendar': ComingSoonPage,
  '/dashboard/owner/communication/schedule/reminders': ComingSoonPage,
  '/dashboard/owner/communication/schedule/auto-posts': ComingSoonPage,
  '/dashboard/owner/communication/video/rooms': ComingSoonPage,
  '/dashboard/owner/communication/video/recordings': ComingSoonPage,
  '/dashboard/owner/communication/video/webinars': ComingSoonPage,
  '/dashboard/owner/communication/social/facebook': ComingSoonPage,
  '/dashboard/owner/communication/social/instagram': ComingSoonPage,
  '/dashboard/owner/communication/social/twitter': ComingSoonPage,
  '/dashboard/owner/communication/social/linkedin': ComingSoonPage,
  '/dashboard/owner/concierge/chat/upload': ConciergeChatPage,
  '/dashboard/owner/concierge/chat/voice': ConciergeChatPage,
  '/dashboard/owner/concierge/chat/history': ConciergeChatPage,
  '/dashboard/owner/concierge/chat/personalization': ConciergeChatPage,
  '/dashboard/owner/concierge/tech/debug': ConciergeChatPage,
  '/dashboard/owner/concierge/tech/api': ConciergeChatPage,
  '/dashboard/owner/concierge/tech/logs': ConciergeChatPage,
  '/dashboard/owner/concierge/tech/diagnostics': ConciergeChatPage,
  '/dashboard/owner/concierge/business/marketing': ConciergeChatPage,
  '/dashboard/owner/concierge/business/sales': ConciergeChatPage,
  '/dashboard/owner/concierge/business/partners': ConciergeChatPage,
  '/dashboard/owner/concierge/business/growth': ConciergeChatPage,
  '/dashboard/owner/concierge/school/setup': ConciergeChatPage,
  '/dashboard/owner/concierge/school/training': ConciergeChatPage,
  '/dashboard/owner/concierge/school/advisor': ConciergeChatPage,
  '/dashboard/owner/concierge/school/compliance': ConciergeChatPage,
  '/dashboard/owner/concierge/custom/features': ConciergeChatPage,
  '/dashboard/owner/concierge/custom/consulting': ConciergeChatPage,
  '/dashboard/owner/concierge/custom/integrations': ConciergeChatPage,
  '/dashboard/owner/concierge/custom/advisory': ConciergeChatPage,
  '/dashboard/owner/concierge/productivity/todo': ConciergeChatPage,
  '/dashboard/owner/concierge/productivity/summaries': ConciergeChatPage,
  '/dashboard/owner/concierge/productivity/notes': ConciergeChatPage,
  '/dashboard/owner/concierge/productivity/scheduling': ConciergeChatPage,
  '/dashboard/owner/concierge/tutor/teachers': ConciergeChatPage,
  '/dashboard/owner/concierge/tutor/students': ConciergeChatPage,
  '/dashboard/owner/concierge/tutor/scenarios': ConciergeChatPage,
  '/dashboard/owner/concierge/automation/builder': ConciergeChatPage,
  '/dashboard/owner/concierge/automation/reports': ConciergeChatPage,
  '/dashboard/owner/concierge/automation/triggers': ConciergeChatPage,
  '/dashboard/owner/concierge/automation/alerts': ConciergeChatPage,
  '/dashboard/owner/directories/schools/pending': OwnerDirectoryPage,
  '/dashboard/owner/directories/schools/archived': OwnerDirectoryPage,
  '/dashboard/owner/directories/staff/teachers': OwnerDirectoryPage,
  '/dashboard/owner/directories/staff/admins': OwnerDirectoryPage,
  '/dashboard/owner/directories/staff/hr': OwnerDirectoryPage,
  '/dashboard/owner/directories/students/active': OwnerDirectoryPage,
  '/dashboard/owner/directories/students/alumni': OwnerDirectoryPage,
  '/dashboard/owner/directories/students/prospective': OwnerDirectoryPage,
  '/dashboard/owner/directories/partners/vendors': OwnerDirectoryPage,
  '/dashboard/owner/directories/partners/sponsors': OwnerDirectoryPage,
  '/dashboard/owner/directories/partners/affiliates': OwnerDirectoryPage,
  '/dashboard/owner/settings/general/branding': OwnerGeneralSettingsPage,
  '/dashboard/owner/settings/general/language': OwnerGeneralSettingsPage,
  '/dashboard/owner/settings/general/preferences': OwnerGeneralSettingsPage,
  '/dashboard/owner/settings/security/roles': OwnerSecurityPage,
  '/dashboard/owner/settings/security/permissions': OwnerSecurityPage,
  '/dashboard/owner/settings/security/encryption': OwnerSecurityPage,
  '/dashboard/owner/settings/security/sso': OwnerSecurityPage,
  '/dashboard/owner/settings/integrations/apps': ComingSoonPage,
  '/dashboard/owner/settings/integrations/connectors': ComingSoonPage,
  '/dashboard/owner/settings/integrations/plugins': ComingSoonPage,
  '/dashboard/owner/settings/api-keys/create': OwnerApiKeysPage,
  '/dashboard/owner/settings/api-keys/manage': OwnerApiKeysPage,
  '/dashboard/owner/settings/api-keys/permissions': OwnerApiKeysPage,
  '/dashboard/owner/settings/logs/system': ComingSoonPage,
  '/dashboard/owner/settings/logs/audit': ComingSoonPage,
  '/dashboard/owner/settings/logs/access': ComingSoonPage,
  // --- Admin ---
  '/dashboard/admin/overview/stats': AdminDashboardPage,
  '/dashboard/admin/overview/alerts': AdminAlertsPage,
  '/dashboard/admin/users': AdminUsersPage,
  '/dashboard/admin/classes/manage': AdminManageClassesPage,
  '/dashboard/admin/classes/schedule': AdminSchedulePage,
  // --- Teacher ---
  '/dashboard/teacher/classes/list': TeacherDashboardPage,
  '/dashboard/teacher/classes/schedule': TeacherSchedulePage,
  '/dashboard/teacher/assignments/view': TeacherAssignmentsPage,
  '/dashboard/teacher/assignments/create': TeacherCreateAssignmentPage,
  '/dashboard/teacher/assignments/grading': TeacherGradingPage,
  '/dashboard/teacher/messages/inbox': TeacherMessagesPage,
  '/dashboard/teacher/messages/sent': TeacherMessagesPage,
  '/dashboard/teacher/announcements/class': TeacherCommunicationPage,
  // --- Student ---
  '/dashboard/student/courses/active': StudentCourseDetailPage,
  '/dashboard/student/courses/grades': StudentGradesPage,
  '/dashboard/student/assignments/upcoming': StudentUpcomingAssignmentsPage,
  '/dashboard/student/assignments/submitted': StudentSubmittedPage,
  '/dashboard/student/schedule/calendar': StudentSchedulePage,
  '/dashboard/student/library/search': StudentLibraryPage,
  // --- Parent ---
  '/dashboard/parent/children/alex': ParentChildReportPage,
  '/dashboard/parent/children/sarah': ParentChildReportPage,
  '/dashboard/parent/school/announcements': ParentAnnouncementsPage,
  '/dashboard/parent/school/calendar': ParentCalendarPage,
  '/dashboard/parent/messages/inbox': ParentMessagesPage,
  '/dashboard/parent/messages/teachers': ParentMessagesPage,
  '/dashboard/parent/billing/invoices': ParentBillingPage,
  '/dashboard/parent/billing/payments': ParentBillingPage,
};
const generateRoutesForRole = (role: Role) => {
  if (!navigationData[role]) return [];
  const uniquePaths = new Set<string>();
  return navigationData[role].flatMap(r =>
    r.header.flatMap(h =>
      h.subnav.map(s => {
        if (uniquePaths.has(s.path) || s.path.includes(':')) return null;
        uniquePaths.add(s.path);
        const PageComponent = pageComponentMap[s.path] || DashboardPlaceholder;
        return {
          path: s.path.replace('/dashboard/', ''),
          element: <PageComponent />,
        };
      })
    )
  ).filter(Boolean);
};
const allAppRoutes = allRoles.flatMap(generateRoutesForRole);
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: (
      <RouterContextWrapper>
        <DashboardLayout />
      </RouterContextWrapper>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <DashboardPlaceholder />,
      },
      ...allAppRoutes,
      // Dynamic Routes
      {
        path: 'owner/schools/:schoolId/users',
        element: <SchoolUsersPage />,
      },
      {
        path: 'student/assignments/:assignmentId/view',
        element: <StudentAssignmentViewPage />,
      },
      {
        path: 'teacher/assignments/:assignmentId/grading',
        element: <TeacherGradingPage />,
      },
    ],
  },
]);
export function App() {
  return <RouterProvider router={router} />;
}