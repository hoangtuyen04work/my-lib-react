import axios from "./customize-axios";


const fetchBookDetailData = (token, id) => {
    return axios.get(`/book/book/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}

const fetchBook = (token, category) => {
    return axios.get(`/book/book/top?typeId=${category}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const fetchAllBookType = (token) => {
    return axios.get(`/book/category/all`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
const postRating = (token, userId, bookId, rating, comment, userName) => {
    return axios.post('/rating/rate', {
        userId: userId,
        bookId: bookId,
        rating: rating,
        comment: comment,
        userName: userName
    },
        {
            headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
const returnBook = (token, userId, id) => {
    return axios.put(`/borrow/return/${userId}/${id}`,
        {
            headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
const borrowBook = (token, userId, id) => {
    return axios.put(`/borrow/borrow/${userId}/${id}`,
        {
            headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const isRated = (token,userId, bookId) => {
    return axios.get(`/rating/rate/book?bookId=${bookId}`,
        {
            headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const fetchRating = (token, bookId) => {
    return axios.get(`/rating/rate/book?bookId=${bookId}`,
        {
            headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
const fetchBookInfo = (token, bookId) => {
    return axios.get(`/book/book/${bookId}`,
        {
            headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export {
    fetchBookDetailData,
    fetchBook,
    fetchAllBookType,
    returnBook,
    borrowBook,
    isRated,
    fetchBookInfo,
    fetchRating,
    postRating
};