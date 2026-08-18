import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import {
  useNavigate,
} from "react-router-dom";

import {
  UserResponseRoleEnum,
} from "../../../api/generated";

import {
  useAuth,
} from "../../auth/context/AuthContext";

import {
  useMyApplications,
} from "../../applications/hooks/use-my-applications";

import {
  useAllApplications,
} from "../../applications/hooks/use-all-applications";

import StatusChip from "../../../components/StatusChip";

// ── Quick Action item definition ──
interface QuickAction {
  label: string;
  path: string;
  icon: React.ReactNode;
  primary?: boolean;
}

export default function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { user, isLoading: authLoading } =
    useAuth();

  const isAdmin =
    user?.role === UserResponseRoleEnum.Admin;

  const myApplicationsQuery =
    useMyApplications(
      {},
      0,
      5,
      ["createdAt,desc"],
      !isAdmin,
    );

  const allApplicationsQuery =
    useAllApplications(
      {},
      0,
      5,
      ["createdAt,desc"],
      isAdmin,
    );

  if (authLoading) {
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

  if (!user) {
    return (
      <Alert severity="error">
        Kullanıcı bilgileri alınamadı.
      </Alert>
    );
  }

  const applications = isAdmin
    ? allApplicationsQuery.data?.content ?? []
    : myApplicationsQuery.data?.content ?? [];

  const isApplicationsLoading = isAdmin
    ? allApplicationsQuery.isLoading
    : myApplicationsQuery.isLoading;

  const isApplicationsError = isAdmin
    ? allApplicationsQuery.isError
    : myApplicationsQuery.isError;

  // ── Quick Actions per role ──
  const adminActions: QuickAction[] = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardOutlinedIcon />, primary: true },
    { label: "Tüm Başvurular", path: "/applications", icon: <AssignmentOutlinedIcon /> },
    { label: "Kullanıcılar", path: "/users", icon: <PeopleOutlineIcon /> },
    { label: "Raporlar", path: "/reports", icon: <AssessmentOutlinedIcon /> },
    { label: "Profilim", path: "/profile", icon: <PersonOutlineIcon /> },
  ];

  const personnelActions: QuickAction[] = [
    { label: "Yeni Başvuru", path: "/applications/new", icon: <NoteAddOutlinedIcon />, primary: true },
    { label: "Başvurularım", path: "/applications/my", icon: <DescriptionOutlinedIcon /> },
    { label: "Profilim", path: "/profile", icon: <PersonOutlineIcon /> },
  ];

  const quickActions = isAdmin ? adminActions : personnelActions;

  return (
    <Box>
      {/* ── Greeting ── */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700 }}
          gutterBottom
        >
          Hoş geldin, {user.name} {user.surname}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          {isAdmin
            ? "Yönetim panelinden tüm başvuruları ve kullanıcıları yönetebilirsiniz."
            : "Buradan başvurularınızı takip edebilir ve yeni başvuru oluşturabilirsiniz."}
        </Typography>
      </Box>

      {/* ── Quick Actions ── */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, fontSize: "1.125rem" }}
        >
          Hızlı İşlemler
        </Typography>

        <Grid container spacing={2}>
          {quickActions.map((action) => (
            <Grid size={{ xs: 12, sm: 6, md: isAdmin ? 2.4 : 4 }} key={action.path}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor: action.primary ? (theme.palette.mode === "light" ? "primary.light" : "rgba(21, 94, 239, 0.1)") : "background.paper",
                  borderColor: action.primary ? "primary.main" : "divider",
                  borderWidth: action.primary ? 2 : 1,
                }}
              >
                <CardActionArea
                  onClick={() => navigate(action.path)}
                  sx={{ height: "100%", p: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1.5 }}
                >
                  <Box sx={{ color: action.primary ? "primary.main" : "text.secondary", display: "flex" }}>
                    {action.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: action.primary ? "primary.main" : "text.primary", textAlign: "center" }}>
                    {action.label}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── Recent Applications ── */}
      <Card>
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2.5,
              py: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, fontSize: "0.9375rem" }}
            >
              Son Başvurular
            </Typography>

            <Button
              size="small"
              endIcon={<ArrowForwardIcon sx={{ fontSize: "1rem !important" }} />}
              onClick={() =>
                navigate(
                  isAdmin
                    ? "/applications"
                    : "/applications/my",
                )
              }
              sx={{ textTransform: "none", fontSize: "0.8125rem" }}
            >
              Tümünü Gör
            </Button>
          </Box>

          <Divider />

          {isApplicationsLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 4,
              }}
            >
              <CircularProgress size={28} />
            </Box>
          )}

          {isApplicationsError && (
            <Box sx={{ px: 2.5, py: 2 }}>
              <Alert severity="error" variant="outlined">
                Son başvurular yüklenemedi.
              </Alert>
            </Box>
          )}

          {!isApplicationsLoading &&
            !isApplicationsError &&
            applications.length === 0 && (
              <Box sx={{ px: 2.5, py: 4, textAlign: "center" }}>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Henüz başvuru bulunmuyor.
                </Typography>
                {!isAdmin && (
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<NoteAddOutlinedIcon />}
                    onClick={() => navigate("/applications/new")}
                    sx={{ mt: 1.5 }}
                  >
                    İlk Başvurunuzu Oluşturun
                  </Button>
                )}
              </Box>
            )}

          {!isApplicationsLoading &&
            !isApplicationsError &&
            applications.length > 0 && (
              <TableContainer>
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell>BAŞLIK</TableCell>
                      {isAdmin && <TableCell>ADAY</TableCell>}
                      <TableCell>FORM TİPİ</TableCell>
                      <TableCell>DURUM</TableCell>
                      <TableCell align="right">TARİH</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow
                        key={application.id}
                        hover
                        onClick={() => navigate(`/applications/${application.id}`)}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell sx={{ fontWeight: 500, color: "text.primary" }}>
                          {application.title}
                        </TableCell>
                        {isAdmin && (
                          <TableCell sx={{ color: "text.secondary" }}>
                            {application.applicantFullName ?? "-"}
                          </TableCell>
                        )}
                        <TableCell sx={{ color: "text.secondary" }}>
                          {application.formTypeName ?? "-"}
                        </TableCell>
                        <TableCell>
                          <StatusChip status={application.status} />
                        </TableCell>
                        <TableCell align="right" sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
                          {application.createdAt
                            ? new Date(application.createdAt).toLocaleDateString("tr-TR")
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
        </CardContent>
      </Card>
    </Box>
  );
}