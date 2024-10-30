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
import MapMarkerSvg from "../svg/MapMarkerSvg";
import { MAP_MARKER_BLACK, GENERAL_BLUE_COLOR } from "../../constants/Colors";
import { useGetProfileQuery } from "../../store/rtkQuery/profileApi";
import { SHIPPER_ROLE } from "../../api/profile/Profile";

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

	const { data: profile } = useGetProfileQuery();

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
			<VStack my={4} space={3}>
				<Box p={4} variant={"gray_card"}>
					<Text variant={"header15_gray"}>Маршрут</Text>
					<HStack>
						<VStack w="90%" space={1}>
							<HStack mt={3} space={3}>
								<Center>
									<MapMarkerSvg color={GENERAL_BLUE_COLOR} />
								</Center>
								<VStack w={"100%"}>
									<HStack>
										<Text variant={"header15"}>{`${transportation.transferInfo.loadingPlace?.city}`}</Text>
										<Spacer />
										<Text ml={5} variant={"body13"}>{`${moment(transportation.transferInfo.loadingDateFrom).format("DD MMMM YYYY")}`}</Text>
									</HStack>

									<HStack>
										<Text variant={"body13"}>
											{`${transportation.transferInfo.loadingPlace?.country}, ${transportation.transferInfo.loadingPlace?.region}`}
										</Text>
										<Spacer />
										<Text ml={5} variant={"body13"}>
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
					</HStack>

					{profile?.role === SHIPPER_ROLE && (
						<Button mt={2} variant="link" alignSelf={"flex-start"} onPress={() => router.navigate("/LocationModal")}>
							Посмотреть на карте
						</Button>
					)}
				</Box>

				{transportation.contactInfoDto && (
					<Box p={4} variant={"gray_card"}>
						<VStack space={4}>
							<Text variant={"header15_gray"}>Контактные данные</Text>

							<Box>
								<Text variant={"body13"}>Контактное лицо на загрузке</Text>
								<Text variant={"body17_black"}>{transportation.contactInfoDto.loadingContactPerson ?? ""}</Text>
							</Box>

							<Box>
								<Text variant={"body13"}>Контактный телефон на загрузке</Text>
								<HStack>
									<Center>
										<Text variant={"body17_black"}>{transportation.contactInfoDto.loadingContactPhone ?? ""}</Text>
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

							<Box mt={2}>
								<Text variant={"body13"}>Контактное лицо на выгрузке</Text>
								<Text variant={"body17_black"}>{transportation.contactInfoDto.unloadingContactPerson ?? ""}</Text>
							</Box>

							<Box>
								<Text variant={"body13"}>Контактный телефон на выгрузке</Text>
								<HStack>
									<Center>
										<Text variant={"body17_black"}>{transportation.contactInfoDto.unloadingContactPhone ?? ""}</Text>
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
						</VStack>
					</Box>
				)}

				<Box p={4} variant={"gray_card"}>
					<VStack space={4}>
						<Text variant={"header15_gray"}>Груз</Text>

						<Box>
							<Text variant={"body13"}>Наименование</Text>
							<Text variant={"body17_black"}>{transportation.cargo?.name ?? ""}</Text>
						</Box>

						<Box>
							<Text variant={"body13"}>Вес</Text>
							<Text variant={"body17_black"}>{transportation.cargo?.weight ?? ""} т</Text>
						</Box>

						<Box>
							<Text variant={"body13"}>Объем</Text>
							<Text variant={"body17_black"}>{transportation.cargo?.volume ?? ""} м³</Text>
						</Box>

						{((transportation.cargo?.length !== undefined && transportation.cargo?.length > 0) ||
							(transportation.cargo?.width !== undefined && transportation.cargo?.width > 0) ||
							(transportation.cargo?.height !== undefined && transportation.cargo?.height > 0)) && (
							<Box>
								<Text variant={"body13"}>Длина/Ширина/Ввысота (м)</Text>
								<Text variant={"body17_black"}>
									{transportation.cargo.length}/{transportation.cargo.width}/{transportation.cargo.height}
								</Text>
							</Box>
						)}

						{transportation.cargo?.diameter !== undefined && transportation.cargo?.diameter > 0 && (
							<Box>
								<Text variant={"body13"}>Диаметр</Text>
								<Text variant={"body17_black"}>{transportation.cargo.diameter} м</Text>
							</Box>
						)}

						{packagingTypeDisplayName && (
							<Box>
								<Text variant={"body13"}>Упаковка</Text>
								<HStack space={1}>
									<Text variant={"body17_black"}>{packagingTypeDisplayName}</Text>
									{transportation.cargo.packagingQuantity !== undefined && transportation.cargo.packagingQuantity > 0 && (
										<Text variant={"body17_black"}>{transportation.cargo.packagingQuantity} шт.</Text>
									)}
								</HStack>
							</Box>
						)}
					</VStack>
				</Box>

				{truckRequirements && (
					<Box p={4} variant={"gray_card"}>
						<VStack space={4}>
							<Text variant={"header15_gray"}>Требования к транспорту</Text>

							<Box>
								<Text variant={"body13"}>Кузов</Text>
								<Text variant={"body17_black"}>{carBodiesDisplayName.length > 0 ? carBodiesDisplayName.join(", ") : "Не указано"}</Text>
							</Box>

							{(loadingTypeDisplayNames.length > 0 || unloadingTypesDisplayNames.length > 0) && (
								<Box>
									<Text variant={"body13"}>Загрузка/выгрузка</Text>
									<Text variant={"body17_black"}>{loadingTypeDisplayNames.join(", ")}</Text>
									<Text variant={"body17_black"}>{unloadingTypesDisplayNames.join(", ")}</Text>
								</Box>
							)}

							{truckRequirements.carryingCapacity > 0 && (
								<Box>
									<Text variant={"body13"}>Грузоподъемность</Text>
									<Text variant={"body17_black"}>{truckRequirements.carryingCapacity} т</Text>
								</Box>
							)}

							{additionalTruckRequirements.length > 0 && (
								<Box>
									<Text variant={"body13"}>Доп. требования</Text>
									<Text variant={"body17_black"}>{additionalTruckRequirements.join(", ")}</Text>
								</Box>
							)}

							{dangerousGoodsRequirements.length > 0 && (
								<Box>
									<Text variant={"body13"}>Требуемые разрешения</Text>
									<Text variant={"body17_black"}>{dangerousGoodsRequirements.join(", ")}</Text>
								</Box>
							)}
						</VStack>
					</Box>
				)}
			</VStack>
		</ScrollView>
	);
}
