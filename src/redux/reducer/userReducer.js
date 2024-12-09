

import { CREATE_USER, numberNotifications, search} from '../action/userAction'
import { LOGIN } from '../action/userAction'
import { LOGOUT } from '../action/userAction'
import { SEARCH } from '../action/userAction'
import { OFF_SEARCH } from '../action/userAction'
import { SET_NUMBER_NOTIFICATION } from '../action/userAction';

const INITIAL_STATE = {
    user: {
        token: '',
        name: "",
        userId: '',
        roles: [],
        id: '',
        imageUrl: '',
        refreshToken: '',
        phone: '',
        email: '',
    },
    search: {
        isSearch: false,
        searchContent: ''
    },
    numberNotifications: 0,
    isAuthenticated: false,
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_NUMBER_NOTIFICATION: 
            return {
                ...state,
                numberNotifications: action?.payload
            }
        case OFF_SEARCH:
            return {
                ...state,
                search: {
                    isSearch: false,
                    searchContent: ''
                }
            }
        case SEARCH:
            return {
                ...state,
                search: {
                    isSearch: true,
                    searchContent: action?.payload
                }
            }
        case CREATE_USER:
            return {
                ...state,
                user: {
                    imageUrl: action?.payload?.data?.data?.imageUrl,
                    email: action?.payload?.data?.data?.email,
                    refreshToken: action?.payload?.data?.data?.refreshToken,
                    id: action?.payload?.data?.data?.id,
                    phone: action?.payload?.data?.phone,
                    token: action?.payload?.data?.data?.token,
                    name: action?.payload?.data?.data?.name,
                    userId: action?.payload?.data?.data?.userId ,
                    roles: action?.payload?.data?.data?.roles
                },
                isAuthenticated: true,
                numberNotifications: 0,
                search: {
                    isSearch: false,
                    searchContent: ''
                }
            }
        case LOGIN:
            return {
                ...state,
                user: {
                    imageUrl: action?.payload?.data?.data?.imageUrl,
                    email: action?.payload?.data?.data?.email,
                    refreshToken: action?.payload?.data?.data?.refreshToken,
                    id: action?.payload?.data?.data?.id,
                    phone: action?.payload?.data?.phone,
                    token: action?.payload?.data?.data?.token,
                    name: action?.payload?.data?.data?.name,
                    userId: action?.payload?.data?.data?.userId ,
                    roles: action?.payload?.data?.data?.roles
                },
                isAuthenticated: true,
                numberNotifications: 0,
                search: {
                    isSearch: false,
                    searchContent: ''
                }
            }
        case LOGOUT:
            return {
                user: {
                    token: '',
                    name: "",
                    userId: '',
                    roles: [],
                    id: '',
                    imageUrl: '',
                    refreshToken: '',
                    phone: '',
                    email: '',
                },
                isAuthenticated: false,
                numberNotifications: 0,
                search: {
                    isSearch: false,
                    searchContent: ''
                }
            }

        default: return state;
    }
}

export default userReducer;
