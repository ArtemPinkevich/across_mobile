import { router } from "expo-router";
import { Text, Center, HStack, VStack, Pressable, Button, ScrollView, Box, IconButton } from "native-base";
import React from "react";
import { View } from "../../../components/Themed";
import { useGetProfileQuery } from "../../../store/rtkQuery/profileApi";
import { DRIVER_ROLE, IProfile } from "../../../api/profile/Profile";
import { AuthorizationService } from "../../../services/AuthorizationService";
import UserAvatar from "../../../components/profile/Avatar";
import { ArrowToRightSectionHoc } from "../../../components/screenItems/ArrowToRightSectionHoc";
import { ArrowToRightBlackHeaderSectionHoc } from "../../../components/screenItems/ArrowToRightBlackHeaderSectionHoc";
import { GENERAL_RED_COLOR } from "../../../constants/Colors";
import { useGetPayInfoQuery } from "../../../store/rtkQuery/payApi";

export default function ProfileTab() {
	let content = (
		<Center flex={1} alignItems="center">
			<Text fontSize={17}>Данные ещё не заполнены</Text>
		</Center>
	);

	const { data: profile } = useGetProfileQuery();
	const { data: payInfo } = useGetPayInfoQuery();

	if (profile) {
		content = (
			<ScrollView px={4} mb={4}>
				<VStack space={4}>
					<Center mt={6} mb={2}>
						<Box h={160} w={160}>
							<UserAvatar />
						</Box>
					</Center>

					<Box p={4} variant={"gray_card"}>
						<VStack space={4}>
							<Pressable onPress={() => router.push("/EditProfileModal")}>
								<ArrowToRightSectionHoc title="Имя">
									<HStack space={2} flexWrap={"wrap"}>
										{profile?.surname && <Text variant={"body17_black"}>{profile.surname}</Text>}
										<Text variant={"body17_black"}>{profile.name ?? ""}</Text>
										<Text variant={"body17_black"}>{profile.patronymic ?? ""}</Text>
									</HStack>
								</ArrowToRightSectionHoc>
							</Pressable>

							<Pressable onPress={() => router.push("/EditProfileModal")}>
								<ArrowToRightSectionHoc title="Номер телефона">
									<Text variant={"body17_black"}>{profile.phoneNumber ?? ""}</Text>
								</ArrowToRightSectionHoc>
							</Pressable>

							{profile.reservePhoneNumber && (
								<Pressable onPress={() => router.push("/EditProfileModal")}>
									<ArrowToRightSectionHoc title="WhatsApp телефона">
										<Text variant={"body17_black"}>{profile.reservePhoneNumber ?? ""}</Text>
									</ArrowToRightSectionHoc>
								</Pressable>
							)}
						</VStack>
					</Box>

					{profile.role === DRIVER_ROLE && (
						<Box p={4} variant={"gray_card"}>
							<Pressable onPress={() => router.push("/DocumentsModal")}>
								<ArrowToRightBlackHeaderSectionHoc title="Документы">
									<Text variant={"body13"}>Необходимо загрузить фото документов</Text>
								</ArrowToRightBlackHeaderSectionHoc>
							</Pressable>
						</Box>
					)}

					{profile.role === DRIVER_ROLE && (
						<Box px={4} py={6} variant={"gray_card"}>
							<Pressable onPress={() => router.push("/GarageModal")}>
								<ArrowToRightBlackHeaderSectionHoc title="Гараж"></ArrowToRightBlackHeaderSectionHoc>
							</Pressable>
						</Box>
					)}

					<Box px={4} py={6} variant={"gray_card"}>
						<Pressable onPress={() => router.push("/JournalModal")}>
							<ArrowToRightBlackHeaderSectionHoc title="История перевозок"></ArrowToRightBlackHeaderSectionHoc>
						</Pressable>
					</Box>

					{profile.role === DRIVER_ROLE && (
						<Box p={4} variant={"gray_card"}>
							<Pressable onPress={() => router.push("/PaymentModal")}>
								<ArrowToRightBlackHeaderSectionHoc title="Подписка">
									{payInfo?.isPaymentDateExpired ? (
										<Text variant={"body13"} color={GENERAL_RED_COLOR}>
											Истекла
										</Text>
									) : (
										<Text variant={"body13"} color={"green.500"}>
											Активна
										</Text>
									)}
								</ArrowToRightBlackHeaderSectionHoc>
							</Pressable>
						</Box>
					)}

					<Button my={6} variant="red_link_button" fontSize={17} onPress={() => AuthorizationService.signOut()}>
						<Text variant={"header17"} color={GENERAL_RED_COLOR}>
							Выйти
						</Text>
					</Button>
				</VStack>
			</ScrollView>
		);
	}

	return <View style={{ flex: 1, alignItems: "stretch" }}>{content}</View>;
}
