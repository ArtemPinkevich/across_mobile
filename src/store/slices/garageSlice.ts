import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { ITruck } from '../../api/truck/Truck';

interface IGarageState {
    cars: ITruck[],
    favariteCar: number,
}

const initialState: IGarageState = {
    cars: [],
    favariteCar: 0,
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
  },
});

export const { addCar, removeCar } = garageSlice.actions;

export const selectCars = (state: RootState) => state.garage.cars;
export const selectFavariteCar = (state: RootState) => state.garage.favariteCar

export default garageSlice.reducer;