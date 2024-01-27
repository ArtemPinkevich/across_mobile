import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button, Center, ScrollView, Input, VStack, Pressable } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import PhoneNumberInput from '../components/common/PhoneNumberInput';
import { RootState } from '../store/configureStore';
import { Gender } from '../api/GenderEnum';
import { IProfileSettings, setProfileSettings } from '../store/slices/profileSlice';
import { View } from '../components/Themed';

export default function EditProfileModal() {
    
  const dispatch = useDispatch()

  const profile: IProfileSettings = useSelector((state: RootState) => state.profile);
  
  const [name, setName] = useState(profile?.name)
  const [surname, setSurname] = useState(profile?.surname)
  const [patronymic, setpatronymic] = useState(profile?.patronymic)
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(profile?.phoneNumber)
  const [birthday, setBirthday] = useState(profile?.birthDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const saveHandler = () => {
    const profile: IProfileSettings = {
        id: new Date().toJSON(),
        name: name?.trim(),
        surname: surname?.trim(),
        patronymic: patronymic?.trim(),
		phoneNumber: phoneNumber ?? '',
        birthDate: birthday,
        gender: Gender.None,
    }
    dispatch(setProfileSettings(profile));
    router.back();
  }
  
  const birthdayOnChange = (event: any, selectedDate: any) => {
	  setShowDatePicker(false);
	  setBirthday(selectedDate);
  }

  const isBirthdayValid = birthday && moment(birthday).isValid();

  return (
	<View style={styles.container}>
		<ScrollView>
			<VStack mx={"4"}>
				<Input variant="underlined" size="md" placeholder="Имя" value={name} onChangeText={setName} />
				<Input variant="underlined" size="md" placeholder="Фамилия" value={surname} onChangeText={setSurname} />
				<Input variant="underlined" size="md" placeholder="Отчество" value={patronymic} onChangeText={setpatronymic} />
				
				<PhoneNumberInput value={phoneNumber} onChange={setPhoneNumber} />
				
				{
					Platform.OS === 'web' 
						? 
							null 
						: 
							<Pressable onPress={() => setShowDatePicker(true)}>
								<Input isReadOnly={true} variant="underlined" size="md" placeholder="Дата рождения" value={isBirthdayValid ? moment(birthday).format('DD MMMM YYYY') : ''} />
							</Pressable>
				}

				{showDatePicker && (
					<DateTimePicker
						value={isBirthdayValid ? new Date(birthday) : new Date()}
						is24Hour={true}
						display="default"
						onChange={birthdayOnChange}/>)}

				<Center my={"10"}>
					<Button variant="outline" minW={200} size={"lg"} onPress={saveHandler}>Сохранить</Button>
				</Center>
			</VStack>
		</ScrollView>
	</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
