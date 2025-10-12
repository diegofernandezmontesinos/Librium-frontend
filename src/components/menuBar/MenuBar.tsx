import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SectionEnum } from "@/utils/global/globalTypes";

const MenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("home");

  useEffect(() => {
    // Actualizar el activeItem según la ruta
    const path = location.pathname.replace("/", "");
    setActiveItem(path || "home");
  }, [location.pathname]);

  const menuItems = [
    { name: "History", key: SectionEnum.HISTORY },
    { name: "Fiction", key: SectionEnum.FICTION },
    { name: "Kids", key: SectionEnum.KIDS },
    { name: "Technical books", key: SectionEnum.TECHNICAL_BOOKS },
    { name: "Terror", key: SectionEnum.TERROR },
  ];

  const handleClick = (key: string) => {
    setActiveItem(key);
    navigate(`/${key.toLowerCase()}`);
  };

  return (
    <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-x-4 gap-y-2 justify-items-center text-sm md:text-base">
      {menuItems.map((item) => (
        <button
          key={item.key}
          onClick={() => handleClick(item.key)}
          className={`w-full md:w-auto px-2 py-1 cursor-pointer transition-colors duration-200 ${
            activeItem === item.key
              ? "text-blue-500 font-semibold border-b-2 border-blue-500"
              : "text-gray-300 hover:text-blue-400"
          }`}
        >
          {item.name}
        </button>
      ))}
    </nav>
  );
};

export default MenuBar;
