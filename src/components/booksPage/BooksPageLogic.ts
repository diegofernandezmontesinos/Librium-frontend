import { Book, BookService } from "@/services/booksService";
import { useEffect, useState } from "react";
import { BookSection } from "./BooksTypes";

export const [books, setBooks] = useState<Book[]>([]);
export const [file, setFile] = useState<File | null>(null);
export const [preview, setPreview] = useState<string | null>(null);
export const [editingId, setEditingId] = useState<number | null>(null);
export const [loading, setLoading] = useState(false);
export const [error, setError] = useState<string | null>(null);

export const [form, setForm] = useState<Book & { section?: BookSection }>({
  title: "",
  author: "",
  description: "",
  year: undefined,
  image_url: "",
  section: undefined,
  price:0
});

useEffect(() => {
  fetchBooks();
}, []);

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

export const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selected = e.target.files?.[0];
  if (selected) {
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }
};

export const handleSubmit = async (e: React.FormEvent) => {
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
      price:0
    });
    setFile(null);
    setPreview(null);
    setEditingId(null);
    fetchBooks();
  } catch {
    setError("Error saving book");
  }
};

export const handleEdit = (book: Book) => {
  setForm(book);
  setEditingId(book.id || null);
  setPreview(book.image_url || null);
};

export const handleDelete = async (id: number) => {
  if (confirm("Are you sure you want to delete this book?")) {
    await BookService.delete(id);
    fetchBooks();
  }
};
