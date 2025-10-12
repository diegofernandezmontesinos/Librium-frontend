import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Turnstile } from "@marsidev/react-turnstile";
import { useLogin } from "@/hooks/useLogin";

const LogIn: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { login, loading, error, successMsg } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    login(username, password, captchaToken || undefined);
  };

  return (
    <main
      className="
        min-h-screen 
        bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
        text-white 
        grid place-content-center 
        px-4 
        overflow-auto
      "
    >
      <div
        className="
          w-full max-w-xs sm:max-w-sm md:max-w-md 
          bg-white text-gray-900 
          rounded-2xl shadow-lg ring-1 ring-black/10 
          p-5 sm:p-6 md:p-8 
          grid gap-6
        "
      >
        {/* Encabezado */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-slate-900">
          {t("Bienvenido")}
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder={t("login.usernamePlaceholder") || "Usuario"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              block w-full px-3 py-2 
              border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />

          <input
            type="password"
            placeholder={t("login.passwordPlaceholder") || "Contraseña"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              block w-full px-3 py-2 
              border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />

          {/* CAPTCHA */}
          <div className="flex justify-center overflow-hidden">
            <Turnstile
              siteKey={import.meta.env.VITE_CLOUDFLARE_SITE_KEY}
              onSuccess={(token) => setCaptchaToken(token)}
              options={{ theme: "light" }}
            />
          </div>

          {/* Mensajes */}
          {error && <p className="text-center text-sm text-red-600">{error}</p>}
          {successMsg && (
            <p className="text-center text-sm text-green-600">{successMsg}</p>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-indigo-600 text-white py-2 rounded-md 
              font-semibold tracking-wide
              hover:bg-indigo-700 transition 
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        {/* Pie */}
        <p className="text-center text-xs text-gray-500 mt-2">
          © {new Date().getFullYear()} Librium — Todos los derechos reservados.
        </p>
      </div>
    </main>
  );
};

export default LogIn;
