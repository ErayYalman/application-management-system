import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
  Skeleton,
} from "@mui/material";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { GetApplicationReportStatusEnum } from "../../../api/generated";
import { useFormTypes } from "../../form-types/hooks/use-form-types";
import { useApplicationReport } from "../hooks/use-application-report";

import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

export default function ReportsPage() {
  const theme = useTheme();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<GetApplicationReportStatusEnum | "">("");
  const [formTypeId, setFormTypeId] = useState("");

  const [appliedFilters, setAppliedFilters] = useState<{
    startDate?: string;
    endDate?: string;
    status?: GetApplicationReportStatusEnum;
    formTypeId?: string;
  }>({});

  const { data: formTypes = [] } = useFormTypes();

  const { data, isLoading, isError } = useApplicationReport(
    appliedFilters.startDate,
    appliedFilters.endDate,
    appliedFilters.status,
    appliedFilters.formTypeId,
  );

  const dateError = Boolean(startDate && endDate && startDate > endDate);

  const handleSearch = () => {
    if (dateError) return;

    setAppliedFilters({
      startDate: startDate ? new Date(`${startDate}T00:00:00`).toISOString() : undefined,
      endDate: endDate ? new Date(`${endDate}T23:59:59`).toISOString() : undefined,
      status: status || undefined,
      formTypeId: formTypeId || undefined,
    });
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setStatus("");
    setFormTypeId("");
    setAppliedFilters({});
  };

  const COLORS = {
    total: theme.palette.primary.main,
    new: theme.palette.info.main,
    inReview: theme.palette.warning.main,
    approved: theme.palette.success.main,
    rejected: theme.palette.error.main,
    cancelled: theme.palette.grey[500],
  };

  // Recharts için Form Type Data
  const pieData = data?.applicationsByFormType?.map((item) => ({
    name: item.formTypeName,
    value: item.count || 0,
  })) || [];

  // Recharts için Status Data
  const barData = data ? [
    { name: "NEW", count: data.newApplications || 0, fill: COLORS.new },
    { name: "IN_REVIEW", count: data.inReviewApplications || 0, fill: COLORS.inReview },
    { name: "APPROVED", count: data.approvedApplications || 0, fill: COLORS.approved },
    { name: "REJECTED", count: data.rejectedApplications || 0, fill: COLORS.rejected },
    { name: "CANCELLED", count: data.cancelledApplications || 0, fill: COLORS.cancelled },
  ] : [];

  const PIE_COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

  const statCardProps = {
    sx: {
      borderRadius: "8px",
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
      backgroundColor: "background.paper",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: theme.palette.mode === "light" ? "0 12px 24px rgba(0,0,0,0.08)" : "none",
        borderColor: "transparent",
      },
    },
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", pb: 6 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <BarChartOutlinedIcon color="primary" sx={{ fontSize: 36 }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Raporlar & Analizler
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sistemdeki tüm başvuruların güncel özetleri ve performans grafikleri.
          </Typography>
        </Box>
      </Box>

      {/* FILTER PANEL */}
      <Card sx={{ mb: 4, borderRadius: "8px", border: `1px solid ${theme.palette.divider}`, boxShadow: "none" }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <FilterAltOutlinedIcon color="action" />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Filtreleme Seçenekleri
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "flex-start" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1, minWidth: 150 }}>
              <TextField
                label="Başlangıç"
                type="date"
                size="small"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                error={dateError}
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1, minWidth: 150 }}>
              <TextField
                label="Bitiş"
                type="date"
                size="small"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                error={dateError}
                helperText={dateError ? "Başlangıç, bitişten büyük olamaz" : ""}
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
              />
            </Box>

            <FormControl size="small" sx={{ flex: 1, minWidth: 150 }}>
              <InputLabel>Durum</InputLabel>
              <Select
                value={status}
                label="Durum"
                onChange={(event) => setStatus(event.target.value as GetApplicationReportStatusEnum | "")}
              >
                <MenuItem value="">Tümü</MenuItem>
                <MenuItem value={GetApplicationReportStatusEnum.New}>NEW</MenuItem>
                <MenuItem value={GetApplicationReportStatusEnum.InReview}>IN_REVIEW</MenuItem>
                <MenuItem value={GetApplicationReportStatusEnum.Approved}>APPROVED</MenuItem>
                <MenuItem value={GetApplicationReportStatusEnum.Rejected}>REJECTED</MenuItem>
                <MenuItem value={GetApplicationReportStatusEnum.Cancelled}>CANCELLED</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ flex: 1, minWidth: 150 }}>
              <InputLabel>Başvuru Türü</InputLabel>
              <Select
                value={formTypeId}
                label="Başvuru Türü"
                onChange={(event) => setFormTypeId(event.target.value)}
              >
                <MenuItem value="">Tümü</MenuItem>
                {formTypes.map((formType) => (
                  <MenuItem key={formType.id} value={formType.id}>
                    {formType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
              <Button variant="outlined" color="inherit" onClick={handleClear} sx={{ minWidth: 100 }}>
                Temizle
              </Button>
              <Button variant="contained" onClick={handleSearch} disabled={dateError} sx={{ minWidth: 120 }}>
                Raporla
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {isError && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: "8px" }}>
          Rapor verileri yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
        </Alert>
      )}

      {/* STAT CARDS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card {...statCardProps}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography color="text.secondary" variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    TOPLAM BAŞVURU
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: COLORS.total }}>
                    {isLoading ? <Skeleton width={60} /> : data?.totalApplications || 0}
                  </Typography>
                </Box>
                <AssessmentOutlinedIcon sx={{ color: COLORS.total, fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card {...statCardProps}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography color="text.secondary" variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    YENİ (NEW)
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: COLORS.new }}>
                    {isLoading ? <Skeleton width={60} /> : data?.newApplications || 0}
                  </Typography>
                </Box>
                <FiberNewOutlinedIcon sx={{ color: COLORS.new, fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card {...statCardProps}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography color="text.secondary" variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    İNCELEMEDE (IN_REVIEW)
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: COLORS.inReview }}>
                    {isLoading ? <Skeleton width={60} /> : data?.inReviewApplications || 0}
                  </Typography>
                </Box>
                <HourglassEmptyOutlinedIcon sx={{ color: COLORS.inReview, fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card {...statCardProps}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography color="text.secondary" variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    ONAYLANDI (APPROVED)
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: COLORS.approved }}>
                    {isLoading ? <Skeleton width={60} /> : data?.approvedApplications || 0}
                  </Typography>
                </Box>
                <CheckCircleOutlineOutlinedIcon sx={{ color: COLORS.approved, fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card {...statCardProps}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography color="text.secondary" variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    REDDEDİLDİ (REJECTED)
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: COLORS.rejected }}>
                    {isLoading ? <Skeleton width={60} /> : data?.rejectedApplications || 0}
                  </Typography>
                </Box>
                <CancelOutlinedIcon sx={{ color: COLORS.rejected, fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card {...statCardProps}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography color="text.secondary" variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    İPTAL EDİLDİ (CANCELLED)
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: COLORS.cancelled }}>
                    {isLoading ? <Skeleton width={60} /> : data?.cancelledApplications || 0}
                  </Typography>
                </Box>
                <BlockOutlinedIcon sx={{ color: COLORS.cancelled, fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* CHARTS */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: "8px", border: `1px solid ${theme.palette.divider}`, boxShadow: "none", height: "100%" }}>
            <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Başvuru Türlerine Göre Dağılım
              </Typography>
              
              <Box sx={{ flex: 1, minHeight: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {isLoading ? (
                  <Skeleton variant="circular" width={240} height={240} />
                ) : pieData.length === 0 ? (
                  <Box sx={{ textAlign: "center", opacity: 0.6 }}>
                    <BlockOutlinedIcon sx={{ fontSize: 64, mb: 2 }} />
                    <Typography color="text.secondary">Bu filtrelere uygun veri bulunamadı.</Typography>
                  </Box>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        animationDuration={800}
                      >
                        {pieData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ 
                          borderRadius: 8, 
                          border: `1px solid ${theme.palette.divider}`, 
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary
                        }}
                        itemStyle={{ color: theme.palette.text.primary }}
                      />
                      <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: theme.palette.text.primary }} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: "8px", border: `1px solid ${theme.palette.divider}`, boxShadow: "none", height: "100%" }}>
            <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Statü Dağılımı (Status)
              </Typography>
              
              <Box sx={{ flex: 1, minHeight: 300, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: "8px" }} />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                      <XAxis dataKey="name" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} axisLine={false} tickLine={false} />
                      <RechartsTooltip 
                        contentStyle={{ 
                          borderRadius: 8, 
                          border: `1px solid ${theme.palette.divider}`, 
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary
                        }}
                        itemStyle={{ color: theme.palette.text.primary }}
                        cursor={{ fill: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                      />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]} animationDuration={800}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
