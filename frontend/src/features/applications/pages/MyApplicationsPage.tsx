import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { DataGrid, type GridColDef, type GridSortModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ApplicationSearchRequestStatusEnum as ApplicationStatus,
  type ApplicationSearchRequest,
} from "../../../api/generated";

import { useMyApplications } from "../hooks/use-my-applications";
import { useFormTypes } from "../../form-types/hooks/use-form-types";

export default function MyApplicationsPage() {
  const navigate = useNavigate();

  // Pagination & Search States
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [keywordInput, setKeywordInput] = useState("");
  const [status, setStatus] = useState<ApplicationStatus | "">("");
  const [formTypeId, setFormTypeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filterError, setFilterError] = useState<string | null>(null);
  const [request, setRequest] = useState<ApplicationSearchRequest>({});

  // Sorting State
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "createdAt",
      sort: "desc",
    },
  ]);

  // Data Fetching
  const { data: formTypes = [] } = useFormTypes();
  const sort = sortModel.map((item) => `${item.field},${item.sort}`);

  const { data, isLoading, isError } = useMyApplications(
    request,
    page,
    size,
    sort,
  );

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Başlık",
      flex: 1,
      minWidth: 220,
    },
    {
      field: "formTypeName",
      headerName: "Başvuru Türü",
      width: 160,
    },
    {
      field: "status",
      headerName: "Durum",
      width: 140,
    },
    {
      field: "createdAt",
      headerName: "Oluşturulma",
      width: 180,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleString("tr-TR") : "",
    },
    {
      field: "actions",
      headerName: "İşlem",
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => navigate(`/applications/${params.row.id}`)}
        >
          Görüntüle
        </Button>
      ),
    },
  ];

  const handleSearch = () => {
    setFilterError(null);

    // Tarih mantık kontrolü
    if (startDate && endDate && startDate > endDate) {
      setFilterError("Başlangıç tarihi bitiş tarihinden sonra olamaz.");
      return;
    }

    setPage(0);

    const newRequest: ApplicationSearchRequest = {
      keyword: keywordInput.trim() || undefined,
      status: status || undefined,
      formTypeId: formTypeId || undefined,
      startDate: startDate
        ? new Date(`${startDate}T00:00:00`).toISOString()
        : undefined,
      endDate: endDate
        ? new Date(`${endDate}T23:59:59`).toISOString()
        : undefined,
    };

    setRequest(newRequest);
  };

  const handleClearFilters = () => {
    setFilterError(null);
    setKeywordInput("");
    setStatus("");
    setFormTypeId("");
    setStartDate("");
    setEndDate("");

    setPage(0);
    setRequest({});
  };

  if (isError) {
    return <Alert severity="error">Başvurular yüklenemedi.</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Başvurularım
      </Typography>

      {filterError && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {filterError}
        </Alert>
      )}

      {/* Filtreleme Alanı */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
          alignItems: "center",
          backgroundColor: "#fff",
          p: 2.5,
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <TextField
          label="Anahtar kelime"
          value={keywordInput}
          onChange={(event) => setKeywordInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          size="small"
          sx={{ minWidth: 200 }}
        />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Durum</InputLabel>
          <Select
            value={status}
            label="Durum"
            onChange={(event) =>
              setStatus(event.target.value as ApplicationStatus | "")
            }
          >
            <MenuItem value="">Tümü</MenuItem>
            <MenuItem value={ApplicationStatus.New}>YENİ</MenuItem>
            <MenuItem value={ApplicationStatus.InReview}>İNCELEMEDE</MenuItem>
            <MenuItem value={ApplicationStatus.Approved}>ONAYLANDI</MenuItem>
            <MenuItem value={ApplicationStatus.Rejected}>REDDEDİLDİ</MenuItem>
            <MenuItem value={ApplicationStatus.Cancelled}>İPTAL EDİLDİ</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
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

        <TextField
          label="Başlangıç"
          type="date"
          size="small"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ minWidth: 150 }}
        />

        <TextField
          label="Bitiş"
          type="date"
          size="small"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ minWidth: 150 }}
        />

        <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
          <Button variant="contained" onClick={handleSearch}>
            Filtrele
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
            Temizle
          </Button>
        </Box>
      </Box>

      {/* DataGrid Tablosu */}
      <Box sx={{ height: 600, width: "100%", backgroundColor: "#fff", borderRadius: 2 }}>
        <DataGrid
          rows={data?.content ?? []}
          columns={columns}
          loading={isLoading}
          rowCount={data?.totalElements ?? 0}
          paginationMode="server"
          sortingMode="server"
          paginationModel={{
            page,
            pageSize: size,
          }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setSize(model.pageSize);
          }}
          sortModel={sortModel}
          onSortModelChange={(model) => {
            if (model.length === 0) {
              setSortModel([
                {
                  field: "createdAt",
                  sort: "desc",
                },
              ]);
            } else {
              setSortModel([
                {
                  field: model[0].field,
                  sort: model[0].sort ?? "asc",
                },
              ]);
            }
            setPage(0);
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}