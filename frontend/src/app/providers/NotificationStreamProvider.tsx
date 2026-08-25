import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Box, Snackbar } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { useQueryClient } from "@tanstack/react-query";

import type { NotificationResponse } from "../../api/generated";

import { connectNotificationStream } from "../../features/notifications/api/notification-stream";
import {
    notificationKeys,
    useMarkNotificationAsRead,
} from "../../features/notifications/hooks/use-notifications";
import { useAuth } from "../../features/auth/context/AuthContext";

interface NotificationStreamContextValue {
    connected: boolean;
}

const NotificationStreamContext =
    createContext<NotificationStreamContextValue>({
        connected: false,
    });

interface NotificationStreamProviderProps {
    children: ReactNode;
}

export function NotificationStreamProvider({
    children,
}: NotificationStreamProviderProps) {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const markAsReadMutation =
        useMarkNotificationAsRead();

    const [
        incomingNotification,
        setIncomingNotification,
    ] = useState<NotificationResponse | null>(null);

    const abortControllerRef =
        useRef<AbortController | null>(null);

    const reconnectTimerRef =
        useRef<number | null>(null);

    const connect = () => {
        if (!user) {
            return;
        }

        abortControllerRef.current?.abort();

        const abortController =
            new AbortController();

        abortControllerRef.current =
            abortController;

        connectNotificationStream(
            {
                onNotification: (
                    notification: NotificationResponse,
                ) => {
                    setIncomingNotification(
                        notification,
                    );

                    queryClient.setQueryData<
                        NotificationResponse[]
                    >(
                        notificationKeys.list(),
                        (
                            currentNotifications = [],
                        ) => {
                            const alreadyExists =
                                currentNotifications.some(
                                    (item) =>
                                        item.id ===
                                        notification.id,
                                );

                            if (alreadyExists) {
                                return currentNotifications;
                            }

                            return [
                                notification,
                                ...currentNotifications,
                            ];
                        },
                    );

                    queryClient.invalidateQueries({
                        queryKey:
                            notificationKeys.unreadCount(),
                    });
                },
            },
            abortController.signal,
        ).catch((error) => {
            if (abortController.signal.aborted) {
                return;
            }

            console.error(
                "Notification stream disconnected.",
                error,
            );

            if (
                reconnectTimerRef.current === null
            ) {
                reconnectTimerRef.current =
                    window.setTimeout(() => {
                        reconnectTimerRef.current =
                            null;

                        connect();
                    }, 5000);
            }
        });
    };

    const handleNotificationClick = async () => {
        const notification =
            incomingNotification;

        if (!notification) {
            return;
        }

        setIncomingNotification(null);

        if (notification.id) {
            try {
                await markAsReadMutation.mutateAsync(
                    notification.id,
                );
            } catch (error) {
                console.error(
                    "Notification could not be marked as read.",
                    error,
                );
            }
        }

        if (notification.applicationId) {
            navigate(
                `/applications/${notification.applicationId}`,
            );
        }
    };

    useEffect(() => {
        if (!user) {
            abortControllerRef.current?.abort();

            if (
                reconnectTimerRef.current !== null
            ) {
                window.clearTimeout(
                    reconnectTimerRef.current,
                );

                reconnectTimerRef.current = null;
            }

            return;
        }

        connect();

        const handleTokenRefresh = () => {
            abortControllerRef.current?.abort();

            connect();
        };

        window.addEventListener(
            "auth:token-refreshed",
            handleTokenRefresh,
        );

        return () => {
            window.removeEventListener(
                "auth:token-refreshed",
                handleTokenRefresh,
            );

            abortControllerRef.current?.abort();

            if (
                reconnectTimerRef.current !== null
            ) {
                window.clearTimeout(
                    reconnectTimerRef.current,
                );

                reconnectTimerRef.current = null;
            }
        };
    }, [user]);

    return (
        <NotificationStreamContext.Provider
            value={{
                connected: Boolean(user),
            }}
        >
            {children}

            <Snackbar
                open={Boolean(incomingNotification)}
                autoHideDuration={6000}
                onClose={() => setIncomingNotification(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{ mb: { xs: 0, sm: 1 }, mr: { xs: 0, sm: 1 } }}
            >
                <Alert
                    icon={<NotificationsNoneOutlinedIcon fontSize="small" />}
                    severity="info"
                    variant="standard"
                    onClose={() => setIncomingNotification(null)}
                    onClick={handleNotificationClick}
                    sx={{
                        width: "100%",
                        maxWidth: { xs: "calc(100vw - 32px)", sm: 400 },
                        cursor: incomingNotification?.applicationId ? "pointer" : "default",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        color: "text.primary",
                        "& .MuiAlert-icon": {
                            color: "primary.main",
                            mt: 0.25,
                        },
                        "&:hover": {
                            bgcolor: "action.hover",
                        },
                        transition: "background-color 0.2s"
                    }}
                >
                    <Box sx={{ fontWeight: 600, fontSize: "0.875rem", mb: 0.5, lineHeight: 1.4 }}>
                        {incomingNotification?.title}
                    </Box>
                    {incomingNotification?.message && (
                        <Box sx={{ fontSize: "0.8125rem", color: "text.secondary", lineHeight: 1.5 }}>
                            {incomingNotification.message}
                        </Box>
                    )}
                </Alert>
            </Snackbar>
        </NotificationStreamContext.Provider>
    );
}

export const useNotificationStream = () => useContext(NotificationStreamContext);