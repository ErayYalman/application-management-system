import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";

import {
  GetApplicationReportStatusEnum,
} from "../../../api/generated";

import { useFormTypes } from "../../form-types/hooks/use-form-types";

import { useApplicationReport } from "../hooks/use-application-report";

export default function ReportsPage() {
  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [status, setStatus] =
    useState<
      GetApplicationReportStatusEnum | ""
    >("");

  const [formTypeId, setFormTypeId] =
    useState("");

  const [appliedFilters, setAppliedFilters] =
    useState<{
      startDate?: string;
      endDate?: string;
      status?: GetApplicationReportStatusEnum;
      formTypeId?: string;
    }>({});

  const {
    data: formTypes = [],
  } = useFormTypes();

  const {
    data,
    isLoading,
    isError,
  } = useApplicationReport(
    appliedFilters.startDate,
    appliedFilters.endDate,
    appliedFilters.status,
    appliedFilters.formTypeId,
  );

  const handleSearch = () => {
    if (
      startDate &&
      endDate &&
      startDate > endDate
    ) {
      return;
    }

    setAppliedFilters({
      startDate: startDate
        ? new Date(
            `${startDate}T00:00:00`,
          ).toISOString()
        : undefined,

      endDate: endDate
        ? new Date(
            `${endDate}T23:59:59`,
          ).toISOString()
        : undefined,

      status:
        status || undefined,

      formTypeId:
        formTypeId || undefined,
    });
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setStatus("");
    setFormTypeId("");

    setAppliedFilters({});
  };

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
        Rapor verileri yüklenemedi.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        Raporlar
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Başvuruların seçilen filtrelere göre
        dağılımını görüntüleyin.
      </Typography>

      {/* Filtreler */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <TextField
          label="Başlangıç"
          type="date"
          size="small"
          value={startDate}
          onChange={(event) =>
            setStartDate(event.target.value)
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          label="Bitiş"
          type="date"
          size="small"
          value={endDate}
          onChange={(event) =>
            setEndDate(event.target.value)
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <FormControl
          size="small"
          sx={{ minWidth: 160 }}
        >
          <InputLabel>
            Durum
          </InputLabel>

          <Select
            value={status}
            label="Durum"
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | GetApplicationReportStatusEnum
                  | "",
              )
            }
          >
            <MenuItem value="">
              Tümü
            </MenuItem>

            <MenuItem
              value={
                GetApplicationReportStatusEnum.New
              }
            >
              NEW
            </MenuItem>

            <MenuItem
              value={
                GetApplicationReportStatusEnum.InReview
              }
            >
              IN_REVIEW
            </MenuItem>

            <MenuItem
              value={
                GetApplicationReportStatusEnum.Approved
              }
            >
              APPROVED
            </MenuItem>

            <MenuItem
              value={
                GetApplicationReportStatusEnum.Rejected
              }
            >
              REJECTED
            </MenuItem>

            <MenuItem
              value={
                GetApplicationReportStatusEnum.Cancelled
              }
            >
              CANCELLED
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl
          size="small"
          sx={{ minWidth: 180 }}
        >
          <InputLabel>
            Başvuru Türü
          </InputLabel>

          <Select
            value={formTypeId}
            label="Başvuru Türü"
            onChange={(event) =>
              setFormTypeId(event.target.value)
            }
          >
            <MenuItem value="">
              Tümü
            </MenuItem>

            {formTypes.map((formType) => (
              <MenuItem
                key={formType.id}
                value={formType.id}
              >
                {formType.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSearch}
        >
          Raporla
        </Button>

        <Button
          variant="outlined"
          onClick={handleClear}
        >
          Temizle
        </Button>
      </Box>

      {/* Özet */}
      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography
                color="text.secondary"
              >
                Toplam
              </Typography>

              <Typography variant="h4">
                {data.totalApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography
                color="text.secondary"
              >
                NEW
              </Typography>

              <Typography variant="h4">
                {data.newApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography
                color="text.secondary"
              >
                IN_REVIEW
              </Typography>

              <Typography variant="h4">
                {data.inReviewApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography
                color="text.secondary"
              >
                APPROVED
              </Typography>

              <Typography variant="h4">
                {data.approvedApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography
                color="text.secondary"
              >
                REJECTED
              </Typography>

              <Typography variant="h4">
                {data.rejectedApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography
                color="text.secondary"
              >
                CANCELLED
              </Typography>

              <Typography variant="h4">
                {data.cancelledApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Form Type dağılımı */}
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >
            Başvuru Türlerine Göre Dağılım
          </Typography>

          {!data.applicationsByFormType ||
          data.applicationsByFormType.length === 0 ? (
            <Typography
              color="text.secondary"
            >
              Veri bulunamadı.
            </Typography>
          ) : (
            data.applicationsByFormType.map(
              (item) => (
                <Box
                  key={item.formTypeId}
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    py: 1,
                  }}
                >
                  <Typography>
                    {item.formTypeName}
                  </Typography>

                  <Typography sx={{ fontWeight: 600 }}>
                    {item.count}
                  </Typography>
                </Box>
              ),
            )
          )}
        </CardContent>
      </Card>
    </Box>
  );
}