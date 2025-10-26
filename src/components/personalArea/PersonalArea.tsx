import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "@/hooks/useAuthCookies";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
  role: string;
}

const PersonalArea: React.FC = () => {
  const navigate = useNavigate();
  const { getAuth, removeAuth } = useAuthStorage();
  const [user, setUser] = useState<User | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const isAuthorized = getAuth();
    if (!isAuthorized) {
      navigate("/login", { replace: true });
    } else {
      // Mock temporal — luego reemplazaremos por fetch desde backend
      setUser({
        id: 1,
        name: "María López",
        email: "maria.lopez@example.com",
        avatar: "https://i.pravatar.cc/150?img=47",
        joinedAt: "2023-04-12",
        role: "Usuario Premium",
      });
    }
  }, [getAuth, navigate]);

  const handleLogout = () => {
    removeAuth();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-6">
      <section className="bg-slate-800 w-full max-w-lg rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-28 h-28 rounded-full mb-4 border-4 border-emerald-500"
        />
        <h1 className="text-2xl font-bold text-emerald-400 mb-1">
          {user.name}
        </h1>
        <p className="text-gray-300">{user.email}</p>
        <p className="text-sm text-gray-400 mt-1">{user.role}</p>

        <hr className="my-4 border-gray-600 w-full" />

        <div className="grid grid-cols-2 gap-4 w-full text-left text-gray-300 text-sm sm:text-base">
          <p>
            <span className="font-semibold">ID:</span> {user.id}
          </p>
          <p>
            <span className="font-semibold">
              {t("personalArea.joinedDate")}
            </span>{" "}
            {user.joinedAt}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full text-left text-gray-300 text-sm sm:text-base">
          <p>
            <span className="font-semibold">
              {" "}
              {t("personalArea.changeLanguage")}
            </span>
          </p>
          <p>
            <LanguageSwitcher />
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          {t("personalArea.logout")}
        </button>
      </section>
    </main>
  );
};

export default PersonalArea;
