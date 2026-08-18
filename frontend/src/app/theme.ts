import { createTheme, type ThemeOptions } from "@mui/material/styles";

// ──────────────────────────────────────────────
// DESIGN TOKENS
// ──────────────────────────────────────────────

export const tokens = {
  colors: {
    primary: {
      main: "#155EEF",
      hover: "#175CD3",
      active: "#004EEB",
      light: "#EFF4FF",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#475569",
      light: "#64748B",
      dark: "#334155",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
      disabled: "#94A3B8",
    },
    border: {
      main: "#E2E8F0",
      light: "#F1F5F9",
    },
    success: {
      main: "#039855",
      light: "#ECFDF3",
      dark: "#027A48",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#DC6803",
      light: "#FEF0C7",
      dark: "#B54708",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#D92D20",
      light: "#FEF3F2",
      dark: "#B42318",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#026AA2",
      light: "#F0F9FF",
      dark: "#065986",
      contrastText: "#FFFFFF",
    },
  },

  /** Application status colors — semantic, distinguishable, never neon */
  status: {
    NEW: { bg: "#F0F9FF", text: "#026AA2", border: "#B9E6FE" },
    IN_REVIEW: { bg: "#FEF0C7", text: "#B54708", border: "#FEDF89" },
    APPROVED: { bg: "#ECFDF3", text: "#027A48", border: "#A6F4C5" },
    REJECTED: { bg: "#FEF3F2", text: "#B42318", border: "#FECDCA" },
    CANCELLED: { bg: "#F1F5F9", text: "#475569", border: "#CBD5E1" },
  },

  spacing: {
    unit: 8,
  },

  radius: {
    sm: 6,
    md: 8,
    pill: 16,
  },

  layout: {
    sidebarWidth: 240,
    headerHeight: 64,
    contentPadding: 24,
  },

  shadows: {
    /** Very soft — header bottom edge only */
    header: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
    /** Elevated — dialogs / modals */
    elevated:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    /** None — default for cards */
    none: "none",
  },
} as const;

