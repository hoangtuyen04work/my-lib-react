import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/user/BookDetail.scss'
import Header from './Header';
import { useSelector } from 'react-redux';
import {    
  returnBook,
  borrowBook,
  isBorrowed,
  fetchBookInfo,
  fetchRating,
  postRating 
} from '../../service/userApiService';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [borrowStatus, setBorrowStatus] = useState(false);
  const [borrowId, setBorrowId] = useState();
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const [selectedRating, setSelectedRating] = useState(null); // Lưu đánh giá đã chọn
  const token = useSelector((state) => state.user.user.token);
  const userId = useSelector((state) => state.user.user.id);
  const userName = useSelector((state) => state.user.user.name);

  const handleRatingChange = (star) => {
    setRating(star);
    setSelectedRating(star);
  };

  const getInfo = async () => {
    try {
      setLoading(true); // Bắt đầu loading
      const response = await fetchBookInfo(token, id);
      setBook(response.data.data);
    } catch (error) {
      console.error('Error fetching book info:', error);
    }
  };

  const getRatings = async () => {
    try {
      const response = await fetchRating(token, id);
      setReviews(response.data.data.content);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const checkBorrowed = async () => {
    try {
      const response = await isBorrowed(token, userId, id);
      setBorrowStatus(response.data.data);
    } catch (error) {
      console.error('Error checking borrow status:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getInfo();
        await getRatings();
        await checkBorrowed();
      } catch (error) {
        console.error('Error during data fetching:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleBorrow = async () => {
    try {
      console.log(userId, id)
      const response = await borrowBook(token, userId, id);
      setBorrowStatus(response.data.data || false);
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const handleReturn = async () => {
    try {
      const response = await returnBook(token, userId, id);
      if (response.data.data) setBorrowStatus(false);
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await postRating(token, userId, id, rating, comment, userName);
      if (response.data.data) {
        const existingReviewIndex = reviews.findIndex((review) => review.userId === userId);
        if (existingReviewIndex !== -1) {
          const updatedReviews = [...reviews];
          updatedReviews[existingReviewIndex] = { userId, userName, rating, comment };
          setReviews(updatedReviews);
        } else {
          setReviews([...reviews, { userId, userName, rating, comment }]);
        }
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
    setComment('');
    setRating(0);
    setSelectedRating(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="book-detail">
        <h1>{book.name}</h1>
        <div className="book-info">
          <img src={book.image} alt={book.name} />
          <div className="book-description">
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publication Date:</strong> {book.publicationDate}</p>
            <p><strong>Price:</strong> {book.price} VND</p>
            <p><strong>Description:</strong> {book.shortDescription}</p>
            {borrowStatus ? (
              <button onClick={handleReturn}>Return Book</button>
            ) : (
              <button onClick={handleBorrow}>Borrow Book</button>
            )}
          </div>
        </div>

        <h2>Submit Your Review</h2>
        <form onSubmit={handleSubmitReview}>
          <div>
            <label>Rating:</label>
            <div className="star-rating">
              {[5, 4, 3, 2, 1].map((star) => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`star${star}`}
                    name="rating"
                    value={star}
                    checked={rating === star}
                    onChange={() => handleRatingChange(star)}
                  />
                  <label htmlFor={`star${star}`}>★</label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Review</button>
        </form>

        {selectedRating && (
          <div className="selected-rating">
            You have selected {selectedRating} stars.
          </div>
        )}

        <h3>Reviews</h3>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>Rating:</strong> {review.rating} ★<br />
              <strong>{review.userName}:</strong> {review.comment} <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetail;
