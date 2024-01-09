import {combineReducers} from "redux";
import clientSlice from "./clientSlice";
import userSlice from "./userSlice";
import batchSlice from "./batchSlice";
import inventorySlice from "./inventorySlice";

const rootReducer = combineReducers({
    client: clientSlice,
    user: userSlice,
    batch: batchSlice,
    inventory: inventorySlice
});

export default rootReducer;
