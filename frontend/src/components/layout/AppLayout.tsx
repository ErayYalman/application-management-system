import {
  Box,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 64;

export default function AppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <AppHeader onMobileMenuToggle={handleMobileMenuToggle} />

      <AppSidebar
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: isMobile
            ? "100%"
            : `calc(100% - ${SIDEBAR_WIDTH}px)`,
          bgcolor: "background.default",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Spacer matching header height */}
        <Toolbar
          sx={{
            minHeight: `${HEADER_HEIGHT}px !important`,
          }}
        />

        {/* Page content */}
        <Box
          sx={{
            flexGrow: 1,
            px: { xs: 2, md: 3 },
            py: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}