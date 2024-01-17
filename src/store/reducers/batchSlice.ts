import {createSlice} from "@reduxjs/toolkit";
import {batchState} from "../initialState";

const batchReducer = createSlice({
    name: "batch",
    initialState: batchState,
    reducers: {
        setBatch: (state, action) => {
            state.data = action.payload.data;
            state.page = action.payload.page ;
            state.total = action.payload.total;
        },
        updateBatch: (state, action) => {
            state.data = [...state.data, ...action.payload.data];
            state.page = state.page+1;
            state.total = action.payload.total;
        }

    }
});
export const {setBatch, updateBatch} = batchReducer.actions;
export default batchReducer.reducer;
