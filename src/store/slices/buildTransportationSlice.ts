import { createSlice } from "@reduxjs/toolkit";
import { ILoad } from "../../api/transportation/Transportation";
import { PackagingType } from "../../api/transportation/PackagingType";
import { CarBodyType } from "../../api/truck/CarBodyType";
import { LoadingType } from "../../api/truck/LoadingType";

const DEFAULT_EDITING_LOAD: ILoad = {
    createdId: "",
    name: "",
    weight: 0,
    volume: 0,
    packagingType: PackagingType.none,
    truckRequirements: {
        carBodies: [],
        loadingType: [],
        unloadingTypes: [],
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
    editingLoad: ILoad;
    requiredCarBodies: CarBodyType[];
    requiredLoadingTypes: LoadingType[];
    requiredUnloadingTypes: LoadingType[];
}

const initialState: ILoadState = {
    editingLoad: DEFAULT_EDITING_LOAD,
    requiredCarBodies: [],
    requiredLoadingTypes: [],
    requiredUnloadingTypes: [],
};

export const buildTransportationSlice = createSlice({
    name: "buildTransportation",
    initialState,
    reducers: {
        setEditingLoad: (state, action) => {
            state.editingLoad = { ...action.payload };
        },
        resetEditingLoad: (state) => {
            state.editingLoad = DEFAULT_EDITING_LOAD;
        },
        setPackagingType: (state, action) => {
            state.editingLoad = { ...state.editingLoad, packagingType: action.payload };
        },
        setTruckRequirements: (state, action) => {
            state.editingLoad = { ...state.editingLoad, truckRequirements: { ...action.payload } };
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
    setEditingLoad,
    setPackagingType,
    resetEditingLoad,
    setTruckRequirements,
    setTruckRequirementsCarBodies,
    setTruckRequirementsLoadingTypes,
    setTruckRequirementsUnloadingTypes,
} = buildTransportationSlice.actions;

export default buildTransportationSlice.reducer;
