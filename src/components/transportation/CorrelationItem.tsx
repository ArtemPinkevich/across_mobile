import React from "react";
import { HStack, Center, Text, VStack, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ICorrelation } from "../../api/transportation/Transportation";
import moment from "moment";
import { TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP } from "../../api/transportation/TransportationStatusToDisplayNameMap";
import { TransportationStatus } from "../../api/transportation/TransportationStatus";

type CorrelationItemProps = {
	correlation: ICorrelation;
};

export const CorrelationItem = (props: CorrelationItemProps) => {
	const { correlation } = props;
	const transportation = correlation.transportationOrder;

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
					<Text fontSize="sm">{`${transportation.cargo.weight}т ${transportation.cargo.volume}м³`}</Text>

					<HStack mt={4}>
						<Center>
							<MaterialCommunityIcons name="map-marker-outline" size={17} color="blue" />
						</Center>
						<VStack w={"100%"}>
							<Text w="70%" pl={5} fontSize="lg">
								{transportation.transferInfo.loadingPlace?.city}
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
							{transportation.transferInfo.unloadingPlace?.city}
						</Text>
					</HStack>

					<Center mt={4} background={transportation.transportationOrderStatus === TransportationStatus.carrierFinding ? "blueGray.50" : "blue.100"}>
						<Text fontSize="xs" px={5} py={1}>
							{TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP.get(transportation.transportationOrderStatus)}
						</Text>
					</Center>
				</VStack>
			</HStack>
		</Box>
	);
};
