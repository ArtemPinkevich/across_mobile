import * as React from "react";
import { ScrollView, Center, VStack, Text, Heading, Box, HStack, View, IconButton, Spacer, Button } from "native-base";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import * as Linking from "expo-linking";
import moment from "moment";
import { CARBODY_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { PACKAGING_TYPE_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/PackagingTypeToDisplayNameMap";
import { useMemo } from "react";
import { ITransportation } from "../../api/transportation/Transportation";
import { router } from "expo-router";

type Props = {
	transportation: ITransportation;
};

export default function TransportationDetailsModal(props: Props) {
	const { transportation } = props;

	if (!transportation) {
		return (
			<View style={{ flex: 1, alignItems: "stretch" }}>
				<Center>
					<Text>Информация отсутствует</Text>
				</Center>
			</View>
		);
	}

	const loadingPlace = transportation.transferInfo.loadingPlace;
	const unloadingPlace = transportation.transferInfo.unloadingPlace;

	const truckRequirements = transportation?.cargo?.truckRequirements;

	const carBodiesDisplayName = truckRequirements?.carBodies?.map((o) => CARBODY_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
	const loadingTypeDisplayNames = truckRequirements?.loadingTypeDtos?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
	const unloadingTypesDisplayNames =
		truckRequirements?.unloadingTypeDtos?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
	const packagingTypeDisplayName = transportation?.cargo?.packagingType
		? PACKAGING_TYPE_DISPLAY_NAME_MAP.get(transportation.cargo.packagingType)
		: undefined;

	const loadingDateFrom = moment(transportation.transferInfo?.loadingDateFrom, moment.ISO_8601);
	const loadingDateTo = moment(transportation.transferInfo?.loadingDateTo, moment.ISO_8601);
	const loadingDisplayDateRange = useMemo(() => {
		return loadingDateFrom.isValid()
			? loadingDateTo.isValid()
				? `${loadingDateFrom.format("DD.MM.YYYY")} - ${loadingDateTo.format("DD.MM.YYYY")}`
				: `${loadingDateFrom.format("DD.MM.YYYY")}`
			: "Дата не определена";
	}, [loadingDateFrom, loadingDateTo]);

	const additionalTruckRequirements = [];
	if (truckRequirements?.hasLtl) additionalTruckRequirements.push("Догруз");
	if (truckRequirements?.hasLiftgate) additionalTruckRequirements.push("Гидролифт");
	if (truckRequirements?.hasStanchionTrailer) additionalTruckRequirements.push("Коники");

	const dangerousGoodsRequirements = [];
	if (truckRequirements?.adr1) dangerousGoodsRequirements.push("ADR-1");
	if (truckRequirements?.adr2) dangerousGoodsRequirements.push("ADR-2");
	if (truckRequirements?.adr3) dangerousGoodsRequirements.push("ADR-3");
	if (truckRequirements?.adr4) dangerousGoodsRequirements.push("ADR-4");
	if (truckRequirements?.adr5) dangerousGoodsRequirements.push("ADR-5");
	if (truckRequirements?.adr6) dangerousGoodsRequirements.push("ADR-6");
	if (truckRequirements?.adr7) dangerousGoodsRequirements.push("ADR-7");
	if (truckRequirements?.adr8) dangerousGoodsRequirements.push("ADR-8");
	if (truckRequirements?.adr9) dangerousGoodsRequirements.push("ADR-9");
	if (truckRequirements?.tir) dangerousGoodsRequirements.push("TIR");
	if (truckRequirements?.ekmt) dangerousGoodsRequirements.push("EKMT");

	return (
		<ScrollView px={4}>
			<VStack>
				<Heading my={2} size="sm">
					Маршрут
				</Heading>
				<Box ml={4}>
					<HStack>
						<Center>
							<Text fontSize="md">{loadingDisplayDateRange}</Text>
						</Center>
						{transportation.contactInfoDto?.loadingTime && (
							<Center>
								<Text fontSize="xl">
									{" - "}
									<Text color={"orange.500"} bold>
										{transportation.contactInfoDto.loadingTime}
									</Text>
								</Text>
							</Center>
						)}
					</HStack>
					<HStack>
						<Text fontSize="lg">{loadingPlace?.city}</Text>
						{transportation.transferInfo.loadingAddress && (
							<Center>
								<Text fontSize="md">{`, ${transportation.transferInfo.loadingAddress}`}</Text>
							</Center>
						)}
					</HStack>
					<Text fontSize="xs">{`${loadingPlace?.country} - ${loadingPlace?.region}`}</Text>
					<Text fontSize="lg" ml={10}>
						↓
					</Text>

					<HStack>
						<Text fontSize="lg">{unloadingPlace?.city}</Text>
						{transportation.transferInfo.unloadingAddress && (
							<Center>
								<Text fontSize="md">{`, ${transportation.transferInfo.unloadingAddress}`}</Text>
							</Center>
						)}
					</HStack>
					<Text fontSize="xs">{`${unloadingPlace?.country} - ${unloadingPlace?.region}`}</Text>

					<Button mt={2} variant="link" alignSelf={"flex-start"} onPress={() => router.navigate("/LocationModal")}>
						Посмотреть на карте
					</Button>
				</Box>

				{transportation.contactInfoDto && (
					<Heading mt={2} size="sm">
						Контактные данные
					</Heading>
				)}

				{transportation.contactInfoDto && (
					<Box ml={4}>
						<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
							Контактное лицо на загрузке
						</Text>
						<Text>{transportation.contactInfoDto.loadingContactPerson}</Text>
						<HStack>
							<Center>
								<Text>{transportation.contactInfoDto.loadingContactPhone}</Text>
							</Center>
							<Spacer />
							<IconButton
								mr={5}
								variant={"outline"}
								_icon={{ as: MaterialIcons, name: "call" }}
								size={7}
								onPress={() => Linking.openURL(`tel:+${transportation.contactInfoDto?.loadingContactPhone}`)}
							/>
						</HStack>
					</Box>
				)}

				{transportation.contactInfoDto && (
					<Box ml={4}>
						<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
							Контактное лицо на выгрузке
						</Text>
						<Text>{transportation.contactInfoDto.unloadingContactPerson}</Text>
						<HStack>
							<Center>
								<Text>{transportation.contactInfoDto.unloadingContactPhone}</Text>
							</Center>
							<Spacer />
							<IconButton
								mr={5}
								variant={"outline"}
								_icon={{ as: MaterialIcons, name: "call" }}
								size={7}
								onPress={() => Linking.openURL(`tel:+${transportation.contactInfoDto?.unloadingContactPhone}`)}
							/>
						</HStack>
					</Box>
				)}

				{transportation.cargo && (
					<Box mt={4}>
						<Heading size="sm">Груз</Heading>
						<Box ml={4}>
							<Center>
								<Text mt={2} fontSize="lg" lineHeight={"xs"}>
									{transportation.cargo.name}
								</Text>
							</Center>
							<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
								Ставка
							</Text>
							<Text>{transportation.price} ₸</Text>

							<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
								Вес
							</Text>
							<Text>{transportation.cargo.weight}т</Text>

							<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
								Объем
							</Text>
							<Text>{transportation.cargo.volume}м³</Text>

							{((transportation.cargo.length !== undefined && transportation.cargo.length > 0) ||
								(transportation.cargo.width !== undefined && transportation.cargo.width > 0) ||
								(transportation.cargo.height !== undefined && transportation.cargo.height > 0)) && (
								<Box>
									<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
										Длина/Ширина/Ввысота
									</Text>
									<Text>
										{transportation.cargo.length}/{transportation.cargo.width}/{transportation.cargo.height}
									</Text>
								</Box>
							)}

							{transportation.cargo.diameter !== undefined && transportation.cargo.diameter > 0 && (
								<Box>
									<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
										Диаметр
									</Text>
									<Text>{transportation.cargo.diameter}м</Text>
								</Box>
							)}

							{packagingTypeDisplayName && (
								<Box>
									<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
										Упаковка
									</Text>
									<HStack space={1}>
										<Text>{packagingTypeDisplayName}</Text>
										{transportation.cargo.packagingQuantity !== undefined && transportation.cargo.packagingQuantity > 0 && (
											<Text>{transportation.cargo.packagingQuantity} шт.</Text>
										)}
									</HStack>
								</Box>
							)}
						</Box>
					</Box>
				)}

				{truckRequirements && (
					<Box mt={4}>
						<Heading size="sm">Требования к транспорту</Heading>
						<Box ml={4}>
							<Box>
								<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
									Кузов
								</Text>
								<Text>{carBodiesDisplayName.length > 0 ? carBodiesDisplayName.join(", ") : "Не указано"}</Text>
							</Box>
							{(loadingTypeDisplayNames.length > 0 || unloadingTypesDisplayNames.length > 0) && (
								<Box>
									<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
										Загрузка/выгрузка
									</Text>
									<Text>{loadingTypeDisplayNames.join(", ")}</Text>
									<Text>{unloadingTypesDisplayNames.join(", ")}</Text>
								</Box>
							)}
							{truckRequirements.carryingCapacity > 0 && (
								<Box>
									<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
										Грузоподъемность
									</Text>
									<Text>{truckRequirements.carryingCapacity}т</Text>
								</Box>
							)}
							{additionalTruckRequirements.length > 0 && (
								<Box>
									<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
										Доп. требования
									</Text>
									<Text>{additionalTruckRequirements.join(", ")}</Text>
								</Box>
							)}

							{dangerousGoodsRequirements.length > 0 && (
								<Box>
									<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
										Требуемые разрешения
									</Text>
									<Text>{dangerousGoodsRequirements.join(", ")}</Text>
								</Box>
							)}
						</Box>
					</Box>
				)}
			</VStack>
		</ScrollView>
	);
}
