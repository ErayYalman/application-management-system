import {
  Box,
  Button,
  Chip,
} from "@mui/material";

import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
} from "@mui/x-data-grid";

import type {
  UserResponse,
} from "../../../api/generated";

interface UsersTableProps {
  rows: UserResponse[];
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
    userId: string,
  ) => void;

  onActivate: (
    userId: string,
  ) => void;

  onDeactivate: (
    userId: string,
  ) => void;
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
          label={
            params.row.active
              ? "Aktif"
              : "Pasif"
          }
          color={
            params.row.active
              ? "success"
              : "default"
          }
          size="small"
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Oluşturulma",
      width: 190,
      valueFormatter: (value) =>
        value
          ? new Date(
              value,
            ).toLocaleString("tr-TR")
          : "",
    },
    {
      field: "actions",
      headerName: "İşlem",
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
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

          {params.row.active ? (
            <Button
              size="small"
              color="error"
              onClick={() =>
                onDeactivate(
                  String(params.row.id),
                )
              }
            >
              Pasifleştir
            </Button>
          ) : (
            <Button
              size="small"
              color="success"
              onClick={() =>
                onActivate(
                  String(params.row.id),
                )
              }
            >
              Aktifleştir
            </Button>
          )}
        </Box>
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
        paginationModel={
          paginationModel
        }
        onPaginationModelChange={
          onPaginationModelChange
        }
        sortModel={sortModel}
        onSortModelChange={
          onSortModelChange
        }
        pageSizeOptions={[
          10,
          20,
          50,
        ]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}