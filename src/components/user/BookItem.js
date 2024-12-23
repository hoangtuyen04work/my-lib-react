import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user/BookItem.scss'; // Giữ nguyên nếu cần style
const BookItem = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  const handleImageError = (e) => {
    e.target.src = '/download.jpg'; // Đường dẫn đến ảnh placeholder
  };

  return (
    <div className="book-item" onClick={handleClick}>
      <div className="book-image-wrapper">
        <img 
          src={book.image} 
          alt={book.title} 
          onError={handleImageError} 
        />
      </div>
      <h3>{book.name}</h3>
      <p>Borrowed: {book.numberBorrowed}</p>
    </div>
  );
};

export default BookItem;
