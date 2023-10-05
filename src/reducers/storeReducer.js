import {ALL_STORE, ALL_STORE_FAIL, ALL_STORE_SUCCESS} from "../types/alertTypes";

const initialState = {
    loading: false,
    list: []
}
export default function storeReducer(state = initialState, {type, payload}) {
    switch (type) {

        case ALL_STORE:
            return {
                ...state,
                loading: true
            };
        case ALL_STORE_SUCCESS:
            return {
                ...state,
                loading: false,
                list: payload && payload.result
            };
        case ALL_STORE_FAIL:
            return {
                ...state,
                loading: false,
                list: []
            };

        default:
            return state;
    }
}
