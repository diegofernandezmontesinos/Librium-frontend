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
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-6 text-center">
            📚 Books Management
          </h1>

          {/* FORM */}
          <div className="bg-white text-black rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "✏️ Edit Book" : "➕ Add Book"}
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Title"
                className="border rounded p-2"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Author"
                className="border rounded p-2"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="border rounded p-2 sm:col-span-2"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Year"
                className="border rounded p-2"
                value={form.year || ""}
                onChange={(e) =>
                  setForm({ ...form, year: Number(e.target.value) })
                }
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 sm:col-span-2"
              >
                {editingId ? "Update Book" : "Add Book"}
              </button>
            </form>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {loading ? (
              <p className="p-4 text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="p-4 text-red-600">{error}</p>
            ) : books.length === 0 ? (
              <p className="p-4 text-center text-gray-500">No books found</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Author</th>
                    <th className="px-4 py-3">Year</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr
                      key={book.id}
                      className="border-b hover:bg-gray-100 text-black"
                    >
                      <td className="px-4 py-3">{book.title}</td>
                      <td className="px-4 py-3">{book.author}</td>
                      <td className="px-4 py-3">{book.year}</td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(book)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book.id!)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default BooksPage;
