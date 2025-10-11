import React, { useEffect, useState } from "react";
import { Book, BookService } from "@/services/books";

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<Book>({
    title: "",
    author: "",
    description: "",
    year: undefined,
    image_url: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      if (form.description) formData.append("description", form.description);
      if (form.year) formData.append("year", String(form.year));
      if (form.image_url) formData.append("image_url", form.image_url);
      if (file) formData.append("image", file);

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

  return (
    <div className="min-h-screen bg-slate-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-400">
          📚 Book Manager
        </h1>

        {/* FORM */}
        <div className="bg-white text-gray-800 rounded-xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            {editingId ? "✏️ Edit Book" : "➕ Add Book"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              placeholder="Title"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Author"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              className="border rounded-lg p-3 md:col-span-2 focus:ring-2 focus:ring-indigo-500"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Year"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              value={form.year || ""}
              onChange={(e) =>
                setForm({ ...form, year: Number(e.target.value) })
              }
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              value={form.image_url || ""}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            />
            <div className="md:col-span-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border rounded-lg p-3 w-full"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 rounded-lg max-h-48 object-cover mx-auto"
                />
              )}
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 transition-colors md:col-span-2"
            >
              {editingId ? "Update Book" : "Add Book"}
            </button>
          </form>
        </div>

        {/* GRID DE LIBROS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg p-5 shadow-md text-gray-900"
            >
              {book.image_url && (
                <img
                  src={`http://localhost:4000/${book.image_url}`}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h3 className="font-bold text-lg">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="mt-2 text-sm">{book.description}</p>
              <p className="text-xs text-gray-500">📅 {book.year}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(book)}
                  className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id!)}
                  className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
