import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeolocationIcon from "../../assets/icons/geolocation";
import PersonFill from "../../assets/icons/personFill";
import ShoppingCar from "../../assets/icons/shoppingCar";
import MenuBar from "../menuBar/MenuBar";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import { useUserStore } from "../../store/useUserStore";
import { UserRole } from "../../pages/login/Logintypes";
import { useAuthStorage } from "@/hooks/useAuthCookies";
import { useSearchStore } from "@/store/useSearchStore";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCart } from "react-use-cart";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { role, _hasHydrated } = useUserStore();
  const { getAuth } = useAuthStorage();
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { searchTerm, setSearchTerm } = useSearchStore();

  if (!_hasHydrated) return null;

  const handleAccountClick = () => {
    const isAuthorized = getAuth();
    navigate(isAuthorized ? "/personal-area" : "/login");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-zinc-950 via-slate-900 to-zinc-950 text-gray-300 shadow-lg py-3">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {/* 🧱 Sección superior */}
        <div
          className="
        flex flex-col md:grid
        md:grid-cols-[auto,1fr,auto]
        md:items-center md:gap-6
      "
        >
          {/* 🔹 Fila superior (mobile): Hamburguesa + Logo + Carrito */}
          <div className="flex items-center justify-between w-full md:hidden">
            {/* Botón hamburguesa */}
            <button
              className="p-2 rounded-md hover:bg-gray-800 transition"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Abrir menú"
            >
              <i
                className={`bi ${
                  menuOpen ? "bi-x" : "bi-list"
                } text-2xl text-gray-300`}
              ></i>
            </button>

            {/* Logo */}
            <a
              href="/"
              className="text-2xl font-extrabold text-indigo-500 whitespace-nowrap"
            >
              ✨ Librium
            </a>

            {/* Carrito */}
            <button
              onClick={() => navigate("/my-cart")}
              className="relative p-2 rounded-full hover:bg-gray-800 transition"
            >
              <ShoppingCar className="h-6 w-6 text-gray-300" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                  {items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* 🔹 Fila superior (desktop): Logo - Input - Botones */}
          <div className="hidden md:flex md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <a
              href="/"
              className="text-2xl font-extrabold text-indigo-500 whitespace-nowrap"
            >
              ✨ Librium
            </a>

            {/* Barra de búsqueda */}
            <div className="w-30">
              <input
                type="search"
                placeholder="Busca por título, autor, género, ISBN..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-fix px-4 py-2 border rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-white"
              />
            </div>

            {/* Botones */}
            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <button className="flex items-center px-4 py-2 text-sm cursor-pointer rounded-full hover:bg-indigo-500 hover:text-white transition">
                <GeolocationIcon className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Librerías</span>
              </button>

              <LanguageSwitcher />

              <button
                onClick={handleAccountClick}
                className="flex items-center px-4 py-2 text-sm  rounded-full hover:bg-indigo-500 hover:text-white transition"
              >
                <PersonFill className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Mi Cuenta</span>
              </button>

              {role === UserRole.ADMIN && (
                <button
                  onClick={() => navigate("/books-page")}
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                >
                  📚 Admin
                </button>
              )}

              <button
                onClick={() => navigate("/my-cart")}
                className="relative flex items-center px-4 py-2 text-sm rounded-full hover:bg-indigo-500 hover:text-white transition"
              >
                <ShoppingCar className="h-6 w-6 text-gray-300" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                    {items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* 🔹 Input debajo en móviles */}
          <div className="w-full mt-3 md:hidden">
            <input
              type="search"
              placeholder="Busca por título, autor, género, ISBN..."
              className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-white"
            />
          </div>
        </div>

        {/* 🧭 Menú inferior */}
        <div className="border-t border-gray-700 pt-2">
          {/* Mobile: dropdown */}
          <div className="md:hidden">{menuOpen && <MenuBar />}</div>

          {/* Desktop: menú visible */}
          <div className="hidden md:block">
            <MenuBar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
