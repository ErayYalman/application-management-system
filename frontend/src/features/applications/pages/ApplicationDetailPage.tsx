import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useApplication } from "../hooks/use-application";
import { useAuth } from "../../auth/context/AuthContext";
import { useAttachments } from "../../attachments/hooks/use-attachments";
import { UserResponseRoleEnum } from "../../../api/generated";
import { useApplicationActions } from "../hooks/use-application-actions";
import { useUploadAttachment } from "../../attachments/hooks/use-upload-attachment";
import { useDeleteAttachment } from "../../attachments/hooks/use-delete-attachment";
import { downloadAttachment } from "../../attachments/api/attachment-service";

export default function ApplicationDetailPage() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const successMessage = location.state?.successMessage;
  
  const {
    review,
    approve,
    reject,
    cancel,
    remove,
  } = useApplicationActions(applicationId ?? "");

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
    return <Alert severity="error">Başvuru bulunamadı.</Alert>;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Button onClick={() => navigate(-1)}>
          Geri
        </Button>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
        Başvuru Detayı
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {application.title}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ mb: 2 }}>
            {application.description}
          </Typography>

          <Typography>
            <strong>Başvuru Türü:</strong> {application.formTypeName}
          </Typography>

          <Typography>
            <strong>Durum:</strong> {application.status}
          </Typography>

          <Typography>
            <strong>Oluşturulma:</strong>{" "}
            {application.createdAt
              ? new Date(application.createdAt).toLocaleString("tr-TR")
              : "-"}
          </Typography>

          {isAdmin && (
            <Typography>
              <strong>Başvuran:</strong> {application.applicantFullName}
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Dosyalar</Typography>

            {isPersonnel && application.status === "NEW" && (
              <Button
                variant="outlined"
                component="label"
                disabled={uploadAttachmentMutation.isPending}
              >
                {uploadAttachmentMutation.isPending ? "Yükleniyor..." : "Dosya Yükle"}
                <input
                  type="file"
                  hidden
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) {
                      return;
                    }
                    uploadAttachmentMutation.mutate(file);
                    event.target.value = "";
                  }}
                />
              </Button>
            )}
          </Box>

          {uploadAttachmentMutation.isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Dosya yüklenemedi.
            </Alert>
          )}

          {deleteAttachmentMutation.isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Dosya silinemedi.
            </Alert>
          )}

          {attachmentsLoading ? (
            <CircularProgress size={24} />
          ) : attachments.length === 0 ? (
            <Typography color="text.secondary">
              Bu başvuruya ait dosya yok.
            </Typography>
          ) : (
            attachments.map((attachment) => (
              <Box
                key={attachment.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                  p: 1.5,
                  borderRadius: 1,
                  backgroundColor: "#f8fafc",
                }}
              >
                <Box>
                  <Typography>{attachment.originalName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {attachment.contentType} • {attachment.fileSize} bytes
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={async () => {
                      try {
                        const response = await downloadAttachment(attachment.id!);
                        const blob = new Blob([response.data as BlobPart], {
                          type: attachment.contentType,
                        });
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
                    İndir
                  </Button>
                  {isPersonnel && application.status === "NEW" && (
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      disabled={deleteAttachmentMutation.isPending}
                      onClick={() => {
                        if (window.confirm("Bu dosyayı silmek istediğinize emin misiniz?")) {
                          deleteAttachmentMutation.mutate(attachment.id!);
                        }
                      }}
                    >
                      Sil
                    </Button>
                  )}
                </Box>
              </Box>
            ))
          )}

          {isPersonnel && application.status === "NEW" && (
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/applications/${application.id}/edit`)}
              >
                Güncelle
              </Button>
              <Button
                color="error"
                variant="outlined"
                disabled={remove.isPending}
                onClick={async () => {
                  if (window.confirm("Bu başvuruyu silmek istediğinize emin misiniz?")) {
                    await remove.mutateAsync();
                    navigate("/applications/my", { replace: true });
                  }
                }}
              >
                Sil
              </Button>
              <Button
                color="warning"
                variant="outlined"
                disabled={cancel.isPending}
                onClick={() => {
                  if (window.confirm("Bu başvuruyu iptal etmek istediğinize emin misiniz?")) {
                    cancel.mutate();
                  }
                }}
              >
                İptal Et
              </Button>
            </Box>
          )}

          {isAdmin && application.status === "NEW" && (
            <Button
              variant="contained"
              disabled={review.isPending}
              sx={{ mt: 3 }}
              onClick={() => review.mutate()}
            >
              İncelemeye Al
            </Button>
          )}

          {isAdmin && application.status === "IN_REVIEW" && (
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="success"
                disabled={approve.isPending}
                onClick={() => {
                  if (window.confirm("Başvuruyu onaylamak istediğinize emin misiniz?")) {
                    approve.mutate();
                  }
                }}
              >
                Onayla
              </Button>
              <Button
                color="error"
                variant="contained"
                disabled={reject.isPending}
                onClick={() => {
                  if (window.confirm("Başvuruyu reddetmek istediğinize emin misiniz?")) {
                    reject.mutate();
                  }
                }}
              >
                Reddet
              </Button>
            </Box>
          )}

          {review.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Başvuru incelemeye alınamadı.
            </Alert>
          )}

          {approve.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Başvuru onaylanamadı.
            </Alert>
          )}

          {reject.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Başvuru reddedilemedi.
            </Alert>
          )}

          {cancel.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Başvuru iptal edilemedi.
            </Alert>
          )}

          {remove.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Başvuru silinemedi.
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}