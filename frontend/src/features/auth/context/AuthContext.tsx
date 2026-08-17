import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type {
    LoginRequest,
    LoginResponse,
    UserResponse,
} from "../../../api/generated";

import {
    login as loginApi,
    logout as logoutApi,
} from "../api/auth-service";

import { authStorage } from "../../../lib/auth-storage";

import {
    getCurrentUser,
} from "../../users/api/user-service";

export interface AuthContextValue {
    user: UserResponse | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (
        request: LoginRequest
    ) => Promise<UserResponse>;
    logout: () => Promise<void>;
    updateUser: (
        user: UserResponse
    ) => void;
}

export const AuthContext =
    createContext<AuthContextValue | undefined>(
        undefined
    );

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] =
        useState<UserResponse | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            const accessToken =
                authStorage.getAccessToken();

            if (!accessToken) {
                setIsLoading(false);
                return;
            }

            try {
                const currentUser =
                    await getCurrentUser();

                setUser(currentUser);
            } catch {
                authStorage.clear();
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        void restoreSession();
    }, []);

    const login = async (
        request: LoginRequest,
    ): Promise<UserResponse> => {
        const response: LoginResponse =
            await loginApi(request);

        if (
            !response.accessToken ||
            !response.refreshToken ||
            !response.user
        ) {
            throw new Error(
                "Login was successful, but the details received from the server were incomplete!",
            );
        }

        authStorage.setTokens(
            response.accessToken,
            response.refreshToken,
        );

        setUser(response.user);

        return response.user;
    };

    const logout = async (): Promise<void> => {
        const refreshToken =
            authStorage.getRefreshToken();

        try {
            if (refreshToken) {
                await logoutApi({
                    refreshToken,
                });
            }
        } catch (error) {
            console.error(
                "Logout request failed:",
                error,
            );
        } finally {
            authStorage.clear();
            setUser(null);
        }
    };

    const updateUser = (
        updatedUser: UserResponse,
    ): void => {
        setUser(updatedUser);
    };

    const value = useMemo(
        () => ({
            user,
            isAuthenticated:
                user !== null,
            isLoading,
            login,
            logout,
            updateUser,
        }),
        [
            user,
            isLoading,
        ],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider.",
        );
    }

    return context;
}