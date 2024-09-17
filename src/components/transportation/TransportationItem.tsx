import React from "react";
import { useDispatch } from "react-redux";
import { Pressable } from "react-native";
import { HStack, Center, Menu, Text, VStack, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ITransportation } from "../../api/transportation/Transportation";
import moment from "moment";
import { TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP } from "../../api/transportation/TransportationStatusToDisplayNameMap";
import { useDeleteTransportationMutation } from "../../store/rtkQuery/transportationApi";
import { router } from "expo-router";
import { setEditingTransportation } from "../../store/slices/buildTransportationSlice";
import { TransportationStatus } from "../../api/transportation/TransportationStatus";

type TransportationItemProps = {
	transportation: ITransportation;
	isMenuVisible?: boolean;
};

export const TransportationItem = (props: TransportationItemProps) => {
	const { transportation, isMenuVisible = true } = props;
	const dispatch = useDispatch();
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

	return (
		<Box
			rounded="lg"
			overflow="hidden"
			borderWidth="1"
			borderColor={transportation.transportationOrderStatus === TransportationStatus.carrierFinding ? "coolGray.200" : "blue.100"}
			shadow={transportation.transportationOrderStatus === TransportationStatus.carrierFinding ? 1 : 3}
		>
			<HStack my={4} pl={4}>
				<VStack w="90%">
					<Text bold fontSize="xl">
						{transportation.cargo.name}
					</Text>
					<HStack space={3} my={1}>
						<Box m={"1"} minW={10} borderWidth="1" borderColor={"#bdbdbd"} rounded="md">
							<Text fontSize="xs" mx={1} color={"blue.500"} alignSelf={"center"}>
								{`${transportation.price} ₸`}
							</Text>
						</Box>

						<Box m={"1"} minW={10} borderWidth="1" borderColor={"#bdbdbd"} rounded="md">
							<Text fontSize="xs" mx={1} alignSelf={"center"}>
								{`${transportation.cargo.weight}т`}
							</Text>
						</Box>

						<Box m={"1"} minW={10} borderWidth="1" borderColor={"#bdbdbd"} rounded="md">
							<Text fontSize="xs" mx={1} alignSelf={"center"}>
								{`${transportation.cargo.volume}м³`}
							</Text>
						</Box>
					</HStack>

					<HStack mt={0}>
						<Center>
							<MaterialCommunityIcons name="map-marker-outline" size={17} color="blue" />
						</Center>
						<VStack w={"100%"}>
							<Text w="70%" pl={5} fontSize="lg">
								{`${transportation.transferInfo.loadingPlace?.city}${
									transportation.transferInfo.loadingAddress ? ", " + transportation.transferInfo.loadingAddress : ""
								}`}
							</Text>
							<Text pl={5} fontSize="xs">
								{`${moment(transportation.transferInfo.loadingDateFrom).format("DD MMMM YYYY")}${
									transportation.transferInfo?.loadingDateTo && " - " + moment(transportation.transferInfo.loadingDateTo).format("DD MMMM YYYY")
								}`}
							</Text>
						</VStack>
					</HStack>

					<HStack mt={4}>
						<Center>
							<MaterialCommunityIcons name="map-marker" size={17} color="red" />
						</Center>
						<Text w="70%" pl={5} fontSize="lg">
							{`${transportation.transferInfo.unloadingPlace?.city}${
								transportation.transferInfo.unloadingAddress ? ", " + transportation.transferInfo.unloadingAddress : ""
							}`}
						</Text>
					</HStack>

					<Center mt={4} background={transportation.transportationOrderStatus === TransportationStatus.carrierFinding ? "blueGray.50" : "blue.100"}>
						<Text fontSize="xs" px={5} py={1}>
							{TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP.get(transportation.transportationOrderStatus)}
						</Text>
					</Center>
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
