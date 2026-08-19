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
  useTheme,
  IconButton,
  Tooltip,
  LinearProgress,
  Pagination,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StatusChip from "../../../components/StatusChip";

import { 
  DataGrid, 
  type GridColDef, 
  type GridSortModel,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ApplicationSearchRequestStatusEnum as ApplicationStatus,
  type ApplicationSearchRequest,
} from "../../../api/generated";

import { useMyApplications } from "../hooks/use-my-applications";
import { useFormTypes } from "../../form-types/hooks/use-form-types";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      shape="rounded"
      count={pageCount}
      page={page + 1}
      onChange={(_, value) => apiRef.current.setPage(value - 1)}
      sx={{
        ".MuiPaginationItem-root": {
          fontWeight: 600,
        }
      }}
    />
  );
}

export default function MyApplicationsPage() {
  const theme = useTheme();
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
  const sort = sortModel.map((item) => {
    let field = item.field;
    if (field === "formTypeName") field = "formType.name";
    return `${field},${item.sort}`;
  });

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
      renderCell: (params) => <StatusChip status={params.row.status} />,
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
      width: 80,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params) => (
        <Tooltip title="Görüntüle">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/applications/${params.row.id}`);
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
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
          mb: 4,
          backgroundColor: "background.paper",
          p: 2.5,
          borderRadius: "8px",
          boxShadow: theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FilterListIcon sx={{ color: "text.secondary", mr: 1, fontSize: "1.2rem" }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Filtreleme Seçenekleri
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
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
      </Box>

      {/* DataGrid Tablosu */}
      <Box sx={{ height: 600, width: "100%" }}>
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
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          onRowClick={(params) => navigate(`/applications/${params.row.id}`)}
          slots={{
            loadingOverlay: () => <LinearProgress />,
            pagination: CustomPagination,
          }}
          slotProps={{
            pagination: {
              labelRowsPerPage: "Sayfa başına kayıt:",
              labelDisplayedRows: ({ from, to, count }: { from: number; to: number; count: number }) => 
                `${from} - ${to} / ${count !== -1 ? count : `daha fazla ${to}`}`,
            } as any,
          }}
          localeText={{
            noRowsLabel: "Kayıtlı başvuru bulunmamaktadır.",
            footerTotalVisibleRows: (visibleCount, totalCount) =>
              `${visibleCount.toLocaleString("tr-TR")} / ${totalCount.toLocaleString("tr-TR")}`,
            footerRowSelected: (count) =>
              count !== 1
                ? `${count.toLocaleString("tr-TR")} satır seçildi`
                : `${count.toLocaleString("tr-TR")} satır seçildi`,
          }}
          sx={{
            border: "none",
            backgroundColor: theme.palette.mode === "light" ? "#fff" : "background.paper",
            borderRadius: "8px",
            boxShadow: theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
            px: 2,
            pb: 2,
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "2px solid",
              borderColor: "divider",
              backgroundColor: "transparent",
              color: "text.secondary",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              letterSpacing: "0.5px",
            },
            "& .MuiDataGrid-iconSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid",
              borderColor: "divider",
              transition: "background-color 0.2s ease",
              position: "relative",
              "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: theme.palette.primary.main,
                  borderTopRightRadius: "4px",
                  borderBottomRightRadius: "4px",
                }
              },
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              mt: 2,
              justifyContent: "flex-end",
            },
          }}
        />
      </Box>
    </Box>
  );
}
