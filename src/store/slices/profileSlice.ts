import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { Gender } from '../../api/GenderEnum';

export interface IProfileSettings {
  id: string,
  name: string,
  surname: string,
  patronymic: string,
  birthDate: string, // Строка ISO
  gender: Gender,
  phoneNumber: string,
}

const initialState: IProfileSettings = {
    id: '1',
    name: 'ИмяИзСтора',
    surname: 'ФамилияИзСтора',
    patronymic: 'ОтчествоИзСтора',
    birthDate: '21.03.1992', // Строка ISO
    gender: Gender.None,
    phoneNumber: '',
};

// Setting up user slice (redux-toolkit)
// All the magic happens here, lol.
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setProfileSettings: (state, action) => {
      const { name, surname, patronymic, birthDate, gender, phoneNumber } = action.payload;
      state.name = name;
      state.surname = surname;
      state.patronymic = patronymic;
      state.birthDate = birthDate;
      state.gender = gender;
      state.phoneNumber = phoneNumber;
    },
    setProfilePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const { setProfileSettings, setProfilePhoneNumber } = profileSlice.actions;

// The function below is called a selector and allows us to select a value from
// the stateSelectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter./// value)`
export const selectProfile = (state: RootState) => state.profile

export default profileSlice.reducer;
