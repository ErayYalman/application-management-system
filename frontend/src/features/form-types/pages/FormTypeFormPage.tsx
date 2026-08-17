import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import {
  useEffect,
} from "react";

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

import type {
  CreateFormTypeRequest,
  UpdateFormTypeRequest,
} from "../../../api/generated";

import {
  formTypeSchema,
  type FormTypeFormData,
} from "../schemas/form-type-schema";

import {
  getFormTypeById,
  createFormType,
  updateFormType,
} from "../api/form-type-service";

export default function FormTypeFormPage() {
  const {
    formTypeId,
  } = useParams<{
    formTypeId?: string;
  }>();

  const isEdit =
    Boolean(formTypeId);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FormTypeFormData>({
    resolver: zodResolver(
      formTypeSchema,
    ),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!formTypeId) {
      return;
    }

    const loadFormType = async () => {
      const formType =
        await getFormTypeById(
          formTypeId,
        );

      reset({
        name: formType.name ?? "",
        description:
          formType.description ?? "",
      });
    };

    void loadFormType();
  }, [formTypeId, reset]);

  const onSubmit = async (
    data: FormTypeFormData,
  ) => {
    try {
      if (isEdit && formTypeId) {
        const request: UpdateFormTypeRequest = {
          name: data.name.trim(),
          description:
            data.description?.trim() ||
            undefined,
        };

        await updateFormType(
          formTypeId,
          request,
        );
      } else {
        const request: CreateFormTypeRequest = {
          name: data.name.trim(),
          description:
            data.description?.trim() ||
            undefined,
        };

        await createFormType(request);
      }

      navigate("/form-types");
    } catch {
      // Aşağıdaki Alert için state ekleyebiliriz.
      throw new Error(
        "Form type operation failed.",
      );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
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
        {isEdit
          ? "Form Türünü Güncelle"
          : "Yeni Form Türü"}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        {isEdit
          ? "Form türü bilgilerini güncelleyin."
          : "Yeni bir başvuru türü oluşturun."}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Ad"
              margin="normal"
              error={Boolean(errors.name)}
              helperText={
                errors.name?.message
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
              minRows={4}
              label="Açıklama"
              margin="normal"
            />
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
              navigate("/form-types")
            }
          >
            Vazgeç
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              "Kaydet"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}