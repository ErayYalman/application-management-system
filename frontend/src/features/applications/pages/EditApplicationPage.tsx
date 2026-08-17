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
} from "@mui/material";

import {
  Controller,
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import type {
    UpdateApplicationRequest,
} from "../../../api/generated";

import {
  updateApplicationSchema,
  type UpdateApplicationFormData,
} from "../schemas/update-application-schema";

import {
  useApplication,
} from "../hooks/use-application";

import {
  useUpdateApplication,
} from "../hooks/use-update-application";

import {
  useFormTypes,
} from "../../form-types/hooks/use-form-types";

export default function EditApplicationPage() {
  const { applicationId } =
    useParams<{
      applicationId: string;
    }>();

  const navigate = useNavigate();

  const {
    data: application,
    isLoading: applicationLoading,
    isError: applicationError,
  } = useApplication(
    applicationId ?? "",
  );

  const {
    data: formTypes = [],
    isLoading: formTypesLoading,
    isError: formTypesError,
  } = useFormTypes();

  const updateMutation =
    useUpdateApplication(
      applicationId ?? "",
    );

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<UpdateApplicationFormData>({
    resolver: zodResolver(
      updateApplicationSchema,
    ),
    defaultValues: {
      title: "",
      description: "",
      formTypeId: "",
    },
  });

  useEffect(() => {
    if (!application) {
      return;
    }

    reset({
      title: application.title ?? "",
      description:
        application.description ?? "",
      formTypeId:
        application.formTypeId ?? "",
    });
  }, [application, reset]);

  const onSubmit = async (
    data: UpdateApplicationFormData,
  ) => {
    const request: UpdateApplicationRequest = {
      title: data.title.trim(),
      description:
        data.description?.trim() || undefined,
      formTypeId: data.formTypeId,
    };

    try {
      await updateMutation.mutateAsync(
        request,
      );

      navigate(
        `/applications/${applicationId}`,
      );
    } catch {
      // Hata aşağıdaki Alert ile gösterilecek.
    }
  };

  if (applicationLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (
    applicationError ||
    !application
  ) {
    return (
      <Alert severity="error">
        Başvuru yüklenemedi.
      </Alert>
    );
  }

  if (
    application.status !== "NEW"
  ) {
    return (
      <Box>
        <Alert severity="warning">
          Bu başvuru artık güncellenemez.
        </Alert>

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={() =>
            navigate(
              `/applications/${applicationId}`,
            )
          }
        >
          Başvuruya Dön
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
        }}
        gutterBottom
      >
        Başvuruyu Güncelle
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Başvurunuzun bilgilerini güncelleyin.
      </Typography>

      {formTypesError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          Başvuru türleri yüklenemedi.
        </Alert>
      )}

      {updateMutation.isError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          Başvuru güncellenemedi. Başvurunun
          hâlâ güncellenebilir durumda olduğunu
          kontrol edin.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
              helperText={
                errors.title?.message
              }
            />
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
              label="Açıklama"
              margin="normal"
              error={Boolean(
                errors.description,
              )}
              helperText={
                errors.description?.message
              }
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
              error={Boolean(
                errors.formTypeId,
              )}
              disabled={formTypesLoading}
            >
              <InputLabel>
                Başvuru Türü
              </InputLabel>

              <Select
                {...field}
                label="Başvuru Türü"
              >
                <MenuItem value="">
                  Başvuru türü seçin
                </MenuItem>

                {formTypes
                  .filter(
                    (formType) =>
                      formType.active ||
                      formType.id ===
                        application.formTypeId,
                  )
                  .map((formType) => (
                    <MenuItem
                      key={formType.id}
                      value={formType.id}
                    >
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

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={() =>
              navigate(
                `/applications/${applicationId}`,
              )
            }
            disabled={isSubmitting}
          >
            Vazgeç
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={
              isSubmitting ||
              updateMutation.isPending ||
              formTypesLoading
            }
          >
            {isSubmitting ||
            updateMutation.isPending ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              "Değişiklikleri Kaydet"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}