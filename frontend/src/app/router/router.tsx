import { createBrowserRouter } from "react-router-dom";

import { UserResponseRoleEnum } from "../../api/generated";

import LoginPage
  from "../../features/auth/pages/LoginPage";

import RegisterPage
  from "../../features/auth/pages/RegisterPage";

import ProtectedRoute
  from "../../features/auth/guards/ProtectedRoute";

import RoleGuard
  from "../../features/auth/guards/RoleGuard";

import AppLayout
  from "../../components/layout/AppLayout";

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

import UserDetailPage
  from "../../features/users/pages/UserDetailPage";

import FormTypesPage
  from "../../features/form-types/pages/FormTypesPage";

import FormTypeFormPage
  from "../../features/form-types/pages/FormTypeFormPage";

import ReportsPage
  from "../../features/reports/pages/ReportsPage";

import ProfilePage
  from "../../features/profile/pages/ProfilePage";

import HomePage
  from "../../features/home/pages/HomePage";

import {
    Navigate,
} from "react-router-dom";


export const router = createBrowserRouter([
  // --------------------------------------------------
  // PUBLIC ROUTES
  // --------------------------------------------------
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  // --------------------------------------------------
  // AUTHENTICATED ROUTES
  // --------------------------------------------------
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [

          // --------------------------------------------------
          // COMMON AUTHENTICATED ROUTES
          // --------------------------------------------------
          {
            path: "/",
            element: <Navigate to="/home" replace />,
          },

          {
            path: "/home",
            element: <HomePage />,
          },

          {
            path: "/profile",
            element: <ProfilePage />,
          },

          {
            path: "/applications/:applicationId",
            element: <ApplicationDetailPage />,
          },

          // --------------------------------------------------
          // ADMIN ROUTES
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
                path: "/users/:userId",
                element: <UserDetailPage />,
              },

              {
                path: "/form-types",
                element: <FormTypesPage />,
              },

              {
                path: "/form-types/new",
                element: <FormTypeFormPage />,
              },

              {
                path: "/form-types/:formTypeId/edit",
                element: <FormTypeFormPage />,
              },

              {
                path: "/reports",
                element: <ReportsPage />,
              },
            ],
          },

          // --------------------------------------------------
          // PERSONNEL ROUTES
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