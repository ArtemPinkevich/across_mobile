import { Fontisto } from '@expo/vector-icons';
import { Button, Center, ScrollView, Input, Icon, Radio, HStack, Text, VStack, Pressable, RadioIndicator, RadioIcon, CircleIcon, RadioLabel, RadioGroup, InputField } from '@gluestack-ui/themed';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import DateTimePicker from '@react-native-community/datetimepicker';
//import { RootTabScreenProps } from '../../../types';
//import { changePhoneNumberAction, saveProfile } from '../../store/profileStore/profileActions';
//import moment from 'moment';
import { Platform } from 'react-native';
import { RootState } from '../../store/configureStore';
import PhoneNumberInput from '../../components/common/PhoneNumberInput';
import { Gender } from '../../api/GenderEnum';

export default function EditProfileModal() {
    
  const dispatch = useDispatch()

  const profile = useSelector((state: RootState) => state.profile);
  
  const [name, setName] = useState(profile?.name)
  const [surname, setSurname] = useState(profile?.surname)
  const [patronymic, setpatronymic] = useState(profile?.patronymic)
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(profile?.phoneNumber)
  const [birthday, setBirthday] = useState(profile?.birthDate);
  const [gender, setGender] = useState<string | undefined>(profile?.gender)
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const saveHandler = () => {
    const profile = {
        id: new Date().toJSON(),
        name: name?.trim(),
        surname: surname?.trim(),
        patronymic: patronymic?.trim(),
        birthDate: birthday,
        gender: gender,
    }
    // dispatch(saveProfile(profile))
    // dispatch(changePhoneNumberAction(phoneNumber))
    // navigation.navigate('TabProfile')
  }
  
//   const birthdayOnChange = (event, selectedDate) => {
// 	  setShowDatePicker(false);
// 	  setBirthday(selectedDate);
//   }

  //const isBirthdayValid = birthday && moment(birthday).isValid();

  return (
    <ScrollView>
    	<VStack mx={"$4"}>
			
			<Input variant="underlined" size="md">
				<InputField placeholder="Имя" value={phoneNumber} onChangeText={setName} />
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
							{/* <Input isReadOnly={true} variant="underlined" size="md" placeholder="Дата рождения" value={isBirthdayValid ? moment(birthday).format('DD MMMM YYYY') : ''} /> */}
						</Pressable>
			}
			{/* {showDatePicker && (
				<DateTimePicker
					value={isBirthdayValid ? new Date(birthday) : new Date()}
					is24Hour={true}
					display="default"
					onChange={birthdayOnChange}/>)} */}

        	<RadioGroup
				value={gender?.toString()}
				// onChange={arg => setGender(+arg)}
				accessibilityLabel="Пол">
				<HStack mt={"$2"}>
					<Center p={"$2"}>
						<Text>Пол</Text>
					</Center>

					{/* <Spacer/> */}

					<HStack space={"md"}>
						<Radio
							value={Gender.Woman.toString()}
							// icon={<Icon as={<Fontisto name="female" color={"yellow"} />} />}
							my={1}>

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
					{/* <Spacer/> */}
				</HStack>
			</RadioGroup>

        <Center my={"$10"}>
			<Button variant="outline" minWidth={200} size={"lg"} onPress={saveHandler}>Сохранить</Button>
        </Center>
      </VStack>
    </ScrollView>
  );
}

