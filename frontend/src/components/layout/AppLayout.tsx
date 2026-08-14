import {
  Box,
  Toolbar,
} from "@mui/material";

import {
  Outlet,
} from "react-router-dom";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const drawerWidth = 240;

export default function AppLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppHeader />
      <AppSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}