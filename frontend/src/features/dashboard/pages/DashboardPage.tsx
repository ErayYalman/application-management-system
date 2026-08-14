import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import { useDashboard } from "../hooks/use-dashboard";

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
  } = useDashboard();

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

  if (isError || !data) {
    return (
      <Alert severity="error">
        Dashboard verileri yüklenemedi.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700 }}
        gutterBottom
      >
        Dashboard
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Başvuru sistemi genel özeti
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Toplam Başvuru
              </Typography>

              <Typography variant="h4">
                {data.totalApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Bekleyen
              </Typography>

              <Typography variant="h4">
                {data.pendingApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Onaylanan
              </Typography>

              <Typography variant="h4">
                {data.approvedApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Reddedilen
              </Typography>

              <Typography variant="h4">
                {data.rejectedApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Bugünkü Başvurular
              </Typography>

              <Typography variant="h4">
                {data.todayApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}