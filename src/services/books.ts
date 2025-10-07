// src/services/books.ts
import axios from "axios";
import { ApiPaths } from "../utils/ApiPath";

export interface Book {
  id?: number;
  title: string;
  author: string;
  description?: string;
  year?: number;
  image_url?: string;
}

export const BookService = {
  getAll: async (): Promise<Book[]> => {
    const { data } = await axios.get(ApiPaths.books.getAll);
    return data;
  },

  createFormData: async (formData: FormData) => {
    const { data } = await axios.post(ApiPaths.books.create, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  updateFormData: async (id: number, formData: FormData) => {
    const { data } = await axios.put(ApiPaths.books.update(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  delete: async (id: number) => {
    const { data } = await axios.delete(ApiPaths.books.delete(id));
    return data;
  },
};
