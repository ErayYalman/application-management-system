import {
  createBrowserRouter,
} from "react-router-dom";

import { UserResponseRoleEnum } from "../../api/generated";

import LoginPage from "../../features/auth/pages/LoginPage";
import ProtectedRoute from "../../features/auth/guards/ProtectedRoute";
import RoleGuard from "../../features/auth/guards/RoleGuard";

import AppLayout from "../../components/layout/AppLayout";

import DashboardPage
  from "../../features/dashboard/pages/DashboardPage";

import MyApplicationsPage
  from "../../features/applications/pages/MyApplicationsPage";

function HomeRedirect() {
  return <div>Home</div>;
}

function RegisterPage() {
  return <div>Register</div>;
}

function DashboardPlaceholder() {
  return <div>Dashboard</div>;
}

function ApplicationsPlaceholder() {
  return <div>Applications</div>;
}

function UsersPlaceholder() {
  return <div>Users</div>;
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

export const router =
  createBrowserRouter([
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
                  element:
                    <DashboardPage />,
                },
                {
                  path: "/applications",
                  element:
                    <ApplicationsPlaceholder />,
                },
                {
                  path: "/users",
                  element:
                    <UsersPlaceholder />,
                },
                {
                  path: "/form-types",
                  element:
                    <FormTypesPlaceholder />,
                },
                {
                  path: "/reports",
                  element:
                    <ReportsPlaceholder />,
                },
              ],
            },

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
              ],
            },

            {
              path: "/profile",
              element:
                <ProfilePlaceholder />,
            },
          ],
        },
      ],
    },
  ]);