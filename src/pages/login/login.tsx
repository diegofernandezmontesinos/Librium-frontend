/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GlobalLayout from "../../components/layouts/GlobalLayout";
// import './login.css'  <-- ahora usamos Tailwind, no CSS propio

// helper para crear cookie (cliente). NOTA de seguridad más abajo.
const setCookie = (name: string, value: string, days = 1) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  // Secure/ SameSite gesetzt; HttpOnly no puede configurarse desde JS (solo desde servidor)
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Path=/; Expires=${expires.toUTCString()}; SameSite=Strict; Secure`;
};

const LogIn: React.FC = () => {
  const { t } = useTranslation();
  const [nombre, setNombre] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const validateInputs = (): boolean => {
    if (nombre.length < 4 || nombre.length > 10) {
      setError(t("login.usernameError"));
      return false;
    }
    const contraseñaRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!contraseñaRegex.test(contraseña)) {
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

      // Cambia el endpoint por el tuyo
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // si tu backend setea cookies, permite recibirlas
        body: JSON.stringify({ username: nombre, password: contraseña }),
      });

      if (!response.ok) {
        // intenta leer mensaje de error del backend si existe
        const errBody = await response.json().catch(() => null);
        const msg = errBody?.message || "Invalid credentials";
        throw new Error(msg);
      }

      const data = await response.json().catch(() => ({}));
      console.log("API Response:", data);

      // Guardamos cookie "autorizado" (cliente). Preferible que el backend devuelva cookie HttpOnly.
      setCookie("autorizado", "true", 1);

      // Guarda información mínima en localStorage si la necesitas (no tokens sensibles)
      localStorage.setItem("user", JSON.stringify({ nombre }));

      setSuccessMsg(t("login.success") || "Login successful");
      // opcional: redirigir si usas react-router
      // navigate('/dashboard');
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || t("login.apiError") || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalLayout>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {t("login.title") || "Sign in to your account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t("login.subtitle") || "Enter your credentials"}
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
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 11c1.657 0 3-1.343 3-3S17.657 5 16 5s-3 1.343-3 3 1.343 3 3 3zM6 21v-2a4 4 0 014-4h4"
                      />
                    </svg>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    disabled={loading}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder={t("login.usernamePlaceholder") || "Username"}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label htmlFor="password" className="sr-only">
                  {t("login.passwordLabel") || "Password"}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zM6 11v6a2 2 0 002 2h8a2 2 0 002-2v-6"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    disabled={loading}
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    placeholder={t("login.passwordPlaceholder") || "Password"}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

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
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
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
            <p>
              {t("login.footerNote") || "Need an account?"}{" "}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {t("login.register") || "Sign up"}
              </a>
            </p>
          </div>
        </div>
      </main>
    </GlobalLayout>
  );
};

export default LogIn;
