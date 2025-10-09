import { useCart } from "react-use-cart";
import { CartItem } from "../cartItem/CartItem";

export function CartSummary() {
  const { items, cartTotal, emptyCart } = useCart();
  const ivaRate = 0.21;
  const ivaAmount = cartTotal * ivaRate;
  const totalWithIva = cartTotal + ivaAmount;

  if (items.length === 0) {
    return (
      <p className="text-red-500 text-center mt-10 text-lg">
        Tu carrito está vacío 🛒
      </p>
    );
  }

  return (
    <div className="bg-slate-900 text-white shadow-lg rounded-2xl p-6 mx-auto mt-8 w-[80%] max-w-5xl">
      <h2 className="text-2xl font-bold mb-6 text-emerald-400 text-center">
        Resumen de compra
      </h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </div>

      <div className="border-t border-gray-700 pt-4 text-right space-y-1">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>IVA (21%):</span>
          <span>${ivaAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-2 text-emerald-400">
          <span>Total:</span>
          <span>${totalWithIva.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={emptyCart}
          className="flex-1 bg-indigo-600 text-white font-semibold py-3 rounded-xl transition duration-200"
        >
          Vaciar carrito
        </button>
        <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition duration-200">
          Pagar
        </button>
      </div>
    </div>
  );
}
