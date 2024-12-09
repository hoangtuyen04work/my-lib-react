import axios from "./customize-axios";


const fetchBookDetailData = (token, id) => {
    return axios.get(`/book/book/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}

const fetchBook = (token, category, page, size) => {
    return axios.get(`/book/book/top?typeId=${category}&page=${page}&size=${size}`, {
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
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const returnBook = (token, userId, id) => {
    return axios.put(`/borrow/return/${userId}/${id}`,
        null,
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
const borrowBook = (token, userId, id) => {
    return axios.put(`/borrow/borrow/${userId}/${id}`,
        null,
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const isBorrowed = (token, userId, id) => {
    return axios.get(`/borrow/check?userId=${userId}&bookId=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const fetchRating = (token, id) => {
    return axios.get(`/rating/rate/book?bookId=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const fetchBookInfo = (token, id) => {
    return axios.get(`/book/book/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const searchBookByName = (token, name, page, size) => {
    return axios.get(`/search/search?name=${name}&page=${page}&size=${size}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export {
    searchBookByName,
    fetchBookDetailData,
    fetchBook,
    fetchAllBookType,
    returnBook,
    borrowBook,
    isBorrowed,
    fetchBookInfo,
    fetchRating,
    postRating
};