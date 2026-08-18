import {
  Alert,
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { useFormTypes } from "../hooks/use-form-types";
import { useFormTypeActions } from "../hooks/use-form-type-actions";
import FormTypesTable from "../components/FormTypesTable";

export default function FormTypesPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: formTypes = [], isLoading, isError } = useFormTypes();
  const { activate, deactivate } = useFormTypeActions();

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; formTypeId: string | null; action: "activate" | "deactivate" | null }>({
    open: false,
    formTypeId: null,
    action: null,
  });

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSnackbar({ open: true, message: location.state.successMessage, severity: "success" });
      // Clear the state so it doesn't show again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const showMessage = (msg: string, severity: "success" | "error" = "success") => {
    setSnackbar({ open: true, message: msg, severity });
  };

  const handleConfirmAction = async () => {
    const { formTypeId, action } = confirmDialog;
    setConfirmDialog({ open: false, formTypeId: null, action: null });

    if (!formTypeId) return;

    try {
      if (action === "activate") {
        await activate.mutateAsync(formTypeId);
        showMessage("Form türü başarıyla aktifleştirildi.");
      } else if (action === "deactivate") {
        await deactivate.mutateAsync(formTypeId);
        showMessage("Form türü başarıyla pasifleştirildi.");
      }
    } catch (e: any) {
        showMessage("Form türü işlemi gerçekleştirilemedi.", "error");
    }
  };

  if (isError) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", pt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          Form türleri yüklenemedi.
        </Alert>
      </Box>
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
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Form Türleri
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Başvuru türlerini yönetin.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/form-types/new")}
        >
          Yeni Form Türü
        </Button>
      </Box>

      <FormTypesTable
        rows={formTypes}
        loading={isLoading}
        onEdit={(formTypeId) => navigate(`/form-types/${formTypeId}/edit`)}
        onActivate={(formTypeId) => setConfirmDialog({ open: true, formTypeId, action: "activate" })}
        onDeactivate={(formTypeId) => setConfirmDialog({ open: true, formTypeId, action: "deactivate" })}
      />

      {/* CONFIRMATION DIALOG */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, formTypeId: null, action: null })}>
        <DialogTitle>
          {confirmDialog.action === "activate" ? "Form Türünü Aktifleştir" : "Form Türünü Pasifleştir"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.action === "activate" 
              ? "Bu form türünü aktifleştirmek istediğinize emin misiniz? Kullanıcılar bu türde yeni başvurular oluşturabilecektir." 
              : "Bu form türünü pasifleştirmek istediğinize emin misiniz? Kullanıcılar artık bu türde yeni başvurular oluşturamayacaktır."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, formTypeId: null, action: null })} color="inherit">
            Vazgeç
          </Button>
          <Button
            onClick={handleConfirmAction}
            color={confirmDialog.action === "activate" ? "success" : "error"}
            variant="contained"
            disableElevation
          >
            Onayla
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity} 
          variant="filled" 
          sx={{ width: '100%', fontWeight: 500 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}