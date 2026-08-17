import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Grid,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {
    AccountBalanceOutlined,
    BusinessCenterOutlined,
    CodeOutlined,
    EmailOutlined,
    LockOutlined,
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

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

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

            navigate("/home", {
                replace: true,
            });
        } catch (error) {
            console.error(error);
            setServerError("Email veya şifre hatalı.");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                backgroundColor: "#F8FAFC",
            }}
        >
            <Grid container sx={{ flex: 1, minHeight: "100vh" }}>
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: { md: 6, lg: 8 },
                        background:
                            "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)",
                        position: "relative",
                        overflow: "hidden",
                        color: "#FFFFFF",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "-15%",
                            left: "-15%",
                            width: "500px",
                            height: "500px",
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(0,0,0,0) 70%)",
                            filter: "blur(40px)",
                            pointerEvents: "none",
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: "-10%",
                            right: "-10%",
                            width: "600px",
                            height: "600px",
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(0,0,0,0) 70%)",
                            filter: "blur(50px)",
                            pointerEvents: "none",
                        }}
                    />

                    <Box sx={{ position: "relative", zIndex: 1 }}>
                        <Chip
                            icon={<BusinessCenterOutlined sx={{ color: "#818CF8 !important" }} />}
                            label="CYBERSOFT BİLGİ TEKNOLOJİLERİ"
                            sx={{
                                color: "#E2E8F0",
                                backgroundColor: "rgba(255, 255, 255, 0.08)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                fontWeight: 600,
                                px: 1,
                                py: 2.2,
                                borderRadius: "12px",
                                fontSize: "0.875rem",
                                letterSpacing: "0.5px",
                            }}
                        />
                    </Box>

                    <Box sx={{ position: "relative", zIndex: 1, my: "auto" }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: "-1.5px",
                                lineHeight: 1.15,
                                fontSize: { md: "2.75rem", lg: "3.5rem" },
                                mb: 3,
                                background:
                                    "linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Application Management System
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: "#94A3B8",
                                fontSize: "1.05rem",
                                lineHeight: 1.7,
                                maxWidth: "520px",
                                mb: 5,
                            }}
                        >
                            Cybersoft Finans, Kamu ve Kurumsal Yazılım Çözümleri Ekosistemi için geliştirilen merkezi uygulama ve yetkilendirme portalı.
                        </Typography>

                        <Stack spacing={2.5} sx={{ maxWidth: "480px" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 2,
                                    p: 2,
                                    borderRadius: "14px",
                                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 1.2,
                                        borderRadius: "10px",
                                        backgroundColor: "rgba(99, 102, 241, 0.2)",
                                        color: "#818CF8",
                                        display: "flex",
                                        mt: 0.2,
                                    }}
                                >
                                    <AccountBalanceOutlined fontSize="small" />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ color: "#FFFFFF", fontWeight: 600, mb: 0.3 }}>
                                        Finans & e-Dönüşüm Teknolojileri
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#94A3B8", fontSize: "0.85rem", lineHeight: 1.5 }}>
                                        Aurora & Orion Finans platformları ve yüksek performanslı bankacılık çözümleri.
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 2,
                                    p: 2,
                                    borderRadius: "14px",
                                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 1.2,
                                        borderRadius: "10px",
                                        backgroundColor: "rgba(168, 85, 247, 0.2)",
                                        color: "#C084FC",
                                        display: "flex",
                                        mt: 0.2,
                                    }}
                                >
                                    <CodeOutlined fontSize="small" />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ color: "#FFFFFF", fontWeight: 600, mb: 0.3 }}>
                                        Kurumsal Yazılım Mühendisliği
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#94A3B8", fontSize: "0.85rem", lineHeight: 1.5 }}>
                                        Bulut tabanlı servis mimarileri, mikroservisler ve entegrasyon altyapısı.
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>

                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: { xs: 2.5, sm: 5, md: 6 },
                        backgroundColor: "#F8FAFC",
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            width: "100%",
                            maxWidth: 460,
                            p: { xs: 3.5, sm: 5 },
                            borderRadius: "24px",
                            backgroundColor: "#FFFFFF",
                            boxShadow:
                                "0 20px 50px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.03)",
                            border: "1px solid #E2E8F0",
                            transition: "box-shadow 0.3s ease",
                            "&:hover": {
                                boxShadow:
                                    "0 25px 60px rgba(15, 23, 42, 0.09), 0 2px 6px rgba(15, 23, 42, 0.04)",
                            },
                        }}
                    >
                        <Box sx={{ mb: 4, textAlign: "left" }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "14px",
                                    backgroundColor: "#EEF2FF",
                                    color: "#4F46E5",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 2.5,
                                }}
                            >
                                <LockOutlined />
                            </Box>

                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    fontWeight: 700,
                                    color: "#0F172A",
                                    letterSpacing: "-0.5px",
                                    fontSize: { xs: "1.6rem", sm: "1.85rem" },
                                }}
                                gutterBottom
                            >
                                Hoş Geldiniz
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{ color: "#64748B", fontSize: "0.95rem" }}
                            >
                                Hesabınıza erişmek için bilgilerinizi giriniz.
                            </Typography>
                        </Box>

                        {serverError && (
                            <Alert
                                severity="error"
                                sx={{
                                    mb: 3,
                                    borderRadius: "12px",
                                    alignItems: "center",
                                }}
                            >
                                {serverError}
                            </Alert>
                        )}

                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                        >
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Email Adresi"
                                        type="email"
                                        margin="normal"
                                        autoComplete="email"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailOutlined sx={{ color: "#94A3B8" }} />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        sx={{
                                            mb: 1.5,
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "14px",
                                                backgroundColor: "#F8FAFC",
                                                transition: "all 0.2s ease-in-out",
                                                "&:hover": {
                                                    backgroundColor: "#F1F5F9",
                                                },
                                                "&.Mui-focused": {
                                                    backgroundColor: "#FFFFFF",
                                                },
                                            },
                                        }}
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
                                        margin="normal"
                                        autoComplete="current-password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockOutlined sx={{ color: "#94A3B8" }} />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        sx={{
                                            mb: 1.5,
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "14px",
                                                backgroundColor: "#F8FAFC",
                                                transition: "all 0.2s ease-in-out",
                                                "&:hover": {
                                                    backgroundColor: "#F1F5F9",
                                                },
                                                "&.Mui-focused": {
                                                    backgroundColor: "#FFFFFF",
                                                },
                                            },
                                        }}
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
                                    mt: 3,
                                    mb: 2,
                                    py: 1.6,
                                    borderRadius: "14px",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    background:
                                        "linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)",
                                    boxShadow:
                                        "0 8px 20px -4px rgba(79, 70, 229, 0.4)",
                                    transition: "all 0.2s ease-in-out",
                                    "&:hover": {
                                        background:
                                            "linear-gradient(135deg, #4338CA 0%, #312E81 100%)",
                                        boxShadow:
                                            "0 12px 24px -4px rgba(79, 70, 229, 0.5)",
                                        transform: "translateY(-1px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                            >
                                {isSubmitting ? (
                                    <CircularProgress
                                        size={24}
                                        color="inherit"
                                    />
                                ) : (
                                    "Giriş Yap"
                                )}
                            </Button>

                            <Box
                                sx={{
                                    mt: 3,
                                    textAlign: "center",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#64748B" }}
                                >
                                    Hesabınız yok mu?{" "}
                                    <Typography
                                        component={RouterLink}
                                        to="/register"
                                        sx={{
                                            color: "#4F46E5",
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
                </Grid>
            </Grid>
        </Box>
    );
}