import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
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
    Link as RouterLink,
    useNavigate,
} from "react-router-dom";

import { useState } from "react";

import {
    useAuth,
} from "../context/AuthContext";

import {
    registerSchema,
    type RegisterFormData,
} from "../schemas/register-schema";

export default function RegisterPage() {
    const navigate = useNavigate();

    const {
        register,
    } = useAuth();

    const [serverError, setServerError] =
        useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(
            registerSchema,
        ),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (
        data: RegisterFormData,
    ) => {
        setServerError(null);

        try {
            await register({
                name: data.name.trim(),
                surname: data.surname.trim(),
                email: data.email.trim(),
                password: data.password,
            });

            navigate("/home", {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Registration failed:",
                error,
            );

            setServerError(
                "Kayıt oluşturulamadı. Bilgilerinizi kontrol edin.",
            );
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    p: 4,
                    borderRadius: 3,
                }}
            >
                <Box
                    sx={{
                        mb: 4,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ fontWeight: 700 }}
                        gutterBottom
                    >
                        Hesap Oluştur
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Application Management System
                    </Typography>
                </Box>

                {serverError && (
                    <Alert
                        severity="error"
                        sx={{ mb: 3 }}
                    >
                        {serverError}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit(
                        onSubmit,
                    )}
                    noValidate
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
                                autoComplete="given-name"
                                error={Boolean(
                                    errors.name,
                                )}
                                helperText={
                                    errors.name?.message
                                }
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
                                margin="normal"
                                autoComplete="family-name"
                                error={Boolean(
                                    errors.surname,
                                )}
                                helperText={
                                    errors.surname?.message
                                }
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Email"
                                type="email"
                                margin="normal"
                                autoComplete="email"
                                error={Boolean(
                                    errors.email,
                                )}
                                helperText={
                                    errors.email?.message
                                }
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
                                autoComplete="new-password"
                                error={Boolean(
                                    errors.password,
                                )}
                                helperText={
                                    errors.password?.message
                                }
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
                                margin="normal"
                                autoComplete="new-password"
                                error={Boolean(
                                    errors.confirmPassword,
                                )}
                                helperText={
                                    errors.confirmPassword
                                        ?.message
                                }
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
                            py: 1.4,
                        }}
                    >
                        {isSubmitting ? (
                            <CircularProgress
                                size={24}
                                color="inherit"
                            />
                        ) : (
                            "Kayıt Ol"
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
                            color="text.secondary"
                        >
                            Zaten hesabınız var mı?{" "}
                            <RouterLink to="/login">
                                Giriş Yap
                            </RouterLink>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}