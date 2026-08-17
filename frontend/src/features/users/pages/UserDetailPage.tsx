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

export default function UserDetailPage() {
    const { userId } =
        useParams<{
            userId: string;
        }>();

    const navigate = useNavigate();

    const {
        data: user,
        isLoading,
        isError,
    } = useUser(userId ?? "");

    const {
        update,
        activate,
        deactivate,
    } = useUserActions(
        userId ?? "",
    );

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<UpdateUserFormData>({
        resolver: zodResolver(
            updateUserSchema,
        ),
        defaultValues: {
            name: "",
            surname: "",
        },
    });

    useEffect(() => {
        if (!user) {
            return;
        }

        reset({
            name: user.name ?? "",
            surname: user.surname ?? "",
        });
    }, [user, reset]);

    if (isLoading) {
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

    if (isError || !user) {
        return (
            <Alert severity="error">
                Kullanıcı bulunamadı.
            </Alert>
        );
    }

    const handleUpdate = async (
        data: UpdateUserFormData,
    ) => {
        try {
            await update.mutateAsync({
                name: data.name.trim(),
                surname: data.surname.trim(),
            });
        } catch {
            // hata aşağıdaki Alert'te
        }
    };

    const handleActivate = async () => {
        try {
            await activate.mutateAsync();
        } catch {
            // hata aşağıdaki Alert'te
        }
    };

    const handleDeactivate = async () => {
        if (
            !window.confirm(
                "Bu kullanıcıyı pasifleştirmek istediğinize emin misiniz?",
            )
        ) {
            return;
        }

        try {
            await deactivate.mutateAsync();
        } catch {
            // hata aşağıdaki Alert'te
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 800,
                mx: "auto",
            }}
        >
            <Button
                onClick={() =>
                    navigate("/users")
                }
                sx={{ mb: 2 }}
            >
                Kullanıcılara Dön
            </Button>

            <Typography
                variant="h4"
                sx={{ fontWeight: 700 }}
                gutterBottom
            >
                Kullanıcı Detayı
            </Typography>

            {update.isError && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                >
                    Kullanıcı güncellenemedi.
                </Alert>
            )}

            {activate.isError && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                >
                    Kullanıcı aktifleştirilemedi.
                </Alert>
            )}

            {deactivate.isError && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                >
                    Kullanıcı pasifleştirilemedi.
                </Alert>
            )}

            <Card>
                <CardContent>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Hesap Bilgileri
                    </Typography>

                    <Typography>
                        Email: {user.email}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            mt: 2,
                        }}
                    >
                        <Chip
                            label={user.role}
                            color={
                                user.role ===
                                    UserResponseRoleEnum.Admin
                                    ? "primary"
                                    : "default"
                            }
                        />

                        <Chip
                            label={
                                user.active
                                    ? "Aktif"
                                    : "Pasif"
                            }
                            color={
                                user.active
                                    ? "success"
                                    : "default"
                            }
                        />
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Bilgileri Güncelle
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(
                            handleUpdate,
                        )}
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
                                    error={Boolean(
                                        errors.surname,
                                    )}
                                    helperText={
                                        errors.surname?.message
                                    }
                                />
                            )}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                mt: 2,
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={
                                    isSubmitting ||
                                    update.isPending
                                }
                            >
                                Kaydet
                            </Button>

                            {user.active ? (
                                <Button
                                    type="button"
                                    color="error"
                                    variant="outlined"
                                    disabled={
                                        deactivate.isPending
                                    }
                                    onClick={
                                        handleDeactivate
                                    }
                                >
                                    Pasifleştir
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    color="success"
                                    variant="outlined"
                                    disabled={
                                        activate.isPending
                                    }
                                    onClick={
                                        handleActivate
                                    }
                                >
                                    Aktifleştir
                                </Button>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}