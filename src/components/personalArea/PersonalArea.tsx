import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "@/hooks/useAuthCookies";
import { useUserProfile } from "./hooks/useUserProfile";
import EditProfileForm from "./component/EditProfileForm";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const PersonalArea: React.FC = () => {
  const navigate = useNavigate();
  const { removeAuth } = useAuthStorage();
  const { user, setUser, loading, error } = useUserProfile();
  const { t } = useTranslation();

  const handleLogout = () => {
    removeAuth();
    navigate("/login");
  };

  if (loading) return <p className="text-white">Cargando perfil...</p>;
  if (error || !user)
    return <p className="text-red-500">Error cargando perfil.</p>;

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

        <EditProfileForm user={user} onUserUpdate={setUser} />

        <div className="mt-6 w-full text-left text-gray-300 text-sm sm:text-base">
          <p className="font-semibold mb-1">
            {t("personalArea.changeLanguage")}
          </p>
          <LanguageSwitcher />
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
