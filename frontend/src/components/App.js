import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import BookCard from "./BookCard";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    searchBooks("spiderman");
  }, []);

  const searchBooks = async (title) => {
    const response = await fetch(`${API_URL}?q=${title}&maxResults=${5}`);
    const data = await response.json();

    setBooks(data.items);
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Books by Title"
        />
        <button type="submit" onClick={() => searchBooks(searchTerm)}>
          Search
        </button>
      </div>
      {books?.length > 0 ? (
        <div className="container">
          {books.map((book) => (
            <BookCard book={book} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);
