import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import {
    PersonOutlined,
    EmailOutlined,
    LockOutlined,
    BusinessCenterOutlined,
    PersonAddOutlined,
} from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import {
    registerSchema,
    type RegisterFormData,
} from "../schemas/register-schema";
import type { Theme } from "@mui/material/styles";

// ── Shared input style helper ──
const inputSx = (theme: Theme) => ({
    mb: 1.5,
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: theme.palette.mode === "light" ? "#F8FAFC" : "rgba(255,255,255,0.02)",
        transition: "background-color 0.2s ease",
        "&:hover": {
            backgroundColor: theme.palette.mode === "light" ? "#F1F5F9" : "rgba(255,255,255,0.04)",
        },
        "&.Mui-focused": {
            backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "rgba(255,255,255,0.06)",
        },
    },
});

export default function RegisterPage() {
    const navigate = useNavigate();
    const theme = useTheme();

    const { register } = useAuth();

    const [serverError, setServerError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        setServerError(null);

        try {
            await register({
                name: data.name.trim(),
                surname: data.surname.trim(),
                email: data.email.trim(),
                password: data.password,
            });
            navigate("/home", { replace: true });
        } catch (error) {
            console.error("Registration failed:", error);
            setServerError("Kayıt oluşturulamadı. Bilgilerinizi kontrol edin.");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                py: 4,
            }}
        >
            {/* Logo / Brand Header area */}
            <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "12px",
                        bgcolor: theme.palette.mode === "light" ? "#001529" : "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                >
                    <BusinessCenterOutlined sx={{ color: "#FFFFFF", fontSize: 32 }} />
                </Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        letterSpacing: "-0.5px",
                    }}
                >
                    Application Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Yeni Hesap Oluştur
                </Typography>
            </Box>

            <Container maxWidth="sm">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 4 },
                        borderRadius: "16px",
                        bgcolor: "background.paper",
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: theme.palette.mode === "light" 
                            ? "0 10px 30px rgba(0,0,0,0.04)" 
                            : "0 10px 30px rgba(0,0,0,0.2)",
                    }}
                >
                    <Box sx={{ mb: 3, textAlign: "center" }}>
                        <Typography
                            variant="h6"
                            component="h1"
                            sx={{
                                fontWeight: 600,
                                color: "text.primary",
                                mb: 0.5,
                            }}
                        >
                            Kayıt Ol
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sisteme erişmek için bilgilerinizi doldurunuz.
                        </Typography>
                    </Box>

                    {serverError && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
                            {serverError}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Box sx={{ display: "flex", gap: 1.5 }}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Ad"
                                        autoComplete="given-name"
                                        error={Boolean(errors.name)}
                                        helperText={errors.name?.message}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonOutlined sx={{ color: "text.disabled", fontSize: "1.2rem" }} />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        sx={inputSx(theme)}
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
                                        autoComplete="family-name"
                                        error={Boolean(errors.surname)}
                                        helperText={errors.surname?.message}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonOutlined sx={{ color: "text.disabled", fontSize: "1.2rem" }} />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        sx={inputSx(theme)}
                                    />
                                )}
                            />
                        </Box>

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    autoComplete="email"
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailOutlined sx={{ color: "text.disabled", fontSize: "1.2rem" }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={inputSx(theme)}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Şifre"
                                    type="password"
                                    autoComplete="new-password"
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlined sx={{ color: "text.disabled", fontSize: "1.2rem" }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={inputSx(theme)}
                                />
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Şifre Tekrarı"
                                    type="password"
                                    autoComplete="new-password"
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword?.message}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlined sx={{ color: "text.disabled", fontSize: "1.2rem" }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={inputSx(theme)}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <PersonAddOutlined />}
                            sx={{
                                mt: 2,
                                mb: 2,
                                py: 1.2,
                                borderRadius: "8px",
                                fontSize: "0.9375rem",
                                fontWeight: 600,
                                textTransform: "none",
                                boxShadow: "none",
                                "&:hover": {
                                    boxShadow: "none",
                                }
                            }}
                        >
                            Kayıt Ol
                        </Button>

                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                Zaten hesabınız var mı?{" "}
                                <Typography
                                    component={RouterLink}
                                    to="/login"
                                    variant="body2"
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                    }}
                                >
                                    Giriş Yap
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>

            <Typography
                variant="caption"
                sx={{
                    color: "text.disabled",
                    mt: 6,
                }}
            >
                © {new Date().getFullYear()} Cybersoft Bilgi Teknolojileri
            </Typography>
        </Box>
    );
}