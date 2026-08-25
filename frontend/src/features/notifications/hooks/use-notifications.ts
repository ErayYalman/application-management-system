import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteAllNotifications,
  deleteNotification,
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../api/notification-api";

export const notificationKeys = {
  all: ["notifications"] as const,

  list: () =>
    [...notificationKeys.all, "list"] as const,

  unreadCount: () =>
    [...notificationKeys.all, "unread-count"] as const,
};

export const useNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: getNotifications,
  });
};

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: getUnreadNotificationCount,
  });
};

export const useMarkNotificationAsRead =
  () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: markNotificationAsRead,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: notificationKeys.list(),
        });

        queryClient.invalidateQueries({
          queryKey:
            notificationKeys.unreadCount(),
        });
      },
    });
  };

export const useMarkAllNotificationsAsRead =
  () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: markAllNotificationsAsRead,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: notificationKeys.list(),
        });

        queryClient.invalidateQueries({
          queryKey:
            notificationKeys.unreadCount(),
        });
      },
    });
  };

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey:
          notificationKeys.unreadCount(),
      });
    },
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllNotifications,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey:
          notificationKeys.unreadCount(),
      });
    },
  });
};