import { createSlice } from "@reduxjs/toolkit";
import { ITransportation } from "../../api/transportation/Transportation";

interface ILoadState {
    viewedTransportation?: ITransportation;
}

const initialState: ILoadState = {
    viewedTransportation: undefined,
};

export const transportationsSlice = createSlice({
    name: "transportations",
    initialState,
    reducers: {
        setViewedTransportation: (state, action) => {
            state.viewedTransportation = { ...action.payload };
        },
    },
});

export const { setViewedTransportation } = transportationsSlice.actions;

export default transportationsSlice.reducer;
