import { BookGrid } from "@/components/booksSections/BookGrid";
import { useSectionLogic } from "./sectionLogic";
import { EmptyState } from "@/components/booksSections/EmptyState";

const TerrorPage = () => {
  const { books, loading, error } = useSectionLogic("fiction");

  if (error) return <EmptyState message={error} />;

  return (
    <div className="px-4 sm:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Terror Books
      </h1>
      <BookGrid books={books} loading={loading} />
    </div>
  );
};

export default TerrorPage;
