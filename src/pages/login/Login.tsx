import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GlobalLayout from "../../components/layouts/GlobalLayout";
import axiosInstance from "../../utils/axios/AxiosInstance";
import { Turnstile } from "@marsidev/react-turnstile";

// helper para crear cookie (cliente). NOTA de seguridad más abajo. MOVE THIS TO A customHook
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
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const validateInputs = (): boolean => {
    if (username.length < 4 || username.length > 10) {
      setError(t("login.usernameError"));
      return false;
    }
    const contraseñaRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/;
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

      const response = await axiosInstance.post("/login", {
        username,
        password,
        captchaToken,
      });
      switch (response.status) {
        case 200:
          setCookie("autorizado", "true");
          //TODO -> I should encrypted this in a not so far future
          localStorage.setItem("user", JSON.stringify({ username }));
          break;
        case 401:
          throw new Error(
            t("login.invalidCredentials") || "Invalid credentials"
          );
        case 403:
          throw new Error(
            t("login.captchaError") || "Captcha verification failed"
          );
        default:
          throw new Error(t("login.apiError") || "Login failed");
      }

      setSuccessMsg(t("login.success") || "Login successful");
    } catch (err) {
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("login.passwordPlaceholder") || "Password"}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
