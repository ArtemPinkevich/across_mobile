import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { ITruck } from '../../api/truck/Truck';

interface IGarageState {
    cars: ITruck[],
    favariteCar: number,
    editingTruсk: ITruck,
}

const initialState: IGarageState = {
    cars: [],
    favariteCar: 0,
    editingTruсk: {
      createdId: '',
      trailerType: undefined,
      carBody: undefined,
      regNumber: '',
      loadingType: undefined,
      hasLTL: false,
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
      ekmt: false
    }
};

// Setting up user slice (redux-toolkit)
// All the magic happens here, lol.
export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addCar: (state, action) => {
      state.cars = [action.payload, ...state.cars];
    },
    removeCar: (state, action) => {
      state.cars = state.cars.filter(o => o.createdId !== action.payload.carId);
    },
    setCarBody: (state, action) => {
      state.editingTruсk = { ...state.editingTruсk, carBody: action.payload };
    },
    setLoadingType: (state, action) => {
      state.editingTruсk = { ...state.editingTruсk, loadingType: action.payload };
    },
  },
});

export const { addCar, removeCar, setCarBody, setLoadingType } = garageSlice.actions;

export const selectCars = (state: RootState) => state.garage.cars;
export const selectFavariteCar = (state: RootState) => state.garage.favariteCar

export default garageSlice.reducer;