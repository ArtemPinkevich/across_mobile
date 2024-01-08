import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

const initialState = {
    id: 1,
    name: 'ИМЯПРОФИЛЯ',
    surname: undefined,
    patronymic: undefined,
    birthDate: undefined, // Строка ISO
    gender: undefined,
    phoneNumber: undefined,
};

// Setting up user slice (redux-toolkit)
// All the magic happens here, lol.
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const {setUserId} = profileSlice.actions;

// The function below is called a selector and allows us to select a value from
// the stateSelectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter./// value)`
export const selectProfile = (state: RootState) => state.profile

export default profileSlice.reducer;