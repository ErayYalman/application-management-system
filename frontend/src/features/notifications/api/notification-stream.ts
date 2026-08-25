import axios from "axios";

import type { NotificationResponse } from "../../../api/generated";
import { authStorage } from "../../../lib/auth-storage";

const STREAM_URL =
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/notifications/stream`;

const REFRESH_URL =
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh-token`;

export type NotificationStreamHandlers = {
    onNotification: (
        notification: NotificationResponse,
    ) => void;

    onConnected?: () => void;
};

export const connectNotificationStream = async (
    handlers: NotificationStreamHandlers,
    signal?: AbortSignal,
): Promise<void> => {
    let accessToken =
        authStorage.getAccessToken();

    if (!accessToken) {
        return;
    }

    let response = await openStream(
        accessToken,
        signal,
    );

    if (response.status === 401) {
        accessToken =
            await refreshAccessToken();

        response = await openStream(
            accessToken,
            signal,
        );
    }

    if (!response.ok) {
        throw new Error(
            `Notification stream failed with status ${response.status}`,
        );
    }

    if (!response.body) {
        throw new Error(
            "Notification stream response body is unavailable.",
        );
    }

    handlers.onConnected?.();

    const reader =
        response.body.getReader();

    const decoder = new TextDecoder();

    let buffer = "";

    try {
        while (true) {
            const { done, value } =
                await reader.read();

            if (done) {
                break;
            }

            buffer += decoder.decode(
                value,
                { stream: true },
            );

            const events =
                buffer.split(
                    /\r?\n\r?\n/,
                );

            buffer =
                events.pop() ?? "";

            for (
                const eventBlock of events
            ) {
                const event =
                    parseSseEvent(
                        eventBlock,
                    );

                if (!event) {
                    continue;
                }

                if (
                    event.event ===
                    "notification" &&
                    event.data
                ) {
                    const notification =
                        JSON.parse(
                            event.data,
                        ) as NotificationResponse;

                    handlers.onNotification(
                        notification,
                    );
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
};

const openStream = async (
    accessToken: string,
    signal?: AbortSignal,
): Promise<Response> => {
    return fetch(
        STREAM_URL,
        {
            method: "GET",
            headers: {
                Accept:
                    "text/event-stream",
                Authorization:
                    `Bearer ${accessToken}`,
                "Cache-Control":
                    "no-cache",
            },
            signal,
        },
    );
};

const refreshAccessToken =
    async (): Promise<string> => {

        const refreshToken =
            authStorage.getRefreshToken();

        if (!refreshToken) {
            throw new Error(
                "Refresh token is unavailable.",
            );
        }

        try {
            const response =
                await axios.post(
                    REFRESH_URL,
                    {
                        refreshToken,
                    },
                );

            const {
                accessToken,
                refreshToken:
                newRefreshToken,
            } = response.data;

            if (
                !accessToken ||
                !newRefreshToken
            ) {
                throw new Error(
                    "Refresh response is incomplete.",
                );
            }

            authStorage.setTokens(
                accessToken,
                newRefreshToken,
            );

            return accessToken;

        } catch (error) {

            authStorage.clear();

            window.dispatchEvent(
                new Event(
                    "auth:logout",
                ),
            );

            throw error;
        }
    };

const parseSseEvent = (
    eventBlock: string,
): {
    event: string;
    data: string;
} | null => {

    const lines =
        eventBlock.split("\n");

    let event = "message";

    const dataLines: string[] = [];

    for (
        const line of lines
    ) {

        if (
            line.startsWith("event:")
        ) {
            event =
                line
                    .slice(6)
                    .trim();

            continue;
        }

        if (
            line.startsWith("data:")
        ) {
            dataLines.push(
                line
                    .slice(5)
                    .trimStart(),
            );
        }
    }

    if (
        dataLines.length === 0
    ) {
        return null;
    }

    return {
        event,
        data: dataLines.join("\n"),
    };
};