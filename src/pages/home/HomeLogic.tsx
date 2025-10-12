import { useBooks } from "@/hooks/useBooks";

export const useHomeLogic = () => {
  const { books, loading, error } = useBooks(); 

  const featuredBooks = books.slice(0, 6);

  return {
    books,
    featuredBooks,
    loading,
    error,
  };
};
