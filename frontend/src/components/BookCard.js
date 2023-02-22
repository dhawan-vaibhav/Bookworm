import React from "react";

const BookCard = ({ book: { volumeInfo } }) => {
  const { title, authors, imageLinks } = volumeInfo;

  console.log(title, authors, imageLinks, "wtf");

  return (
    <div className="book">
      <div>
        <p>Title: {title}</p>
      </div>
      <div>
        <img
          src={
            imageLinks
              ? imageLinks.thumbnail
              : "https://image-placeholder.com/images/actual-size/120x150.png"
          }
        />
      </div>
    </div>
  );
};

export default BookCard;
