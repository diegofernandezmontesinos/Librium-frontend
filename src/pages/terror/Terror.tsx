import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Terror.css";

function Terror() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://stephen-king-api.onrender.com/api/books")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setBooks(response.data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }
  return (
    <>
      <Header />
      <div>Terror Page</div>
      <div className="book-item">
        {books.map((book) => {
          return (
            <div key={book.id}>
              <h3>{book.Title}</h3>
              <p>{book.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Terror;
