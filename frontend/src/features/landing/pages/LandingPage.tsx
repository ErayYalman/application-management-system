import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    useTheme,
    CircularProgress,
    IconButton
} from "@mui/material";
import {
    BusinessCenterOutlined,
    AssignmentOutlined,
    AttachFileOutlined,
    CheckCircleOutlined,
    AssessmentOutlined,
    LoginOutlined,
    PersonAddOutlined,
    LightModeOutlined,
    DarkModeOutlined
} from "@mui/icons-material";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { useAppTheme } from "../../../app/providers/ThemeContext";

export default function LandingPage() {
    const theme = useTheme();
    const { user, isLoading } = useAuth();
    const { mode, toggleTheme } = useAppTheme();

    if (isLoading) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "background.default" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (user) {
        return <Navigate to="/home" replace />;
    }

    const features = [
        {
            icon: <AssignmentOutlined sx={{ fontSize: 32, color: "primary.main" }} />,
            title: "Başvuru Yönetimi",
            description: "Yeni başvuruları standart form yapılarıyla hızlıca oluşturun ve tüm süreci tek ekrandan anlık olarak takip edin.",
        },
        {
            icon: <AttachFileOutlined sx={{ fontSize: 32, color: "primary.main" }} />,
            title: "Dosya ve Belge Takibi",
            description: "Başvurularınıza gerekli belgeleri güvenle yükleyin, indirin ve sistem üzerinde kurumsal arşivi koruyun.",
        },
        {
            icon: <CheckCircleOutlined sx={{ fontSize: 32, color: "primary.main" }} />,
            title: "Onay İş Akışları",
            description: "Yöneticiler için tasarlanmış inceleme, onaylama veya reddetme mekanizması ile iş süreçlerini hızlandırın.",
        },
        {
            icon: <AssessmentOutlined sx={{ fontSize: 32, color: "primary.main" }} />,
            title: "Gelişmiş Raporlama",
            description: "Sistemdeki tüm başvuru durumlarını dashboard ve detaylı rapor ekranlarıyla analiz edin, performansı ölçün.",
        },
    ];

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
            
            {/* Header / Navigation */}
            <Box
                component="header"
                sx={{
                    py: 2.5,
                    px: { xs: 3, md: 6 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "background.paper",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "8px",
                            bgcolor: theme.palette.mode === "light" ? "#001529" : "primary.main",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <BusinessCenterOutlined sx={{ color: "#FFFFFF", fontSize: 22 }} />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        Application Management System
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <IconButton 
                        onClick={toggleTheme} 
                        size="small"
                        sx={{ 
                            color: "text.secondary",
                            "& :hover": { color: "text.primary" }
                        }}
                    >
                        {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
                    </IconButton>
                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="outlined"
                        size="small"
                        sx={{
                            borderRadius: "6px",
                            textTransform: "none",
                            fontWeight: 600,
                        }}
                    >
                        Giriş Yap
                    </Button>
                </Box>
            </Box>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                
                {/* Hero Section */}
                <Box
                    sx={{
                        pt: { xs: 8, md: 12 },
                        pb: { xs: 8, md: 10 },
                        px: 3,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: "-1px",
                            color: "text.primary",
                            mb: 3,
                            maxWidth: "800px",
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                            lineHeight: 1.2,
                        }}
                    >
                        Kurumsal başvurularınızı tek bir platformdan yönetin
                    </Typography>
                    
                    <Typography
                        variant="body1"
                        sx={{
                            color: "text.secondary",
                            maxWidth: "600px",
                            mb: 5,
                            fontSize: "1.1rem",
                            lineHeight: 1.6,
                        }}
                    >
                        Personel başvurularının dijitalleşmesini, dosya yönetimini ve departmanlar arası onay akışlarını profesyonel ve güvenli bir altyapıyla standartlaştırın.
                    </Typography>
                    
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                        <Button
                            component={RouterLink}
                            to="/login"
                            variant="contained"
                            size="large"
                            startIcon={<LoginOutlined />}
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: "8px",
                                fontSize: "1rem",
                                fontWeight: 600,
                                textTransform: "none",
                                boxShadow: "none",
                            }}
                        >
                            Sisteme Giriş Yap
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/register"
                            variant="outlined"
                            size="large"
                            startIcon={<PersonAddOutlined />}
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: "8px",
                                fontSize: "1rem",
                                fontWeight: 600,
                                textTransform: "none",
                            }}
                        >
                            Kayıt Ol
                        </Button>
                    </Box>
                </Box>

                {/* Features Section */}
                <Box sx={{ bgcolor: theme.palette.mode === "light" ? "#F8FAFC" : "background.paper", py: { xs: 8, md: 10 }, borderTop: `1px solid ${theme.palette.divider}` }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: "center", mb: 6 }}>
                            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}>
                                Temel Yetenekler
                            </Typography>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                Başvuru süreçlerinizi kolaylaştıran kurumsal modüller.
                            </Typography>
                        </Box>
                        
                        <Grid container spacing={4}>
                            {features.map((feature, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 4,
                                            height: "100%",
                                            borderRadius: "12px",
                                            border: `1px solid ${theme.palette.divider}`,
                                            bgcolor: theme.palette.mode === "light" ? "#FFFFFF" : "background.default",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: "10px",
                                                bgcolor: theme.palette.mode === "light" ? "primary.50" : "rgba(21, 94, 239, 0.1)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                mb: 3,
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary", mb: 1.5, fontSize: "1.1rem" }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                                            {feature.description}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    py: 4,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    bgcolor: "background.paper",
                    textAlign: "center",
                }}
            >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    © {new Date().getFullYear()} Cybersoft Bilgi Teknolojileri. Tüm hakları saklıdır.
                </Typography>
            </Box>
        </Box>
    );
}
