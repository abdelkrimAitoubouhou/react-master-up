import {
    ALL_USERS_SUCCESS,
    HISTORY_PUSH,
    LOGIN_ACTION,
    REMOVE_USER,
    REMOVE_USER_FAIL,
    REMOVE_USER_SUCCESS,
    SIGN_IN,
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS,
    SIGN_UP,
    SIGN_UP_FAIL
} from "../types/authTypes";
import {store} from "../redux/store";
import {API} from "../apis";
import axios from "axios";
import {alert} from "./alertService";

export const allUsers = () => async dispatch => {

    await axios.get(`${API}/clients/all`)
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: ALL_USERS_SUCCESS,
                    payload: res.data
                });

            }
        })
        .catch(() => {
        })
}

export const removeUser = id => async dispatch => {

    dispatch({
        type: REMOVE_USER,

    });

    await axios.get(`${API}/clients/remove/${id}`)
        .then(res => {
            dispatch({
                type: REMOVE_USER_SUCCESS,
            });

            dispatch(allUsers());
        })
        .catch(() => {
            dispatch({
                type: REMOVE_USER_FAIL,
            });
        })

}

export const signUp = client => async dispatch => {

    await axios.post(`${API}/clients/signup`, client)
        .then(response => {
            const {data: {success, message}} = response;
            if (success) {

                dispatch(setPath('signIn'));
                dispatch(alert({open: false, message}));

                setTimeout(() => {
                    dispatch(alert({open: undefined, message: undefined}));
                }, 3000);
            } else {
                dispatch(alert({open: true, message}));
                setTimeout(() => {
                    dispatch(alert({open: undefined, message: undefined}));
                }, 3000);
            }
        })
        .catch((err) => {
            dispatch(alert({open: true, err}));
            setTimeout(() => {
                dispatch(alert({open: undefined, message: undefined}));
            }, 3000);
        });
};

export const signIn = (payload) => async dispatch => {

    dispatch({
        type: SIGN_IN
    });

    await axios.post(`${API}/clients/login`, payload)
        .then(response => {

            if (response.data && response.data.success) {
                dispatch({
                    type: SIGN_IN_SUCCESS,
                    payload: response.data.connectedUser
                });
            } else {
                dispatch(alert({open: true, message: 'Authentication failed'}));

                setTimeout(() => {
                    dispatch(alert({open: undefined, message: undefined}));
                }, 5000);
            }
        })
        .catch(() => {
            dispatch({
                type: SIGN_IN_FAIL
            });
        });
};

export const logout = () => async dispatch => {
    dispatch(setLoggedIn(false));
    window.location.pathname = '/';
};

export const setLoggedIn = (payload) => {
    return {
        type: LOGIN_ACTION,
        payload
    }
}
export const setPath = (payload) => {
    return {
        type: HISTORY_PUSH,
        payload
    }
}

export function getCurrentUser() {
    return store.getState().auth.profile;
}

export function hasAuthority(authorities) {
    const connectedUser = getCurrentUser();
    if (connectedUser === null || connectedUser === undefined) {
        return false;
    }

    if (!authorities.includes(connectedUser.role)) {
        return false;
    }

    return true;
}
