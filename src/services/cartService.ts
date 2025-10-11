// src/services/CartService.ts
import axiosInstance from "@/utils/axios/AxiosInstance";
import { ApiPaths } from "@/utils/ApiPath";

export const CartService = {
  getUserCart: async (userId: number) => {
    const { data } = await axiosInstance.get(ApiPaths.cart.getByUser(userId));
    return data;
  },

  addToCart: async (userId: number, bookId: number) => {
    const { data } = await axiosInstance.post(ApiPaths.cart.add, {
      user_id: userId,
      book_id: bookId,
    });
    return data;
  },

  removeFromCart: async (userId: number, bookId: number) => {
    await axiosInstance.delete(ApiPaths.cart.remove(userId, bookId));
  },

  clearCart: async (userId: number) => {
    await axiosInstance.delete(ApiPaths.cart.clear(userId));
  },
};
