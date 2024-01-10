import {createSlice} from "@reduxjs/toolkit";
import {inventoryState} from "../initialState";

const inventoryReducer = createSlice({
    name: "inventory",
    initialState: inventoryState,
    reducers: {
        setInventories: (state, action) => {
            action.payload.data.forEach((order: any) => {
                state.data = order.tags;
            });
        }
    }
});

export const {setInventories} = inventoryReducer.actions;
export default inventoryReducer.reducer;
