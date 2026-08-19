import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  useTheme,
  CardActions,
} from "@mui/material";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

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

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DynamicFormOutlinedIcon from "@mui/icons-material/DynamicFormOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

export default function FormTypeFormPage() {
  const theme = useTheme();
  const { formTypeId } = useParams<{ formTypeId?: string }>();
  const isEdit = Boolean(formTypeId);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormTypeFormData>({
    resolver: zodResolver(formTypeSchema),
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
      try {
        const formType = await getFormTypeById(formTypeId);
        reset({
          name: formType.name ?? "",
          description: formType.description ?? "",
        });
      } catch (e) {
        console.error("Form türü yüklenemedi", e);
      }
    };

    void loadFormType();
  }, [formTypeId, reset]);

  const onSubmit = async (data: FormTypeFormData) => {
    try {
      if (isEdit && formTypeId) {
        const request: UpdateFormTypeRequest = {
          name: data.name.trim(),
          description: data.description?.trim() || undefined,
        };
        await updateFormType(formTypeId, request);
        navigate("/form-types", { state: { successMessage: "Form türü başarıyla güncellendi." } });
      } else {
        const request: CreateFormTypeRequest = {
          name: data.name.trim(),
          description: data.description?.trim() || undefined,
        };
        await createFormType(request);
        navigate("/form-types", { state: { successMessage: "Yeni form türü başarıyla oluşturuldu." } });
      }
    } catch {
      // API error handled generically or can be added locally
      throw new Error("Form type operation failed.");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", pb: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Button
          startIcon={<ArrowBackOutlinedIcon />}
          color="inherit"
          onClick={() => navigate("/form-types")}
          sx={{ textTransform: "none" }}
        >
          Geri Dön
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {isEdit ? "Form Türünü Güncelle" : "Yeni Form Türü"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isEdit
            ? "Form türü detaylarını ve açıklamalarını düzenleyin."
            : "Sisteme yeni bir başvuru türü tanımlayın."}
        </Typography>
      </Box>

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
              <DynamicFormOutlinedIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Form Türü Bilgileri
              </Typography>
            </Box>
          }
          sx={{ px: 4, py: 3 }}
        />
        
        <Divider />
        
        <CardContent sx={{ p: 4 }}>
          <Box component="form" id="form-type-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Form Türü Adı"
                  margin="normal"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  disabled={isSubmitting}
                  sx={{ mb: 3 }}
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
                  label="Açıklama (Opsiyonel)"
                  margin="normal"
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  disabled={isSubmitting}
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Box>
        </CardContent>

        <Divider />

        <CardActions sx={{ justifyContent: "flex-end", p: 3, gap: 2 }}>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/form-types")}
            disabled={isSubmitting}
            sx={{ px: 4 }}
          >
            Vazgeç
          </Button>

          <Button
            type="submit"
            form="form-type-form"
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveOutlinedIcon />}
            sx={{ px: 4, minWidth: 200 }}
          >
            {isEdit ? "Değişiklikleri Kaydet" : "Oluştur"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
