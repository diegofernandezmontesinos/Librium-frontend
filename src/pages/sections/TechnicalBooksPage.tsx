import { useBooks } from "@/hooks/useBooks";
import { BookGrid } from "@/components/booksSections/BookGrid";

const TechnicalBooksPage = () => {
  const { books, loading } = useBooks("technicalBooks");

  return (
    <div className="px-4 sm:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Technical Books
      </h1>
      <BookGrid books={books} loading={loading} />
    </div>
  );
};
export default TechnicalBooksPage;