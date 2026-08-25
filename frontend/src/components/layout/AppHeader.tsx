import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../features/auth/context/AuthContext";
import { useAppTheme } from "../../app/providers/ThemeContext";
import NotificationCenter from "../../features/notifications/components/NotificationCenter";
import { useUnreadNotificationCount } from "../../features/notifications/hooks/use-notifications";

interface AppHeaderProps {
  onMobileMenuToggle?: () => void;
}

export default function AppHeader({
  onMobileMenuToggle,
}: AppHeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode, toggleTheme } = useAppTheme();
  const isMobile = useMediaQuery(
    theme.breakpoints.down("md"),
  );

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const [
    notificationAnchorEl,
    setNotificationAnchorEl,
  ] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);

  const notificationOpen = Boolean(
    notificationAnchorEl,
  );

  const {
    data: unreadCount = 0,
  } = useUnreadNotificationCount();

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setNotificationAnchorEl(
      event.currentTarget,
    );
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleLogout = async () => {
    handleMenuClose();
    handleNotificationClose();

    await logout();

    navigate("/ApplicationManagementSystem", {
      replace: true,
    });
  };

  const userInitial =
    user?.name?.charAt(0).toUpperCase() ?? "?";

  const userFullName = user
    ? `${user.name ?? ""} ${user.surname ?? ""}`.trim()
    : "";

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isMobile
          ? "100%"
          : `calc(100% - 240px)`,
        ml: isMobile ? 0 : "240px",
        bgcolor:
          theme.palette.mode === "light"
            ? "#001529"
            : "background.paper",
        color:
          theme.palette.mode === "light"
            ? "#FFFFFF"
            : "text.primary",
        borderBottom: `1px solid ${theme.palette.mode === "light"
            ? "#001529"
            : theme.palette.divider
          }`,
        backgroundImage: "none",
      }}
    >
      <Toolbar
        sx={{
          minHeight: `64px !important`,
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Mobile hamburger */}
        {isMobile && (
          <IconButton
            edge="start"
            onClick={onMobileMenuToggle}
            sx={{
              mr: 1,
              color:
                theme.palette.mode === "light"
                  ? "rgba(255,255,255,0.8)"
                  : "text.secondary",
            }}
            aria-label="Menüyü aç"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            fontSize: "1rem",
            color:
              theme.palette.mode === "light"
                ? "#FFFFFF"
                : "text.primary",
          }}
        >
          Application Management System
        </Typography>

        {/* User area */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {!isMobile && userFullName && (
            <Typography
              variant="body2"
              sx={{
                color:
                  theme.palette.mode === "light"
                    ? "rgba(255,255,255,0.8)"
                    : "text.secondary",
                fontWeight: 500,
                mr: 0.5,
              }}
            >
              {userFullName}
            </Typography>
          )}

          {/* Notifications */}
          <IconButton
            onClick={handleNotificationOpen}
            size="small"
            aria-label="Bildirimler"
            aria-haspopup="true"
            aria-expanded={notificationOpen}
            sx={{
              mr: 1,
              color:
                theme.palette.mode === "light"
                  ? "rgba(255,255,255,0.8)"
                  : "text.secondary",
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "light"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.05)",
                color: "#FFFFFF",
              },
            }}
          >
            <Badge
              badgeContent={unreadCount}
              color="error"
              max={99}
              invisible={unreadCount === 0}
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.65rem",
                  minWidth: 16,
                  height: 16,
                  p: 0,
                  fontWeight: 600,
                },
              }}
            >
              <NotificationsNoneOutlinedIcon fontSize="small" />
            </Badge>
          </IconButton>

          {/* Notification panel */}
          <Popover
            open={notificationOpen}
            anchorEl={notificationAnchorEl}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1.5,
                  width: {
                    xs: "calc(100vw - 24px)",
                    sm: 400,
                  },
                  maxWidth: "calc(100vw - 24px)",
                  overflow: "hidden",
                  borderRadius: 2,
                  boxShadow: theme.shadows[3],
                  border: `1px solid ${theme.palette.divider}`,
                },
              },
            }}
          >
            <NotificationCenter
              onClose={
                handleNotificationClose
              }
            />
          </Popover>

          {/* Theme */}
          <IconButton
            onClick={toggleTheme}
            size="small"
            aria-label="Tema değiştir"
            sx={{
              mr: 1,
              color:
                theme.palette.mode === "light"
                  ? "rgba(255,255,255,0.8)"
                  : "text.secondary",
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "light"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.05)",
                color: "#FFFFFF",
              },
            }}
          >
            {mode === "dark" ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </IconButton>

          {/* User menu */}
          <IconButton
            onClick={handleProfileMenuOpen}
            size="small"
            aria-label="Kullanıcı menüsü"
            sx={{
              p: 0.5,
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "light"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.05)",
              },
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "primary.main",
                color:
                  theme.palette.mode === "light"
                    ? "#FFFFFF"
                    : "primary.contrastText",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              {userInitial}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 180,
                },
              },
            }}
          >
            {/* Show name in mobile menu */}
            {isMobile && userFullName && (
              <Box sx={{ px: 2, py: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {userFullName}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  {user?.email}
                </Typography>
              </Box>
            )}

            {isMobile && userFullName && (
              <Divider />
            )}

            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>

              <ListItemText>
                Profilim
              </ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>

              <ListItemText>
                Çıkış Yap
              </ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}