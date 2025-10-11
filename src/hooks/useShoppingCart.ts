import { useEffect, useState, useCallback } from "react";
import { CartService } from "@/services/cartService";
import { useUserStore } from "@/store/useUserStore";

interface CartItem {
  book_id: number;
  title: string;
  price: number;
  quantity: number;
}

export function useShoppingCart() {
  const { id: userId } = useUserStore();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Cargar carrito del backend
  const loadCart = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const backendCart = await CartService.getUserCart(userId);
      const mapped = backendCart.map((item: any) => ({
        book_id: item.book.id,
        title: item.book.title,
        price: item.book.price ?? 0,
        quantity: 1,
      }));
      setItems(mapped);
    } catch (err) {
      console.error("Error cargando carrito:", err);
      setError("Error al cargar el carrito");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // 🔹 Agregar libro
  const syncAdd = async (bookId: number, title: string, price: number) => {
    if (!userId) return;
    try {
      await CartService.addToCart(userId, bookId);
      setItems((prev) => [
        ...prev,
        { book_id: bookId, title, price, quantity: 1 },
      ]);
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      setError("Error al agregar al carrito");
    }
  };

  // 🔹 Eliminar libro
  const syncRemove = async (bookId: number) => {
    if (!userId) return;
    try {
      await CartService.removeFromCart(userId, bookId);
      setItems((prev) => prev.filter((item) => item.book_id !== bookId));
    } catch (err) {
      console.error("Error al eliminar del carrito:", err);
      setError("Error al eliminar del carrito");
    }
  };

  // 🔹 Vaciar carrito
  const syncClear = async () => {
    if (!userId) return;
    try {
      await CartService.clearCart(userId);
      setItems([]);
    } catch (err) {
      console.error("Error al vaciar carrito:", err);
      setError("Error al vaciar carrito");
    }
  };

  return {
    items,
    loading,
    error,
    syncAdd,
    syncRemove,
    syncClear,
    reload: loadCart,
  };
}
