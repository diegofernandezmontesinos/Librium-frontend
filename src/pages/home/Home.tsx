import { useNavigate } from "react-router-dom";
import SectionCard from "../../components/sectionCard/SectionCard";
import { HomeEnum } from "./HomeTypes";
import { productsMock } from "@/mocks/products";
import { ProductCard } from "@/components/shoppingCart/productCard/ProductCard";

interface SectionData {
  title: string;
  subtitle?: string;
  image: string;
  type: HomeEnum;
  buttonText: string;
}

const MAIN_SECTIONS: SectionData[] = [
  {
    title: "Terror",
    subtitle: "Historias que no te dejarán dormir.",
    image: "https://picsum.photos/id/7/250/270",
    type: HomeEnum.TERROR,
    buttonText: "Explorar TERROR",
  },
  {
    title: "Autores Firmados",
    subtitle: "Piezas de colección únicas para tu biblioteca.",
    image: "https://picsum.photos/id/20/250/270",
    type: HomeEnum.AUTHOR,
    buttonText: "Ver Ediciones",
  },
  {
    title: "Club de Lectura",
    subtitle: "Descuentos especiales y acceso a eventos exclusivos.",
    image: "https://picsum.photos/id/635/250/270",
    type: HomeEnum.CLUB,
    buttonText: "Unirme al Club",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const getPath = (section: HomeEnum): string => {
    switch (section) {
      case HomeEnum.TERROR:
        return "/terror";
      case HomeEnum.AUTHOR:
      case HomeEnum.KIDS:
      case HomeEnum.CLUB:
      case HomeEnum.NEW:
      default:
        return "/*";
    }
  };

  const handleClick = (section: HomeEnum) => {
    navigate(getPath(section));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center">
      <section className="w-full max-w-7xl h-96 mt-12 overflow-hidden rounded-xl shadow-2xl">
        <img
          src="src/assets/images/librarybookshell.jpg"
          alt="Cubierta de una biblioteca con estanterías llenas de libros"
          className="w-full h-full object-cover opacity-80"
        />
      </section>
      {/* Sección de Libros Destacados */}
      <section className="max-w-7xl w-full mt-16">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">
          Libros Destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {productsMock.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>

      {/* Separador Disruptivo */}
      <div className="my-16 w-3/4 text-center">
        <p className="text-4xl font-extrabold tracking-tight text-emerald-400">
          Explora un Nuevo Universo Literario
        </p>
        <hr className="mt-4 border-2 border-lavender-400 w-1/4 mx-auto" />
      </div>

      {/* Contenedor de Artículos (patrón de Grid/Card) */}
      <section className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {/* 3. Mapeo de Componentes Reutilizables */}
        {MAIN_SECTIONS.map((item) => (
          <SectionCard
            key={item.type}
            {...item}
            onClick={() => handleClick(item.type)}
          />
        ))}
      </section>

      {/* Sección de Banner (Footer Articles - Estilo Split) */}
      <div className="w-full max-w-7xl mt-20 mb-12 flex flex-col md:flex-row gap-8 px-4">
        {/* Banner Izquierdo: Libros Infantiles */}
        <section
          onClick={() => handleClick(HomeEnum.KIDS)}
          className="group flex-1 bg-lavender-800/70 p-6 rounded-xl shadow-lg hover:shadow-lavender-500/50 transition duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="text-center md:text-left">
            <p className="text-2xl font-semibold text-lavender-200">
              Libros infantiles para celebrar
            </p>
          </div>
          <img
            src="https://picsum.photos/id/63/100/190"
            alt="Libros para niños"
            className="w-24 h-auto rounded-lg group-hover:scale-105 transition duration-300"
          />
        </section>

        {/* Banner Derecho: Recomendaciones */}
        <section
          onClick={() => handleClick(HomeEnum.NEW)}
          className="group flex-1 bg-emerald-800/70 p-6 rounded-xl shadow-lg hover:shadow-emerald-500/50 transition duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <img
            src="https://picsum.photos/id/63/100/190"
            alt="Recomendaciones de libros"
            className="w-24 h-auto rounded-lg group-hover:scale-105 transition duration-300"
          />
          <div className="text-center md:text-right">
            <p className="text-2xl font-semibold text-emerald-200">
              Nuestras recomendaciones del mes del libro
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
