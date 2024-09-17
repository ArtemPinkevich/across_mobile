import React from "react";
import { Pressable } from "react-native";
import { HStack, Center, Menu, Text, VStack, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ITransportation } from "../../api/transportation/Transportation";
import moment from "moment";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { setEditingTransportation } from "../../store/slices/buildTransportationSlice";
import { useGetProfileQuery } from "../../store/rtkQuery/profileApi";
import { SHIPPER_ROLE } from "../../api/profile/Profile";

type TransportationJournalItemProps = {
	transportation: ITransportation;
};

export const TransportationJournalItem = (props: TransportationJournalItemProps) => {
	const { transportation } = props;
	const dispatch = useDispatch();

	const { data: profile } = useGetProfileQuery();

	const cloneHandler = () => {
		dispatch(setEditingTransportation(transportation));
		router.push("/CargoEditingModal");
	};

	return (
		<Box overflow="hidden" borderColor="coolGray.200" borderWidth="1" shadow={1}>
			<HStack my={1} pl={4}>
				<VStack w="90%">
					<Text bold fontSize="md">
						{transportation.cargo.name}
					</Text>

					<HStack space={5}>
						<Text fontSize="xs">{`${transportation.price} ₸`}</Text>
						<Text fontSize="xs">{`${transportation.cargo.weight}т`}</Text>
						<Text fontSize="xs">{`${transportation.cargo.volume}м³`}</Text>
					</HStack>

					<HStack>
						<Center>
							<MaterialCommunityIcons name="map-marker-outline" size={12} color="blue" />
						</Center>
						<VStack>
							<Text ml={5} fontSize="xs">
								{`${moment(transportation.transferInfo.loadingDateFrom).format("DD.MM.YYYY")}`}
							</Text>
							<Text ml={5} fontSize="xs">
								{transportation.transferInfo.loadingPlace?.city}
							</Text>
						</VStack>
					</HStack>

					<HStack>
						<Center>
							<MaterialCommunityIcons name="map-marker" size={12} color="red" />
						</Center>
						<VStack>
							{/* TODO Добавить фактическую дату доставки */}
							<Text ml={5} fontSize="xs" color={"red.500"}>
								Здесь будет дата доставки
							</Text>
							<Text ml={5} fontSize="xs">
								{transportation.transferInfo.unloadingPlace?.city}
							</Text>
						</VStack>
					</HStack>
				</VStack>

				{/* defaultIsOpen={false} чтобы не фризился экран (по мотивам https://github.com/GeekyAnts/NativeBase/issues/4730) */}
				{profile?.role === SHIPPER_ROLE && (
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
						</Menu>
					</Box>
				)}
			</HStack>
		</Box>
	);
};
