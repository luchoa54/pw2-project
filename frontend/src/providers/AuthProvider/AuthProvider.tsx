"use client";

import { createContext, ReactNode, useState, useEffect } from "react";
import api from "@/utils/api";

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  userTypeId: string;
}

interface UserSession {
  userId: string;
  userType: string;
  userName: string;
}

interface IAuthContext {
  user: UserSession | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (data: SignUpData) => Promise<boolean>;
}

const initialAuthContextData: IAuthContext = {
  user: null,
  login: async () => false,
  logout: async () => {},
  signup: async () => false,
};

export const AuthContext = createContext<IAuthContext>(initialAuthContextData);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromSession() {
      try {
        const res = await api.get("/auth/me");
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.log("Nenhuma sessão ativa encontrada.");
      } finally {
        setIsLoading(false);
      }
    }

    loadUserFromSession();
  }, []);

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

  const signup = async (data: SignUpData) => {
    try {
      const res = await api.post("/auth/signup", data);
      if (res.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return false;
    }
  };

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Carregando...</div>; 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
