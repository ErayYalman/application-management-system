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
    EmailOutlined,
    LockOutlined,
    BusinessCenterOutlined,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import {
    loginSchema,
    type LoginFormData,
} from "../schemas/login-schema";
import type { Theme } from "@mui/material/styles";

// ── Shared input style helper ──
const inputSx = (theme: Theme) => ({
    mb: 2,
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

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const theme = useTheme();

    const [serverError, setServerError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setServerError(null);

        try {
            await login(data);
            navigate("/home", { replace: true });
        } catch (error) {
            console.error(error);
            setServerError("Email veya şifre hatalı.");
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
                    Kurumsal Yönetim Portalı
                </Typography>
            </Box>

            <Container maxWidth="xs">
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
                            Giriş Yap
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Devam etmek için bilgilerinizi giriniz.
                        </Typography>
                    </Box>

                    {serverError && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
                            {serverError}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Email Adresi"
                                    type="email"
                                    autoComplete="email"
                                    error={!!errors.email}
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
                                    autoComplete="current-password"
                                    error={!!errors.password}
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
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
                            {isSubmitting ? (
                                <CircularProgress size={22} color="inherit" />
                            ) : (
                                "Giriş Yap"
                            )}
                        </Button>

                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                Hesabınız yok mu?{" "}
                                <Typography
                                    component={RouterLink}
                                    to="/register"
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
                                    Kayıt Ol
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