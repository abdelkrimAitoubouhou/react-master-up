import axios from "axios";
import {API} from "../apis";
import {ALL_PRODUCT, ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, SET_PRODUCT} from "../types/productTypes";
import {alert} from "./alertService";

export const allProducts = () => async dispatch => {

    dispatch({
        type: ALL_PRODUCT
    });

    await axios.get(`${API}/products/all`)
        .then(res => {

            const products = res.data && res.data.map(p => {
                return {
                    ...p,
                    info:
                        "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo." +
                        " Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf " +
                        "authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware " +
                        "sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac" +
                        " stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                    img: `img/${p.id}.png`,
                    inCart: false,
                    total: 0
                }
            })

            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: products
            });

        })
        .catch(() => {
            dispatch({
                type: ALL_PRODUCT_FAIL
            });
        })
}

export const getProductById = (id) => async dispatch => {

    await axios.get(`${API}/products/get?id=${id}`)
        .then(res => {

            dispatch({
                type: SET_PRODUCT,
                payload: res.data
            });

        })
        .catch(() => {
            dispatch(alert({open: true, message: 'Something went wrong !!'}));

            setTimeout(() => {
                dispatch(alert({open: undefined, message: undefined}));
            }, 5000);
        })
}
