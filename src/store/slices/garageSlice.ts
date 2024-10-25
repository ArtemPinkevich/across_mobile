import { createSlice } from "@reduxjs/toolkit";
import { ITruck } from "../../api/truck/Truck";

const DEFAULT_EDITING_TRUCK = {
	createdId: "",
	trailerType: undefined,
	carBody: undefined,
	regNumber: "",
	loadingType: undefined,
	hasLtl: false,
	hasLiftgate: false,
	hasStanchionTrailer: false,
	carryingCapacity: 0,
	bodyVolume: 0,
	innerBodyLength: 0,
	innerBodyWidth: 0,
	innerBodyHeight: 0,
	adr1: false,
	adr2: false,
	adr3: false,
	adr4: false,
	adr5: false,
	adr6: false,
	adr7: false,
	adr8: false,
	adr9: false,
	tir: false,
	ekmt: false,
};

interface IGarageState {
	cars: ITruck[];
	favariteCar: number;
	editingTruсk: ITruck;
}

const initialState: IGarageState = {
	cars: [],
	favariteCar: 0,
	editingTruсk: DEFAULT_EDITING_TRUCK,
};

// Setting up user slice (redux-toolkit)
// All the magic happens here, lol.
export const garageSlice = createSlice({
	name: "garage",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setTrailerType: (state, action) => {
			state.editingTruсk.trailerType = action.payload;
		},
		setCarBody: (state, action) => {
			state.editingTruсk.carBodyType = action.payload;
		},
		setLoadingType: (state, action) => {
			state.editingTruсk.loadingType = action.payload;
		},
		resetEditingTruсk: (state) => {
			state.editingTruсk = DEFAULT_EDITING_TRUCK;
		},
	},
});

export const { setTrailerType, setCarBody, setLoadingType, resetEditingTruсk } = garageSlice.actions;

export default garageSlice.reducer;
