import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    TextField,
    Typography,
    useTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    CardHeader,
} from "@mui/material";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    Controller,
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    useEffect,
    useState,
} from "react";

import {
    UserResponseRoleEnum,
} from "../../../api/generated";

import {
    useUser,
} from "../hooks/use-user";

import {
    useUserActions,
} from "../hooks/use-user-actions";

import {
    updateUserSchema,
    type UpdateUserFormData,
} from "../schemas/update-user-schema";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

export default function UserDetailPage() {
    const theme = useTheme();
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();

    const { data: user, isLoading, isError } = useUser(userId ?? "");
    const { update, activate, deactivate } = useUserActions(userId ?? "");

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
    const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; action: "activate" | "deactivate" | null }>({ open: false, action: null });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: { name: "", surname: "" },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name ?? "",
                surname: user.surname ?? "",
            });
        }
    }, [user, reset]);

    const showMessage = (msg: string, severity: "success" | "error" = "success") => {
        setSnackbar({ open: true, message: msg, severity });
    };

    const extractErrorMessage = (error: any, defaultMessage: string, action?: string) => {
        // Backend son aktif admin pasifleştirildiğinde 500 Internal Server Error atıyor. 
        // Kullanıcının isteğine (Senaryo 1) uygun net bir hata mesajı çıkarıyoruz.
        if (action === "deactivate" && error?.response?.status === 500 && user?.role === UserResponseRoleEnum.Admin) {
            return "Bu işlem gerçekleştirilemedi: Sistemde en az bir aktif admin kullanıcı bulunmalıdır.";
        }

        if (error?.response?.data?.message && error.response.data.message !== "An unexpected error occurred.") {
            return `Bu işlem gerçekleştirilemedi: ${error.response.data.message}`;
        }
        if (error?.response?.data) {
             if (typeof error.response.data === 'string') {
                 return `Bu işlem gerçekleştirilemedi: ${error.response.data}`;
             }
        }
        if (error?.message) {
            return `Bu işlem gerçekleştirilemedi: ${error.message}`;
        }
        return defaultMessage;
    };

    const handleUpdate = async (data: UpdateUserFormData) => {
        try {
            await update.mutateAsync({
                name: data.name.trim(),
                surname: data.surname.trim(),
            });
            showMessage("Kullanıcı bilgileri başarıyla güncellendi.");
        } catch (e: any) {
            showMessage(extractErrorMessage(e, "Kullanıcı güncellenemedi.", "update"), "error");
        }
    };

    const handleConfirmAction = async () => {
        const action = confirmDialog.action;
        setConfirmDialog({ open: false, action: null });

        try {
            if (action === "activate") {
                await activate.mutateAsync();
                showMessage("Kullanıcı başarıyla aktifleştirildi.");
            } else if (action === "deactivate") {
                await deactivate.mutateAsync();
                showMessage("Kullanıcı başarıyla pasifleştirildi.");
            }
        } catch (e: any) {
            showMessage(extractErrorMessage(e, "İşlem başarısız oldu.", action ?? undefined), "error");
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !user) {
        return (
            <Box sx={{ maxWidth: 800, mx: "auto", pt: 4 }}>
                <Alert severity="error" sx={{ borderRadius: "8px" }}>
                    Kullanıcı bulunamadı.
                </Alert>
            </Box>
        );
    }

    const disabledInputSx = {
        "& .MuiOutlinedInput-root": {
            backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
        },
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: theme.palette.text.primary,
            cursor: "not-allowed",
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", pb: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Button
                    startIcon={<ArrowBackOutlinedIcon />}
                    color="inherit"
                    onClick={() => navigate("/users")}
                    sx={{ textTransform: "none" }}
                >
                    Geri Dön
                </Button>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Kullanıcı Detayı
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Kullanıcı hesap bilgilerini görüntüleyin ve güncelleyin.
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
                            <PersonOutlineOutlinedIcon color="primary" />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Hesap Bilgileri
                            </Typography>
                        </Box>
                    }
                    action={
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Chip
                                icon={user.role === UserResponseRoleEnum.Admin ? <AdminPanelSettingsOutlinedIcon fontSize="small" /> : <BadgeOutlinedIcon fontSize="small" />}
                                label={user.role}
                                color={user.role === UserResponseRoleEnum.Admin ? "primary" : "default"}
                                variant="outlined"
                                sx={{ fontWeight: 600, borderRadius: 1.5 }}
                            />
                            <Chip
                                label={user.active ? "Aktif" : "Pasif"}
                                color={user.active ? "success" : "error"}
                                sx={{ fontWeight: 600, borderRadius: 1.5 }}
                            />
                        </Box>
                    }
                    sx={{ px: 4, py: 3 }}
                />
                
                <Divider />
                
                <CardContent sx={{ p: 4 }}>
                    <Box component="form" onSubmit={handleSubmit(handleUpdate)} noValidate>
                        
                        <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 600, mb: 2 }}>
                            Sistem Bilgileri (Salt Okunur)
                        </Typography>
                        
                        <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
                            <TextField
                                fullWidth
                                label="E-posta Adresi"
                                value={user.email}
                                disabled
                                sx={disabledInputSx}
                            />
                            <TextField
                                fullWidth
                                label="Sistem Rolü"
                                value={user.role}
                                disabled
                                sx={disabledInputSx}
                            />
                        </Box>

                        <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 600, mb: 2 }}>
                            Kişisel Bilgiler
                        </Typography>

                        <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
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
                                        disabled={isSubmitting || update.isPending}
                                    />
                                )}
                            />

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
                                        disabled={isSubmitting || update.isPending}
                                    />
                                )}
                            />
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                            {user.active ? (
                                <Button
                                    type="button"
                                    color="error"
                                    variant="outlined"
                                    disabled={deactivate.isPending || isSubmitting}
                                    onClick={() => setConfirmDialog({ open: true, action: "deactivate" })}
                                    sx={{ px: 3 }}
                                >
                                    Hesabı Pasifleştir
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    color="success"
                                    variant="outlined"
                                    disabled={activate.isPending || isSubmitting}
                                    onClick={() => setConfirmDialog({ open: true, action: "activate" })}
                                    sx={{ px: 3 }}
                                >
                                    Hesabı Aktifleştir
                                </Button>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting || update.isPending}
                                sx={{ px: 4, minWidth: 150 }}
                            >
                                {isSubmitting || update.isPending ? <CircularProgress size={24} color="inherit" /> : "Değişiklikleri Kaydet"}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* CONFIRMATION DIALOG */}
            <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, action: null })}>
                <DialogTitle>
                    {confirmDialog.action === "activate" ? "Kullanıcıyı Aktifleştir" : "Kullanıcıyı Pasifleştir"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {confirmDialog.action === "activate" 
                            ? "Bu kullanıcı hesabını aktifleştirmek istediğinize emin misiniz? Kullanıcı sisteme tekrar giriş yapabilecektir." 
                            : "Bu kullanıcı hesabını pasifleştirmek istediğinize emin misiniz? Kullanıcı sisteme giriş yapamayacaktır."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog({ open: false, action: null })} color="inherit">
                        Vazgeç
                    </Button>
                    <Button
                        onClick={handleConfirmAction}
                        color={confirmDialog.action === "activate" ? "success" : "error"}
                        variant="contained"
                        disableElevation
                    >
                        Onayla
                    </Button>
                </DialogActions>
            </Dialog>

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
                    sx={{ width: '100%', fontWeight: 500 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
