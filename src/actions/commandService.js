import axios from "axios";
import {API} from "../apis";
import {ALL_COMMANDS, ALL_COMMANDS_FAIL, ALL_COMMANDS_SUCCESS} from "../types/commandTypes";
import {getCurrentUser} from "./authService";
import {alert} from "./alertService";


export const allCommands = () => async dispatch => {
    dispatch({
        type: ALL_COMMANDS
    })
    await axios.get(`${API}/commands/all`)
        .then(res => {
            dispatch({
                type: ALL_COMMANDS_SUCCESS,
                payload: res.data.commands
            })
        })
        .catch(() => {
            dispatch({
                type: ALL_COMMANDS_FAIL
            })
        });
}

export const rejectCommand = id => async dispatch => {
    await axios.get(`${API}/commands/reject/${id}`)
        .then(() => {
            dispatch(alert({open: false, message: 'Order has been rejected successfully'}));

            setTimeout(() => {
                dispatch(alert({open: undefined, message: undefined}));
                dispatch(allCommands());
            })
        }).catch(() => {
            dispatch(alert({open: true, message: 'Something went wrong !!'}));

            setTimeout(() => {
                dispatch(alert({open: undefined, message: undefined}));
            }, 5000);
        });
}

export const submitCommand = id => async dispatch => {
    await axios.get(`${API}/commands/submit/${id}`)
        .then(() => {
            dispatch(alert({open: false, message: 'Order has been submitted successfully'}));

            setTimeout(() => {
                dispatch(alert({open: undefined, message: undefined}));
            }, 5000);
            dispatch(allCommands());
        })
        .catch(() => {
            dispatch(alert({open: true, message: 'Something went wrong !!'}));

            setTimeout(() => {
                dispatch(alert({open: undefined, message: undefined}));
            }, 5000);
        });
}

export const saveCommand = (products, clearCart) => async dispatch => {

    const connectedUser = getCurrentUser();

    const requestBody = {
        clientDto: {id: connectedUser.id},
        productDto: products && products.map(p => {
            return {
                id: p.id,
                count: p.count
            }

        })
    }

    await axios.post(`${API}/commands/save`, requestBody)
        .then(response => {
            const {data: {success, message}} = response;

            if (success) {
                dispatch(alert({open: false, message: 'Order has been created successfully'}));

                setTimeout(() => {
                    dispatch(alert({open: undefined, message: undefined}));
                }, 5000);

                clearCart();
            } else {
                dispatch(alert({open: true, message}));
                setTimeout(() => {
                    dispatch(alert({open: undefined, message: undefined}));
                }, 5000);
            }

        })
        .catch((reason) => {
            dispatch(alert({open: true, message: 'Something went wrong !!'}));

            setTimeout(() => {
                dispatch(alert({open: undefined, message: undefined}));
            }, 5000);
        })
}
