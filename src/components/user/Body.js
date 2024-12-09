import React, { useState, useEffect } from 'react';
import '../../styles/user/UserHome.scss';
import BookItem from './BookItem'; 
import { useSelector } from 'react-redux';
import { fetchBook, searchBookByName } from '../../service/userApiService';

const Body = ({ category }) => {
  const [bookData, setBookData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Thêm state loading
  const token = useSelector((state) => state.user.user.token);
  const isSearch = useSelector((state) => state.user.search.isSearch);
  const search = useSelector((state) => state.user.search.searchContent)

  const getBook = async () => {
    setLoading(true);
    try {
      const response = await fetchBook(token, category, currentPage, 12);
      setBookData(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error('Error fetching book data:', error);
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  };

  const searchByName = async () => {
    setLoading(true);
    try {
      const response = await searchBookByName(token, search, currentPage - 1, 12);
      console.log("rser", response)
      setBookData(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error('Error search book data:', error);
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  }

  useEffect(() => {
    if (isSearch === true) {
      searchByName();
    } else {
      getBook();
    }
  }, [category, currentPage, isSearch]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  return (
    <div className="body">
      <h2>{isSearch ? 'Search Results' : 'Trending Books'}</h2>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <div className="book-list">
          {bookData.length > 0 ? (
            bookData.map((book) => <BookItem key={book.id} book={book} />)
          ) : (
            <p>No books found.</p>
          )}
          </div>
        //   <div className="book-list">
        //   {bookData.length > 0 ? (
        //     bookData.map((book) => (
        //       <BookItem key={book.id} book={book} />
        //     ))
        //   ) : (
        //     <p>No books found.</p>
        //   )}
        // </div>
      )}
  
      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
  
        {Array.from({ length: totalPages }, (_, index) => {
          if (
            index + 1 === currentPage ||
            index + 1 === 1 ||
            index + 1 === totalPages ||
            Math.abs(currentPage - (index + 1)) <= 2
          ) {
            return (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            );
          }
          if (
            (index + 1 === currentPage - 3 && currentPage > 4) ||
            (index + 1 === currentPage + 3 && currentPage < totalPages - 3)
          ) {
            return <span key={index} className="ellipsis">...</span>;
          }
          return null;
        })}
  
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Body;
