import { useCart } from "react-use-cart";

export function ProductCard({ id, name, price, image }) {
  const { addItem } = useCart();

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col items-center">
      <img src={image} alt={name} className="w-32 h-32 object-contain" />
      <h3 className="font-semibold mt-2">{name}</h3>
      <p className="text-gray-500">${price}</p>
      <button
        onClick={() => addItem({ id, name, price })}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Añadir al carrito
      </button>
    </div>
  );
}
