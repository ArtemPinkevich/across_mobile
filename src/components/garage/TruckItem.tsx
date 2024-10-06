import React from "react";
import { Pressable } from "react-native";
import { HStack, Center, VStack, Menu, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ITruck } from "../../api/truck/Truck";
import { CARBODY_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { TRAILER_TYPE_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/TrailerTypeToDisplayNameMap";
import { useDeleteTruckMutation } from "../../store/rtkQuery/garageApi";
import { router } from "expo-router";
import TruckSvg from "../svg/TruckSvg";

type CarProps = {
	truck: ITruck;
};

export const TruckItem = (props: CarProps) => {
	const { truck } = props;
	const [deleteTruck] = useDeleteTruckMutation();

	const trailerTypeDisplayName = truck?.trailerType || truck?.trailerType === 0 ? TRAILER_TYPE_DISPLAY_NAME_MAP.get(truck.trailerType) ?? "" : "";
	const carBodyDisplayName = truck?.carBodyType || truck?.carBodyType === 0 ? CARBODY_DISPLAY_NAME_MAP.get(truck.carBodyType) ?? "" : "";

	const removeHandler = () => {
		if (truck.truckId) {
			deleteTruck(truck.truckId);
		}
	};

	return (
		<HStack>
			<Center>
				<TruckSvg color={"#000"} />
			</Center>
			<VStack pl={5} w="80%">
				<Text variant={"body17_black"}>{trailerTypeDisplayName}</Text>
				<Text variant={"body13"}>{carBodyDisplayName}</Text>
			</VStack>
			<Center>
				{/* defaultIsOpen={false} чтобы не фризился экран (по мотивам https://github.com/GeekyAnts/NativeBase/issues/4730) */}
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
					<Menu.Item onPress={() => router.push({ pathname: "/TruckPhotosModal", params: { truckId: truck.truckId?.toString() ?? "" } })}>
						Перейти к фото
					</Menu.Item>
					<Menu.Item onPress={removeHandler}>Удалить</Menu.Item>
				</Menu>
			</Center>
		</HStack>
	);
};
