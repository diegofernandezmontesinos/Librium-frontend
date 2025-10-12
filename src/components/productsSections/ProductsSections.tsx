import { useEffect, useState } from "react";
import { ProductCard } from "@/components/shoppingCart/productCard/ProductCard";
import { Book, BookService } from "@/services/booksService";
import { ProductSectionProps } from "./ProductsTypes";

export const ProductSection = ({
  section,
  title,
  subtitle,
  bgColor = "bg-slate-900",
}: ProductSectionProps) => {
  const [products, setProducts] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      const data = await BookService.getAll(section ? section : undefined);
      setProducts(data);
    })();
  }, [section]);

  return (
    <section className={`${bgColor} w-full py-16`}>
      <div className="max-w-7xl mx-auto text-white">
        <h2 className="text-3xl font-bold text-emerald-400 mb-2 text-center">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-300 text-center mb-8">{subtitle}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              image={product.image_url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
