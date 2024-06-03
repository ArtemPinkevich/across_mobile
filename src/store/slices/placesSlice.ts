import { createSlice } from "@reduxjs/toolkit";
import { IPlace } from "../../api/places/Places";

interface ISearchState {
	searchPlaceFrom?: IPlace;
	searchPlaceTo?: IPlace;
}

const initialState: ISearchState = {
	searchPlaceFrom: undefined,
	searchPlaceTo: undefined,
};

export const placesSlice = createSlice({
	name: "places",
	initialState,
	reducers: {
		setSearchPlaceFrom: (state, action) => {
			state.searchPlaceFrom = action.payload;
		},
		setSearchPlaceTo: (state, action) => {
			state.searchPlaceTo = action.payload;
		},
	},
});

export const { setSearchPlaceFrom, setSearchPlaceTo } = placesSlice.actions;

export default placesSlice.reducer;
