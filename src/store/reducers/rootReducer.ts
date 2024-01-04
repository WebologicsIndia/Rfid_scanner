import {combineReducers} from "redux";
import clientSlice from "./clientSlice";
import userSlice from "./userSlice";
import batchSlice from "./batchSlice";

const rootReducer = combineReducers({
    client: clientSlice,
    user: userSlice,
    batch: batchSlice
});

export default rootReducer;
