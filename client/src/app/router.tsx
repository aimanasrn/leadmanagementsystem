import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../features/auth/LoginPage";
import { LeadDetailPage } from "../features/leads/LeadDetailPage";
import { LeadListPage } from "../features/leads/LeadListPage";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/leads", element: <LeadListPage /> },
  { path: "/leads/:leadId", element: <LeadDetailPage /> }
]);
