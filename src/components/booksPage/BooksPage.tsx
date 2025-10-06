// src/pages/books/BooksPage.tsx
import React, { useEffect, useState } from "react";
import { Book, BookService } from "../../services/books";
import GlobalLayout from "../layouts/GlobalLayout";

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState<Book>({
    title: "",
    author: "",
    description: "",
    year: undefined,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await BookService.update(editingId, form);
      } else {
        await BookService.create(form);
      }
      setForm({ title: "", author: "", description: "", year: undefined });
      setEditingId(null);
      fetchBooks();
    } catch {
      setError("Error saving book");
    }
  };

  const handleEdit = (book: Book) => {
    setForm(book);
    setEditingId(book.id || null);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      await BookService.delete(id);
      fetchBooks();
    }
  };

  return (
    <GlobalLayout>
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
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 transition-colors md:col-span-2"
              >
                {editingId ? "Update Book" : "Add Book"}
              </button>
            </form>
          </div>

          {/* RESPONSIVE CARDS + TABLE */}
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : books.length === 0 ? (
            <p className="text-center text-gray-400">No books found</p>
          ) : (
            <>
              {/* Cards en móvil */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:hidden">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg p-5 shadow-md text-gray-900"
                  >
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

              {/* Tabla en desktop */}
              <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Author</th>
                      <th className="px-6 py-4">Year</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr
                        key={book.id}
                        className="border-b hover:bg-gray-100 text-black"
                      >
                        <td className="px-6 py-4">{book.title}</td>
                        <td className="px-6 py-4">{book.author}</td>
                        <td className="px-6 py-4">{book.year}</td>
                        <td className="px-6 py-4 text-center space-x-2">
                          <button
                            onClick={() => handleEdit(book)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(book.id!)}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </GlobalLayout>
  );
};

export default BooksPage;
