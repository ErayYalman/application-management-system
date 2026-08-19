import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  TextField,
  Typography,
  Grid,
  Avatar,
  Snackbar,
  useTheme,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserResponseRoleEnum } from "../../../api/generated";
import { profileSchema, type ProfileFormData } from "../schemas/profile-schema";
import { useProfile } from "../hooks/use-profile";
import { useUpdateProfile } from "../hooks/use-update-profile";
import { useAuth } from "../../auth/context/AuthContext";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function ProfilePage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { logout, updateUser } = useAuth();
  const { data: profile, isLoading, isError } = useProfile();
  const updateMutation = useUpdateProfile();

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      surname: "",
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      name: profile.name ?? "",
      surname: profile.surname ?? "",
    });
  }, [profile, reset]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !profile) {
    return (
      <Box sx={{ maxWidth: 1000, mx: "auto", pt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: "8px" }}>
          Profil bilgileri yüklenemedi.
        </Alert>
      </Box>
    );
  }

  const handleUpdate = async (data: ProfileFormData) => {
    try {
      const updatedUser = await updateMutation.mutateAsync({
        name: data.name.trim(),
        surname: data.surname.trim(),
      });
      
      updateUser(updatedUser);
      setSnackbar({ open: true, message: "Profiliniz başarıyla güncellendi.", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Profil güncellenemedi.", severity: "error" });
    }
  };

  const getInitials = (name?: string, surname?: string) => {
    const n = name || "";
    const s = surname || "";
    return `${n.charAt(0)}${s.charAt(0)}`.toUpperCase();
  };

  const cardStyle = {
    borderRadius: "8px",
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
    backgroundColor: "background.paper",
  };

  const gradientHeader = {
    background: "linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)",
    height: "120px",
    borderRadius: "8px 8px 0 0",
    position: "relative" as const,
    mb: 8,
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", pb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Profilim
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Kişisel bilgilerinizi ve hesap ayarlarınızı yönetin.
      </Typography>

      <Grid container spacing={4}>
        {/* ÜST BÖLÜM: KULLANICI ÖZETİ */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ ...cardStyle, position: "relative", overflow: "visible" }}>
            <Box sx={gradientHeader}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  bgcolor: "background.paper",
                  color: "primary.main",
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  position: "absolute",
                  bottom: -50,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {getInitials(profile.name, profile.surname)}
              </Avatar>
            </Box>
            <CardContent sx={{ pt: 0, pb: 4, textAlign: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                {profile.name} {profile.surname}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {profile.email}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <Chip
                  label={profile.role === UserResponseRoleEnum.Admin ? "Yönetici" : "Kullanıcı"}
                  color={profile.role === UserResponseRoleEnum.Admin ? "primary" : "default"}
                  size="small"
                  sx={{ fontWeight: 600, borderRadius: "8px" }}
                />
                <Chip
                  label={profile.active ? "Aktif" : "Pasif"}
                  color={profile.active ? "success" : "default"}
                  size="small"
                  sx={{ fontWeight: 600, borderRadius: "8px" }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ORTA BÖLÜM: AYARLAR VE GÜVENLİK */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ ...cardStyle }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Kişisel Bilgiler
              </Typography>

              <Box component="form" onSubmit={handleSubmit(handleUpdate)}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Ad"
                          error={Boolean(errors.name)}
                          helperText={errors.name?.message}
                          slotProps={{ input: { sx: { borderRadius: "8px" } } }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="surname"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Soyad"
                          error={Boolean(errors.surname)}
                          helperText={errors.surname?.message}
                          slotProps={{ input: { sx: { borderRadius: "8px" } } }}
                        />
                      )}
                    />
                  </Grid>

                  {/* READ-ONLY FIELDS */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={profile.email}
                      disabled
                      slotProps={{ input: { sx: { borderRadius: "8px" } } }}
                      sx={{
                        "& .MuiInputBase-root.Mui-disabled": {
                          backgroundColor: "action.disabledBackground",
                          cursor: "not-allowed",
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Rol"
                      value={profile.role}
                      disabled
                      slotProps={{ input: { sx: { borderRadius: "8px" } } }}
                      sx={{
                        "& .MuiInputBase-root.Mui-disabled": {
                          backgroundColor: "action.disabledBackground",
                          cursor: "not-allowed",
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || updateMutation.isPending}
                    startIcon={isSubmitting || updateMutation.isPending ? <CircularProgress size={20} color="inherit" /> : <SaveOutlinedIcon />}
                    sx={{ borderRadius: "8px", px: 4 }}
                  >
                    Kaydet
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* ALT BÖLÜM: ÇIKIŞ YAP */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ ...cardStyle }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Oturum Yönetimi
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Geçerli oturumunuzu sonlandırıp uygulamadan güvenli bir şekilde çıkış yapabilirsiniz.
              </Typography>

              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutOutlinedIcon />}
                sx={{ borderRadius: "8px" }}
                onClick={async () => {
                  await logout();
                  navigate("/ApplicationManagementSystem", { replace: true });
                }}
              >
                Oturumu Kapat
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", fontWeight: 500, borderRadius: "8px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}