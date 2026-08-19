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
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import type { CreateApplicationFormRequest } from "../../../api/generated";
import {
  createApplicationSchema,
  type CreateApplicationFormData,
} from "../schemas/create-application-schema";
import { useCreateApplication } from "../hooks/use-create-application";
import { useFormTypes } from "../../form-types/hooks/use-form-types";

export default function CreateApplicationPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const createMutation = useCreateApplication();

  const {
    data: formTypes = [],
    isLoading: formTypesLoading,
    isError: formTypesError,
  } = useFormTypes();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateApplicationFormData>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      title: "",
      description: "",
      formTypeId: "",
    },
  });

  const onSubmit = async (data: CreateApplicationFormData) => {
    const request: CreateApplicationFormRequest = {
      title: data.title.trim(),
      description: data.description?.trim() || undefined,
      formTypeId: data.formTypeId,
    };

    try {
      const application = await createMutation.mutateAsync(request);
      // Başarılı olduğunda id sayfasına state (successMessage) ile yönlendir
      navigate(`/applications/${application.id}`, {
        state: { successMessage: "Başvuru başarıyla oluşturuldu!" }
      });
    } catch (error) {
      console.error("Failed to create application:", error);
    }
  };

  const isSaving = isSubmitting || createMutation.isPending;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", pb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Yeni Başvuru
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sisteme yeni bir başvuru formu oluşturun ve gönderin.
        </Typography>
      </Box>

      {createMutation.isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Başvuru oluşturulamadı. Lütfen bilgileri kontrol edin ve tekrar deneyin.
        </Alert>
      )}

      {formTypesError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Başvuru türleri yüklenemedi. Lütfen sayfayı yenileyin.
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
              <PostAddOutlinedIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Başvuru Detayları
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
                  disabled={isSaving}
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
                  disabled={formTypesLoading || isSaving}
                  sx={{ mb: 3 }}
                >
                  <InputLabel>Başvuru Türü</InputLabel>
                  <Select {...field} label="Başvuru Türü">
                    <MenuItem value="" disabled>
                      Başvuru türü seçin
                    </MenuItem>
                    {formTypes
                      .filter((formType) => formType.active)
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
                  disabled={isSaving}
                  sx={{ mb: 4 }}
                />
              )}
            />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/applications/my")}
                disabled={isSaving}
                sx={{ px: 4 }}
              >
                Vazgeç
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSaving || formTypesLoading}
                sx={{ px: 4, minWidth: 150 }}
              >
                {isSaving ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Başvuruyu Oluştur"
                )}
              </Button>
            </Box>

          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
