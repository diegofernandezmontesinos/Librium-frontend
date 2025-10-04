import { useNavigate } from "react-router-dom";
import GeolocationIcon from "../../assets/icons/geolocation";
import PersonFill from "../../assets/icons/personFill";
import ShoppingCar from "../../assets/icons/shoppingCar";
import MenuBar from "../menuBar/MenuBar";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate("/login");
  };

  return (
    <header className="w-full bg-zinc-950 text-gray-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🔹 First row */}
        <div className="flex items-center justify-between h-16 space-x-4">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold text-indigo-700">
            La casa del libro
          </div>

          {/* Search bar */}
          <div className="flex-1 hidden md:flex">
            <input
              type="search"
              placeholder="Busca por título, autor, género, ISBN"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              <GeolocationIcon className="mr-1 h-5 w-5" />
              <span className="hidden sm:inline">Librerías</span>
            </button>

            <LanguageSwitcher />

            <button
              onClick={handleAccountClick}
              className="flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <PersonFill className="mr-1 h-5 w-5" />
              <span className="hidden sm:inline">My Account</span>
            </button>

            <button className="relative flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              <ShoppingCar className="h-5 w-5" />
              {/* badge */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-indigo-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                0
              </span>
            </button>
          </div>
        </div>

        {/* 🔹 Second row (menu bar) */}
        <div className="border-t border-gray-200 mt-2 pt-2">
          <MenuBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
