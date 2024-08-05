import * as React from "react";
import { useSelector } from "react-redux";
import { ScrollView, Center, VStack, Text, Heading, Box, HStack, View } from "native-base";
import moment from "moment";
import { CARBODY_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { PACKAGING_TYPE_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/PackagingTypeToDisplayNameMap";
import { RootState } from "../../store/configureStore";
import { useMemo } from "react";

export default function TransportationDetailsModal() {
	const viewedTransportation = useSelector((state: RootState) => state.transportations.viewedTransportation);

	if (!viewedTransportation) {
		return (
			<View style={{ flex: 1, alignItems: "stretch" }}>
				<Center>
					<Text>Информация отсутствует</Text>
				</Center>
			</View>
		);
	}

	const loadingPlace = viewedTransportation.transferInfo.loadingPlace;
	const unloadingPlace = viewedTransportation.transferInfo.unloadingPlace;

	const truckRequirements = viewedTransportation?.cargo?.truckRequirements;

	const carBodiesDisplayName = truckRequirements?.carBodies?.map((o) => CARBODY_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
	const loadingTypeDisplayNames = truckRequirements?.loadingTypeDtos?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
	const unloadingTypesDisplayNames =
		truckRequirements?.unloadingTypeDtos?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];
	const packagingTypeDisplayName = viewedTransportation?.cargo?.packagingType
		? PACKAGING_TYPE_DISPLAY_NAME_MAP.get(viewedTransportation.cargo.packagingType)
		: undefined;

	const loadingDateFrom = moment(viewedTransportation.transferInfo?.loadingDateFrom, moment.ISO_8601);
	const loadingDateTo = moment(viewedTransportation.transferInfo?.loadingDateTo, moment.ISO_8601);
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
		<View my={1} style={{ flex: 1, alignItems: "stretch" }}>
			<ScrollView px={4}>
				<VStack>
					<Heading my={2} size="sm">
						Маршрут
					</Heading>
					<Box ml={4}>
						<Text fontSize="lg">{loadingPlace?.city}</Text>
						<Text fontSize="xs">{`${loadingPlace?.country} - ${loadingPlace?.region}`}</Text>
						<Text fontSize="lg" ml={10}>
							↓
						</Text>
						<Text fontSize="lg">{unloadingPlace?.city}</Text>
						<Text fontSize="xs">{`${unloadingPlace?.country} - ${unloadingPlace?.region}`}</Text>
						<Text mt={4} fontSize="md">
							{loadingDisplayDateRange}
						</Text>
					</Box>

					{viewedTransportation.cargo && (
						<Box mt={4}>
							<Heading size="sm">Груз</Heading>
							<Box ml={4}>
								<Center>
									<Text mt={2} fontSize="lg" lineHeight={"xs"}>
										{viewedTransportation.cargo.name}
									</Text>
								</Center>
								<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
									Вес
								</Text>
								<Text>{viewedTransportation.cargo.weight}т</Text>

								<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
									Объем
								</Text>
								<Text>{viewedTransportation.cargo.volume}м³</Text>

								{((viewedTransportation.cargo.length !== undefined && viewedTransportation.cargo.length > 0) ||
									(viewedTransportation.cargo.width !== undefined && viewedTransportation.cargo.width > 0) ||
									(viewedTransportation.cargo.height !== undefined && viewedTransportation.cargo.height > 0)) && (
									<Box>
										<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
											Длина/Ширина/Ввысота
										</Text>
										<Text>
											{viewedTransportation.cargo.length}/{viewedTransportation.cargo.width}/{viewedTransportation.cargo.height}
										</Text>
									</Box>
								)}

								{viewedTransportation.cargo.diameter !== undefined && viewedTransportation.cargo.diameter > 0 && (
									<Box>
										<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
											Диаметр
										</Text>
										<Text>{viewedTransportation.cargo.diameter}м</Text>
									</Box>
								)}

								{packagingTypeDisplayName && (
									<Box>
										<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
											Упаковка
										</Text>
										<HStack space={1}>
											<Text>{packagingTypeDisplayName}</Text>
											{viewedTransportation.cargo.packagingQuantity !== undefined && viewedTransportation.cargo.packagingQuantity > 0 && (
												<Text>{viewedTransportation.cargo.packagingQuantity} шт.</Text>
											)}
										</HStack>
									</Box>
								)}
							</Box>
						</Box>
					)}

					{truckRequirements && (
						<Box mt={4}>
							<Heading size="sm">Транспорт</Heading>
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
		</View>
	);
}
