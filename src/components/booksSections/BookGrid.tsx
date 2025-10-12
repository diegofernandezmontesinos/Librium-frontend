import React from "react";
import { BookCard } from "./BookCard";
import { Book } from "@/services/booksService";
import { BookSkeleton } from "./BookSkeleton";
import { EmptyState } from "./EmptyState";

interface Props {
  books: Book[];
  loading?: boolean;
}

export const BookGrid: React.FC<Props> = ({ books, loading }) => {
  if (loading)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <BookSkeleton key={i} />
        ))}
      </div>
    );

  if (!books.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
