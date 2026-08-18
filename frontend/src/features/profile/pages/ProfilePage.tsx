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
    profileSchema,
    type ProfileFormData,
} from "../schemas/profile-schema";

import {
    useProfile,
} from "../hooks/use-profile";

import {
    useUpdateProfile,
} from "../hooks/use-update-profile";

import {
    useAuth,
} from "../../auth/context/AuthContext";

import {
    useNavigate,
} from "react-router-dom";

export default function ProfilePage() {

    const navigate = useNavigate();

    const {
        logout,
    } = useAuth();

    const { updateUser } = useAuth();

    const {
        data: profile,
        isLoading,
        isError,
    } = useProfile();

    const updateMutation =
        useUpdateProfile();

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(
            profileSchema,
        ),
        defaultValues: {
            name: "",
            surname: "",
        },
    });

    useEffect(() => {
        if (!profile) {
            return;
        }

        reset({
            name: profile.name ?? "",
            surname: profile.surname ?? "",
        });
    }, [profile, reset]);

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

    if (isError || !profile) {
        return (
            <Alert severity="error">
                Profil bilgileri yüklenemedi.
            </Alert>
        );
    }

    const handleUpdate = async (
        data: ProfileFormData,
    ) => {
        try {
            const updatedUser =
                await updateMutation.mutateAsync({
                    name: data.name.trim(),
                    surname: data.surname.trim(),
                });

            updateUser(updatedUser);
        } catch (error) {
            console.error("Failed to update profile:", error);
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
                    mb: 1,
                }}
            >
                Profilim
            </Typography>

            {updateMutation.isError && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                >
                    Profil güncellenemedi.
                </Alert>
            )}

            {updateMutation.isSuccess && (
                <Alert
                    severity="success"
                    sx={{ mb: 2 }}
                >
                    Profil başarıyla güncellendi.
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
                        Email: {profile.email}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            mt: 2,
                        }}
                    >
                        <Chip
                            label={profile.role}
                            color={
                                profile.role ===
                                    UserResponseRoleEnum.Admin
                                    ? "primary"
                                    : "default"
                            }
                        />

                        <Chip
                            label={
                                profile.active
                                    ? "Aktif"
                                    : "Pasif"
                            }
                            color={
                                profile.active
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
                        Bilgilerimi Güncelle
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

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 2 }}
                            disabled={
                                isSubmitting ||
                                updateMutation.isPending
                            }
                        >
                            Kaydet
                        </Button>
                    </Box>
                </CardContent>
                <Divider sx={{ my: 3 }} />
                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Oturum
                </Typography>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={async () => {
                        await logout();

                        navigate("/ApplicationManagementSystem", {
                            replace: true,
                        });
                    }}
                >
                    Çıkış Yap
                </Button>
            </Card>
        </Box>
    );
}