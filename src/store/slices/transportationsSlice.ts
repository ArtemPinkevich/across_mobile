import { createSlice } from "@reduxjs/toolkit";
import { ICorrelation, ITransportation } from "../../api/transportation/Transportation";

interface ILoadState {
	viewedTransportation?: ITransportation;
	viewedCorrelation?: ICorrelation;
}

const initialState: ILoadState = {
	viewedTransportation: undefined,
	viewedCorrelation: undefined,
};

export const transportationsSlice = createSlice({
	name: "transportations",
	initialState,
	reducers: {
		setViewedTransportation: (state, action) => {
			state.viewedTransportation = action.payload;
		},
		setViewedCorrelation: (state, action) => {
			state.viewedCorrelation = action.payload;
		},
	},
});

export const { setViewedTransportation, setViewedCorrelation } = transportationsSlice.actions;

export default transportationsSlice.reducer;
