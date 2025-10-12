import { useBooks } from "@/hooks/useBooks";

export const useSectionLogic = (section: string) => {
  const { books, loading, error } = useBooks(section);

  const sortedBooks = books.sort((a, b) => (a.year || 0) - (b.year || 0));

  return {
    books: sortedBooks,
    loading,
    error,
  };
};
