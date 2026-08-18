import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";

import {
  Link as RouterLink,
  useLocation,
} from "react-router-dom";

import { UserResponseRoleEnum } from "../../api/generated";
import { useAuth } from "../../features/auth/context/AuthContext";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 64;

interface AppSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function AppSidebar({ mobileOpen = false, onMobileClose }: AppSidebarProps) {
  const { user } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = [
    {
      label: "Ana Sayfa",
      path: "/home",
      icon: <HomeOutlinedIcon />,
      roles: [
        UserResponseRoleEnum.Admin,
        UserResponseRoleEnum.Personnel,
      ],
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardOutlinedIcon />,
      roles: [UserResponseRoleEnum.Admin],
    },
    {
      label: "Başvurularım",
      path: "/applications/my",
      icon: <DescriptionOutlinedIcon />,
      roles: [UserResponseRoleEnum.Personnel],
    },
    {
      label: "Yeni Başvuru",
      path: "/applications/new",
      icon: <NoteAddOutlinedIcon />,
      roles: [UserResponseRoleEnum.Personnel],
    },
    {
      label: "Başvurular",
      path: "/applications",
      icon: <AssignmentOutlinedIcon />,
      roles: [UserResponseRoleEnum.Admin],
    },
    {
      label: "Kullanıcılar",
      path: "/users",
      icon: <PeopleOutlineIcon />,
      roles: [UserResponseRoleEnum.Admin],
    },
    {
      label: "Form Türleri",
      path: "/form-types",
      icon: <CategoryOutlinedIcon />,
      roles: [UserResponseRoleEnum.Admin],
    },
    {
      label: "Raporlar",
      path: "/reports",
      icon: <AssessmentOutlinedIcon />,
      roles: [UserResponseRoleEnum.Admin],
    },
    {
      label: "Profilim",
      path: "/profile",
      icon: <PersonOutlineIcon />,
      roles: [
        UserResponseRoleEnum.Admin,
        UserResponseRoleEnum.Personnel,
      ],
    },
  ];

  const visibleItems = menuItems.filter((item) =>
    user?.role ? item.roles.includes(user.role) : false,
  );

  // Separate "Profilim" into its own bottom group
  const mainItems = visibleItems.filter((item) => item.path !== "/profile");
  const profileItem = visibleItems.find((item) => item.path === "/profile");

  const isSelected = (path: string) => {
    if (path === "/applications" && location.pathname === "/applications") return true;
    if (path === "/applications/my" && location.pathname === "/applications/my") return true;
    return location.pathname === path;
  };

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.mode === "light" ? "#001529" : "background.paper",
        color: theme.palette.mode === "light" ? "#F8FAFC" : "text.primary",
        height: "100%",
      }}
    >
      {/* Logo / App Name area */}
      <Toolbar
        sx={{
          minHeight: `${HEADER_HEIGHT}px !important`,
          px: 2.5,
          borderBottom: `1px solid ${theme.palette.mode === "light" ? "rgba(255,255,255,0.1)" : theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1,
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 1.5,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.8125rem",
              lineHeight: 1,
            }}
          >
            A
          </Typography>
        </Box>
        <Typography
          variant="body2"
          noWrap
          sx={{
            fontWeight: 600,
            color: theme.palette.mode === "light" ? "#FFFFFF" : "text.primary",
            fontSize: "0.875rem",
          }}
        >
          AMS
        </Typography>
      </Toolbar>

      {/* Main navigation */}
      <Box sx={{ flexGrow: 1, overflow: "auto", py: 1, px: 1.5 }}>
        <List disablePadding>
          {mainItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={RouterLink}
              to={item.path}
              selected={isSelected(item.path)}
              onClick={isMobile ? onMobileClose : undefined}
              sx={{
                py: 1,
                px: 1.5,
                mb: 0.25,
                borderRadius: 1,
                color: isSelected(item.path) 
                  ? (theme.palette.mode === "light" ? "#FFFFFF" : "primary.main")
                  : (theme.palette.mode === "light" ? "rgba(255,255,255,0.7)" : "text.secondary"),
                "&.Mui-selected": {
                  bgcolor: theme.palette.mode === "light" ? "rgba(255,255,255,0.1)" : "rgba(59, 130, 246, 0.1)",
                  color: theme.palette.mode === "light" ? "#FFFFFF" : "primary.main",
                  "&:hover": { bgcolor: theme.palette.mode === "light" ? "rgba(255,255,255,0.15)" : "rgba(59, 130, 246, 0.15)" },
                },
                "&:hover": {
                  bgcolor: theme.palette.mode === "light" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.05)",
                  color: theme.palette.mode === "light" ? "#FFFFFF" : "text.primary",
                },
                "& .MuiListItemIcon-root": {
                  minWidth: 36,
                  color: "inherit",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: "0.875rem",
                      fontWeight: isSelected(item.path) ? 600 : 400,
                    }
                  }
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Bottom profile item */}
      {profileItem && (
        <>
          <Divider sx={{ borderColor: theme.palette.mode === "light" ? "rgba(255,255,255,0.1)" : "divider" }} />
          <Box sx={{ py: 1, px: 1.5 }}>
            <ListItemButton
              component={RouterLink}
              to={profileItem.path}
              selected={isSelected(profileItem.path)}
              onClick={isMobile ? onMobileClose : undefined}
              sx={{
                py: 1,
                px: 1.5,
                borderRadius: 1,
                color: isSelected(profileItem.path) 
                  ? (theme.palette.mode === "light" ? "#FFFFFF" : "primary.main")
                  : (theme.palette.mode === "light" ? "rgba(255,255,255,0.7)" : "text.secondary"),
                "&.Mui-selected": {
                  bgcolor: theme.palette.mode === "light" ? "rgba(255,255,255,0.1)" : "rgba(59, 130, 246, 0.1)",
                  color: theme.palette.mode === "light" ? "#FFFFFF" : "primary.main",
                  "&:hover": { bgcolor: theme.palette.mode === "light" ? "rgba(255,255,255,0.15)" : "rgba(59, 130, 246, 0.15)" },
                },
                "&:hover": {
                  bgcolor: theme.palette.mode === "light" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.05)",
                  color: theme.palette.mode === "light" ? "#FFFFFF" : "text.primary",
                },
                "& .MuiListItemIcon-root": {
                  minWidth: 36,
                  color: "inherit",
                },
              }}
            >
              <ListItemIcon>{profileItem.icon}</ListItemIcon>
              <ListItemText
                primary={profileItem.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: "0.875rem",
                      fontWeight: isSelected(profileItem.path) ? 600 : 400,
                    }
                  }
                }}
              />
            </ListItemButton>
          </Box>
        </>
      )}
    </Box>
  );

  // Mobile: temporary drawer
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
            bgcolor: theme.palette.mode === "light" ? "#001529" : "background.paper",
            borderRight: theme.palette.mode === "light" ? "none" : `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  // Desktop: permanent drawer
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          bgcolor: theme.palette.mode === "light" ? "#001529" : "background.paper",
          borderRight: theme.palette.mode === "light" ? "none" : `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}