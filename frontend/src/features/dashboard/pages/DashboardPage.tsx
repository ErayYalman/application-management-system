import {
    Alert,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
    useTheme,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar
} from "@mui/material";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
} from "recharts";
import {
    AssignmentOutlined,
    HourglassEmptyOutlined,
    CheckCircleOutlined,
    CancelOutlined,
    TodayOutlined,
    BlockOutlined
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { useDashboard } from "../hooks/use-dashboard";
import { ApplicationResponseStatusEnum } from "../../../api/generated";
import StatusChip from "../../../components/StatusChip";
import type { Theme } from "@mui/material/styles";

// ── Color Palette ──
const COLORS = {
    pending: "#F79009",   // Warning Orange
    approved: "#12B76A",  // Success Green
    rejected: "#F04438",  // Error Red
    cancelled: "#64748B", // Slate/Gray
    total: "#155EEF",     // Brand Blue
    today: "#875BF7",     // Deep Purple
};

// ── Helper Components ──
function KpiCard({ title, value, icon, color, theme }: { title: string, value: number, icon: React.ReactNode, color: string, theme: Theme }) {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: "16px",
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: "background.paper",
                boxShadow: theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}
        >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 3, p: 3, "&:last-child": { pb: 3 } }}>
                <Avatar
                    sx={{
                        width: 56,
                        height: 56,
                        bgcolor: `${color}15`, // 15% opacity hex
                        color: color,
                        borderRadius: "12px",
                    }}
                >
                    {icon}
                </Avatar>
                <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600, mb: 0.5, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
                        {value.toLocaleString("tr-TR")}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default function DashboardPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useDashboard();

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <CircularProgress size={40} thickness={4} />
            </Box>
        );
    }

    if (isError || !data) {
        return (
            <Alert severity="error" sx={{ borderRadius: "8px", mt: 2 }}>
                Dashboard verileri yüklenemedi.
            </Alert>
        );
    }

    // Chart Data Preparation
    const cancelledCount = data.cancelledApplications || 0;

    const pieData = [
        { name: "Bekleyen", value: data.pendingApplications || 0, color: COLORS.pending },
        { name: "Onaylanan", value: data.approvedApplications || 0, color: COLORS.approved },
        { name: "Reddedilen", value: data.rejectedApplications || 0, color: COLORS.rejected },
        { name: "İptal", value: cancelledCount, color: COLORS.cancelled },
    ].filter(item => item.value > 0); // Hide empty slices

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        try {
            return new Intl.DateTimeFormat("tr-TR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }).format(new Date(dateStr));
        } catch {
            return dateStr;
        }
    };

    const getStatusChip = (status?: ApplicationResponseStatusEnum) => {
        return <StatusChip status={status as any} />;
    };

    return (
        <Box sx={{ maxWidth: "1400px", margin: "0 auto", pb: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 1, letterSpacing: "-0.5px" }}>
                    Yönetim Paneli
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Sistem üzerindeki başvuru istatistikleri ve anlık durumu.
                </Typography>
            </Box>

            {/* KPI Cards Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <KpiCard title="Toplam" value={data.totalApplications || 0} icon={<AssignmentOutlined />} color={COLORS.total} theme={theme} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <KpiCard title="Bekleyen" value={data.pendingApplications || 0} icon={<HourglassEmptyOutlined />} color={COLORS.pending} theme={theme} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <KpiCard title="Onaylanan" value={data.approvedApplications || 0} icon={<CheckCircleOutlined />} color={COLORS.approved} theme={theme} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <KpiCard title="Reddedilen" value={data.rejectedApplications || 0} icon={<CancelOutlined />} color={COLORS.rejected} theme={theme} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <KpiCard title="İptal Edilen" value={cancelledCount} icon={<BlockOutlined />} color={COLORS.cancelled} theme={theme} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <KpiCard title="Bugün" value={data.todayApplications || 0} icon={<TodayOutlined />} color={COLORS.today} theme={theme} />
                </Grid>
            </Grid>

            {/* Charts & Tables Area */}
            <Grid container spacing={3}>
                
                {/* Status Distribution Chart */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: "16px",
                            border: `1px solid ${theme.palette.divider}`,
                            bgcolor: "background.paper",
                            boxShadow: theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                Başvuru Durum Dağılımı
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                                Tüm başvuruların onay, ret ve bekleme oranları.
                            </Typography>
                            
                            <Box sx={{ flexGrow: 1, minHeight: 300 }}>
                                {pieData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={70}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="value"
                                                stroke="none"
                                                isAnimationActive={true}
                                                animationDuration={800}
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                                <Label 
                                                    value={data.totalApplications?.toLocaleString("tr-TR") || "0"} 
                                                    position="center" 
                                                    fill={theme.palette.text.primary}
                                                    style={{ fontSize: "26px", fontWeight: 800 }}
                                                />
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ 
                                                    borderRadius: '8px', 
                                                    border: 'none', 
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                    backgroundColor: theme.palette.background.paper,
                                                    color: theme.palette.text.primary
                                                }} 
                                                itemStyle={{ fontWeight: 600 }}
                                            />
                                            <Legend 
                                                verticalAlign="bottom" 
                                                height={36} 
                                                iconType="circle"
                                                formatter={(value) => <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>{value}</span>}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "text.secondary" }}>
                                        <Typography sx={{ fontWeight: 500 }}>Yeterli veri bulunmuyor</Typography>
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Latest Applications Table */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: "16px",
                            border: `1px solid ${theme.palette.divider}`,
                            bgcolor: "background.paper",
                            boxShadow: theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
                            height: "100%",
                        }}
                    >
                        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                    Son Başvurular
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Sisteme düşen en güncel 5 başvuru
                                </Typography>
                            </Box>
                            
                            <TableContainer sx={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
                                <Table sx={{ minWidth: 600 }}>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: theme.palette.mode === "light" ? "#F8FAFC" : "rgba(255,255,255,0.02)" }}>
                                            <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Başvuran</TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Form Türü</TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Tarih</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 600, color: "text.secondary" }}>Durum</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.latestApplications && data.latestApplications.length > 0 ? (
                                            data.latestApplications.slice(0, 5).map((app) => (
                                                <TableRow 
                                                    key={app.id} 
                                                    hover 
                                                    onClick={() => navigate(`/applications/${app.id}`)}
                                                    sx={{ 
                                                        cursor: "pointer", 
                                                        "&:last-child td, &:last-child th": { border: 0 } 
                                                    }}
                                                >
                                                    <TableCell sx={{ fontWeight: 500 }}>
                                                        {app.applicantFullName || "Bilinmiyor"}
                                                    </TableCell>
                                                    <TableCell>{app.formTypeName || "Bilinmiyor"}</TableCell>
                                                    <TableCell sx={{ color: "text.secondary" }}>{formatDate(app.createdAt)}</TableCell>
                                                    <TableCell align="right">{getStatusChip(app.status)}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center" sx={{ py: 4, color: "text.secondary" }}>
                                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>Kayıtlı başvuru bulunmamaktadır.</Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Box>
    );
}