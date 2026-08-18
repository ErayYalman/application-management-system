import { createTheme, type ThemeOptions } from "@mui/material/styles";

// ──────────────────────────────────────────────
// COMMON DESIGN TOKENS
// ──────────────────────────────────────────────

const typography = {
  fontFamily: "'Inter', system-ui, 'Roboto', sans-serif",
  h1: { fontSize: "2rem", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.02em" },
  h2: { fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.01em" },
  h3: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.35 },
  h4: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.4 },
  h5: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.45 },
  h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.5 },
  body1: { fontSize: "0.9375rem", lineHeight: 1.6 },
  body2: { fontSize: "0.875rem", lineHeight: 1.55 },
  caption: { fontSize: "0.8125rem", lineHeight: 1.5 },
  button: { fontWeight: 500, textTransform: "none" as const, letterSpacing: "0.01em" },
  overline: { fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const },
};

const shape = {
  borderRadius: 8,
};

// ──────────────────────────────────────────────
// COLOR PALETTES
// ──────────────────────────────────────────────

const commonColors = {
  primary: {
    main: "#155EEF", // Canonical primary
    dark: "#004EEB",
  },
};

export const lightTokens = {
  primary: {
    ...commonColors.primary,
    light: "#EFF4FF",
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
  divider: "#E2E8F0",
  success: { main: "#039855", light: "#ECFDF3", dark: "#027A48", contrastText: "#FFFFFF" },
  warning: { main: "#DC6803", light: "#FEF0C7", dark: "#B54708", contrastText: "#FFFFFF" },
  error: { main: "#D92D20", light: "#FEF3F2", dark: "#B42318", contrastText: "#FFFFFF" },
  info: { main: "#026AA2", light: "#F0F9FF", dark: "#065986", contrastText: "#FFFFFF" },
  shadows: {
    header: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
    elevated: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    cardHover: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
  },
};

export const darkTokens = {
  primary: {
    ...commonColors.primary,
    light: "#1E3A8A", // Darker blue for hover states in dark mode
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#0F172A", // Slate 900
    paper: "#1E293B",   // Slate 800
  },
  text: {
    primary: "#F8FAFC",
    secondary: "#94A3B8",
    disabled: "#475569",
  },
  divider: "#334155", // Slate 700
  success: { main: "#22C55E", light: "rgba(34, 197, 94, 0.1)", dark: "#16A34A", contrastText: "#FFFFFF" },
  warning: { main: "#F59E0B", light: "rgba(245, 158, 11, 0.1)", dark: "#D97706", contrastText: "#FFFFFF" },
  error: { main: "#EF4444", light: "rgba(239, 68, 68, 0.1)", dark: "#DC2626", contrastText: "#FFFFFF" },
  info: { main: "#3B82F6", light: "rgba(59, 130, 246, 0.1)", dark: "#2563EB", contrastText: "#FFFFFF" },
  shadows: {
    header: "0 1px 3px 0 rgb(0 0 0 / 0.3)",
    elevated: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
    cardHover: "0 10px 15px -3px rgb(0 0 0 / 0.4)",
  },
};

// ──────────────────────────────────────────────
// FACTORY FUNCTION
// ──────────────────────────────────────────────

export function getAppTheme(mode: "light" | "dark") {
  const isLight = mode === "light";
  const tokens = isLight ? lightTokens : darkTokens;

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: tokens.primary,
      background: tokens.background,
      text: tokens.text,
      divider: tokens.divider,
      success: tokens.success,
      warning: tokens.warning,
      error: tokens.error,
      info: tokens.info,
    },
    shape,
    typography,
    shadows: [
      "none",
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
            backgroundColor: tokens.background.default,
            color: tokens.text.primary,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
            padding: "8px 16px",
            minHeight: 36,
          },
          outlined: {
            borderColor: tokens.divider,
            color: tokens.text.primary,
            "&:hover": {
              backgroundColor: isLight ? tokens.primary.light : "rgba(255,255,255,0.05)",
              borderColor: isLight ? tokens.primary.main : tokens.text.primary,
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
            borderRadius: 12, // slightly rounder cards for modern look
            borderColor: tokens.divider,
            backgroundColor: tokens.background.paper,
            transition: "box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out",
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: tokens.background.paper,
          },
          outlined: {
            borderColor: tokens.divider,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
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
              borderRadius: 6,
              "& fieldset": {
                borderColor: tokens.divider,
              },
              "&:hover fieldset": {
                borderColor: tokens.text.secondary,
              },
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
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
              color: tokens.text.secondary,
              backgroundColor: isLight ? "#F1F5F9" : "#0F172A", // Slight contrast from paper
              borderBottomColor: tokens.divider,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
            borderBottomColor: tokens.divider,
            padding: "12px 16px", // A bit more breathing room
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: tokens.divider,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            "&.Mui-selected": {
              backgroundColor: tokens.primary.light,
              color: isLight ? tokens.primary.main : tokens.text.primary,
              "& .MuiListItemIcon-root": {
                color: isLight ? tokens.primary.main : tokens.text.primary,
              },
              "&:hover": {
                backgroundColor: tokens.primary.light,
              },
            },
            "&:hover": {
              backgroundColor: isLight ? "#F1F5F9" : "rgba(255,255,255,0.05)",
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: `1px solid ${tokens.divider}`,
            boxShadow: "none",
            backgroundColor: tokens.background.paper,
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
            backgroundColor: tokens.background.paper,
            color: tokens.text.primary,
            borderBottom: `1px solid ${tokens.divider}`,
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
}