import React from "react";
import { BookSection } from "./BooksTypes";
import {
  books,
  editingId,
  form,
  handleDelete,
  handleEdit,
  handleFileChange,
  handleSubmit,
  preview,
  setForm,
} from "./BooksPageLogic";

const BooksPage: React.FC = () => {
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
            {/* Select para la sección */}
            <select
              value={form.section || ""}
              onChange={(e) =>
                setForm({ ...form, section: e.target.value as BookSection })
              }
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Section</option>
              {Object.values(BookSection).map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Image URL (optional)"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              value={form.image_url || ""}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              value={form.price || 0}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              required
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
