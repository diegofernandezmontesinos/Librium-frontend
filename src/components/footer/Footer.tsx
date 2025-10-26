import React from "react";
import { useTranslation } from "react-i18next";

// Datos de ejemplo para la navegación del footer
const FOOTER_LINKS = [
  {
    title: "Acerca de",
    url: "/https://www.linkedin.com/in/diego-fernandez-montesinos/",
  },
  { title: "Contacto", url: "/contact" },
  { title: "Términos", url: "/terms" },
  { title: "Privacidad", url: "/privacy" },
];

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer
      // El fondo ocupa el 100% de ancho (w-full)
      className="w-full bg-zinc-950 text-gray-400 border-t border-lavanda-400/50"
    >
      {/* Contenedor centralizado para limitar el ancho del contenido */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Sección de Navegación y Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* Columna de Navegación */}
          <div className="flex space-x-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.title}
                href={link.url}
                className="text-sm font-medium hover:text-emerald-400 transition duration-150"
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Columna de Logo/Marca */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold text-lavanda-400">Librium</h3>
            <p className="text-xs mt-1">
              © {new Date().getFullYear()} {t("footer.rigthsReserved")}
            </p>
          </div>
        </div>

        {/* Pequeña nota (el mensaje original, pero coherente) */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-xs text-gray-600">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