// ──────────────────────────────────────────────
// MUI THEME
// ──────────────────────────────────────────────

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: tokens.colors.primary.main,
      light: tokens.colors.primary.light,
      dark: tokens.colors.primary.active,
      contrastText: tokens.colors.primary.contrastText,
    },
    secondary: {
      main: tokens.colors.secondary.main,
      light: tokens.colors.secondary.light,
      dark: tokens.colors.secondary.dark,
      contrastText: tokens.colors.secondary.contrastText,
    },
    background: {
      default: tokens.colors.background.default,
      paper: tokens.colors.background.paper,
    },
    text: {
      primary: tokens.colors.text.primary,
      secondary: tokens.colors.text.secondary,
      disabled: tokens.colors.text.disabled,
    },
    success: {
      main: tokens.colors.success.main,
      light: tokens.colors.success.light,
      dark: tokens.colors.success.dark,
      contrastText: tokens.colors.success.contrastText,
    },
    warning: {
      main: tokens.colors.warning.main,
      light: tokens.colors.warning.light,
      dark: tokens.colors.warning.dark,
      contrastText: tokens.colors.warning.contrastText,
    },
    error: {
      main: tokens.colors.error.main,
      light: tokens.colors.error.light,
      dark: tokens.colors.error.dark,
      contrastText: tokens.colors.error.contrastText,
    },
    info: {
      main: tokens.colors.info.main,
      light: tokens.colors.info.light,
      dark: tokens.colors.info.dark,
      contrastText: tokens.colors.info.contrastText,
    },
    divider: tokens.colors.border.main,
  },

  shape: {
    borderRadius: tokens.radius.md,
  },

  typography: {
    fontFamily: "'Inter', system-ui, 'Roboto', sans-serif",
    h1: {
      fontSize: "2rem", // 32px
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: "-0.02em",
      color: tokens.colors.text.primary,
    },
    h2: {
      fontSize: "1.75rem", // 28px
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
      color: tokens.colors.text.primary,
    },
    h3: {
      fontSize: "1.5rem", // 24px
      fontWeight: 600,
      lineHeight: 1.35,
      color: tokens.colors.text.primary,
    },
    h4: {
      fontSize: "1.25rem", // 20px
      fontWeight: 600,
      lineHeight: 1.4,
      color: tokens.colors.text.primary,
    },
    h5: {
      fontSize: "1.125rem", // 18px
      fontWeight: 600,
      lineHeight: 1.45,
      color: tokens.colors.text.primary,
    },
    h6: {
      fontSize: "1rem", // 16px
      fontWeight: 600,
      lineHeight: 1.5,
      color: tokens.colors.text.primary,
    },
    body1: {
      fontSize: "0.9375rem", // 15px
      lineHeight: 1.6,
      color: tokens.colors.text.primary,
    },
    body2: {
      fontSize: "0.875rem", // 14px
      lineHeight: 1.55,
      color: tokens.colors.text.secondary,
    },
    caption: {
      fontSize: "0.8125rem", // 13px
      lineHeight: 1.5,
      color: tokens.colors.text.secondary,
    },
    button: {
      fontWeight: 500,
      textTransform: "none" as const,
      letterSpacing: "0.01em",
    },
    overline: {
      fontSize: "0.6875rem", // 11px
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
      color: tokens.colors.text.secondary,
    },
  },

  // Use minimal shadows — most cards rely on borders instead
  shadows: [
    tokens.shadows.none,
    tokens.shadows.header,
    tokens.shadows.header,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    ...Array(20).fill(tokens.shadows.elevated),
  ] as ThemeOptions["shadows"],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.colors.background.default,
          color: tokens.colors.text.primary,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.sm,
          fontWeight: 500,
          fontSize: "0.875rem",
          padding: "8px 16px",
          minHeight: 36,
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: tokens.colors.primary.hover,
          },
          "&:active": {
            backgroundColor: tokens.colors.primary.active,
          },
        },
        outlined: {
          borderColor: tokens.colors.border.main,
          "&:hover": {
            borderColor: tokens.colors.primary.main,
            backgroundColor: tokens.colors.primary.light,
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        variant: "outlined",
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          borderColor: tokens.colors.border.main,
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none", // remove MUI paper gradient overlay
        },
        outlined: {
          borderColor: tokens.colors.border.main,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.pill,
          fontWeight: 500,
          fontSize: "0.8125rem",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: tokens.radius.sm,
            "& fieldset": {
              borderColor: tokens.colors.border.main,
            },
            "&:hover fieldset": {
              borderColor: tokens.colors.secondary.light,
            },
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.radius.md,
          boxShadow: tokens.shadows.elevated,
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontWeight: 600,
            fontSize: "0.8125rem",
            color: tokens.colors.text.secondary,
            backgroundColor: tokens.colors.background.default,
            borderBottomColor: tokens.colors.border.main,
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          borderBottomColor: tokens.colors.border.main,
          padding: "10px 16px",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: tokens.colors.border.main,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.sm,
          "&.Mui-selected": {
            backgroundColor: tokens.colors.primary.light,
            color: tokens.colors.primary.main,
            "& .MuiListItemIcon-root": {
              color: tokens.colors.primary.main,
            },
            "&:hover": {
              backgroundColor: tokens.colors.primary.light,
            },
          },
          "&:hover": {
            backgroundColor: tokens.colors.border.light,
          },
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${tokens.colors.border.main}`,
          boxShadow: tokens.shadows.none,
        },
      },
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: tokens.shadows.header,
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.radius.md,
          boxShadow: tokens.shadows.elevated,
          border: `1px solid ${tokens.colors.border.main}`,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          "&:hover": {
            backgroundColor: tokens.colors.border.light,
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fontWeight: 600,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.sm,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem",
          borderRadius: tokens.radius.sm,
        },
      },
    },
  },
};

export const appTheme = createTheme(themeOptions);