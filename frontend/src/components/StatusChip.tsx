import { Chip, type ChipProps } from "@mui/material";

import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

import { ApplicationResponseStatusEnum } from "../api/generated";

const COLORS = {
  new: "#155EEF",       // Brand Blue for New
  pending: "#F79009",   // Warning Orange for In Review
  approved: "#12B76A",  // Success Green for Approved
  rejected: "#F04438",  // Error Red for Rejected
  cancelled: "#64748B", // Slate/Gray for Cancelled
};

interface StatusConfig {
  label: string;
  color: string;
  icon: React.ReactElement;
}

const statusConfig: Record<string, StatusConfig> = {
  [ApplicationResponseStatusEnum.New]: {
    label: "Yeni",
    color: COLORS.new,
    icon: <FiberNewOutlinedIcon sx={{ fontSize: "1rem" }} />,
  },
  [ApplicationResponseStatusEnum.InReview]: {
    label: "İncelemede",
    color: COLORS.pending,
    icon: <HourglassEmptyOutlinedIcon sx={{ fontSize: "1rem" }} />,
  },
  [ApplicationResponseStatusEnum.Approved]: {
    label: "Onaylandı",
    color: COLORS.approved,
    icon: <CheckCircleOutlinedIcon sx={{ fontSize: "1rem" }} />,
  },
  [ApplicationResponseStatusEnum.Rejected]: {
    label: "Reddedildi",
    color: COLORS.rejected,
    icon: <CancelOutlinedIcon sx={{ fontSize: "1rem" }} />,
  },
  [ApplicationResponseStatusEnum.Cancelled]: {
    label: "İptal Edildi",
    color: COLORS.cancelled,
    icon: <BlockOutlinedIcon sx={{ fontSize: "1rem" }} />,
  },
};

interface StatusChipProps {
  status: ApplicationResponseStatusEnum | string | undefined;
  size?: ChipProps["size"];
}

export default function StatusChip({ status, size = "small" }: StatusChipProps) {
  const config = statusConfig[status ?? ""] ?? {
    label: status ?? "Bilinmiyor",
    color: COLORS.cancelled,
    icon: <BlockOutlinedIcon sx={{ fontSize: "1rem" }} />,
  };

  return (
    <Chip
      label={config.label}
      icon={config.icon}
      size={size}
      sx={{
        bgcolor: `${config.color}15`,
        color: config.color,
        fontWeight: 600,
        borderRadius: "6px",
        border: "none",
        "& .MuiChip-icon": {
          color: config.color,
          ml: 0.5,
        },
      }}
    />
  );
}

