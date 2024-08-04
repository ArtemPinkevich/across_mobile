import { useState } from "react";
import { Button, Center, CheckIcon, Input, Text, Select, Spacer, VStack, Heading } from "native-base";
import { useChangeRoleMutation, useGetProfileQuery, useUpdateProfileMutation } from "../../../store/rtkQuery/profileApi";
import { router } from "expo-router";
import { View } from "../../../components/Themed";
import { DRIVER_ROLE, IProfile, SHIPPER_ROLE } from "../../../api/profile/Profile";
import RoleConfirmationModal from "./RoleConfirmationModal";

export default function InitialEntryPersonalInfo() {
	const { data: profile } = useGetProfileQuery();
	const [updateProfile] = useUpdateProfileMutation();
	const [сhangeRole, { isLoading }] = useChangeRoleMutation();

	const [name, setName] = useState(profile?.name);
	const [surname, setSurname] = useState(profile?.surname);
	const [patronymic, setpatronymic] = useState(profile?.patronymic);
	const [role, setRole] = useState(profile?.role ?? DRIVER_ROLE);
	const [showModal, setShowModal] = useState(false);

	const handleNext = async () => {
		const profile: IProfile = {
			name: name?.trim(),
			surname: surname?.trim(),
			patronymic: patronymic?.trim(),
			phoneNumber: "",
			documentDtos: [],
		};

		await updateProfile(profile);

		if (role !== profile?.role) {
			await сhangeRole(role);
		}

		router.replace("/(app)/(tabs)");
	};

	return (
		<View style={{ flex: 1 }}>
			<Center>
				<Heading size="sm" my={10}>
					Персональная информация
				</Heading>
			</Center>

			<VStack my={10} mx={5}>
				<Input variant="underlined" size="md" placeholder="Имя" value={name} onChangeText={setName} autoFocus />
				<Input variant="underlined" size="md" placeholder="Фамилия" value={surname} onChangeText={setSurname} />
				<Input variant="underlined" size="md" placeholder="Отчество" value={patronymic} onChangeText={setpatronymic} />
				<Text bold mt={10} mb={2}>
					Роль
				</Text>
				<Select
					defaultValue={role}
					accessibilityLabel="TrailerType"
					onValueChange={(arg) => setRole(arg)}
					_selectedItem={{
						bg: "teal.600",
						endIcon: <CheckIcon size={5} />,
					}}
				>
					<Select.Item label="Перевозчик" value={DRIVER_ROLE} />
					<Select.Item label="Отправитель" value={SHIPPER_ROLE} />
				</Select>
			</VStack>

			<Spacer />
			<Center>
				<Button variant="outline" mb={10} w={200} size={"lg"} isLoading={isLoading} onPress={() => setShowModal(true)}>
					Далее
				</Button>
			</Center>
			<Spacer />
			<RoleConfirmationModal showModal={showModal} role={role} onCancel={() => setShowModal(false)} onOk={handleNext} />
		</View>
	);
}
