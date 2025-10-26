import { useEffect, useState } from "react";
import { Book, BookService } from "@/services/booksService";
import { SectionEnum } from "@/utils/global/globalTypes";

export const useBooksPageLogic = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Book & { section?: SectionEnum }>({
    title: "",
    author: "",
    description: "",
    year: undefined,
    image_url: "",
    section: undefined,
    price: 0,
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await BookService.getAll();
      setBooks(data);
    } catch {
      setError("Error loading books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("author", form.author);
      formData.append("price", String(form.price));
      if (form.description) formData.append("description", form.description);
      if (form.year) formData.append("year", String(form.year));
      if (form.image_url) formData.append("image_url", form.image_url);
      if (file) formData.append("image", file);
      if (form.section) formData.append("section", form.section);

      if (editingId) {
        await BookService.updateFormData(editingId, formData);
      } else {
        await BookService.createFormData(formData);
      }

      setForm({
        title: "",
        author: "",
        description: "",
        year: undefined,
        image_url: "",
        price: 0,
      });
      setFile(null);
      setPreview(null);
      setEditingId(null);
      fetchBooks();
    } catch {
      setError("Error saving book");
    }
  };

  const handleEdit = (book: Book) => {
    setForm(book);
    setEditingId(book.id || null);
    setPreview(book.image_url || null);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      await BookService.delete(id);
      fetchBooks();
    }
  };

  const getImageSrc = (image_url?: string | null) => {
    if (!image_url || image_url === "null" || image_url.trim() === "") {
      return "/assets/default-book.png";
    }

    if (image_url.startsWith("http")) {
      return image_url;
    }

    return `${API_URL}/${image_url}`;
  };

  return {
    books,
    file,
    preview,
    form,
    editingId,
    loading,
    error,
    setForm,
    handleFileChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    getImageSrc,
  };
};
