import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../features/auth/context/AuthContext";
import { useAppTheme } from "../../app/providers/ThemeContext";

interface AppHeaderProps {
  onMobileMenuToggle?: () => void;
}

export default function AppHeader({ onMobileMenuToggle }: AppHeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode, toggleTheme } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleLogout = async () => {
    handleMenuClose();

    await logout();

    navigate("/login", {
      replace: true,
    });
  };

  const userInitial = user?.name?.charAt(0).toUpperCase() ?? "?";
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
        ml: isMobile ? 0 : `240px`,
        bgcolor: theme.palette.mode === "light" ? "#001529" : "background.paper",
        color: theme.palette.mode === "light" ? "#FFFFFF" : "text.primary",
        borderBottom: `1px solid ${theme.palette.mode === "light" ? "#001529" : theme.palette.divider}`,
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
            sx={{ mr: 1, color: theme.palette.mode === "light" ? "rgba(255,255,255,0.8)" : "text.secondary" }}
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
            color: theme.palette.mode === "light" ? "#FFFFFF" : "text.primary",
          }}
        >
          Application Management System
        </Typography>

        {/* User area */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isMobile && userFullName && (
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === "light" ? "rgba(255,255,255,0.8)" : "text.secondary",
                fontWeight: 500,
                mr: 0.5,
              }}
            >
              {userFullName}
            </Typography>
          )}

          <IconButton
            onClick={toggleTheme}
            size="small"
            aria-label="Tema değiştir"
            sx={{
              mr: 1,
              color: theme.palette.mode === "light" ? "rgba(255,255,255,0.8)" : "text.secondary",
              "&:hover": { bgcolor: theme.palette.mode === "light" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)", color: "#FFFFFF" },
            }}
          >
            {mode === "dark" ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </IconButton>

          <IconButton
            onClick={handleProfileMenuOpen}
            size="small"
            aria-label="Kullanıcı menüsü"
            sx={{
              p: 0.5,
              "&:hover": { bgcolor: theme.palette.mode === "light" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)" },
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: theme.palette.mode === "light" ? "primary.main" : "primary.main",
                color: theme.palette.mode === "light" ? "#FFFFFF" : "primary.contrastText",
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
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {userFullName}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {user?.email}
                </Typography>
              </Box>
            )}
            {isMobile && userFullName && <Divider />}

            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profilim</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Çıkış Yap</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}