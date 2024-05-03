import { createSlice } from "@reduxjs/toolkit";
import { ICargo } from "../../api/transportation/Transportation";
import { PackagingType } from "../../api/transportation/PackagingType";
import { CarBodyType } from "../../api/truck/CarBodyType";
import { LoadingType } from "../../api/truck/LoadingType";

const DEFAULT_EDITING_CARGO: ICargo = {
    createdId: "",
    name: "",
    weight: 0,
    volume: 0,
    packagingType: PackagingType.none,
    truckRequirements: {
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
    },
};

interface ILoadState {
    editingCargo: ICargo;
    requiredCarBodies: CarBodyType[];
    requiredLoadingTypes: LoadingType[];
    requiredUnloadingTypes: LoadingType[];
}

const initialState: ILoadState = {
    editingCargo: DEFAULT_EDITING_CARGO,
    requiredCarBodies: [],
    requiredLoadingTypes: [],
    requiredUnloadingTypes: [],
};

export const buildTransportationSlice = createSlice({
    name: "buildTransportation",
    initialState,
    reducers: {
        setEditingCargo: (state, action) => {
            state.editingCargo = { ...action.payload };
        },
        resetEditingCargo: (state) => {
            state.editingCargo = DEFAULT_EDITING_CARGO;
        },
        setPackagingType: (state, action) => {
            state.editingCargo = { ...state.editingCargo, packagingType: action.payload };
        },
        setTruckRequirements: (state, action) => {
            state.editingCargo = { ...state.editingCargo, truckRequirements: { ...action.payload } };
        },
        setTruckRequirementsCarBodies: (state, action) => {
            state.requiredCarBodies = [...action.payload];
        },
        setTruckRequirementsLoadingTypes: (state, action) => {
            state.requiredLoadingTypes = [...action.payload];
        },
        setTruckRequirementsUnloadingTypes: (state, action) => {
            state.requiredUnloadingTypes = [...action.payload];
        },
    },
});

export const {
    setEditingCargo,
    setPackagingType,
    resetEditingCargo,
    setTruckRequirements,
    setTruckRequirementsCarBodies,
    setTruckRequirementsLoadingTypes,
    setTruckRequirementsUnloadingTypes,
} = buildTransportationSlice.actions;

export default buildTransportationSlice.reducer;
