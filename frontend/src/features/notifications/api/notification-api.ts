import {
  type NotificationResponse,
  NotificationControllerApi,
} from "../../../api/generated";

import apiConfiguration from "../../../api/config";

const notificationApi = new NotificationControllerApi(
  apiConfiguration,
);

export const getNotifications = async (): Promise<
  NotificationResponse[]
> => {
  const response =
    await notificationApi.getMyNotifications();

  return response.data;
};

export const getUnreadNotificationCount =
  async (): Promise<number> => {
    const response =
      await notificationApi.getUnreadCount();

    return response.data;
  };

export const markNotificationAsRead = async (
  notificationId: string,
): Promise<void> => {
  await notificationApi.markAsRead(
    notificationId,
  );
};

export const markAllNotificationsAsRead =
  async (): Promise<void> => {
    await notificationApi.markAllAsRead();
  };

export const deleteNotification = async (
  notificationId: string,
): Promise<void> => {
  await notificationApi.delete1(
    notificationId,
  );
};

export const deleteAllNotifications =
  async (): Promise<void> => {
    await notificationApi.deleteAll();
  };