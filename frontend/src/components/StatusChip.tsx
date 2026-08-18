import { Chip, type ChipProps, useTheme } from "@mui/material";

import FiberNewIcon from "@mui/icons-material/FiberNew";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

import type { ApplicationResponseStatusEnum } from "../api/generated";

interface StatusConfig {
  label: string;
  colorType: "info" | "warning" | "success" | "error" | "secondary";
  icon: React.ReactElement;
}

const statusConfig: Record<string, StatusConfig> = {
  NEW: {
    label: "Yeni",
    colorType: "info",
    icon: <FiberNewIcon fontSize="small" />,
  },
  IN_REVIEW: {
    label: "İncelemede",
    colorType: "warning",
    icon: <HourglassTopIcon fontSize="small" />,
  },
  APPROVED: {
    label: "Onaylandı",
    colorType: "success",
    icon: <CheckCircleIcon fontSize="small" />,
  },
  REJECTED: {
    label: "Reddedildi",
    colorType: "error",
    icon: <CancelIcon fontSize="small" />,
  },
  CANCELLED: {
    label: "İptal Edildi",
    colorType: "secondary",
    icon: <DoNotDisturbOnIcon fontSize="small" />,
  },
};

interface StatusChipProps {
  status: ApplicationResponseStatusEnum | string | undefined;
  size?: ChipProps["size"];
}

export default function StatusChip({ status, size = "small" }: StatusChipProps) {
  const theme = useTheme();
  const config = statusConfig[status ?? ""] ?? {
    label: status ?? "Bilinmiyor",
    colorType: "secondary",
    icon: <DoNotDisturbOnIcon fontSize="small" />,
  };

  const isLight = theme.palette.mode === "light";
  
  // Custom semantic colors tailored for enterprise look
  let bg: string;
  let text: string;
  let border: string;

  if (config.colorType === "secondary") {
    bg = isLight ? "#F1F5F9" : "rgba(100, 116, 139, 0.1)";
    text = isLight ? "#475569" : "#94A3B8";
    border = isLight ? "#CBD5E1" : "#475569";
  } else {
    // Get colors from semantic palette (info, warning, success, error)
    const palette = theme.palette[config.colorType];
    bg = isLight ? palette.light : (palette.light as string); // In our theme.ts, dark mode .light is an rgba string
    text = isLight ? palette.dark : palette.main; // Make text punchy
    border = isLight ? palette.main + "40" : palette.main + "40"; // Light border with opacity
  }

  return (
    <Chip
      label={config.label}
      icon={config.icon}
      size={size}
      sx={{
        bgcolor: bg,
        color: text,
        border: `1px solid ${border}`,
        fontWeight: 600,
        "& .MuiChip-icon": {
          color: text,
        },
      }}
    />
  );
}

