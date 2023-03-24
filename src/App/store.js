import thunk from "redux-thunk"
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {infoUserReducer} from "../components/userProfile/infoUserSlice"

const rootReducer = combineReducers({
    infoUserReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;