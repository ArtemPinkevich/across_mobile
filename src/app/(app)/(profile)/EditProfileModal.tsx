import * as React from "react";
import { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Button, Center, ScrollView, Input, VStack, Pressable, Text } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { View } from "../../../components/Themed";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../../store/rtkQuery/profileApi";
import { IProfile, IProfileResult } from "../../../api/profile/Profile";
import { ApiCommonResult } from "../../../api/common/commonApi";

export default function EditProfileModal() {
	const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();
	const { data: profile } = useGetProfileQuery();

	const [name, setName] = useState(profile?.name);
	const [surname, setSurname] = useState(profile?.surname);
	const [patronymic, setpatronymic] = useState(profile?.patronymic);
	const [phoneNumber, setPhoneNumber] = useState<string | undefined>(profile?.phoneNumber);
	const [birthday, setBirthday] = useState(profile?.birthDate);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const saveHandler = async () => {
		const profile: IProfile = {
			name: name?.trim(),
			surname: surname?.trim(),
			patronymic: patronymic?.trim(),
			phoneNumber: phoneNumber ?? "",
			birthDate: birthday,
			documentDtos: [],
		};

		const responce: IProfileResult = await updateProfile(profile).unwrap();
		if (responce?.result === ApiCommonResult.Ok) {
			router.back();
		} else {
			console.log(responce?.reasons);
			return;
		}
	};

	const birthdayOnChange = (event: any, selectedDate: any) => {
		setShowDatePicker(false);
		setBirthday(selectedDate);
	};

	const isBirthdayValid = birthday && moment(birthday).isValid();

	return (
		<View style={styles.container}>
			<ScrollView px={4}>
				<VStack mx={"4"}>
					<Input variant="underlined" size="md" placeholder="Имя" value={name} onChangeText={setName} />
					<Input variant="underlined" size="md" placeholder="Фамилия" value={surname} onChangeText={setSurname} />
					<Input variant="underlined" size="md" placeholder="Отчество" value={patronymic} onChangeText={setpatronymic} />

					{Platform.OS === "web" ? null : (
						<Pressable onPress={() => setShowDatePicker(true)}>
							<Input
								isReadOnly={true}
								variant="underlined"
								size="md"
								placeholder="Дата рождения"
								value={isBirthdayValid ? moment(birthday).format("DD MMMM YYYY") : ""}
							/>
						</Pressable>
					)}

					{showDatePicker && (
						<DateTimePicker value={isBirthdayValid ? new Date(birthday) : new Date()} is24Hour={true} display="default" onChange={birthdayOnChange} />
					)}

					<Center my={"10"}>
						<Button variant="outline" minW={200} size={"lg"} isLoading={isLoading} onPress={saveHandler}>
							Сохранить
						</Button>
						{error && <Text color={"red.500"}>Не удалось выполнить операцию</Text>}
					</Center>
				</VStack>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
});
