import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import { ILoad, ITransportation } from "../../api/load/Load";
import { PackagingType } from "../../api/load/PackagingType";
import { TransportationStatus } from "../../api/load/TransportationStatus";
import moment from "moment";

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
        hasLTL: false,
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
    activeTransportation: ITransportation[];
    transportationJournal: ITransportation[];
    loads: ILoad[];
    editingLoad: ILoad;
}

const initialState: ILoadState = {
    activeTransportation: [
        {
            status: TransportationStatus.readyToLoad,
            loadPublishInfo: {
                loadingAddress: "Томская область, Томск, Ленина, 1а",
                loadingDateFrom: moment().toISOString(),
                loadingDateTo: moment().add(7, "day").toISOString(),
                loadingLocalityName: "",
                unloadingLocalityName: "",
                unloadingAddress: "Тараз, Ленина, 2б/18",
            },
            load: {
                createdId: moment().toString(),
                name: "Снег",
                weight: 20,
                volume: 30,
                packagingType: PackagingType.none,
            },
        },
        {
            status: TransportationStatus.transporting,
            loadPublishInfo: {
                loadingAddress: "Томская область, Томск, Ленина, 1а",
                loadingDateFrom: moment().toISOString(),
                loadingDateTo: moment().add(7, "day").toISOString(),
                loadingLocalityName: "",
                unloadingLocalityName: "",
                unloadingAddress: "Тараз, Ленина, 2б/18",
            },
            load: {
                createdId: moment().toString(),
                name: "Снег очень много снега как букв ",
                weight: 20,
                volume: 30,
                packagingType: PackagingType.none,
            },
        },
    ],
    transportationJournal: [],
    loads: [],
    editingLoad: DEFAULT_EDITING_LOAD,
};

export const loadSlice = createSlice({
    name: "load",
    initialState,
    reducers: {
        addLoad: (state, action) => {
            state.loads = [...state.loads, action.payload];
        },
        addActiveTransportation: (state, action) => {
            state.activeTransportation = [...state.activeTransportation, action.payload];
        },
        removeLoad: (state, action) => {
            state.loads = state.loads.filter((o) => o.createdId !== action.payload);
        },
        setPackagingType: (state, action) => {
            state.editingLoad = { ...state.editingLoad, packagingType: action.payload };
        },
        resetEditingLoad: (state) => {
            state.editingLoad = DEFAULT_EDITING_LOAD;
        },
        setTruckRequirements: (state, action) => {
            state.editingLoad = { ...state.editingLoad, truckRequirements: { ...action.payload } };
        },
        setTruckRequirementsCarBodies: (state, action) => {
            if (state.editingLoad.truckRequirements) {
                state.editingLoad.truckRequirements.carBodies = action.payload;
            }
        },
        setTruckRequirementsLoadingTypes: (state, action) => {
            if (state.editingLoad.truckRequirements) {
                state.editingLoad.truckRequirements.loadingType = action.payload;
            }
        },
        setTruckRequirementsUnloadingTypes: (state, action) => {
            if (state.editingLoad.truckRequirements) {
                state.editingLoad.truckRequirements.unloadingTypes = action.payload;
            }
        },
    },
});

export const {
    addLoad,
    removeLoad,
    setPackagingType,
    resetEditingLoad,
    setTruckRequirements,
    setTruckRequirementsCarBodies,
    setTruckRequirementsLoadingTypes,
    setTruckRequirementsUnloadingTypes,
    addActiveTransportation,
} = loadSlice.actions;

export const selectLoads = (state: RootState) => state.load.loads;

export default loadSlice.reducer;
