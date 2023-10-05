import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "../reducers/authReducer";
import thunk from "redux-thunk";
import commandReducer from "../reducers/commandReducer";
import storeReducer from "../reducers/storeReducer";
import alertReducer from "../reducers/alertReducer";
import productReducer from "../reducers/productReducer";


const reducers = combineReducers({
    auth: authReducer,
    storeReducer: storeReducer,
    alertReducer: alertReducer,
    productReducer: productReducer,
    commandReducer: commandReducer
});

export const store = createStore(reducers, compose(applyMiddleware(thunk)));
