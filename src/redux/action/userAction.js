export const CREATE_USER = 'CREATE_USER';
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SEARCH = "ON_SEARCH"
export const OFF_SEARCH = "OFF_SEARCH"

export const offSearch = () => {
    return {
        type: OFF_SEARCH,
    };
};

export const search = (data) => {
    return {
        type: SEARCH,
        payload: data
    };
};

export const doSignup = (data) => {
    return {
        type: CREATE_USER,
        payload: data
    };
};


export const doLogin = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}

export const doLogout = () => {
    return {
        type: LOGOUT,
    }
}

