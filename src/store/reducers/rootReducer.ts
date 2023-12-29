import {combineReducers} from "redux";
import clientSlice from "./clientSlice";

const rootReducer = combineReducers({
    client: clientSlice
});

export default rootReducer;
