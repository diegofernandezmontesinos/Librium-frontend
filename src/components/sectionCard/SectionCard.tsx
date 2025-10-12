interface SectionCardProps {
  title: string;
  subtitle?: string;
  image: string;
  buttonText: string;
  onClick: () => void;
}

const SectionCard = ({
  title,
  subtitle,
  image,
  buttonText,
  onClick,
}: SectionCardProps) => {
  return (
    <article
      className="relative flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-xl 
                 hover:bg-gray-700 hover:shadow-lavender-500/70 transition-all duration-300 group 
                 cursor-pointer border-4 border-transparent hover:border-lavender-400"
      onClick={onClick} // Aplicamos el click al artículo completo para una mejor UX
    >
      <div className="h-64 w-full overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="text-center">
        <h3 className="text-3xl font-bold text-lavender-400 mb-2">{title}</h3>
        <p className="text-lg text-gray-300 mb-6">{subtitle}</p>
      </div>

      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full max-w-xs py-3 font-extrabold text-gray-900 bg-emerald-400 rounded-full 
        shadow-lg hover:bg-emerald-300 transition duration-300 uppercase tracking-wider"
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
};

export default SectionCard;
