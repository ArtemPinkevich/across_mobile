import { createSlice } from "@reduxjs/toolkit";
import { ICargo, ITransportation, ITruckRequirements } from "../../api/transportation/Transportation";
import { PackagingType } from "../../api/transportation/PackagingType";
import { TransportationStatus } from "../../api/transportation/TransportationStatus";

const DEFAULT_TRUCK_REQUIREMENTS: ITruckRequirements = {
	carBodies: [],
	loadingTypeDtos: [],
	unloadingTypeDtos: [],
	hasLtl: false,
	hasLiftgate: false,
	hasStanchionTrailer: false,
	carryingCapacity: 0,
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

const DEFAULT_EDITING_CARGO: ICargo = {
	createdId: "",
	name: "",
	weight: 0,
	volume: 0,
	packagingType: PackagingType.none,
	truckRequirements: DEFAULT_TRUCK_REQUIREMENTS,
};

const DEFAULT_EDITING_TRANSPORTATION: ITransportation = {
	transferInfo: {
		loadingDateFrom: "",
		loadingDateTo: "",
		loadingPlace: {
			country: "",
			region: "",
			city: "",
		},
		loadingAddress: "",
		unloadingPlace: {
			country: "",
			region: "",
			city: "",
		},
		unloadingAddress: "",
	},
	cargo: DEFAULT_EDITING_CARGO,
	transportationOrderStatus: TransportationStatus.notPublished,
};

interface IBuildTransportationState {
	editingTransportation: ITransportation;
}

const initialState: IBuildTransportationState = {
	editingTransportation: DEFAULT_EDITING_TRANSPORTATION,
};

export const buildTransportationSlice = createSlice({
	name: "buildTransportation",
	initialState,
	reducers: {
		setEditingTransportation: (state, action) => {
			state.editingTransportation = action.payload;
		},
		resetEditingTransportation: (state) => {
			state.editingTransportation = DEFAULT_EDITING_TRANSPORTATION;
		},
		setEditingCargo: (state, action) => {
			state.editingTransportation.cargo = action.payload;
		},
		setEditingTransferInfo: (state, action) => {
			state.editingTransportation.transferInfo = action.payload;
		},
		setPackagingType: (state, action) => {
			state.editingTransportation.cargo.packagingType = action.payload;
		},
		setTruckRequirements: (state, action) => {
			state.editingTransportation.cargo.truckRequirements = action.payload;
		},
		setTruckRequirementsCarBodies: (state, action) => {
			state.editingTransportation.cargo.truckRequirements.carBodies = action.payload;
		},
		setTruckRequirementsLoadingTypes: (state, action) => {
			state.editingTransportation.cargo.truckRequirements.loadingTypeDtos = action.payload;
		},
		setTruckRequirementsUnloadingTypes: (state, action) => {
			state.editingTransportation.cargo.truckRequirements.unloadingTypeDtos = action.payload;
		},
	},
});

export const {
	setEditingTransportation,
	resetEditingTransportation,
	setEditingCargo,
	setEditingTransferInfo,
	setPackagingType,
	setTruckRequirements,
	setTruckRequirementsCarBodies,
	setTruckRequirementsLoadingTypes,
	setTruckRequirementsUnloadingTypes,
} = buildTransportationSlice.actions;

export default buildTransportationSlice.reducer;
