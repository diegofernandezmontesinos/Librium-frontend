import { useCart } from "react-use-cart";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const CartItem = ({ id, name, price, quantity }: CartItemProps) => {
  const { updateItemQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center justify-between border-b py-2">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-emerald-600">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateItemQuantity(id, quantity - 1)}
          className="px-2 bg-emerald-600 rounded hover:bg-gray-300"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => updateItemQuantity(id, quantity + 1)}
          className="px-2 bg-emerald-600 rounded hover:bg-gray-300"
        >
          +
        </button>
        <button
          onClick={() => removeItem(id)}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
      <div>${(price * quantity).toFixed(2)}</div>
    </div>
  );
};
