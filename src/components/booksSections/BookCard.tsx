import React from "react";
import { Book } from "@/services/booksService";

interface Props {
  book: Book;
}

export const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 bg-white dark:bg-gray-800 cursor-pointer">
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={book.cover_url || "/placeholder-book.jpg"}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 flex flex-col gap-1">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
          {book.author}
        </p>
        {book.price && (
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            ${book.price.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};
