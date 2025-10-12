import axios from "axios";
import { ApiPaths } from "@/utils/ApiPath";
import { SectionEnum } from "@/utils/global/globalTypes";

export interface Book {
  id?: number;
  title: string;
  author: string;
  description?: string;
  year?: number;
  image_url?: string;
  price?: number;
  cover_url?: string;
}

export const BookService = {
  async getAll(section?: SectionEnum): Promise<Book[]> {
    const url = section
      ? `${ApiPaths.books.sections(section)}`
      : `${ApiPaths.books.getAll}`;

    const { data } = await axios.get(url);
    return Array.isArray(data.items) ? data.items : [];
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
