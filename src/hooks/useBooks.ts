import { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "@/services/booksService";
import { ApiPaths } from "@/utils/ApiPath";

interface UseBooksResult {
  books: Book[];
  loading: boolean;
  error: string | null;
}

export const useBooks = (section?: string): UseBooksResult => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          section ? ApiPaths.books.sections(section) : ApiPaths.books.getAll
        );
        setBooks(res.data.items || []);
      } catch (err: any) {
        setError(err.message || "Error fetching books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [section]);

  return { books, loading, error };
};
