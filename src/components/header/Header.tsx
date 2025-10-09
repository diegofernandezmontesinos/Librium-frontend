import { useNavigate } from "react-router-dom";
import GeolocationIcon from "../../assets/icons/geolocation";
import PersonFill from "../../assets/icons/personFill";
import ShoppingCar from "../../assets/icons/shoppingCar";
import MenuBar from "../menuBar/MenuBar";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import { useUserStore } from "../../store/useUserStore";
import { UserRole } from "../../pages/login/Logintypes";
import { useAuthStorage } from "@/hooks/useAuthCookies";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { role, _hasHydrated } = useUserStore();
  const { getAuth } = useAuthStorage();

  if (!_hasHydrated) return null;

  const handleAccountClick = () => {
    const isAuthorized = getAuth();

    if (isAuthorized) {
      // 🔒 Usuario autenticado → ir al área personal
      navigate("/personal-area");
    } else {
      // 🔑 Usuario no autenticado → ir al login
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-zinc-950 via-slate-900 to-zinc-950 text-gray-300 shadow-lg py-3">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between md:space-x-6">
          {/* Logo */}
          <div className="text-2xl font-extrabold text-indigo-500">
            <a href="/">✨ Librium</a>
          </div>

          {/* Search bar */}
          <div className="w-full md:flex-1 mt-3 md:mt-0">
            <input
              type="search"
              placeholder="Busca por título, autor, género, ISBN..."
              className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />
          </div>

          {/* Botones */}
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <button className="flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
              <GeolocationIcon className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Librerías</span>
            </button>

            <LanguageSwitcher />

            {/* ✅ Validación de sesión */}
            <button
              onClick={handleAccountClick}
              className="flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
            >
              <PersonFill className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Mi Cuenta</span>
            </button>

            {/* Solo visible para admin */}
            {role === UserRole.ADMIN && (
              <button
                onClick={() => navigate("/books-page")}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              >
                📚 Admin
              </button>
            )}

            {/* Carrito */}
            <button
              onClick={() => navigate("/my-cart")}
              className="relative flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
            >
              <ShoppingCar className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Menú inferior */}
        <div className="border-t border-gray-700 mt-3 pt-2">
          <MenuBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
