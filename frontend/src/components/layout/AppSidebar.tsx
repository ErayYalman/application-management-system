import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";

import {
  Link as RouterLink,
  useLocation,
} from "react-router-dom";

import { UserResponseRoleEnum } from "../../api/generated";
import { useAuth } from "../../features/auth/context/AuthContext";

const drawerWidth = 240;

export default function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
      roles: [UserResponseRoleEnum.Admin],
    },
    {
      label: "Başvurularım",
      path: "/applications/my",
      icon: <AssignmentIcon />,
      roles: [UserResponseRoleEnum.Personnel],
    },
    {
      label: "Yeni Başvuru",
      path: "/applications/new",
      icon: <AssignmentIcon />,
      roles: [UserResponseRoleEnum.Personnel],
    },
    {
      label: "Başvurular",
      path: "/applications",
      icon: <AssignmentIcon />,
      roles: [UserResponseRoleEnum.Admin],
    },
    {
      label: "Kullanıcılar",
      path: "/users",
      icon: <PeopleIcon />,
      roles: [UserResponseRoleEnum.Admin],
    },
    {
      label: "Form Türleri",
      path: "/form-types",
      icon: <CategoryIcon />,
      roles: [UserResponseRoleEnum.Admin],
    },
    {
      label: "Raporlar",
      path: "/reports",
      icon: <AssessmentIcon />,
      roles: [UserResponseRoleEnum.Admin],
    },
    {
      label: "Profilim",
      path: "/profile",
      icon: <PersonIcon />,
      roles: [
        UserResponseRoleEnum.Admin,
        UserResponseRoleEnum.Personnel,
      ],
    },
  ];

  const visibleItems = menuItems.filter((item) =>
    user ? item.roles.includes(user.role) : false,
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <Box sx={{ overflow: "auto" }}>
        <List>
          {visibleItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}