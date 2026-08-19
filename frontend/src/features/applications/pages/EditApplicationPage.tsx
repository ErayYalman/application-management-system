import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import type { UpdateApplicationRequest } from "../../../api/generated";
import {
  updateApplicationSchema,
  type UpdateApplicationFormData,
} from "../schemas/update-application-schema";

import { useApplication } from "../hooks/use-application";
import { useUpdateApplication } from "../hooks/use-update-application";
import { useFormTypes } from "../../form-types/hooks/use-form-types";

export default function EditApplicationPage() {
  const theme = useTheme();
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();

  const {
    data: application,
    isLoading: applicationLoading,
    isError: applicationError,
  } = useApplication(applicationId ?? "");

  const {
    data: formTypes = [],
    isLoading: formTypesLoading,
    isError: formTypesError,
  } = useFormTypes();

  const updateMutation = useUpdateApplication(applicationId ?? "");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateApplicationFormData>({
    resolver: zodResolver(updateApplicationSchema),
    defaultValues: {
      title: "",
      description: "",
      formTypeId: "",
    },
  });

  useEffect(() => {
    if (!application) return;

    reset({
      title: application.title ?? "",
      description: application.description ?? "",
      formTypeId: application.formTypeId ?? "",
    });
  }, [application, reset]);

  const onSubmit = async (data: UpdateApplicationFormData) => {
    const request: UpdateApplicationRequest = {
      title: data.title.trim(),
      description: data.description?.trim() || undefined,
      formTypeId: data.formTypeId,
    };

    try {
      await updateMutation.mutateAsync(request);
      navigate(`/applications/${applicationId}`, {
        state: { successMessage: "Başvuru başarıyla güncellendi!" },
      });
    } catch {
      // Hata durumu UI'da gösteriliyor
    }
  };

  const isSaving = isSubmitting || updateMutation.isPending;

  if (applicationLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (applicationError || !application) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", pt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: "8px" }}>
          Başvuru bilgileri yüklenemedi. Lütfen sayfayı yenileyin.
        </Alert>
      </Box>
    );
  }

  const isReadOnly = application && application.status !== "NEW";

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", pb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Başvuruyu Güncelle
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Başvurunuzun detaylarını inceleyin ve değişikliklerinizi kaydedin.
        </Typography>
      </Box>

      {isReadOnly && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: "8px" }}>
          Bu başvuru <strong>{application.status}</strong> durumunda olduğu için düzenlenemez. Sadece görüntüleyebilirsiniz.
        </Alert>
      )}

      {formTypesError && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
          Başvuru türleri yüklenemedi. Lütfen sayfayı yenileyin.
        </Alert>
      )}

      {updateMutation.isError && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
          Başvuru güncellenemedi. Lütfen bilgileri kontrol edin ve tekrar deneyin.
        </Alert>
      )}

      <Card
        sx={{
          borderRadius: "8px",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
          backgroundColor: "background.paper",
        }}
      >
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <EditOutlinedIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Başvuru Bilgileri
              </Typography>
            </Box>
          }
          sx={{ px: 4, py: 3 }}
        />
        <Divider />
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Başlık"
                  margin="normal"
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                  disabled={isSaving || isReadOnly}
                  sx={{ mb: 3 }}
                />
              )}
            />

            <Controller
              name="formTypeId"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.formTypeId)}
                  disabled={formTypesLoading || isSaving || isReadOnly}
                  sx={{ mb: 3 }}
                >
                  <InputLabel>Başvuru Türü</InputLabel>
                  <Select {...field} label="Başvuru Türü">
                    <MenuItem value="" disabled>
                      Başvuru türü seçin
                    </MenuItem>
                    {formTypes
                      .filter(
                        (formType) =>
                          formType.active || formType.id === application.formTypeId
                      )
                      .map((formType) => (
                        <MenuItem key={formType.id} value={formType.id}>
                          {formType.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>
                    {errors.formTypeId?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  minRows={5}
                  label="Açıklama (Opsiyonel)"
                  margin="normal"
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  disabled={isSaving || isReadOnly}
                  sx={{ mb: 4 }}
                />
              )}
            />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => navigate(`/applications/${applicationId}`)}
                disabled={isSaving}
                sx={{ px: 4 }}
              >
                Vazgeç
              </Button>
              {!isReadOnly && (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSaving || formTypesLoading}
                  sx={{ px: 4, minWidth: 200 }}
                >
                  {isSaving ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Değişiklikleri Kaydet"
                  )}
                </Button>
              )}
            </Box>

          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
