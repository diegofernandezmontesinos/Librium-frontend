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
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-white">
          {t("Bienvenido")}
        </h2>

        <div className="bg-white py-8 px-6 shadow rounded-lg ring-1 ring-black/5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={t("login.usernamePlaceholder") || "Usuario"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-2 py-2 text-black border border-gray-300 rounded-md"
            />

            <input
              type="password"
              placeholder={t("login.passwordPlaceholder") || "Contraseña"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-2 py-2 text-black border border-gray-300 rounded-md"
            />

            <Turnstile
              siteKey={import.meta.env.VITE_CLOUDFLARE_SITE_KEY}
              onSuccess={(token) => setCaptchaToken(token)}
            />

            {error && <p className="text-red-600">{error}</p>}
            {successMsg && <p className="text-green-600">{successMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-md"
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LogIn;
