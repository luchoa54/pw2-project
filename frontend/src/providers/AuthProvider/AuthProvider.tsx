"use client";

import { createContext, ReactNode, useState } from "react";
import api from "@/utils/api";

interface UserSession {
  userId: string;
  userType: string;
  userName: string;
}

interface IAuthContext {
  user: UserSession | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const initialAuthContextData: IAuthContext = {
  user: null,
  login: async () => false,
  logout: async () => {},
};

export const AuthContext = createContext<IAuthContext>(initialAuthContextData);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.status == 200) {
      setUser(res.data);
      return true;
    }
    return false;
  };
  const logout = async () => {
    const res = await api.post("/auth/logout");
    if (res.status == 200) {
      setUser(null);
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
