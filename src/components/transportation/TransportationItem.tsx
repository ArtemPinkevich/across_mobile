import React from "react";
import { useDispatch } from "react-redux";
import { Pressable } from "react-native";
import { HStack, Center, Menu, Text, VStack, Box, Badge, Spacer } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ITransportation } from "../../api/transportation/Transportation";
import moment from "moment";
import {
	TRANSPORTATION_STATUS_TO_BGCOLOR_MAP,
	TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP,
	TRANSPORTATION_STATUS_TO_TEXTCOLOR_MAP,
} from "../../api/transportation/TransportationStatusToDisplayNameMap";
import { useDeleteTransportationMutation } from "../../store/rtkQuery/transportationApi";
import { router } from "expo-router";
import { setEditingTransportation } from "../../store/slices/buildTransportationSlice";
import MapMarkerSvg from "../svg/MapMarkerSvg";
import { MAP_MARKER_BLACK, GENERAL_BLUE_COLOR } from "../../constants/Colors";
import { useGetProfileQuery } from "../../store/rtkQuery/profileApi";
import { DRIVER_ROLE } from "../../api/profile/Profile";
import { LOGISTIC_COMMISSION } from "../../constants/GlobalConstants";

type TransportationItemProps = {
	transportation: ITransportation;
	isMenuVisible?: boolean;
	isStatusVisible?: boolean;
};

export const TransportationItem = (props: TransportationItemProps) => {
	const { transportation, isMenuVisible = true, isStatusVisible = true } = props;
	const dispatch = useDispatch();
	const { data: profile } = useGetProfileQuery();
	const [deleteTransportation] = useDeleteTransportationMutation();

	const removeHandler = () => {
		if (transportation.transportationOrderId) {
			deleteTransportation(transportation.transportationOrderId);
		}
	};

	const cloneHandler = () => {
		dispatch(setEditingTransportation(transportation));
		router.push("/CargoEditingModal");
	};

	// Для водителя показываем стоимость за вычетом комиссии
	let adjustedPrice = transportation?.price ?? 0;
	if (profile?.role === DRIVER_ROLE) {
		adjustedPrice = adjustedPrice * (1 - LOGISTIC_COMMISSION);
	}
	const displyPrice = adjustedPrice.toLocaleString("ru-RU", { maximumFractionDigits: 2 });

	return (
		<Box variant={"gray_card"}>
			<HStack my={4} pl={4}>
				<VStack w="90%" space={1}>
					<Text variant={"header17"}>{transportation.cargo.name}</Text>
					{transportation.price && <Text mt={1} variant={"header15"}>{`${displyPrice} ₸`}</Text>}
					<HStack mt={1}>
						<Text variant={"body15_gray"}>Вес</Text>
						<Text variant={"body15_black"} ml={2}>
							{`${transportation.cargo.weight} т`}
						</Text>

						<Text variant={"body15_gray"} ml={8}>
							Объем
						</Text>
						<Text variant={"body15_black"} ml={2}>
							{`${transportation.cargo.volume} м³`}
						</Text>
					</HStack>

					{isStatusVisible && (
						<Badge
							variant={"status_badge"}
							mt={1}
							bgColor={TRANSPORTATION_STATUS_TO_BGCOLOR_MAP.get(transportation.transportationOrderStatus)}
							alignSelf={"flex-start"}
						>
							<Text variant={"body12"} color={TRANSPORTATION_STATUS_TO_TEXTCOLOR_MAP.get(transportation.transportationOrderStatus)}>
								{TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP.get(transportation.transportationOrderStatus)}
							</Text>
						</Badge>
					)}

					<HStack mt={3} space={3}>
						<Center>
							<MapMarkerSvg color={GENERAL_BLUE_COLOR} />
						</Center>
						<VStack w={"100%"}>
							<HStack>
								<Text variant={"header15"}>{`${transportation.transferInfo.loadingPlace?.city}`}</Text>
								<Spacer />
								<Text mr={2} variant={"body13"}>{`${moment(transportation.transferInfo.loadingDateFrom).format("DD MMMM YYYY")}`}</Text>
							</HStack>

							<HStack>
								<Text variant={"body13"}>
									{`${transportation.transferInfo.loadingPlace?.country}, ${transportation.transferInfo.loadingPlace?.region}`}
								</Text>
								<Spacer />
								<Text mr={2} variant={"body13"}>
									{transportation.contactInfoDto?.loadingTime ?? ""}
								</Text>
							</HStack>

							<Text variant={"body13"}>{transportation.transferInfo.loadingAddress}</Text>
						</VStack>
					</HStack>

					<HStack mt={4} space={3}>
						<Center>
							<MapMarkerSvg color={MAP_MARKER_BLACK} />
						</Center>
						<VStack w={"100%"}>
							<Text variant={"header15"}>{`${transportation.transferInfo.unloadingPlace?.city}`}</Text>
							<Text variant={"body13"}>
								{`${transportation.transferInfo.unloadingPlace?.country}, ${transportation.transferInfo.unloadingPlace?.region}`}
							</Text>
							<Text variant={"body13"}>{transportation.transferInfo.unloadingAddress}</Text>
						</VStack>
					</HStack>
				</VStack>

				{/* defaultIsOpen={false} чтобы не фризился экран (по мотивам https://github.com/GeekyAnts/NativeBase/issues/4730) */}
				{isMenuVisible && (
					<Box mt={4}>
						<Menu
							shadow={2}
							w="150"
							defaultIsOpen={false}
							trigger={(triggerProps) => (
								<Pressable accessibilityLabel="More options menu" {...triggerProps}>
									<MaterialCommunityIcons name="dots-vertical" size={17} />
								</Pressable>
							)}
						>
							<Menu.Item onPress={cloneHandler}>Создать копированием</Menu.Item>
							<Menu.Item onPress={removeHandler}>Удалить</Menu.Item>
						</Menu>
					</Box>
				)}
			</HStack>
		</Box>
	);
};
