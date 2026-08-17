import { createBrowserRouter } from "react-router-dom";

import { UserResponseRoleEnum } from "../../api/generated";

import LoginPage from "../../features/auth/pages/LoginPage";
import ProtectedRoute from "../../features/auth/guards/ProtectedRoute";
import RoleGuard from "../../features/auth/guards/RoleGuard";

import AppLayout from "../../components/layout/AppLayout";

import DashboardPage
  from "../../features/dashboard/pages/DashboardPage";

import MyApplicationsPage
  from "../../features/applications/pages/MyApplicationsPage";

import ApplicationDetailPage
  from "../../features/applications/pages/ApplicationDetailPage";

import CreateApplicationPage
  from "../../features/applications/pages/CreateApplicationPage";

import EditApplicationPage
  from "../../features/applications/pages/EditApplicationPage";

import ApplicationsPage
  from "../../features/applications/pages/ApplicationsPage";

import UsersPage
  from "../../features/users/pages/UsersPage";

function HomeRedirect() {
  return <div>Home</div>;
}

function RegisterPage() {
  return <div>Register</div>;
}

function FormTypesPlaceholder() {
  return <div>Form Types</div>;
}

function ReportsPlaceholder() {
  return <div>Reports</div>;
}

function ProfilePlaceholder() {
  return <div>Profile</div>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <HomeRedirect />,
          },

          // --------------------------------------------------
          // Ortak authenticated route'lar
          // --------------------------------------------------
          {
            path: "/applications/:applicationId",
            element: <ApplicationDetailPage />,
          },

          {
            path: "/profile",
            element: <ProfilePlaceholder />,
          },

          // --------------------------------------------------
          // ADMIN
          // --------------------------------------------------
          {
            element: (
              <RoleGuard
                allowedRoles={[
                  UserResponseRoleEnum.Admin,
                ]}
              />
            ),
            children: [
              {
                path: "/dashboard",
                element: <DashboardPage />,
              },
              {
                path: "/applications",
                element: <ApplicationsPage />,
              },
              {
                path: "/users",
                element: <UsersPage />,
              },
              {
                path: "/form-types",
                element: <FormTypesPlaceholder />,
              },
              {
                path: "/reports",
                element: <ReportsPlaceholder />,
              },
            ],
          },

          // --------------------------------------------------
          // PERSONNEL
          // --------------------------------------------------
          {
            element: (
              <RoleGuard
                allowedRoles={[
                  UserResponseRoleEnum.Personnel,
                ]}
              />
            ),
            children: [
              {
                path: "/applications/my",
                element: <MyApplicationsPage />,
              },
              {
                path: "/applications/new",
                element: <CreateApplicationPage />,
              },
              {
                path: "/applications/:applicationId/edit",
                element: <EditApplicationPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);