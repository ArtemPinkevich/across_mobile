import { createSlice } from "@reduxjs/toolkit";
import { IPlace } from "../../api/places/Places";

interface ISearchState {
	searchPlaceFrom?: IPlace;
	searchPlaceTo?: IPlace;
	cargoLoadingPlace?: IPlace;
	cargoUnloadingPlace?: IPlace;
}

const initialState: ISearchState = {
	searchPlaceFrom: undefined,
	searchPlaceTo: undefined,
	cargoLoadingPlace: undefined,
	cargoUnloadingPlace: undefined,
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
		setCargoLoadingPlace: (state, action) => {
			state.cargoLoadingPlace = action.payload;
		},
		setCargoUnloadingPlace: (state, action) => {
			state.cargoUnloadingPlace = action.payload;
		},
	},
});

export const { setSearchPlaceFrom, setSearchPlaceTo, setCargoLoadingPlace, setCargoUnloadingPlace } = placesSlice.actions;

export default placesSlice.reducer;
