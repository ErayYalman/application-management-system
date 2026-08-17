import {
  Alert,
  Box,
  Button,
  Typography,
} from "@mui/material";

import {
  useNavigate,
} from "react-router-dom";

import { useFormTypes } from "../hooks/use-form-types";
import { useFormTypeActions } from "../hooks/use-form-type-actions";

import FormTypesTable from "../components/FormTypesTable";

export default function FormTypesPage() {
  const navigate = useNavigate();

  const {
    data: formTypes = [],
    isLoading,
    isError,
  } = useFormTypes();

  const {
    activate,
    deactivate,
  } = useFormTypeActions();

  if (isError) {
    return (
      <Alert severity="error">
        Form türleri yüklenemedi.
      </Alert>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700
            }}
          >
            Form Türleri
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Başvuru türlerini yönetin.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() =>
            navigate("/form-types/new")
          }
        >
          Yeni Form Türü
        </Button>
      </Box>

      {(activate.isError ||
        deactivate.isError) && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          Form türü işlemi gerçekleştirilemedi.
        </Alert>
      )}

      <FormTypesTable
        rows={formTypes}
        loading={isLoading}
        onEdit={(formTypeId) =>
          navigate(
            `/form-types/${formTypeId}/edit`,
          )
        }
        onActivate={(formTypeId) =>
          activate.mutate(formTypeId)
        }
        onDeactivate={(formTypeId) => {
          if (
            window.confirm(
              "Bu form türünü pasifleştirmek istediğinize emin misiniz?",
            )
          ) {
            deactivate.mutate(formTypeId);
          }
        }}
      />
    </Box>
  );
}