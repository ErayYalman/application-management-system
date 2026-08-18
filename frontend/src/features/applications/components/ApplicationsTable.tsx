import {
  Box,
  IconButton,
  LinearProgress,
  Tooltip,
  Pagination,
  useTheme,
} from "@mui/material";

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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import type {
  ApplicationResponse,
} from "../../../api/generated";
import StatusChip from "../../../components/StatusChip";

interface ApplicationsTableProps {
  rows: ApplicationResponse[];
  loading: boolean;
  rowCount: number;

  paginationModel: GridPaginationModel;
  onPaginationModelChange: (
    model: GridPaginationModel,
  ) => void;

  sortModel: GridSortModel;
  onSortModelChange: (
    model: GridSortModel,
  ) => void;

  onView: (
    applicationId: string,
  ) => void;
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
        }
      }}
    />
  );
}

export default function ApplicationsTable({
  rows,
  loading,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  sortModel,
  onSortModelChange,
  onView,
}: ApplicationsTableProps) {
  const theme = useTheme();

  const columns: GridColDef<ApplicationResponse>[] = [
    {
      field: "title",
      headerName: "Başlık",
      flex: 1,
      minWidth: 220,
    },
    {
      field: "applicantFullName",
      headerName: "Başvuran",
      width: 180,
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
      width: 190,
      valueFormatter: (value) =>
        value
          ? new Date(value).toLocaleString("tr-TR")
          : "",
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
              onView(String(params.row.id));
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: 560,
      }}
    >
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
          borderRadius: 3,
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
  );
}