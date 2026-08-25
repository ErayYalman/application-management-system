import {
    Alert,
    Box,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Tooltip,
    Typography,
    Divider,
    alpha,
    useTheme,
} from "@mui/material";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import CircleIcon from "@mui/icons-material/Circle";

import { useNavigate } from "react-router-dom";
import type { NotificationResponse } from "../../../api/generated";

import {
    useDeleteAllNotifications,
    useDeleteNotification,
    useMarkAllNotificationsAsRead,
    useMarkNotificationAsRead,
    useNotifications,
    useUnreadNotificationCount,
} from "../hooks/use-notifications";

interface NotificationCenterProps {
    onClose?: () => void;
}

const formatDate = (date?: string) => {
    if (!date) return "-";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "-";
    
    return new Intl.DateTimeFormat("tr-TR", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).format(parsedDate);
};

export default function NotificationCenter({ onClose }: NotificationCenterProps) {
    const theme = useTheme();
    const navigate = useNavigate();

    const {
        data: notifications = [],
        isLoading,
        isError,
    } = useNotifications();

    const { data: unreadCount = 0 } = useUnreadNotificationCount();
    const markAsReadMutation = useMarkNotificationAsRead();
    const markAllAsReadMutation = useMarkAllNotificationsAsRead();
    const deleteMutation = useDeleteNotification();
    const deleteAllMutation = useDeleteAllNotifications();

    const handleNotificationClick = async (notification: NotificationResponse) => {
        if (notification.id && !notification.read) {
            try {
                await markAsReadMutation.mutateAsync(notification.id);
            } catch (error) {
                console.error("Notification could not be marked as read.", error);
            }
        }

        onClose?.();

        if (notification.applicationId) {
            navigate(`/applications/${notification.applicationId}`);
        }
    };

    const handleDelete = async (event: React.MouseEvent, notificationId?: string) => {
        event.stopPropagation();
        if (!notificationId) return;

        try {
            await deleteMutation.mutateAsync(notificationId);
        } catch (error) {
            console.error("Notification could not be deleted.", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsReadMutation.mutateAsync();
        } catch (error) {
            console.error("Notifications could not be marked as read.", error);
        }
    };

    const handleDeleteAll = async () => {
        try {
            await deleteAllMutation.mutateAsync();
        } catch (error) {
            console.error("Notifications could not be deleted.", error);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "80vh" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2.5,
                    py: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    bgcolor: theme.palette.background.paper,
                }}
            >
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary", lineHeight: 1.2 }}>
                        Bildirimler
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
                        {unreadCount > 0 ? `${unreadCount} okunmamış` : "Tümü okundu"}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                    <Tooltip title="Tümünü okundu işaretle" arrow placement="top">
                        <span>
                            <IconButton
                                size="small"
                                disabled={unreadCount === 0 || markAllAsReadMutation.isPending}
                                onClick={handleMarkAllAsRead}
                                sx={{ color: "text.secondary", "&:hover": { color: "primary.main", bgcolor: alpha(theme.palette.primary.main, 0.08) } }}
                            >
                                <DoneAllOutlinedIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Tümünü sil" arrow placement="top">
                        <span>
                            <IconButton
                                size="small"
                                disabled={notifications.length === 0 || deleteAllMutation.isPending}
                                onClick={handleDeleteAll}
                                sx={{ color: "text.secondary", "&:hover": { color: "error.main", bgcolor: alpha(theme.palette.error.main, 0.08) } }}
                            >
                                <DeleteOutlineOutlinedIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Box>
            </Box>

            {isLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 4, minHeight: 200 }}>
                    <CircularProgress size={24} thickness={4} sx={{ color: "text.disabled" }} />
                </Box>
            )}

            {isError && (
                <Box sx={{ p: 2 }}>
                    <Alert severity="error" sx={{ borderRadius: 1.5 }}>Bildirimler yüklenemedi.</Alert>
                </Box>
            )}

            {!isLoading && !isError && notifications.length === 0 && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        px: 3,
                        py: 8,
                        textAlign: "center",
                        minHeight: 250,
                    }}
                >
                    <NotificationsOffOutlinedIcon sx={{ fontSize: 42, color: "text.disabled", mb: 2, opacity: 0.4 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.primary", mb: 0.5 }}>
                        Bildirim bulunmuyor
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 220 }}>
                        Şu an için size ulaşan yeni bir bildirim yok.
                    </Typography>
                </Box>
            )}

            {!isLoading && !isError && notifications.length > 0 && (
                <List disablePadding sx={{ flex: 1, overflowY: "auto" }}>
                    {notifications.map((notification, index) => {
                        const isUnread = !notification.read;
                        return (
                            <Box key={notification.id}>
                                <ListItem
                                    disablePadding
                                    sx={{
                                        bgcolor: isUnread 
                                            ? (theme.palette.mode === "light" ? alpha(theme.palette.primary.main, 0.04) : alpha(theme.palette.primary.main, 0.08)) 
                                            : "transparent",
                                        borderLeft: `3px solid ${isUnread ? theme.palette.primary.main : "transparent"}`,
                                        transition: "background-color 0.2s ease",
                                        "&:hover": {
                                            bgcolor: "action.hover",
                                        },
                                    }}
                                >
                                    <ListItemButton
                                        onClick={() => handleNotificationClick(notification)}
                                        sx={{ 
                                            py: 2, 
                                            px: 2.5,
                                            alignItems: "flex-start",
                                            "&:hover": { bgcolor: "transparent" }
                                        }}
                                    >
                                        <Box sx={{ display: "flex", width: "100%", gap: 1.5 }}>
                                            <Box sx={{ pt: 0.5 }}>
                                                <CircleIcon 
                                                    sx={{ 
                                                        fontSize: 10, 
                                                        color: isUnread ? "primary.main" : "transparent",
                                                        mt: 0.5
                                                    }} 
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
                                                    <Typography 
                                                        variant="subtitle2" 
                                                        sx={{ 
                                                            fontWeight: isUnread ? 600 : 500, 
                                                            color: isUnread ? "text.primary" : "text.secondary",
                                                            lineHeight: 1.4
                                                        }}
                                                    >
                                                        {notification.title}
                                                    </Typography>
                                                    <Typography 
                                                        variant="caption" 
                                                        sx={{ 
                                                            color: "text.disabled",
                                                            whiteSpace: "nowrap",
                                                            ml: 2,
                                                            fontWeight: 500,
                                                            pt: 0.25
                                                        }}
                                                    >
                                                        {formatDate(notification.createdAt)}
                                                    </Typography>
                                                </Box>
                                                
                                                <Typography 
                                                    variant="body2" 
                                                    sx={{ 
                                                        color: "text.secondary", 
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        lineHeight: 1.5
                                                    }}
                                                >
                                                    {notification.message}
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{ pt: 0.5, pl: 1 }}>
                                                <Tooltip title="Sil" arrow placement="left">
                                                    <IconButton
                                                        edge="end"
                                                        size="small"
                                                        onClick={(event) => handleDelete(event, notification.id)}
                                                        sx={{ 
                                                            color: "text.disabled",
                                                            opacity: 0.5,
                                                            transition: "all 0.2s",
                                                            "&:hover": { 
                                                                color: "error.main", 
                                                                opacity: 1,
                                                                bgcolor: alpha(theme.palette.error.main, 0.08)
                                                            } 
                                                        }}
                                                    >
                                                        <DeleteOutlineOutlinedIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                                {index < notifications.length - 1 && <Divider sx={{ mx: 2 }} />}
                            </Box>
                        );
                    })}
                </List>
            )}
        </Box>
    );
}