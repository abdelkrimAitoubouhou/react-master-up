import {ALL_PRODUCT, ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, SET_PRODUCT} from "../types/productTypes";

const initialState = {
    loading: false,
    products: [],
    detailProduct: {}
}
export default function productReducer(state = initialState, {type, payload}) {
    switch (type) {

        case ALL_PRODUCT:
            return {
                ...state,
                loading: true
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload
            };
        case ALL_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                products: []
            };
        case SET_PRODUCT:
            return {
                ...state,
                detailProduct: payload
            };
        default:
            return state;
    }
}
