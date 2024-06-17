import { Platform, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { Text, Center, HStack, VStack, Fab, Icon, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import moment from "moment";
import { View } from "../../../components/Themed";
import { TitleAndValueItem } from "../../../components/screenItems/TitleValueItem";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";
import { LeftAlignedSection } from "../../../components/screenItems/LeftAlignedSection";

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
			<View style={{ width: "90%" }}>
				<VStack space={3}>
					<HStack space={5} my={3}>
						<Center>
							<MaterialIcons name="account-circle" size={24} color="black" />
						</Center>
						<VStack>
							<Text fontSize="xl">
								{profile.name} {profile.surname}
							</Text>
							<Text>{profile.patronymic}</Text>
						</VStack>
					</HStack>
					<TitleAndValueItem title={"Номер телефона"} value={!phoneNumber || phoneNumber === "" ? "Не указано" : phoneNumber} />
					{Platform.OS === "web" ? null : (
						<TitleAndValueItem title={"Дата рождения"} value={isBirthdayValid ? birthdayMoment.format("DD MMMM YYYY") : "Не указано"} />
					)}

					<Pressable onPress={() => router.push("/DocumentsModal")} my={1}>
						<LeftAlignedSection title={"Документы"} value={"Необходимо загрузить фото документов для подтверждения личности"} />
					</Pressable>
				</VStack>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{content}
			<Link href="/EditProfileModal" asChild>
				<Fab
					position="absolute"
					placement="bottom-right"
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
