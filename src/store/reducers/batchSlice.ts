import {createSlice} from "@reduxjs/toolkit";
import {batchState} from "../initialState";

const batchReducer = createSlice({
    name: "batch",
    initialState: batchState,
    reducers: {
        setBatch: (state, action) => {
            console.log(action.payload);
            state.data = action.payload.data;
            state.page = action.payload.page ? action.payload.page: 1;
            state.total = action.payload.total;
        }

    }
});
export const {setBatch} = batchReducer.actions;
export default batchReducer.reducer;
