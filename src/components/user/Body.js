import React, { useState, useEffect } from 'react';
import '../../styles/user/UserHome.scss';
import BookItem from './BookItem'; // Import the new BookItem component
import { useSelector } from 'react-redux';
import { fetchBook } from '../../service/userApiService';
const Body = ({ category, searchResult, isSearch }) => {
  const [bookData, setBookData] = useState([]);
  const token = useSelector((state) => state.user.user.token);

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetchBook(token, category);
        setBookData(response.data.data.content);
        console.log(response)
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    if (isSearch === true) {
      setBookData(searchResult);
    } else {
      getBook(); // Show trending books if no search
    }
  }, [category, searchResult]);

  return (
    <div className="body">
      <h2>{isSearch ? 'Search Results' : 'Trending Books'}</h2>
      <div className="book-list">
        {bookData.length > 0 ? (
          bookData.map((book) => <BookItem key={book.id} book={book} />) // Use the new BookItem component
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Body;
