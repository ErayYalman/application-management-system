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
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import type {
  UserSearchRequest,
} from "../../../api/generated";

import {
  UserResponseRoleEnum,
} from "../../../api/generated";

import {
  useAllUsers,
} from "../hooks/use-all-users";

import UsersTable from "../components/UsersTable";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  activateUser,
  deactivateUser,
} from "../api/user-service";

export default function UsersPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [page, setPage] =
    useState(0);

  const [size, setSize] =
    useState(20);

  const [keywordInput, setKeywordInput] =
    useState("");

  const [role, setRole] =
    useState<UserResponseRoleEnum | "">(
      "",
    );

  const [active, setActive] =
    useState<"" | "true" | "false">(
      "",
    );

  const [request, setRequest] =
    useState<UserSearchRequest>({});

  const [sortModel, setSortModel] =
    useState<Array<{ field: string; sort: "asc" | "desc" }>>([
      {
        field: "createdAt",
        sort: "desc",
      },
    ]);

  const sort = sortModel.map(
    (item) =>
      `${item.field},${item.sort}`,
  );

  const {
    data,
    isLoading,
    isError,
  } = useAllUsers(
    request,
    page,
    size,
    sort,
  );

  const handleSearch = () => {
    setPage(0);

    setRequest({
      keyword:
        keywordInput.trim() ||
        undefined,

      role:
        role || undefined,

      active:
        active === ""
          ? undefined
          : active === "true",
    });
  };

  const handleClear = () => {
    setKeywordInput("");
    setRole("");
    setActive("");
    setRequest({});
    setPage(0);
  };

  const queryClient = useQueryClient();

  const activateMutation =
    useMutation({
      mutationFn: activateUser,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
    });

  const deactivateMutation =
    useMutation({
      mutationFn: deactivateUser,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
    });

  if (isError) {
    return (
      <Alert severity="error">
        Kullanıcılar yüklenemedi.
      </Alert>
    );
  }


  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700
        }}
        gutterBottom
      >
        Kullanıcılar
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Sistem kullanıcılarını yönetin.
      </Typography>

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
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            label="Anahtar kelime"
            size="small"
            value={keywordInput}
            onChange={(event) =>
              setKeywordInput(
                event.target.value,
              )
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter"
              ) {
                handleSearch();
              }
            }}
          />

          <FormControl
            size="small"
            sx={{ minWidth: 150 }}
          >
            <InputLabel>
              Rol
            </InputLabel>

            <Select
              value={role}
              label="Rol"
              onChange={(event) =>
                setRole(
                  event.target.value as
                  | UserResponseRoleEnum
                  | "",
                )
              }
            >
              <MenuItem value="">
                Tümü
              </MenuItem>

              <MenuItem
                value={
                  UserResponseRoleEnum.Personnel
                }
              >
                PERSONNEL
              </MenuItem>

              <MenuItem
                value={
                  UserResponseRoleEnum.Admin
                }
              >
                ADMIN
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl
            size="small"
            sx={{ minWidth: 150 }}
          >
            <InputLabel>
              Durum
            </InputLabel>

            <Select
              value={active}
              label="Durum"
              onChange={(event) =>
                setActive(
                  event.target.value as
                  | ""
                  | "true"
                  | "false",
                )
              }
            >
              <MenuItem value="">
                Tümü
              </MenuItem>

              <MenuItem value="true">
                Aktif
              </MenuItem>

              <MenuItem value="false">
                Pasif
              </MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
            <Button
              variant="contained"
              onClick={handleSearch}
            >
              Filtrele
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClear}
            >
              Temizle
            </Button>
          </Box>
        </Box>
      </Box>

      <UsersTable
        rows={data?.content ?? []}
        loading={isLoading}
        rowCount={
          data?.totalElements ?? 0
        }
        paginationModel={{
          page,
          pageSize: size,
        }}
        onPaginationModelChange={(
          model,
        ) => {
          setPage(model.page);
          setSize(
            model.pageSize,
          );
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
                field:
                  model[0].field,
                sort:
                  model[0].sort ??
                  "asc",
              },
            ]);
          }

          setPage(0);
        }}
        onView={(userId) =>
          navigate(
            `/users/${userId}`,
          )
        }
        onActivate={(userId) => {
          if (
            window.confirm(
              "Bu kullanıcıyı aktifleştirmek istediğinize emin misiniz?",
            )
          ) {
            activateMutation.mutate(userId);
          }
        }}

        onDeactivate={(userId) => {
          if (
            window.confirm(
              "Bu kullanıcıyı pasifleştirmek istediğinize emin misiniz?",
            )
          ) {
            deactivateMutation.mutate(userId);
          }
        }}
      />
      {activateMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Kullanıcı aktifleştirilemedi.
        </Alert>
      )}

      {deactivateMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Kullanıcı pasifleştirilemedi.
        </Alert>
      )}
    </Box>
  );
}
