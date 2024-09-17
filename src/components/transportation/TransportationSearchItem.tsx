import React from "react";
import { HStack, Center, Text, VStack, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ITransportation } from "../../api/transportation/Transportation";

type TransportationSearchItemProps = {
	transportation: ITransportation;
};

export const TransportationSearchItem = (props: TransportationSearchItemProps) => {
	const { transportation } = props;

	return (
		<Box overflow="hidden" borderColor="coolGray.200" borderWidth="1" shadow={1} borderRadius={5}>
			<HStack my={1} pl={4}>
				<VStack w="90%">
					<Text bold fontSize="md">
						{transportation.cargo.name}
					</Text>

					<HStack space={5} alignSelf={"center"}>
						<Text fontSize="xs" color={"blue.500"}>{`${transportation.price} ₸`}</Text>
						<Text fontSize="xs">{`${transportation.cargo.weight}т`}</Text>
						<Text fontSize="xs">{`${transportation.cargo.volume}м³`}</Text>
					</HStack>

					<HStack>
						<Center>
							<MaterialCommunityIcons name="map-marker-outline" size={12} color="blue" />
						</Center>
						<Text ml={5} fontSize="xs">
							<Text bold>{transportation.transferInfo.loadingPlace?.city}</Text>, {transportation.transferInfo.loadingPlace?.country},{" "}
							{transportation.transferInfo.loadingPlace?.region}
						</Text>
					</HStack>

					<HStack>
						<Center>
							<MaterialCommunityIcons name="map-marker" size={12} color="red" />
						</Center>
						<Text ml={5} fontSize="xs">
							<Text bold>{transportation.transferInfo.unloadingPlace?.city}</Text>, {transportation.transferInfo.unloadingPlace?.country},{" "}
							{transportation.transferInfo.unloadingPlace?.region}
						</Text>
					</HStack>
				</VStack>
			</HStack>
		</Box>
	);
};
