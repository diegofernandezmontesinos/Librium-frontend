// src/services/books.ts
import axiosInstance from "../utils/axios/AxiosInstance";

export interface Book {
  id?: number;
  title: string;
  author: string;
  description?: string;
  year?: number;
}

export const BookService = {
  getAll: async () => {
    const res = await axiosInstance.get<Book[]>("/books");
    return res.data;
  },
  getById: async (id: number) => {
    const res = await axiosInstance.get<Book>(`/books/${id}`);
    return res.data;
  },
  create: async (book: Book) => {
    const res = await axiosInstance.post<Book>("/books", book);
    return res.data;
  },
  update: async (id: number, book: Partial<Book>) => {
    const res = await axiosInstance.put<Book>(`/books/${id}`, book);
    return res.data;
  },
  delete: async (id: number) => {
    await axiosInstance.delete(`/books/${id}`);
  },
};
