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

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../features/auth/context/AuthContext";
import { tokens } from "../../app/theme";

interface AppHeaderProps {
  onMobileMenuToggle?: () => void;
}

export default function AppHeader({ onMobileMenuToggle }: AppHeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
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
          : `calc(100% - ${tokens.layout.sidebarWidth}px)`,
        ml: isMobile ? 0 : `${tokens.layout.sidebarWidth}px`,
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: `1px solid ${tokens.colors.border.main}`,
      }}
    >
      <Toolbar
        sx={{
          minHeight: `${tokens.layout.headerHeight}px !important`,
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Mobile hamburger */}
        {isMobile && (
          <IconButton
            edge="start"
            onClick={onMobileMenuToggle}
            sx={{ mr: 1, color: "text.secondary" }}
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
            color: "text.primary",
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
                color: "text.secondary",
                fontWeight: 500,
                mr: 0.5,
              }}
            >
              {userFullName}
            </Typography>
          )}

          <IconButton
            onClick={handleProfileMenuOpen}
            size="small"
            aria-label="Kullanıcı menüsü"
            sx={{
              p: 0.5,
              "&:hover": {
                bgcolor: tokens.colors.border.light,
              },
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: tokens.colors.primary.main,
                color: tokens.colors.primary.contrastText,
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