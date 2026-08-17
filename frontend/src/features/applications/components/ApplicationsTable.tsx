import {
  Box,
  Button,
} from "@mui/material";

import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
} from "@mui/x-data-grid";

import type {
  ApplicationResponse,
} from "../../../api/generated";

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
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() =>
            onView(
              String(params.row.id),
            )
          }
        >
          Görüntüle
        </Button>
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
        onPaginationModelChange={
          onPaginationModelChange
        }
        sortModel={sortModel}
        onSortModelChange={
          onSortModelChange
        }
        pageSizeOptions={[10, 20, 50]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}