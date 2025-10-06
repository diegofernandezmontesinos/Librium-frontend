/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GlobalLayout from "../../components/layouts/GlobalLayout";
import axiosInstance from "../../utils/axios/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { ApiPaths } from "../../utils/ApiPath";

const Register: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateInputs = (): boolean => {
    if (!username) {
      setError(t("register.usernameError") || "Username required");
      return false;
    }
    const contraseñaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    if (!contraseñaRegex.test(password)) {
      setError(t("register.passwordError") || "Password too short");
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

      const response = await axiosInstance.post(ApiPaths.auth.register, {
        username,
        password,
      });

      if (response.status === 200) {
        setSuccessMsg(t("register.success") || "Registration successful");
        navigate("/login"); // Redirige al login
      } else {
        throw new Error(t("register.apiError") || "Registration failed");
      }
    } catch (err: any) {
      console.error("Register error:", err);
      setError(
        err?.response?.data?.detail || err?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalLayout>
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">
              {t("register.title") || "Sign Up"}
            </h2>
          </div>

          <div className="bg-white py-8 px-6 shadow rounded-lg ring-1 ring-black/5 text-black">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="username" className="sr-only">
                  {t("register.usernameLabel") || "Username"}
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t("register.usernamePlaceholder") || "Username"}
                  className="block w-full px-2 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  {t("register.passwordLabel") || "Password"}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("register.passwordPlaceholder") || "Password"}
                  className="block w-full px-2 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={loading}
                />
              </div>

              <div aria-live="polite" className="min-h-[1.25rem] text-sm">
                {error && <p className="text-red-600">{error}</p>}
                {successMsg && <p className="text-green-600">{successMsg}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                  className="w-full text-white flex justify-center py-2 px-4 border cursor-pointer border-transparent text-sm font-medium rounded-md !bg-indigo-600 !hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {loading
                  ? "Signing up..."
                  : t("register.submitButton") || "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </GlobalLayout>
  );
};

export default Register;
