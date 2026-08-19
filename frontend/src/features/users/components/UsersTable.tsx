import {
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Pagination,
  Tooltip,
  useTheme,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

import type { UserResponse } from "../../../api/generated";

interface UsersTableProps {
  rows: UserResponse[];
  loading: boolean;
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  sortModel: GridSortModel;
  onSortModelChange: (model: GridSortModel) => void;
  onView: (userId: string) => void;
  onActivate: (userId: string) => void;
  onDeactivate: (userId: string) => void;
}

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
        },
      }}
    />
  );
}

export default function UsersTable({
  rows,
  loading,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  sortModel,
  onSortModelChange,
  onView,
  onActivate,
  onDeactivate,
}: UsersTableProps) {
  const theme = useTheme();

  const columns: GridColDef<UserResponse>[] = [
    {
      field: "name",
      headerName: "Ad",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "surname",
      headerName: "Soyad",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.3,
      minWidth: 220,
    },
    {
      field: "role",
      headerName: "Rol",
      width: 130,
    },
    {
      field: "active",
      headerName: "Durum",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.row.active ? "Aktif" : "Pasif"}
          color={params.row.active ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Oluşturulma",
      width: 190,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleString("tr-TR") : "",
    },
    {
      field: "actions",
      headerName: "İşlem",
      width: 140,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {params.row.active ? (
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                onDeactivate(String(params.row.id));
              }}
            >
              Pasifleştir
            </Button>
          ) : (
            <Button
              size="small"
              color="success"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                onActivate(String(params.row.id));
              }}
            >
              Aktifleştir
            </Button>
          )}
        </Box>
      ),
    },
    {
      field: "view",
      headerName: "Görüntüle",
      width: 100,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Görüntüle">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onView(String(params.row.id));
              }}
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", height: 560 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        rowCount={rowCount}
        paginationMode="server"
        sortingMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        pageSizeOptions={[10, 20, 50, 100]}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        onRowClick={(params) => onView(String(params.row.id))}
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
          noRowsLabel: "Kayıtlı kullanıcı bulunmamaktadır.",
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
              },
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
  );
}
