import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import { ILoad } from "../../api/load/Load";
import { PackagingType } from "../../api/load/PackagingType";

const DEFAULT_EDITING_LOAD: ILoad = {
    createdId: "",
    name: "",
    weight: 0,
    volume: 0,
    packagingType: PackagingType.none,
};

interface ILoadState {
    loads: ILoad[];
    editingLoad: ILoad;
}

const initialState: ILoadState = {
    loads: [],
    editingLoad: DEFAULT_EDITING_LOAD,
};

export const loadSlice = createSlice({
    name: "load",
    initialState,
    reducers: {
        addLoad: (state, action) => {
            state.loads = [action.payload, ...state.loads];
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
    },
});

export const { addLoad, removeLoad, setPackagingType, resetEditingLoad } = loadSlice.actions;

export const selectLoads = (state: RootState) => state.load.loads;

export default loadSlice.reducer;
