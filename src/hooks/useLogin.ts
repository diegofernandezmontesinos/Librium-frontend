// src/hooks/useLogin.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/authService";
import { useAuthStorage } from "@/hooks/useAuthCookies";
import { useUserStore } from "@/store/useUserStore";
import { UserRole } from "@/pages/login/Logintypes";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setAuth } = useAuthStorage();
  const { setUser } = useUserStore();

  const login = async (
    username: string,
    password: string,
    captchaToken?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthService.login(username, password, captchaToken);

      setAuth(true);
      const { username: userName, role, id } = response;
      setUser(id, userName, role as UserRole);

      setSuccessMsg("Inicio de sesión exitoso");
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.response?.data?.detail || "Error en el inicio de sesión");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, successMsg };
}
