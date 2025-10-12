import { Component } from "react";
import { SectionEnum } from "@/utils/global/globalTypes";

export default class MenuBar extends Component {
  state = { activeItem: "home" };

  render() {
    const { activeItem } = this.state;

    const menuItems = [
      { name: "Top Seller", key: SectionEnum.TOP_SELLER },
      { name: "Fiction", key: SectionEnum.FICTION },
      { name: "Kids", key: SectionEnum.KIDS },
      { name: "Spanish books", key: SectionEnum.SPANISH_BOOKS },
      { name: "eBooks", key: SectionEnum.EBOOKS },
      { name: "Offerts", key: SectionEnum.OFFERTS },
      { name: "Technical books", key: SectionEnum.TECHNICAL_BOOKS },
    ];

    return (
      <nav
        className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7
          gap-x-4 gap-y-2 justify-items-center
          text-sm md:text-base
        "
      >
        {menuItems.map((item) => (
          <button
            key={item.key}
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
  }
}
