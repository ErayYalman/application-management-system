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
} from "react-router-dom";

import type {
  CreateApplicationFormRequest,
} from "../../../api/generated";

import {
  createApplicationSchema,
  type CreateApplicationFormData,
} from "../schemas/create-application-schema";

import {
  useCreateApplication,
} from "../hooks/use-create-application";

import {
  useFormTypes,
} from "../../form-types/hooks/use-form-types";

export default function CreateApplicationPage() {
  const navigate = useNavigate();

  const createMutation =
    useCreateApplication();

  const {
    data: formTypes = [],
    isLoading: formTypesLoading,
    isError: formTypesError,
  } = useFormTypes();

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateApplicationFormData>({
    resolver: zodResolver(
      createApplicationSchema,
    ),
    defaultValues: {
      title: "",
      description: "",
      formTypeId: "",
    },
  });

  const onSubmit = async (
    data: CreateApplicationFormData,
  ) => {
    const request: CreateApplicationFormRequest = {
      title: data.title.trim(),
      description: data.description?.trim() || undefined,
      formTypeId: data.formTypeId,
    };

    try {
      const application =
        await createMutation.mutateAsync(
          request,
        );

      navigate(
        `/applications/${application.id}`,
      );
    } catch {
    }
  };

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
        Yeni Başvuru
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Yeni bir başvuru oluşturun.
      </Typography>

      {createMutation.isError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          Başvuru oluşturulamadı. Form türünün
          aktif olduğundan emin olun.
        </Alert>
      )}

      {formTypesError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          Başvuru türleri yüklenemedi.
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
                      formType.active,
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
              navigate("/applications/my")
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
              createMutation.isPending ||
              formTypesLoading
            }
          >
            {isSubmitting ||
            createMutation.isPending ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              "Başvuru Oluştur"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}