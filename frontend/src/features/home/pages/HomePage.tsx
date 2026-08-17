import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

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

export default function HomePage() {
  const navigate = useNavigate();

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
      ! isAdmin,
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

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
        }}
        gutterBottom
      >
        Hoş geldin, {user.name} {user.surname}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Application Management System
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >
            Hızlı İşlemler
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {isAdmin ? (
              <>
                <Button
                  variant="contained"
                  onClick={() =>
                    navigate("/dashboard")
                  }
                >
                  Dashboard
                </Button>

                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate("/applications")
                  }
                >
                  Tüm Başvurular
                </Button>

                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate("/users")
                  }
                >
                  Kullanıcılar
                </Button>

                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate("/reports")
                  }
                >
                  Raporlar
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={() =>
                    navigate(
                      "/applications/new",
                    )
                  }
                >
                  Yeni Başvuru
                </Button>

                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate(
                      "/applications/my",
                    )
                  }
                >
                  Başvurularım
                </Button>
              </>
            )}

            <Button
              variant="outlined"
              onClick={() =>
                navigate("/profile")
              }
            >
              Profilim
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Son başvurular */}
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h6">
              Son Başvurular
            </Typography>

            <Button
              size="small"
              onClick={() =>
                navigate(
                  isAdmin
                    ? "/applications"
                    : "/applications/my",
                )
              }
            >
              Tümünü Gör
            </Button>
          </Box>

          {isApplicationsLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 4,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {isApplicationsError && (
            <Alert severity="error">
              Son başvurular yüklenemedi.
            </Alert>
          )}

          {!isApplicationsLoading &&
            !isApplicationsError &&
            applications.length === 0 && (
              <Typography
                color="text.secondary"
                sx={{ py: 2 }}
              >
                Henüz başvuru bulunmuyor.
              </Typography>
            )}

          {!isApplicationsLoading &&
            !isApplicationsError &&
            applications.length > 0 && (
              <List>
                {applications.map(
                  (application) => (
                    <ListItem
                      key={application.id}
                      disablePadding
                    >
                      <ListItemButton
                        onClick={() =>
                          navigate(
                            `/applications/${application.id}`,
                          )
                        }
                      >
                        <ListItemText
                          primary={
                            application.title
                          }
                          secondary={
                            isAdmin
                              ? `${application.applicantFullName ?? ""} • ${
                                  application.formTypeName ?? ""
                                } • ${
                                  application.status
                                }`
                              : `${
                                  application.formTypeName ??
                                  ""
                                } • ${
                                  application.status
                                }`
                          }
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {application.createdAt
                            ? new Date(
                                application.createdAt,
                              ).toLocaleDateString(
                                "tr-TR",
                              )
                            : "-"}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ),
                )}
              </List>
            )}
        </CardContent>
      </Card>
    </Box>
  );
}