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
    useTheme
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import type { GridSortModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ApplicationSearchRequest } from "../../../api/generated";
import { ApplicationSearchRequestStatusEnum as ApplicationStatus } from "../../../api/generated";

import { useAllApplications } from "../hooks/use-all-applications";
import { useFormTypes } from "../../form-types/hooks/use-form-types";
import ApplicationsTable from "../components/ApplicationsTable";

export default function ApplicationsPage() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [keywordInput, setKeywordInput] = useState("");
    const [status, setStatus] = useState<ApplicationStatus | "">("");
    const [formTypeId, setFormTypeId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [request, setRequest] = useState<ApplicationSearchRequest>({});

    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
            field: "createdAt",
            sort: "desc",
        },
    ]);

    const { data: formTypes = [] } = useFormTypes();

    const sort = sortModel.map((item) => {
        let field = item.field;
        if (field === "applicantFullName") field = "user.name";
        if (field === "formTypeName") field = "formType.name";
        return `${field},${item.sort}`;
    });

    const { data, isLoading, isError } = useAllApplications(
        request,
        page,
        size,
        sort,
    );

    const handleSearch = () => {
        if (startDate && endDate && startDate > endDate) {
            return;
        }

        setPage(0);

        setRequest({
            keyword: keywordInput.trim() || undefined,
            status: status || undefined,
            formTypeId: formTypeId || undefined,
            startDate: startDate
                ? new Date(`${startDate}T00:00:00`).toISOString()
                : undefined,
            endDate: endDate
                ? new Date(`${endDate}T23:59:59`).toISOString()
                : undefined,
        });
    };

    const handleClearFilters = () => {
        setKeywordInput("");
        setStatus("");
        setFormTypeId("");
        setStartDate("");
        setEndDate("");
        setPage(0);
        setRequest({});
    };

    if (isError) {
        return (
            <Alert severity="error">
                Başvurular yüklenemedi.
            </Alert>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
                Tüm Başvurular
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Sistemdeki tüm başvuruları yönetin.
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
                        flexWrap: "wrap",
                        gap: 2,
                        alignItems: "center",
                    }}
                >
                    <TextField
                    label="Anahtar kelime"
                    size="small"
                    value={keywordInput}
                    onChange={(event) => setKeywordInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />

                <FormControl size="small" sx={{ minWidth: 150 }}>
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
                        inputLabel: { shrink: true },
                    }}
                />

                <TextField
                    label="Bitiş"
                    type="date"
                    size="small"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    slotProps={{
                        inputLabel: { shrink: true },
                    }}
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

            <ApplicationsTable
                rows={data?.content ?? []}
                loading={isLoading}
                rowCount={data?.totalElements ?? 0}
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
                onView={(applicationId) => navigate(`/applications/${applicationId}`)}
            />
        </Box>
    );
}
