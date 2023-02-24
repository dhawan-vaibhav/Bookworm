import React, { useState } from "react";
import { render } from "react-dom";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [library, setLibrary] = useState([]);

  const searchBooksAPI = async (title) => {
    const response = await fetch(`${API_URL}?q=${title}&maxResults=${5}`);
    const data = await response.json();
    return data.items;
  };

  const parseBookData = (bookData) => {
    const parsedData = bookData.map((data) => {
      const volumeInfo = data.volumeInfo;
      const title = volumeInfo.hasOwnProperty("title")
        ? volumeInfo.title
        : "N/A";
      const authors = volumeInfo.hasOwnProperty("authors")
        ? volumeInfo.authors
        : [];
      const imageLinks = volumeInfo.hasOwnProperty("imageLinks")
        ? volumeInfo.imageLinks
        : [];

      return { title, authors, imageLinks };
    });

    return parsedData;
  };

  const handleBookSearch = async (title) => {
    const bookData = await searchBooksAPI(title);
    const parsedBookData = parseBookData(bookData);
    console.log(parsedBookData);
    setBooks(parsedBookData);
  };

  const handleAddButton = (book) => {
    setLibrary([...library, book]);
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Books by Title"
        />
        <button type="submit" onClick={() => handleBookSearch(searchTerm)}>
          Search
        </button>
      </div>
      {books?.length > 0 ? (
        <div className="container">
          {books.map((book) => (
            <div className="searchResults">
              <p>{book.title}</p>
              <button onClick={() => handleAddButton(book)}>Add</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty"></div>
      )}
      {library?.length > 0 ? (
        <div className="library">
          {library.map((book) => (
            <p>{book.title}</p>
          ))}
        </div>
      ) : (
        <div className="empty"></div>
      )}
    </div>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);
