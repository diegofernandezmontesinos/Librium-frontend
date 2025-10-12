// src/pages/home/Home.tsx
import { useNavigate } from "react-router-dom";
import SectionCard from "@/components/sectionCard/SectionCard";
import { ProductSection } from "@/components/productsSections";
import { SectionEnum } from "@/utils/global/globalTypes";
import { useBooks } from "@/hooks/useBooks";

const MAIN_SECTIONS = [
  {
    title: "Terror",
    subtitle: "Historias que no te dejarán dormir.",
    type: SectionEnum.TERROR,
  },
  {
    title: "Autores Firmados",
    subtitle: "Piezas de colección únicas.",
    type: SectionEnum.AUTHOR,
  },
  {
    title: "Club de Lectura",
    subtitle: "Acceso a eventos y descuentos.",
    type: SectionEnum.CLUB,
  },
];

const Home = () => {
  const navigate = useNavigate();

  // Todos los libros
  const { books: allBooks, loading: loadingAll, error: errorAll } = useBooks();

  // Libros por sección
  const sectionsData = MAIN_SECTIONS.map(({ type }) => ({
    type,
    ...useBooks(type.toLowerCase()), // books, loading, error
  }));

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center overflow-x-hidden">
      {/* Hero */}
      <section className="w-full max-w-7xl h-[40vh] sm:h-[50vh] md:h-[60vh] mt-10 overflow-hidden rounded-xl shadow-2xl relative">
        <img
          src="src/assets/images/librarybookshell.jpg"
          alt="Biblioteca"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-slate-900/50 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-400 mb-3">
            Bienvenido a tu universo literario
          </h1>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl">
            Explora historias, autores y mundos que solo los libros pueden
            ofrecerte.
          </p>
        </div>
      </section>

      {/* Todos los libros */}
      <section className="w-full grid gap-6 mt-10 px-4 sm:px-6 md:px-8 max-w-7xl">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">
          Todos los libros
        </h2>
        {loadingAll && <p>Cargando libros...</p>}
        {errorAll && <p>Error: {errorAll}</p>}
        {!loadingAll && allBooks.length > 0 && (
          <ProductSection title="" subtitle="" />
        )}
        {!loadingAll && allBooks.length === 0 && (
          <p>No hay libros disponibles.</p>
        )}
      </section>

      {/* Secciones */}
      {sectionsData.map(({ type, loading, error }) => (
        <section
          key={type}
          className="w-full grid gap-6 mt-10 px-4 sm:px-6 md:px-8 max-w-7xl"
        >
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">
            {type
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase())}
          </h2>

          {loading && <p>Cargando libros de {type}...</p>}
          {error && <p>Error: {error}</p>}

          {!loading && !error && (
            <ProductSection
              section={type as SectionEnum}
              title=""
              subtitle=""
            />
          )}
        </section>
      ))}

      {/* Cards promocionales */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 max-w-7xl w-full mb-20">
        {MAIN_SECTIONS.map((item) => (
          <SectionCard
            key={item.type}
            {...item}
            image=""
            buttonText=""
            onClick={() => navigate(`/${item.type.toLowerCase()}`)}
          />
        ))}
      </section>

      {/* Footer */}
      <footer className="grid place-items-center w-full bg-slate-800 py-6 text-gray-400 text-xs sm:text-sm">
        <p>
          © {new Date().getFullYear()} Librium Books — Todos los derechos
          reservados.
        </p>
      </footer>
    </main>
  );
};

export default Home;
