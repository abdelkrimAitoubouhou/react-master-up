import {ALL_COMMANDS, ALL_COMMANDS_FAIL, ALL_COMMANDS_SUCCESS} from "../types/commandTypes";

const initialState = {
    loading: false,
    commands: []
}
export default function commandReducer(state = initialState, {type, payload}) {
    switch (type) {

        case ALL_COMMANDS:
            return {
                ...state,
                loading: true
            };
        case ALL_COMMANDS_SUCCESS:
            return {
                ...state,
                loading: false,
                commands: payload

            };
        case ALL_COMMANDS_FAIL:
            return {
                ...state,
                loading: false,
                commands: []
            };

        default:
            return state;
    }
}
