interface Props {
  message?: string;
}

export const EmptyState: React.FC<Props> = ({
  message = "No books found 📚",
}) => (
  <div className="text-center text-gray-500 dark:text-gray-400 py-10">
    {message}
  </div>
);
