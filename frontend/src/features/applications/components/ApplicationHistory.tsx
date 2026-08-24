import {
  AccessTimeOutlined as TimeIcon,
  AddCircleOutlined as CreatedIcon,
  DeleteOutlined as DeletedIcon,
  EditOutlined as UpdatedIcon,
  PersonOutlined as ActorIcon,
  SwapHorizOutlined as StatusChangedIcon,
  HistoryOutlined as HistoryIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  CircularProgress,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import type { Theme } from "@mui/material";

import type { ApplicationAuditLogResponse } from "../../../api/generated";

import {
  formatApplicationHistoryDate,
  getApplicationActionLabel,
  getApplicationHistoryActorName,
  getApplicationHistoryTransition,
} from "../utils/application-history";

interface ApplicationHistoryProps {
  history: ApplicationAuditLogResponse[];
  isLoading: boolean;
  isError: boolean;
  isAdmin: boolean;
}

const getActionConfig = (action: string, theme: Theme) => {
  switch (action) {
    case "CREATED":
      return {
        icon: <CreatedIcon fontSize="small" color="success" />,
        color: theme.palette.success.main,
        bgColor: alpha(theme.palette.success.main, 0.1),
      };
    case "UPDATED":
      return {
        icon: <UpdatedIcon fontSize="small" color="info" />,
        color: theme.palette.info.main,
        bgColor: alpha(theme.palette.info.main, 0.1),
      };
    case "STATUS_CHANGED":
      return {
        icon: <StatusChangedIcon fontSize="small" color="primary" />,
        color: theme.palette.primary.main,
        bgColor: alpha(theme.palette.primary.main, 0.1),
      };
    case "DELETED":
      return {
        icon: <DeletedIcon fontSize="small" color="error" />,
        color: theme.palette.error.main,
        bgColor: alpha(theme.palette.error.main, 0.1),
      };
    default:
      return {
        icon: <UpdatedIcon fontSize="small" color="action" />,
        color: theme.palette.text.secondary,
        bgColor: alpha(theme.palette.text.secondary, 0.1),
      };
  }
};

const translateDescription = (desc?: string | null) => {
  if (!desc) return null;
  const lowerDesc = desc.toLowerCase().trim();
  if (lowerDesc === "application created") return "Sistem üzerinde başvuru kaydı oluşturuldu.";
  if (lowerDesc === "application moved to review") return "Başvuru değerlendirme aşamasına alındı.";
  if (lowerDesc === "application approved") return "Başvuru değerlendirme süreci olumlu sonuçlandı.";
  if (lowerDesc === "application rejected") return "Başvuru uygun bulunmayarak reddedildi.";
  if (lowerDesc === "application deleted") return "Başvuru sistemden kalıcı olarak silindi.";
  if (lowerDesc === "application updated") return "Başvuru bilgileri başarıyla güncellendi.";
  return desc;
};

export default function ApplicationHistory({
  history,
  isLoading,
  isError,
  isAdmin,
}: ApplicationHistoryProps) {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
        }}
      >
        <CircularProgress size={32} thickness={4} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        Başvuru geçmişi yüklenemedi.
      </Alert>
    );
  }

  if (history.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          px: 3,
          textAlign: "center",
          backgroundColor: alpha(theme.palette.background.default, 0.4),
          borderRadius: 2,
          border: `1px dashed ${theme.palette.divider}`,
        }}
      >
        <HistoryIcon sx={{ fontSize: 40, color: "text.disabled", mb: 1.5 }} />
        <Typography variant="body2" color="text.secondary">
          Bu başvuru için henüz geçmiş kaydı bulunmuyor.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", py: 1 }}>
      {history.map((item, index) => {
        const isLast = index === history.length - 1;
        const transition = getApplicationHistoryTransition(item);
        const config = getActionConfig(item.action || "", theme);

        return (
          <Stack
            key={item.id}
            direction="row"
            spacing={3}
            sx={{
              position: "relative",
              pb: isLast ? 1 : 4,
            }}
          >
            {/* Timeline Indicator */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 32,
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: config.bgColor,
                  color: config.color,
                  zIndex: 2,
                  boxShadow: `0 0 0 4px ${theme.palette.background.paper}`,
                }}
              >
                {config.icon}
              </Box>
              {!isLast && (
                <Box
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    top: 32,
                    bottom: 0,
                    left: 15,
                    width: 2,
                    backgroundColor: theme.palette.divider,
                    zIndex: 1,
                  }}
                />
              )}
            </Box>

            {/* Timeline Content */}
            <Box sx={{ pt: 0.5, pb: 1, flex: 1 }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 0.5,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {getApplicationActionLabel(item.action)}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    bgcolor: theme.palette.mode === "dark" ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.action.hover, 0.5),
                    px: 1,
                    py: 0.25,
                    borderRadius: 1.5,
                    border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  }}
                >
                  <TimeIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: 500,
                      letterSpacing: 0.3,
                    }}
                  >
                    {formatApplicationHistoryDate(item.createdAt)}
                  </Typography>
                </Box>
              </Stack>

              {transition && (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? alpha(theme.palette.primary.main, 0.15)
                        : alpha(theme.palette.primary.main, 0.08),
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.primary.dark,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1.5,
                    mb: 1.5,
                    mt: 0.5,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 600, letterSpacing: 0.3 }}
                  >
                    {transition}
                  </Typography>
                </Box>
              )}

              {item.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: isAdmin ? 1.5 : 0,
                    lineHeight: 1.6,
                  }}
                >
                  {translateDescription(item.description)}
                </Typography>
              )}

              {isAdmin && (
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{
                    alignItems: "center",
                    mt: item.description ? 0 : 1,
                  }}
                >
                  <ActorIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                  <Typography variant="caption" color="text.secondary">
                    {getApplicationHistoryActorName(item)}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
}