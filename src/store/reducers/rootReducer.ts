import {combineReducers} from "redux";
import clientSlice from "./clientSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
    client: clientSlice,
    user: userSlice
});

export default rootReducer;
