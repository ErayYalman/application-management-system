import {
  Box,
  Button,
  Chip,
} from "@mui/material";

import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

import type {
  FormTypeResponse,
} from "../../../api/generated";

interface FormTypesTableProps {
  rows: FormTypeResponse[];
  loading: boolean;
  onEdit: (
    formTypeId: string,
  ) => void;
  onActivate: (
    formTypeId: string,
  ) => void;
  onDeactivate: (
    formTypeId: string,
  ) => void;
}

export default function FormTypesTable({
  rows,
  loading,
  onEdit,
  onActivate,
  onDeactivate,
}: FormTypesTableProps) {
  const columns: GridColDef<FormTypeResponse>[] = [
    {
      field: "name",
      headerName: "Ad",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "description",
      headerName: "Açıklama",
      flex: 2,
      minWidth: 250,
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
      field: "actions",
      headerName: "İşlem",
      width: 250,
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
              onEdit(
                String(params.row.id),
              )
            }
          >
            Düzenle
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
        height: 500,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 20, 50]}
      />
    </Box>
  );
}