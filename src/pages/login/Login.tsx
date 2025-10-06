/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GlobalLayout from "../../components/layouts/GlobalLayout";
import axiosInstance from "../../utils/axios/AxiosInstance";
import { Turnstile } from "@marsidev/react-turnstile";
import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "../../hooks/useAuthCookies";
import { useUserStore } from "../../store/useUserStore";
import { UserRole } from "./Logintypes";
import { ApiPaths } from "../../utils/ApiPath";

const LogIn: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { setAuth } = useAuthStorage();
  const { setUser } = useUserStore();

  const navigate = useNavigate();

  const validateInputs = (): boolean => {
    if (username.length < 1 || username === "") {
      setError(t("login.usernameError"));
      return false;
    }
    const contraseñaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

    if (!contraseñaRegex.test(password)) {
      setError(t("login.passwordError"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!validateInputs()) return;

    try {
      setLoading(true);

      const response = await axiosInstance.post(ApiPaths.auth.login, {
        username,
        password,
        captchaToken,
      });

      if (response.status === 200) {
        setAuth(true); // tu authStore
        const { username, role } = response.data;
        setUser(username, role as UserRole);
        navigate("/");
        setSuccessMsg(t("login.success") || "Login successful");
      } else {
        throw new Error(t("login.invalidCredentials") || "Invalid credentials");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || t("login.apiError") || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalLayout>
      <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              {t("Bienvenido") || "Sign in to your account"}
            </h2>
            <p className="mt-2 text-sm text-white">
              {t("Ingresa tus credenciales") || "Enter your credentials"}
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow rounded-lg ring-1 ring-black/5">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {/* USERNAME */}
              <div>
                <label htmlFor="username" className="sr-only">
                  {t("login.usernameLabel") || "Username"}
                </label>
                <div className="relative">
                  {/* icon */}
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    disabled={loading}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t("login.usernamePlaceholder") || "Username"}
                    className="block w-full px-2 py-2 text-black border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label htmlFor="password" className="sr-only">
                  {t("login.passwordLabel") || "Password"}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    aria-placeholder="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    disabled={loading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("login.passwordPlaceholder") || "Password"}
                    className="block w-full px-2 py-2 text-black border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <Turnstile
                siteKey={import.meta.env.VITE_CLOUDFLARE_SITE_KEY}
                onSuccess={(token) => setCaptchaToken(token)}
              />
              {/* Error / Success */}
              <div aria-live="polite" className="min-h-[1.25rem]">
                {error && <p className="text-sm text-red-600">{error}</p>}
                {successMsg && (
                  <p className="text-sm text-green-600">{successMsg}</p>
                )}
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white flex justify-center py-2 px-4 border cursor-pointer border-transparent text-sm font-medium rounded-md !bg-indigo-600 !hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  ) : null}
                  {loading
                    ? t("login.loading") || "Signing in..."
                    : t("login.submitButton") || "Sign in"}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center text-sm text-gray-600">
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t("login.footerNote") || "Need an account?"}{" "}
            </a>
          </div>
        </div>
      </main>
    </GlobalLayout>
  );
};

export default LogIn;
