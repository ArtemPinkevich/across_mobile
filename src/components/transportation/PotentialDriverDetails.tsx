import * as React from "react";
import { ScrollView, VStack, Text, Heading, Box, View } from "native-base";
import { CARBODY_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/CarBodyToDisplayNameMap";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/LoadingTypeToDisplayNameMap";
import { ICorrelation } from "../../api/transportation/Transportation";
import { TRAILER_TYPE_DISPLAY_NAME_MAP } from "../../api/transportation/toDisplayNameMappers/TrailerTypeToDisplayNameMap";

type Props = {
	correlation: ICorrelation;
};

export default function PotentialDriverDetails(props: Props) {
	const { correlation } = props;

	if (!correlation?.truck) {
		return null;
	}

	const driver = correlation.driver;
	const truck = correlation.truck;

	const trailerTypeDisplayName = truck.trailerType || truck.trailerType === 0 ? TRAILER_TYPE_DISPLAY_NAME_MAP.get(truck.trailerType) ?? "" : "";
	const carBodyDisplayName = truck.carBodyType || truck.carBodyType === 0 ? CARBODY_DISPLAY_NAME_MAP.get(truck.carBodyType) ?? "" : "";

	const loadingTypeDisplayNames = truck.loadingType?.map((o) => LOADING_TYPE_DISPLAY_NAME_MAP.get(o) ?? "").filter((s) => s) ?? [];

	const additionalTruckRequirements = [];
	if (truck.hasLtl) additionalTruckRequirements.push("Догруз");
	if (truck.hasLiftgate) additionalTruckRequirements.push("Гидролифт");
	if (truck.hasStanchionTrailer) additionalTruckRequirements.push("Коники");

	const dangerousGoodsRequirements = [];
	if (truck.adr1) dangerousGoodsRequirements.push("ADR-1");
	if (truck.adr2) dangerousGoodsRequirements.push("ADR-2");
	if (truck.adr3) dangerousGoodsRequirements.push("ADR-3");
	if (truck.adr4) dangerousGoodsRequirements.push("ADR-4");
	if (truck.adr5) dangerousGoodsRequirements.push("ADR-5");
	if (truck.adr6) dangerousGoodsRequirements.push("ADR-6");
	if (truck.adr7) dangerousGoodsRequirements.push("ADR-7");
	if (truck.adr8) dangerousGoodsRequirements.push("ADR-8");
	if (truck.adr9) dangerousGoodsRequirements.push("ADR-9");
	if (truck.tir) dangerousGoodsRequirements.push("TIR");
	if (truck.ekmt) dangerousGoodsRequirements.push("EKMT");

	return (
		<View my={1}>
			<ScrollView px={4}>
				<VStack>
					{correlation.driver && (
						<Box mt={4}>
							<Heading size="sm">Переозчик</Heading>
							<Box ml={4}>
								<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
									ФИО
								</Text>
								<Text>{`${driver.surname || ""} ${driver.name || ""} ${driver.patronymic || ""}`}</Text>

								<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
									Грузовик
								</Text>

								<Text>Тип прицепа - {trailerTypeDisplayName}</Text>
								<Text>Кузов - {carBodyDisplayName}</Text>
								<Text>Грузоподъемность - {truck.carryingCapacity} т</Text>
								<Text>Объем кузова - {truck.bodyVolume} м³</Text>

								{loadingTypeDisplayNames.length > 0 && (
									<Box>
										<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
											Способы загрузки
										</Text>
										<Text>{loadingTypeDisplayNames.join(", ")}</Text>
									</Box>
								)}

								{additionalTruckRequirements.length > 0 && (
									<Box>
										<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
											Доп. возможности
										</Text>
										<Text>{additionalTruckRequirements.join(", ")}</Text>
									</Box>
								)}

								{dangerousGoodsRequirements.length > 0 && (
									<Box>
										<Text mt={2} fontWeight="500" color={"darkBlue.500"}>
											Разрешения
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
