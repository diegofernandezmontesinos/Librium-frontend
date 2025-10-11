// src/components/productSection/ProductSection.tsx
import { ProductCard } from "@/components/shoppingCart/productCard/ProductCard";
import { HomeEnum } from "@/pages/home/HomeTypes";
import { productsBySection } from "@/mocks/ProductBySections";
import { useEffect, useState } from "react";
import { Book, BookService } from "@/services/booksService";

interface ProductSectionProps {
  section: HomeEnum;
  title: string;
  subtitle?: string;
  bgColor?: string;
}

export const ProductSection = ({
  section,
  title,
  subtitle,
  bgColor = "bg-slate-900",
}: ProductSectionProps) => {

  const [products, setProducts] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      const data = await BookService.getAll(section);
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
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};
