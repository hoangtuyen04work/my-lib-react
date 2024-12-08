export const CREATE_USER = 'CREATE_USER';
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";


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