import { Platform, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { Text, Center, HStack, VStack, Fab, Icon, Pressable, Button, ScrollView } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import moment from "moment";
import { View } from "../../../components/Themed";
import { TitleAndValueItem } from "../../../components/screenItems/TitleValueItem";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";
import { LeftAlignedSection } from "../../../components/screenItems/LeftAlignedSection";
import { DRIVER_ROLE, SHIPPER_ROLE } from "../../../api/profile/Profile";
import { AuthorizationService } from "../../../services/AuthorizationService";
import UserAvatar from "../../../components/profile/Avatar";

export default function ProfileTab() {
	let content = (
		<Center flex={1} alignItems="center">
			<Text fontSize={17}>Данные ещё не заполнены</Text>
		</Center>
	);

	const { data: profile } = useGetProfileQuery();

	if (profile) {
		const phoneNumber = profile.phoneNumber;
		const birthdayMoment = moment(profile.birthDate);
		const isBirthdayValid = profile.birthDate && birthdayMoment.isValid();

		content = (
			<ScrollView px={4} mb={4}>
				<VStack space={3}>
					<Text fontSize="md" color={"blue.500"} fontWeight="500" mt={5}>
						{profile.role === SHIPPER_ROLE ? "Грузоотправитель" : "Грузоперевозчик"}
					</Text>
					<HStack space={10} my={3}>
						<UserAvatar />
						<Center maxWidth={"50%"}>
							<VStack>
								<Text fontSize="md">{profile.name}</Text>
								<Text fontSize="md">{profile.surname}</Text>
								<Text>{profile.patronymic}</Text>
							</VStack>
						</Center>
					</HStack>
					<TitleAndValueItem title={"Номер телефона"} value={!phoneNumber || phoneNumber === "" ? "Не указано" : phoneNumber} />
					{profile.reservePhoneNumber && <TitleAndValueItem title={"WhatsApp номер"} value={profile.reservePhoneNumber} />}
					{Platform.OS === "web" ? null : (
						<TitleAndValueItem title={"Дата рождения"} value={isBirthdayValid ? birthdayMoment.format("DD MMMM YYYY") : "Не указано"} />
					)}

					<Pressable onPress={() => router.push("/DocumentsModal")} my={1}>
						<LeftAlignedSection title={"Документы"} value={"Необходимо загрузить фото документов для подтверждения личности"} />
					</Pressable>

					{profile.role === DRIVER_ROLE && (
						<Pressable onPress={() => router.push("/GarageModal")} my={1}>
							<LeftAlignedSection title={"Гараж"} value={""} />
						</Pressable>
					)}

					<Pressable onPress={() => router.push("/JournalModal")} my={1}>
						<LeftAlignedSection title={"История перевозок"} value={""} />
					</Pressable>

					<Button variant="link" minW={200} size={"lg"} onPress={() => AuthorizationService.signOut()}>
						Выйти
					</Button>
				</VStack>
			</ScrollView>
		);
	}

	return (
		<View style={styles.container}>
			{content}
			<Link href="/EditProfileModal" asChild>
				<Fab
					position="absolute"
					placement="bottom-right"
					bgColor={"blue.500"}
					icon={<Icon color="white" as={<MaterialIcons name="edit" />} size="sm" />}
					renderInPortal={false}
				/>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
});
