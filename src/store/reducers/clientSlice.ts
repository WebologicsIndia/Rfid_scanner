import {createSlice} from "@reduxjs/toolkit";
import {clientState} from "../initialState";

const clientReducer = createSlice({
    name: "client",
    initialState: clientState,
    reducers: {
        setClient: (state, action) => {
            state.data = action.payload.data;
            state.page = action.payload.page;
            state.total = action.payload.total;
        },

    }
});
export const {setClient} = clientReducer.actions;
export default clientReducer.reducer;
