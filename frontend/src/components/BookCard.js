import React from "react";

const BookCard = ({ book: { volumeInfo } }) => {
  const { title } = volumeInfo;

  return (
    <div className="book">
      <div>
        <p>{title}</p>
      </div>
      <div>
        <button>Add</button>
      </div>
    </div>
  );
};

export default BookCard;
