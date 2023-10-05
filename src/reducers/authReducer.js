import {
    ALL_USERS,
    ALL_USERS_FAIL,
    ALL_USERS_SUCCESS,
    HISTORY_PUSH,
    LOGIN_ACTION, REMOVE_USER, REMOVE_USER_FAIL, REMOVE_USER_SUCCESS,
    SIGN_IN,
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS,
    SIGN_UP,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS
} from "../types/authTypes";

const initialState = {
    isLoggedIn: false,
    path: 'signIn',
    clients: [],
    alert: {
        open: undefined,
        message: undefined
    },
    profile: undefined,
    loading: false
};

export default function authReducer(state = initialState, {type, payload}) {
    switch (type) {
        case HISTORY_PUSH:
            return {
                ...state,
                path: payload,
            }
        case LOGIN_ACTION:
            return {
                ...state,
                isLoggedIn: payload,
            }
        case ALL_USERS:
            return {
                ...state,
                loading: true,
            }
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                clients: payload
            }
        case ALL_USERS_FAIL:
            return {
                ...state
            }
        case REMOVE_USER:
            return {
                ...state,
                loading: true
            }
        case REMOVE_USER_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case REMOVE_USER_FAIL:
            return {
                ...state,
                loading: false
            }
        case SIGN_IN:
            return {
                ...state,
                loading: true
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                profile: {...payload, role: payload.roles[0].roleName}
            }
        case SIGN_IN_FAIL:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                profile: null
            }
        case SIGN_UP:
            return {
                ...state,
                loading: true
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case SIGN_UP_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}


const obj = {a: 1}
