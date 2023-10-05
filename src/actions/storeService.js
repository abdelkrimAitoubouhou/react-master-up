import axios from "axios";
import {API} from "../apis";
import {ALL_STORE, ALL_STORE_FAIL, ALL_STORE_SUCCESS} from "../types/alertTypes";

export const allStore = () => async dispatch => {

    dispatch({
        type: ALL_STORE
    });

    await axios.get(`${API}/store/all`)
        .then(res => {
            dispatch({
                type: ALL_STORE_SUCCESS,
                payload: res.data
            })

        })
        .catch(() => {
            dispatch({
                type: ALL_STORE_FAIL
            })
        })
}


export const editQuantity = (id, quantity) => async dispatch => {

    dispatch({
        type: ALL_STORE
    });

    await axios.get(`${API}/store/editQuantity?id=${id}&quantity=${quantity}`)
        .then(res => {
            dispatch(allStore())

        })
        .catch(() => {

        })
}
