import axios from "./customize-axios";


const fetchBookData = (token, bookId) => {
    return axios.get(`/book/book/${bookId}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}


// const updateBookData = (token, bookId, bookData) => {
//     const formData = new FormData();
//     for (const key in bookData) {
//         if (Array.isArray(bookData[key])) {
//             bookData[key].forEach((item) => formData.append(`${key}[]`, item));
//         } else {
//             formData.append(key, bookData[key]);
//         }
//     }

//     return axios.put(`/book/book/update?id=${bookId}`, formData, {
//         headers: {
//             Authorization: `Bearer ${token}`, // Thêm token
//             "Content-Type": "multipart/form-data", // Định dạng FormData
//         },
//     });
// };

const fetchRecentlyAction = (token) => {
    return axios.get(`/borrow/action/recently`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}

const fetchUsersBasicData = (token) => {
    return axios.get(`/auth/basic`, {
        headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
    });
}

const fetchBooksBasicData = (token) => {
    return axios.get(`/book/book/basic`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const fetchBooksDetailData = (token, bookId) => {
    return axios.get(`/book/book/${bookId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const fetchAllBookType = (token) => {
    return axios.get(`/book/category/all`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const updateBook = async (bookId, token, bookData) => {

    const formData = new FormData();

    for (const key in bookData) {
        if (key === "categories") {
            bookData.categories.forEach((category, index) => {
                formData.append(`categories[${index}].id`, category.id);
                formData.append(`categories[${index}].category`, category.category);
            });
        } else {
            formData.append(key, bookData[key]);
        }
    }

    await axios.put(`/book/book/update?id=${bookId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });

};

const createBook = async (token, newBookData) => {
    try {
        const formData = new FormData();
        for (const key in newBookData) {
            if (key === "categories") {
                newBookData[key].forEach((category, index) => {
                    formData.append(`categories[${index}].id`, category.id);
                    formData.append(`categories[${index}].category`, category.category);
                });
            } else if (key === "image" && newBookData[key] instanceof File) {
                formData.append(key, newBookData[key]); // Attach file directly
            } else {
                formData.append(key, newBookData[key]);
            }
        }

        // Debugging FormData
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        return await axios.post(
            `/book/book/create`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token for authentication
                    'Content-Type': 'multipart/form-data', // Required for FormData
                },
            }
        );
    } catch (error) {
        console.error("Error creating book:", error);
        throw error; // Re-throw the error for further handling
    }
};

export {
    fetchBookData,
    // updateBookData,
    fetchRecentlyAction,
    fetchUsersBasicData,
    fetchBooksDetailData,
    fetchBooksBasicData,
    fetchAllBookType,
    updateBook,
    createBook
};