import {ALERT} from "../types/alertTypes";

const initialState = {
    alert: {
        open: undefined,
        message: undefined
    }
};

export default function alertReducer(state = initialState, {type, payload}) {
    switch (type) {
        case ALERT:
            return {
                ...state,
                alert: payload,
            };
        default:
            return state;
    }
}
