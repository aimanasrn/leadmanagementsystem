import { createBrowserRouter } from "react-router-dom";
import { AdminSettingsPage } from "../features/admin/AdminSettingsPage";
import { LoginPage } from "../features/auth/LoginPage";
import { ImportPage } from "../features/imports/ImportPage";
import { LeadDetailPage } from "../features/leads/LeadDetailPage";
import { LeadListPage } from "../features/leads/LeadListPage";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/leads", element: <LeadListPage /> },
  { path: "/leads/:leadId", element: <LeadDetailPage /> },
  { path: "/imports", element: <ImportPage /> },
  { path: "/admin", element: <AdminSettingsPage /> }
]);
