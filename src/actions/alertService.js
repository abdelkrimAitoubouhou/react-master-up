import {ALERT} from "../types/alertTypes";

export const alert = (payload) => {
    return {
        type: ALERT,
        payload
    }
}
