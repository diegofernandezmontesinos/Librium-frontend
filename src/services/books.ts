// src/services/books.ts
import axios from "axios";
import { ApiPaths } from "../utils/ApiPath";

export interface Book {
  id?: number;
  title: string;
  author: string;
  description?: string;
  year?: number;
}

export const BookService = {
  getAll: async () => {
    const res = await axios.get<Book[]>(ApiPaths.books.getAll);
    return res.data;
  },

  getById: async (id: number) => {
    const res = await axios.get<Book>(ApiPaths.books.getById(id));
    return res.data;
  },

  create: async (book: Book) => {
    const res = await axios.post<Book>(ApiPaths.books.create, book);
    return res.data;
  },

  update: async (id: number, book: Book) => {
    const res = await axios.put<Book>(ApiPaths.books.update(id), book);
    return res.data;
  },

  delete: async (id: number) => {
    await axios.delete(ApiPaths.books.delete(id));
  },
};
