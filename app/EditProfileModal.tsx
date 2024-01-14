import { Button, Center, ScrollView, Input, Radio, HStack, Text, VStack, Pressable, RadioIndicator, RadioIcon, CircleIcon, RadioLabel, RadioGroup, InputField, ButtonText } from '@gluestack-ui/themed';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneNumberInput from '../components/common/PhoneNumberInput';
import { RootState } from '../store/configureStore';
import { Gender } from '../api/GenderEnum';
import { IProfileSettings, setProfileSettings } from '../store/slices/profileSlice';

export default function EditProfileModal() {
    
  const dispatch = useDispatch()

  const profile: IProfileSettings = useSelector((state: RootState) => state.profile);
  
  const [name, setName] = useState(profile?.name)
  const [surname, setSurname] = useState(profile?.surname)
  const [patronymic, setpatronymic] = useState(profile?.patronymic)
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(profile?.phoneNumber)
  const [birthday, setBirthday] = useState(profile?.birthDate);
  const [gender, setGender] = useState<Gender>(profile?.gender)
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const saveHandler = () => {
    const profile: IProfileSettings = {
        id: new Date().toJSON(),
        name: name?.trim(),
        surname: surname?.trim(),
        patronymic: patronymic?.trim(),
		phoneNumber: phoneNumber ?? '',
        birthDate: birthday,
        gender: gender,
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
    <ScrollView>
    	<VStack mx={"$4"}>
			
			<Input variant="underlined" size="md">
				<InputField placeholder="Имя" value={name} onChangeText={(e) => setName(e)} />
			</Input>

			<Input variant="underlined" size="md">
				<InputField placeholder="Фамилия" value={surname} onChangeText={setSurname} />
			</Input>

			<Input variant="underlined" size="md">
				<InputField placeholder="Отчество" value={patronymic} onChangeText={setpatronymic} />
			</Input>
			
			<PhoneNumberInput value={phoneNumber} onChange={setPhoneNumber} />
			
			{
				Platform.OS === 'web' 
					? 
						null 
					: 
						<Pressable onPress={() => setShowDatePicker(true)}>
							<Input isReadOnly={true} variant="underlined" size="md">
								<InputField placeholder="Дата рождения" value={isBirthdayValid ? moment(birthday).format('DD MMMM YYYY') : ''} onChangeText={setpatronymic} />
							</Input>
						</Pressable>
			}

			{showDatePicker && (
				<DateTimePicker
					value={isBirthdayValid ? new Date(birthday) : new Date()}
					is24Hour={true}
					display="default"
					onChange={birthdayOnChange}/>)}

        	<RadioGroup
				value={gender?.toString()}
				onChange={arg => setGender(+arg)}
				accessibilityLabel="Пол"
				aria-labelledby="gender">
				<HStack mt={"$2"} space="md">
					<Center p={"$2"}>
						<Text>Пол</Text>
					</Center>
					<HStack space={"md"}>
						<Radio value={Gender.Woman.toString()} my={1}>
							<RadioIndicator mr="$2">
								<RadioIcon as={CircleIcon}/>
							</RadioIndicator>
							<RadioLabel>Женский</RadioLabel>
						</Radio>
						<Radio value={Gender.Man.toString()}>
							<RadioIndicator mr="$2">
								<RadioIcon as={CircleIcon}/>
							</RadioIndicator>
							<RadioLabel>Мужской</RadioLabel>
						</Radio>
					</HStack>
				</HStack>
			</RadioGroup>

        <Center my={"$10"}>
			<Button variant="outline" minWidth={200} size={"lg"} onPress={saveHandler}>
  				<ButtonText>Сохранить</ButtonText>
			</Button>
        </Center>
      </VStack>
    </ScrollView>
  );
}
