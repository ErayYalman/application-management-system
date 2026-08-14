import {
  createContext,
  useContext,
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

interface AuthContextValue {
  user: UserResponse | null;
  isAuthenticated: boolean;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserResponse | null>(null);

  const login = async (request: LoginRequest): Promise<void> => {
    const response: LoginResponse = await loginApi(request);
      
    // 1. KONTROL: Token'lar gelmediyse işlemi durdur.
    if (!response.accessToken || !response.refreshToken) {
      throw new Error("Login başarılı ancak sunucudan token bilgileri eksik geldi!");
    }

    // 2. KAYIT: Token'ları localStorage'a (storage'a) kaydet.
    authStorage.setTokens(
      response.accessToken,
      response.refreshToken,
    );

    // 3. USER KAYDI: State'i güncelle
    setUser(response.user ?? null);
  };

  const logout = async (): Promise<void> => {
    const refreshToken = authStorage.getRefreshToken();

    if (refreshToken) {
      try {
        await logoutApi({ refreshToken });
      } finally {
        authStorage.clear();
        setUser(null);
      }
    } else {
      authStorage.clear();
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}