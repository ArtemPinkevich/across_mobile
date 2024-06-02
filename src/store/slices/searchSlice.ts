import { createSlice } from "@reduxjs/toolkit";
import { IPlace } from "../../api/places/Places";

interface ISearchState {
	placeFrom?: IPlace;
	placeTo?: IPlace;
}

const initialState: ISearchState = {
	placeFrom: undefined,
	placeTo: undefined,
};

export const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setSearchPlaceFrom: (state, action) => {
			state.placeFrom = action.payload;
		},
		setSearchPlaceTo: (state, action) => {
			state.placeTo = action.payload;
		},
	},
});

export const { setSearchPlaceFrom, setSearchPlaceTo } = searchSlice.actions;

export default searchSlice.reducer;
