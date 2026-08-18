import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useApplication } from "../hooks/use-application";
import { useAuth } from "../../auth/context/AuthContext";
import { useAttachments } from "../../attachments/hooks/use-attachments";
import { UserResponseRoleEnum } from "../../../api/generated";
import { useApplicationActions } from "../hooks/use-application-actions";
import { useUploadAttachment } from "../../attachments/hooks/use-upload-attachment";
import { useDeleteAttachment } from "../../attachments/hooks/use-delete-attachment";
import { downloadAttachment } from "../../attachments/api/attachment-service";
import StatusChip from "../../../components/StatusChip";

type ConfirmActionType = "approve" | "reject" | "cancel" | "remove" | "delete_attachment" | null;

export default function ApplicationDetailPage() {
  const theme = useTheme();
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: ConfirmActionType;
    attachmentId?: string;
  }>({ open: false, type: null });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Başarı mesajı varsa (örn. Edit veya Create sayfasından gelindiyse)
  useEffect(() => {
    if (location.state?.successMessage) {
      setSnackbarMessage(location.state.successMessage);
      setSnackbarOpen(true);
      // Mesajı okuduktan sonra state'i temizle ki sayfa yenilendiğinde tekrar çıkmasın
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const { review, approve, reject, cancel, remove } = useApplicationActions(applicationId ?? "");
  const uploadAttachmentMutation = useUploadAttachment(applicationId ?? "");
  const deleteAttachmentMutation = useDeleteAttachment(applicationId ?? "");

  const isPersonnel = user?.role === UserResponseRoleEnum.Personnel;
  const isAdmin = user?.role === UserResponseRoleEnum.Admin;

  const {
    data: application,
    isLoading,
    isError,
  } = useApplication(applicationId ?? "");

  const {
    data: attachments = [],
    isLoading: attachmentsLoading,
  } = useAttachments(applicationId ?? "");

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !application) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", pt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          Başvuru bulunamadı.
        </Alert>
      </Box>
    );
  }

  // --- ACTIONS ---
  const handleConfirmAction = async () => {
    const type = confirmDialog.type;
    setConfirmDialog({ open: false, type: null });

    try {
      if (type === "approve") {
        await approve.mutateAsync();
        showSuccess("Başvuru onaylandı.");
      } else if (type === "reject") {
        await reject.mutateAsync();
        showSuccess("Başvuru reddedildi.");
      } else if (type === "cancel") {
        await cancel.mutateAsync();
        showSuccess("Başvuru iptal edildi.");
      } else if (type === "remove") {
        await remove.mutateAsync();
        navigate("/applications/my", { replace: true });
        return;
      } else if (type === "delete_attachment" && confirmDialog.attachmentId) {
        await deleteAttachmentMutation.mutateAsync(confirmDialog.attachmentId);
        showSuccess("Dosya silindi.");
      }
    } catch (e) {
      // Hatalar zaten form üzerinde veya console'da gösteriliyor olabilir
      console.error(e);
    }
  };

  const showSuccess = (msg: string) => {
    setSnackbarMessage(msg);
    setSnackbarOpen(true);
  };

  const handleReview = async () => {
    try {
      await review.mutateAsync();
      showSuccess("Başvuru incelemeye alındı.");
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadAttachmentMutation.mutate(file, {
        onSuccess: () => showSuccess("Dosya yüklendi."),
      });
    }
    event.target.value = "";
  };

  // --- UI HELPERS ---
  const getDialogContent = (type: ConfirmActionType) => {
    switch (type) {
      case "approve":
        return { title: "Onayla", text: "Başvuruyu onaylamak istediğinize emin misiniz?", confirmColor: "success" as const };
      case "reject":
        return { title: "Reddet", text: "Başvuruyu reddetmek istediğinize emin misiniz?", confirmColor: "error" as const };
      case "cancel":
        return { title: "İptal Et", text: "Başvuruyu iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.", confirmColor: "warning" as const };
      case "remove":
        return { title: "Sil", text: "Bu başvuruyu tamamen silmek istediğinize emin misiniz?", confirmColor: "error" as const };
      case "delete_attachment":
        return { title: "Dosyayı Sil", text: "Bu dosyayı silmek istediğinize emin misiniz?", confirmColor: "error" as const };
      default:
        return { title: "", text: "", confirmColor: "primary" as const };
    }
  };

  // Stepper logic
  const isCancelled = application.status === "CANCELLED";
  let activeStep = 0;
  if (application.status === "IN_REVIEW") activeStep = 1;
  else if (application.status === "APPROVED" || application.status === "REJECTED") activeStep = 2;

  const steps = ["Yeni", "İncelemede", application.status === "REJECTED" ? "Reddedildi" : "Onaylandı"];

  return (
    <Box sx={{ maxWidth: 850, mx: "auto", pb: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          startIcon={<ArrowBackOutlinedIcon />}
          color="inherit"
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none" }}
        >
          Geri Dön
        </Button>
      </Box>

      {/* CANCELLED BANNER */}
      {isCancelled && (
        <Alert
          severity="error"
          sx={{
            mb: 4,
            borderRadius: 3,
            border: `1px solid ${theme.palette.error.main}`,
            backgroundColor: theme.palette.mode === "light" ? theme.palette.error.light + "20" : "transparent",
            "& .MuiAlert-message": { width: "100%", textAlign: "center", fontWeight: 600, fontSize: "1.1rem" }
          }}
        >
          BU BAŞVURU İPTAL EDİLMİŞTİR
        </Alert>
      )}

      {/* STEPPER TIMELINE */}
      {!isCancelled && (
        <Box sx={{ width: "100%", mb: 6, mt: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const labelProps: { error?: boolean } = {};
              if (index === 2 && application.status === "REJECTED") {
                labelProps.error = true;
              }
              return (
                <Step key={label}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      )}

      {/* MAIN CARD */}
      <Card
        sx={{
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
          backgroundColor: "background.paper",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {application.title}
            </Typography>
            <StatusChip status={application.status} />
          </Box>

          <Typography variant="body1" sx={{ mb: 4, whiteSpace: "pre-wrap", color: "text.secondary" }}>
            {application.description || "Açıklama bulunmamaktadır."}
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, p: 3, backgroundColor: "background.default", borderRadius: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 600 }}>
                Başvuru Türü
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {application.formTypeName}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 600 }}>
                Oluşturulma Tarihi
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {application.createdAt ? new Date(application.createdAt).toLocaleString("tr-TR") : "-"}
              </Typography>
            </Box>
            {isAdmin && (
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 600 }}>
                  Başvuran
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {application.applicantFullName}
                </Typography>
              </Box>
            )}
          </Box>

          {/* ATTACHMENTS SECTION */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Dosya Ekleri
            </Typography>

            {isPersonnel && application.status === "NEW" && (
              <Box
                onClick={() => !uploadAttachmentMutation.isPending && fileInputRef.current?.click()}
                sx={{
                  border: `2px dashed ${theme.palette.divider}`,
                  borderRadius: 2,
                  p: 3,
                  mb: 3,
                  textAlign: "center",
                  cursor: uploadAttachmentMutation.isPending ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)",
                  },
                }}
              >
                <CloudUploadOutlinedIcon color="primary" sx={{ fontSize: 40, mb: 1, opacity: uploadAttachmentMutation.isPending ? 0.5 : 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {uploadAttachmentMutation.isPending ? "Yükleniyor..." : "Dosya Yüklemek İçin Tıklayın"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Desteklenen formatlar: PDF, PNG, JPG (Maks 10MB)
                </Typography>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
              </Box>
            )}

            {attachmentsLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <CircularProgress size={30} />
              </Box>
            ) : attachments.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4, px: 2, backgroundColor: "background.default", borderRadius: 2 }}>
                <InboxOutlinedIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  Henüz dosya yüklenmedi.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {attachments.map((attachment) => (
                  <Box
                    key={attachment.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: "background.default",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <AttachFileOutlinedIcon color="action" />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {attachment.originalName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {attachment.contentType} • {attachment.fileSize ? (attachment.fileSize / 1024).toFixed(1) : 0} KB
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="İndir">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={async () => {
                            try {
                              const response = await downloadAttachment(attachment.id!);
                              const blob = new Blob([response.data as BlobPart], { type: attachment.contentType });
                              const url = window.URL.createObjectURL(blob);
                              const link = document.createElement("a");
                              link.href = url;
                              link.download = attachment.originalName ?? "download";
                              document.body.appendChild(link);
                              link.click();
                              link.remove();
                              window.URL.revokeObjectURL(url);
                            } catch {
                              console.error("Dosya indirilemedi.");
                            }
                          }}
                        >
                          <DownloadOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {isPersonnel && application.status === "NEW" && (
                        <Tooltip title="Sil">
                          <IconButton
                            size="small"
                            color="error"
                            disabled={deleteAttachmentMutation.isPending}
                            onClick={() => setConfirmDialog({ open: true, type: "delete_attachment", attachmentId: attachment.id })}
                          >
                            <DeleteOutlineOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </CardContent>

        {/* ACTIONS BAR */}
        <Divider />
        {(isPersonnel || isAdmin) && application.status !== "CANCELLED" && (
          <CardActions sx={{ justifyContent: "flex-end", p: 3, gap: 2 }}>
            {isPersonnel && application.status === "NEW" && (
              <>
                <Button
                  color="warning"
                  variant="outlined"
                  disabled={cancel.isPending}
                  onClick={() => setConfirmDialog({ open: true, type: "cancel" })}
                >
                  İptal Et
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  disabled={remove.isPending}
                  onClick={() => setConfirmDialog({ open: true, type: "remove" })}
                >
                  Sil
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/applications/${application.id}/edit`)}
                >
                  Güncelle
                </Button>
              </>
            )}

            {isAdmin && application.status === "NEW" && (
              <Button
                variant="contained"
                disabled={review.isPending}
                onClick={handleReview}
              >
                İncelemeye Al
              </Button>
            )}

            {isAdmin && application.status === "IN_REVIEW" && (
              <>
                <Button
                  color="error"
                  variant="outlined"
                  disabled={reject.isPending}
                  onClick={() => setConfirmDialog({ open: true, type: "reject" })}
                >
                  Reddet
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  disabled={approve.isPending}
                  onClick={() => setConfirmDialog({ open: true, type: "approve" })}
                >
                  Onayla
                </Button>
              </>
            )}
          </CardActions>
        )}
      </Card>

      {/* CONFIRMATION DIALOG */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, type: null })}>
        <DialogTitle>{getDialogContent(confirmDialog.type).title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{getDialogContent(confirmDialog.type).text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, type: null })} color="inherit">
            Vazgeç
          </Button>
          <Button
            onClick={handleConfirmAction}
            color={getDialogContent(confirmDialog.type).confirmColor}
            variant="contained"
            disableElevation
          >
            Onayla
          </Button>
        </DialogActions>
      </Dialog>

      {/* SUCCESS SNACKBAR */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
      {/* ERROR SNACKBARS (General API Errors) */}
      <Snackbar open={review.isError || approve.isError || reject.isError || cancel.isError || remove.isError || uploadAttachmentMutation.isError || deleteAttachmentMutation.isError} autoHideDuration={6000}>
        <Alert severity="error" variant="filled">Bir hata oluştu. Lütfen tekrar deneyin.</Alert>
      </Snackbar>
    </Box>
  );
}